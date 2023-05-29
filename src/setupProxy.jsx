const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api-datmin', {
      target: 'https://api-swalayan-brbk6zo3cq-as.a.run.app', // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/api-datmin": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
  app.use(
    createProxyMiddleware('/api-klien', {
      target: 'https://flask-web-klien-brbk6zo3cq-uc.a.run.app', // API endpoint 2
      changeOrigin: true,
      pathRewrite: {
        "^/api-klien": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
}