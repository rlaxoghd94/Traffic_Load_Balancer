FROM ubuntu:18.04
MAINTAINER Nicholas Taehong Kim, JongWon Song

RUN apt-get update && apt-get install nginx && apt-get install node ~~~~

RUN npm install pm2

COPY .config ~/etc/app/awpeioj/.config
COPY app.js ~/etc/app/awpeioj/.js
COPY .config ~/etc/app/awpeioj/.config





# copy necessary directory to Ubuntu image
# COPY . /app

# run necessary command (i.e. install from requirements.txt)
# RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Run a file when the container launches
# CMD ["python", "app.py"]
