require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const router = require('./router/index.router');
const { checkOverloadConnect } = require('./helpers/checkConnect');
const app = express();

// Khởi tạo middleware
app.use(morgan('dev')); // Ghi log các yêu cầu HTTP
app.use(helmet()); // Bảo mật ứng dụng web
app.use(compression()); // Giảm dung lượng trang web và tăng tốc độ tải
app.use(express.json()); // Phân tích cú pháp JSON từ các yêu cầu
app.use(express.urlencoded({ extended: true })); // Phân tích cú pháp URL-encoded

// Khởi tạo kết nối cơ sở dữ liệu
require('./dbs/init.mongodb');
checkOverloadConnect();

// Middleware tùy chỉnh

// Xử lý các route
app.use('/', router);

// Xử lý lỗi 404
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Xử lý lỗi chung
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error'
    });
});

// Xuất ứng dụng
module.exports = app;
