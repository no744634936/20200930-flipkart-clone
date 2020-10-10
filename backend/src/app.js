const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const render = require('koa-art-template')
const index = require('./routes/index')
const path=require('path')
const userRoutes=require("./routes/user.js")
const adminUserRoutes=require("./routes/admin/adminUser.js")
const categoryRoutes = require("./routes/category.js")
const productRoutes=require("./routes/product.js")
const cartRoutes=require("./routes/cart.js")


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

//http://localhost:3000/uploadPictures/1602031206121.jpg 用这种连接来访问静态资源。
app.use(require('koa-static')(path.join(__dirname,'/public')))
console.log(path.join(__dirname,'/public/uploadPictures'));

render(app, {
    root: path.join(__dirname, 'views'),   //视图的位置
    extname: '.html', //后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
});

// logger 演示的代码，可以删除
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userRoutes.routes(), userRoutes.allowedMethods())
app.use(adminUserRoutes.routes(), adminUserRoutes.allowedMethods())
app.use(categoryRoutes.routes(), categoryRoutes.allowedMethods())
app.use(productRoutes.routes(), productRoutes.allowedMethods())
app.use(cartRoutes.routes(), cartRoutes.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
