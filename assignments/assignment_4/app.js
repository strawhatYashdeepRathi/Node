const express = require('express');
const faker = require('faker');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require("./model/users");
const methodOverride = require('method-override');
mongoose.connect('mongodb://localhost:27017/assignment_4');
const app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }))


app.set('views','./views');
app.set('view engine','ejs');

app.get('/', async(req, res)=>{
    var data = await users.find();
    res.render('index', {users});
})

app.get('/form', (req, res)=>{
    res.render('form');
})

app.post('/user/add', async(req, res)=>{
    try{
    users.create({
        name: req.body.name,
        email: req.body.email,
        promoted: null
    })
    }
    catch (err){
        console.log(err)
    }
    res.redirect('/');
})

app.put("/users/:id", async (req, res) =>{
    const isPromoted = await users.find({_id : req.params.id});
    if (isPromoted[0].isPromoted === false || isPromoted[0].isPromoted === null){
        await users.updateOne(
            {_id: req.params.id},
            {isPromoted: true}
            )
    }
    else{
        await users.updateOne(
            {_id: req.params.id},
            {isPromoted: false}
            )
    }
    res.redirect("/");
})
app.delete("/users/:id", async (req, res) =>{
    await users.deleteOne({_id: req.params.id});
    res.redirect("/");
})
app.listen(3000, ()=>{console.log('Server is listening')});