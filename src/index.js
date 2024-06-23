require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const router = require('./router/index.router');
const { checkOverloadConnect } = require('./helpers/checkConnect');
const app = express();
// init middeleware 
app.use(morgan('dev')); // log request
app.use(helmet()); // bảo mật ứng dụng web
app.use(compression()); // giam dung luong trang web và tăng tốc độ tải trang web
// init db 
require('./dbs/init.mongodb');
checkOverloadConnect();
// handle routes
// app.use('', router);

// hanđing errors 
// app.use((req, res, next) => {
//     const error = new Error('Not found');
//     error.status = 404;
//     next(error);
// });

// // Handle other errors
// app.use((error, res, next) => {
//     res.status(error.statusCode || 500);
//     res.json({
//         error: {
//             message: error.message || 'Server error',
//             statusCode: error.statusCode || 500
//         }
//     });
// });
module.exports = app; 