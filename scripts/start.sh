#!/bin/bash
cd /home/ubuntu/gallery-port/server
ls -al
authbind --deep pm2 start app.js
# node index.js &