module.exports = {
    devServer: {
        port: process.env.PORT_FE,
        proxy: 'http://localhost:' + process.env.PORT_BE
    }
};
