var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var pm = require('./model/friend')
var cors  = require('cors')
//initialize the express app
var app = express()
app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json()) 
mongoose.set('debug', true);  

mongoose.connect("mongodb://localhost:27017/productdb")
var db = mongoose.connection

//console.log(db.listCollections())

db.on('error', function(){
    console.log("Error connecting to the database!")
})

db.once('open', function(){
    console.log("Connected to the database!")
})


app.get("/welcome", function(req, res){
    res.send("hello from mongo!")
})

app.get('/all', function(req, res){

        pm.find({}, function(err, data){
            if(err){
                res.send(err)
            }else{
                console.log(data)
                res.json(data)
            }
        })

})


app.get("/get/:name", function(req, res){
    var pathParam = req.params.name
    console.log(pathParam)
    pm.find({name:pathParam}, function(err, data){
        
        if(err){
            res.send(err)
        }else{
            console.log(data)
            res.json(data)
        }
    })
})

app.post("/add", function(req, res){
   console.log(req.body)
   var friend = new pm()
   friend.name = req.body.name
   friend.location = req.body.location
   friend.age = req.body.age
   friend.likes = req.body.likes

   friend.save(function(err){
       if(err){
           res.send(err)
       }else{
           res.json({message:'friend added!!!!'})
       }
   })
})

app.listen(8181)

