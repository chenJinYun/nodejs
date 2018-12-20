// 创建服务
let express = require("express")
let ejs = require("ejs")
let router = require("./mainRouter")
let routers = express.Router();
let multer = require('multer')
let app = express();
// 使用ejs处理视图
app.set("view engine", 'ejs');
app.engine('html', ejs.renderFile);
// app.use(express.bodyParser())

// 分配路由
router.router(app)

// 使用中间件处理路由，在内部判断路径
app.use(function (req, res, next) {
    if (req.url === '/') {
        res.send('index')
    } else {
        next()
    }
})

app.use(function (req, res, next) {
    if (req.url === '/about') {
        res.send('about')
    } else {
        next()
    }
})

// 根据路径，调用调用中间件
app.use('/test', function (req, res, next) {
    next()
})
app.use('/test1', function (req, res) {
    res.send('test1')
})

// 路由带参数
app.get('/test/:who', function (req, res) {
    console.log(req.url)
    console.log(req.params)
    res.send('test:' + req.params.who)
})
// 参数可以没有
app.get('/par/:who?', function (req, res) {
    console.log(req.params.id);
    console.log(req.url)
    if (req.params.id) {
        res.send('hello' + req.params.who)
    }
    res.send('error' + req.params.who)
})

// 重定向
app.get('/redirect', function (req, res) {
    res.redirect('http://www.baidu.com')
})
// 发送文件
app.get('/file', function (req, res) {
    res.sendFile('D:/vscode/node_express/views/index.html')
})

// request.id/files
app.get('/req', function (req, res) {
    console.log(req)
    console.log(req.files)
})


// express.Router的使用
routers.get('/art', function (req, res) {
    res.send('art')
})

// router中间件
routers.use(function (req, res, next) {
    console.log(req.method, req.url)
    next()
})

// routers.route方法
routers.route('/api')
    .get(function (req, res) {
        res.send(JSON.stringify(req.Url))
    })
    .post(function (req, res) {
        res.send('post')
    })

// 对路径参数进行处理
routers.param('name',function(req,res,next,name){
    console.log(name)
    req.name='leo'
    next()
})
routers.get('/ppp/:name',function(req,res){
    res.send('hello'+req.name)
})

// 图片上传
let uploading = multer({
    dest:__dirname+'/public/uploads/',
    limits:{fileSize:100000,files:1}
})
routers.post('/upload',function(req,res){
    res.send('success')
})
routers.get('/upload',function(req,res){
    res.render('upload.html')
})

// 把routers挂载到某一个路径下
app.use('/', routers)

// 监听端口
let server = app.listen(5566, function () {
    console.log("Server is running on http://localhost:5566");
})