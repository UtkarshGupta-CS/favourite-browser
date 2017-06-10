const path = require('path');
const express = require('express');
const webpack = require('webpack');
const mongoose = require('mongoose');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
   const compiler = webpack(config);
   const middleware = webpackMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: 'src',
      stats: {
         colors: true,
         hash: false,
         timings: true,
         chunks: false,
         chunkModules: false,
         modules: false
      }
   });

   app.use(middleware);
   app.use(webpackHotMiddleware(compiler));
   app.get('*', function response(req, res) {
      res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
      res.end();
   });
} else {
   app.use(express.static(__dirname + '/dist'));
   app.get('*', function response(req, res) {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
   });
}
mongoose.connect('mongodb://localhost:27017/SMS', (err) => {
   if (err) console.log("not connected to the db: " + err);
   else console.log("Successfully connected to db");
})
app.listen(port, '127.0.0.1', function onStart(err) {
   if (err) {
      console.log(err);
   }
   console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.', port, port);
});