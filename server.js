const port = process.env.PORT || 5000;
const mongoose= require('mongoose');
var Schema=mongoose.Schema;
const express = require('express');
var bodyParser = require('body-parser');
const app=express();
app.use(express.static('public'));
var con;



app.listen(port, () => console.log(`Listening on port ${port}`));


mongoose.connect("mongodb://localhost/trainer",function(err){
	if(err) throw err;
	console.log('connected to db');
});

con=mongoose.connection;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

var CartSchema =new Schema({
     uid  : {type : Number},
	 name : {type:String,required:true},
     course : {type:String},
     qualification: {type:String},
	 experience : {type:Number}
	 
});

var CartModel=mongoose.model('shop',CartSchema);

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
	next(); }
);


app.post('/add', (req, res) => {
	
	var item= new CartModel(
		{
               //uid   : req.body.uid,
			   name : req.body.name,
               course : req.body.course,
               qualification : req.body.qualification,
			   experience : req.body.experience
			  
		});
        item.save()
        .then(item => {
            res.send(item);
            console.log('save success');
        });
        // (function(err,result){
		//    if(err)
		// 	   {
		// 		   console.log('save failed' + err);
		// 	   }
		//    else console.log('save succes');
		// });
});
app.get('/adr',(req,res) =>{
  console.log('in adr');
})
app.get('/add', (req,res) =>{
    CartModel.find()
        .then(item => {
            res.send(item);
            console.log('in get');
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error occured"
           });
      });
 })

 app.post('/del',(req,res)=>{
    var _id = req.body._id;
     CartModel.remove({'_id': _id},function(err,result){
         res.json({
             message : 'deleted'
         })
        });
 })

 



