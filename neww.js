var express = require('express');
var bodyParser = require('body-parser');
var {checklogin,studentadd}=require('./student');
var {checkloginfac,facultyadd,courseShow}=require('./faculty');
var app = express();

app.set('views','./views');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/',(req,res)=>{
    res.render('newstudent.ejs');
})
app.get('/login',(req,res)=>{
    res.render('login.ejs');
})

app.post('/',(req,res)=>{
    const name=req.body.namest;
    const usr=req.body.usr;
    const pwd=req.body.pass;
    const typef=req.body.typef;
    if(typef=='stu')
    {
        studentadd(name,usr,pwd);
        res.redirect('/login');
    }
    if(typef=='prof')
    {
        facultyadd(name,usr,pwd)
        res.redirect('/login');
    }
    
})
app.get('/courseAdd/:usr',(req,res)=>{
    const usr = req.params.usr;
    courseShow()
    .then((course)=>{
        var ids=course.ids;
        var ctitle=course.courses;
        res.render('faculty_main',{ids,ctitle});
    })


})
app.post('/login',(req,res)=>{

    const usr=req.body.usr;
    const pwd=req.body.pass;
    const typef=req.body.typef;

    if(typef=='prof')
    {
        checkloginfac(usr,pwd)
        .then(()=>{
            res.redirect(`/courseAdd/:${usr}`);
        })
        .catch(()=>{
            res.redirect('/');
        })

    }
    if(typef=='stu')
    {
        console.log('stu')
        checklogin(usr,pwd)
        .then(()=>{
            res.redirect(`/courseShow/:${usr}`);
        })
        .catch(()=>{
            res.redirect('/');
        })
    }

})

app.listen(8000, function() 
{
  console.log('Server running at http://localhost:8000/');
});