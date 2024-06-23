// config mongodb
const process = require('process');
const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3080
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'Tsmart'
    }
}

const test = {
    app: {
        port: process.env.TEST_APP_PORT || 3080
    },
    db: {
        host: process.env.TEST_DB_HOST || 'localhost',
    }
}

const product = {
    app: {
        port: process.env.PROD_APP_PORT || 3080
    },
    db: {
        host: process.env.PROD_DB_HOST || 'localhost',
        port: process.env.PROD_DB_PORT || 27017,
        name: process.env.PROD_DB_NAME || 'LearningApp'
    }
}

const config = { dev, test, product };
console.log({
    role: process.env.NODE_ENV
})
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
