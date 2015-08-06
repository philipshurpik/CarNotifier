process.env.DB_NAME = 'testdb';

var app = require('./services.js');

require('./user/userService.spec.js');