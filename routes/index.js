var express = require('express');
var router = express.Router();
let mysql = require('mysql')

let connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  port:'3306',
  database:'node'
})

connection.connect()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.get('/product', function(req, res, next) {
  res.render('product');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/main', function(req, res, next) {
  res.render('main',{data:[]});
});
router.post('/login', function(req, res) {
  connection.query("select password from user where userName=? and password=?",[req.body.account,req.body.password],(err,data)=>{
    if(err){
      res.end("failure")
    }else{if(data.length>0){res.redirect("/")}else{res.end("failure")}}
  })
})
router.get('/register', function(req, res, next) {
  res.render('register');
})
router.post("/register",(req,res)=>{
  connection.query("insert into user(userName,u_telephone,password)values(?,?,?)",[req.body.account,req.body.phone,req.body.password],(err,data)=>{
    if(err){
      res.end("err"+err)
    }else{
      res.redirect("/")}
  })
})
module.exports = router;

