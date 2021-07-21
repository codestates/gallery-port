#!/bin/bash
cd /home/ubuntu/gallery-port/server
pm2 stop app.js 2> /dev/null || true
pm2 delete app.js 2> /dev/null || true