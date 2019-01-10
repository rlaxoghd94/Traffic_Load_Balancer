
echo "-------------node_init_.sh-------------"
nodejs app1.js &
nodejs app2.js &
nodejs app3.js &
echo "---------------------------------------"

/bin/sh

while sleep 60; do
   echo "---loop---"

done
