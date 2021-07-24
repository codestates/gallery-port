#!/bin/bash
cd /home/ubuntu/gallery-port/server
export DB_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DB_USER --query Parameters[0].Value | sed 's/"//g')
export DB_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DB_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DB_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DB_PORT --query Parameters[0].Value | sed 's/"//g')
export DB_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DB_HOST --query Parameters[0].Value | sed 's/"//g')
export NODE_ENV=$(aws ssm get-parameters --region ap-northeast-2 --names NODE_ENV --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js