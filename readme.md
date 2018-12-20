### express框架
    1.这个框架的作用是创建服务器，用于响应用户的各种请求
    2.分配路由（router）,app.get(路径，回调(req，res))


#### 使用ejs处理视图
    1.引入了ejs模块。
    2.设定应用的视图引擎（view engine）为ejs。
    3.设定在处理HTML文件的时候使用ejs来渲染文件。

#### 中间件:处理HTTP请求的函数
    1.App实例可以接受第三个参数，next:代表下一个中间件
    2.调用next，会把request对象传递给下一个中间件
    3.调用app.use()方法注册中间件
        使用use注册的中间件，每一个请求都会调用，req.url
        可以根据请求的路径对不同的路由进行处理，

    4.中间件内部判断路径，再调用，app.use(path,callback(req,res,next))
        这种用法，只有匹配的路径才会调用中间件

### Express 方法
    1.all方法：所有的路由请求都需要经过的中间件  
        app.all("*",callback) *表示对所有路径有效

    2.Http动词方法：get,post,put等
    
    3.路径匹配的方式:
        a.绝对匹配:'path'
        b.参数匹配：'path/:who' 会匹配：path/anything的路由
        c."path/:who?，表示参数可选

    4.set方法：app.set(变量，值) 用于指定变量的值
        app.set("views", __dirname + "/views");
        app.set("view engine", "jade");

    5.response对象
        a.response.redirect方法，重定向
        b.response.sendFile(文件路径)，发送文件
        c.response.render(文件名，替换模板变量)

    6.request对象
        a.request.ip:获取请求的ip地址
        b.request.files:获取上传的文件

### Express.Router用法
    1.基本用法：express.Router()返回一个路由实例
    2.router提供http动词的方法：router.get(path,callback)
    3.挂载到某一个路径下，app.use(路径，router)

    4.router实例的route方法
        a.router.route(路径).Http动词
            route.route('/api')
                    .get(function(req,res))
                    .post(funciton(req,res))

    5.router中间件,必须放在HTTP动词之前，否则不会执行
        router.use(callback)

    6.对路径参数进行处理：必须放在HTTP动词之前
        a.router.param(name,callback)

### app.route用法
    app是express实例对象，app.route其实就是express.Router()的缩写
    同一个路径的不同请求方法，可以链式调用
    e.g:
        app.route('/api')
                .get(function(req,res))
                .post(funciton(req,res))

### 上传文件
    使用multer插件