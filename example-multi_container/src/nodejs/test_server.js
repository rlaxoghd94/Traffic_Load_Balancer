var cluster = require('cluster');
var os = require('os');
var uuid = require('uuid');
const port = 8080;
//create Ket using to check server
var instance_id = uuid.v4();

var cpuCount = os.cpus().length; //CPU Count
var workerCount = cpuCount/3;
 
// Master
if (cluster.isMaster) {
    //Worker 
    console.log('Server ID : '+instance_id);
    console.log('Server CPU Count : ' + cpuCount);
    console.log('Server Worker Count : ' + workerCount);
   
    //Worker Message Listener for Master-Worker connection
    var workerMsgListener = function(msg){
       
        var worker_id = msg.worker_id;
           
        //when request is to get master_id
        if (msg.cmd === 'MASTER_ID') {
            cluster.workers[worker_id].send({cmd:'MASTER_ID',master_id: instance_id});
        }
    }
   
    //Worker Creation
    for (var i = 0; i < workerCount; i++) {
        console.log("Worker Creation [" + (i + 1) + "/" + workerCount + "]");
        var worker = cluster.fork();
       
        worker.on('message', workerMsgListener);
    }
   
    //worker is online state
    cluster.on('online', function(worker) {
        console.log('Worker alive - ID : [' + worker.process.pid + ']');
    });
   
    //if worker is died
    cluster.on('exit', function(worker) {
        console.log('woker die - ID : [' + worker.process.pid + ']');
        console.log('Create new worker.');
       
        var worker = cluster.fork();
        
        worker.on('message', workerMsgListener);
    });
 
//Worker
} else if(cluster.isWorker) {
    var express = require('express');
    var app = express();
    var worker_id = cluster.worker.id;
    var master_id;
   
    var server = app.listen(port, function () {
        console.log("Express Server " + server.address().port + "Port is Listening.");
    });
   
    //마스터에게 master_id 요청
    process.send({worker_id: worker_id, cmd:'MASTER_ID'});
    process.on('message', function (msg){
        if (msg.cmd === 'MASTER_ID') {
            master_id = msg.master_id;
        }
    });
   
    app.get('/', function (req, res) {
        console.log("Client Connect");
        res.send('<br>['+master_id+']Server <br>Worker ['+ cluster.worker.id+']');
    });

    app.get("/workerKiller", function (req, res) {
        cluster.worker.kill();
        res.send('Kill Worker');
    });
}