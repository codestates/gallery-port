#!/bin/bash
cd /home/ubuntu/gallery-port/server
authbind --deep pm2 start app.js