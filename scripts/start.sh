#!/bin/bash
cd /home/ubuntu/gallery-port/server
ls -al
# authbind --deep pm2 start index.js
node index.js &