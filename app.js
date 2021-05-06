const express= require('express');
 const app=express();
 app.use(express.json());
app.use(express.urlencoded({extended:true}));
const request= require('request');
const https =require('https');
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const FirstName= req.body.fname;
    const LastName= req.body.lname;
    const email=req.body.email;
    const data ={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: FirstName,
                    LNAME: LastName
                }
            }
        ]
    };
    const jsonData= JSON.stringify(data);
    const url="https://us1.api.mailchimp.com/3.0/lists/9ed786481f";
    const options ={
        method:"POST",
        auth:"Tanisha:02b5fd20207372170dff8c0cc125ad2a-us1"
    };
    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});
 app.listen(process.env.PORT || 3000,function(){
     console.log("server is up and running");
 })

//  02b5fd20207372170dff8c0cc125ad2a-us1
// 9ed786481f