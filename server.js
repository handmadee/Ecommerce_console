

const app = require("./src/index");
const config = require("./src/config/config.mongodb");
const PORT = config.app.port || 3080;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


process.on("SIGINT", () => {
    server.close(() => {
        console.log('Exit Server Express');
        process.exit(0);
    });
});