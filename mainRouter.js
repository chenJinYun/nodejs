let router = function (app) {
    app.get("/", function (req, res) {
        // req为request，可以获取请求的参数以及路径
        // res为response,作为浏览器请求响应
        // 响应浏览器
        // res.send("hello world!")
        res.render("index.html");
    })

    app.get("/about", function (req, res) {
        res.render("about.html", {
            message: 'ABOUT'
        });
    })
}

exports.router = router