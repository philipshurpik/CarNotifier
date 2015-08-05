var app = require('./services.js');
app.db = require('../carNotifierDb')('testDb', true);

require('./user/userService.spec.js');