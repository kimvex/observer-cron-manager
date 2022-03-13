'use strict'

const validateSession = require('../helpers/validate-session');

const RouterFront = require('express').Router();
const RouterApi = require('express').Router();

// Front handlers
const Dashboard = require('./front/dashboard');

// API handlers
const CreateCron = require('./api/createCron');

//validateUser

RouterFront.get('/', Dashboard)
RouterApi.post('/create-cron', validateSession, CreateCron)

exports.front = RouterFront
exports.api = RouterApi

