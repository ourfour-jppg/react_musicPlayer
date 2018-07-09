var request = require('request')
var fs = require('fs')
var mongodb = require('mongodb')
var express = require('express')
var body_parser = require('body-parser')
var exec = require('child_process').exec;
var app = express();
//设置静态页面并且设置资源缓存时间
app.use(express.static('../',{maxAge:1000*60*3}))
app.use(body_parser.urlencoded())