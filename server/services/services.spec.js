process.env.DB_NAME = 'carNotifier';

var app = require('./services.js');

require('./user/userService.spec.js');
require('./car-query/carQueryService.spec.js');
require('./ads/adsService.spec.js');