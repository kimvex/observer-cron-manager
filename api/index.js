'use strict'

const validateSession = require('../helpers/validate-session');

const RouterFront = require('express').Router();
const RouterApi = require('express').Router();

// API handlers
const CreateCron = require('./api/createCron');
const Login = require('./api/login');
const CreateCronGroup = require('./api/createCronGroup');
const CronGroups = require('./api/cronGroups');

// Front handlers
const Dashboard = require('./front/dashboard');

// API routes
RouterApi.post('/login', Login)
RouterApi.post('/create-cron', validateSession, CreateCron)
RouterApi.post('/create-cron-group', validateSession, CreateCronGroup)
RouterApi.get('/cron-groups', validateSession, CronGroups)

// Front routes
RouterFront.get('/', Dashboard)

exports.front = RouterFront
exports.api = RouterApi

