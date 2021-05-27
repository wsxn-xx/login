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
  connection.query('select * from form',function(err,result){
    if(err){
      console.log(err);
      return
    }
    res.render('main',{data:result});
  })
});

router.get('/add',function(req,res){
  res.render('add')
})

router.get('/update',function(req,res){
  connection.query('select * from form where id = ?',req.query.id,function(err,result){
    if(err){
      console.log(err);
      return
    }
    res.render('update',{
      id:result[0].id ,
      name:result[0].name,
      in_price:result[0].in_price,
      price:result[0].price,
      i_number:result[0].i_number,
      s_number:result[0].s_number,
      income:result[0].income
    })
  })
})

router.get('/del',function(req,res){
  connection.query('delete from form where id = ?',req.query.id,function(err,result){
    if(err){
      console.log(err);
      return
    }
    res.redirect('/main')
  })
})

router.post('/login', function(req, res) {
  connection.query("select password from user where userName=? and password=?",[req.body.account,req.body.password],(err,data)=>{
    if(err){
      res.end("failure")
    }else{if(data.length>0){res.redirect("/")}else{res.end("failure")}}
  })
})
router.get('/register', function(req, res, next) {
  if(err){
    console.log(err);
    return
  }
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

router.post('/add',function(req,res){
  let body = req.body
  connection.query('insert into form values(null,?,?,?,?,?,?)',[body.name,body.in_price,body.price,body.i_number,body.s_number,body.income],function(err,result){
    if(err){
      console.log(err);
      return
    }
    res.redirect('/main')
  })
})

router.post('/update',function(req,res){
  let body = req.body
  connection.query('update form set name = ?,in_price = ?,peice = ?,i_number = ?,s_number = ?,income = ? where id = ?',[body.name,body.in_price,body.price,body.i_number,body.s_number,body.income,req.query.id],function(err,result){
    if(err){
      console.log(err);
      return
    }
    res.redirect('/main')
  })
})
module.exports = router;
