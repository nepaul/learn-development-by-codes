const koa = require('koa');
const app = new koa();
app.use(async (ctx, next) => {
  if (ctx.path !== '/') return next();
  ctx.body = 'Hello from Koa';
});
// don't forget to export!
module.exports = app;
