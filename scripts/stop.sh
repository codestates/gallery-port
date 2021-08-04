#!/bin/bash
cd /home/ubuntu/gallery-port/server
pm2 stop app.js 2> /dev/null || true
pm2 stop 0
pm2 kill
pm2 delete app.js 2> /dev/null || true