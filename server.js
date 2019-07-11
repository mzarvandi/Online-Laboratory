var express = require("express") ;
var bodyParser = require("body-parser") ;
var app = express() ;
var morgan = require('morgan') ;
var session = require('express-session') ;
var mongoose = require('mongoose') ;
var mongoStore = require('connect-mongo')(session);
var unique = require("array-unique").immutable;
var ObjectId = require('mongodb').ObjectId;
var formidable = require('formidable');
var fs = require('fs');
var autoIncrement = require('mongoose-auto-increment');

//////////////////////////////////////////////////////////////////////database models:
var connection = mongoose.createConnection("mongodb://localhost/labresonlinelaboratory");
var db = connection ;
autoIncrement.initialize(connection);
var UserSchema= new mongoose.Schema({
    randomID: Number,
    firstname :String,
    lastname :String,
    email:String,
    password:String,
    ID:String,
    phone:String,
    birthdate:Date,
    gender :String,
    userType : String,
    emp_lab : String

});
var UserModel = connection.model("users",UserSchema);
var DocSchema = new mongoose.Schema({
    randomID: Number,
    user_ID :String,
    Lab_Name : String,
    Test_Name : String,
    Date_Time : String,
    Paid_Status : Boolean,
    done : Boolean,
    Result_Date : Date,
    img: {
        data: Buffer,
        contentType: String
    },
    followingCode : String,
    paymentMethod : String

});
var DocModel=connection.model("docs",DocSchema);
var Test_TypeSchema = new mongoose.Schema({
    randomID : Number,
    Lab_Name : String,
    Test_Name : String,
    doctor: String,
    address: String,
    phone: String,
    Price: Number,
    Price_Insurance: Number,
    Date_Time : String,
    City : String
});
var Test_TypeModel = connection.model("test_types",Test_TypeSchema);
db.on('error' , function () {
    console.log("oh oh DB Error .. :(")
}) ;
db.once("connected" , function () {
    console.log("MongoDb Connected :)") ;
}) ;

console.log(__dirname);
app.use(morgan('common')) ;
app.use(express.static(__dirname + "/static")) ;
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({ extended:true })) ;
app.use(session({
    secret : "secret",
    resave : false,
    saveUninitialized : true ,
    store : new mongoStore({ mongooseConnection : db })
})) ;


///////////////////////////////////////////////////////////////////////////homepage:
app.get("/homepage",function(req,resp,next){
    resp.sendFile(__dirname + "/static/homepage.html") ;

});
////////////////////////////////////////////////////////////////////////////home_sick:
// app.get("/home_sick" , function (req, resp, next) {
//     if(req.session.auth){
//
//                 resp.sendFile(__dirname + "/static/home_sick.html") ;
//     }else{
//         resp.redirect("/");
//     }
// });
app.get("/home_sick" , function (req, resp, next) {
    if(req.session.auth){

        resp.sendFile(__dirname + "/static/patient_panel.html") ;
    }else{
        resp.redirect("/");
    }
});
/////////////////////////////////////////////////////////////////////////////login:
app.get("/getInfo"  , function (req, resp, next) {
    if ( req.session.auth) {
        UserModel.findOne({ ID: req.session.auth.username},function(err,data){
            if(err) throw err;
            var tmp=data.firstname.concat(" ",data.lastname);
            resp.json({status : true , name: tmp , worksat : data.emp_lab });

        });
    }
    else {
        resp.json({status : false})
    }
}) ;
app.get("/" , function (req, resp, next) {
 
    resp.redirect('/homepage')
}) ;
app.get("/login" , function (req, resp, next) {
    resp.sendFile(__dirname + "/static/login.html") ;
}) ;
app.post("/login" , function (req, resp, next) {

    if (req.session.auth != undefined) {
        resp.json({status : false , msg : "قبلا وارد شده اید!"}) ;
    }
    else if(req.body.username==="" || req.body.password===""){
        resp.json({status : false, msg : "لطفا فیلد های لازم را پر کنید"});
    }
    else {
        UserModel.findOne({ ID: req.body.username }, function (err, user) {
            if (err) {
                throw err;
            }

            if (user != undefined) {
                if (user.password == req.body.password) {
                    req.session.auth = { username: req.body['username'] };
                    resp.json({status: "true", type:user.userType , msg: "با موفقیت وارد شدید"});

                }
                else {
                    resp.json({status: false, msg: "رمز عبور اشتباه است "});
                }
            }
            else {
                resp.json({status : false   , msg: "این کاربر وجود ندارد!"});
            }
        })
    }

}) ;

app.get("/logout" , function (req, resp, next) {
    delete req.session.auth ;//delete from DB too?
    resp.json({status: true, msg: "logged out!"});
}) ;
app.get("/logouthome" , function (req, resp, next) {
    delete req.session.auth ;
    resp.redirect("/");
}) ;
// app.post("/signup" , function (req, resp, next) {
//     var formData = req.body ;
//             UserModel.find({ID : formData.ID} , function (err, users) {
//                 var x=Math.floor((Math.random()*2000000) +1000000);
//                 if (err ) { throw err}
//                 else if ( users.length ) {
//                     resp.json({status : false , msg : "این شماره ملی قبلا ثبی شده است " })
//                 }
//                 else {
//                     var newUser = new UserModel({
//                         randomID : x,
//                         firstname :formData.fname,
//                         lastname :formData.lname,
//                         email: " ",
//                         password:formData.pass,
//                         ID:formData.code,
//                         phone:formData.phone,
//                         birthdate:formData.bdate,
//                         gender :formData.gender,
//                         userType : "patient"
//
//                     }) ;
//                     newUser.save() ;
//                     resp.json({status : true , msg : "ثبت شدید :)"}) ;
//                 }
//             })
// }) ;
app.post("/signup" , function (req, resp, next) {//"fname":$("#firstName").val() , "lname":$("#lastName").val() , "phone": $("#phone").val() ,
                                                 //   "address": $("#address").val(), "Email":$("#Email").val(), "code": $("#code").val() , "pass": $("#password").val()};
    var formData = req.body ;
    UserModel.find({ID : formData.ID} , function (err, users) {
        var x=Math.floor((Math.random()*2000000) +1000000);
        if (err ) { throw err}
        else if ( users.length ) {
            resp.json({status : false , msg : "این شماره ملی قبلا ثبی شده است " })
        }
        else {
            var newUser = new UserModel({
                randomID : x,
                firstname :formData.fname,
                lastname :formData.lname,
                email: formData.Email,
                password:formData.pass,
                ID:formData.code,
                phone:formData.phone,
                userType : "patient"

            }) ;
            newUser.save() ;
            resp.json({status : true , msg : "ثبت شدید :)"}) ;
        }
    })
}) ;

app.get("/signup",function(req,resp,next){
    resp.sendFile(__dirname + "/static/signup.html") ;


});
//////////////////////////////////////////////////////////////////search:
app.get("/search" , function (req, resp, next) {
    if (req.session.auth != undefined) {
        resp.sendFile( __dirname +"/static/search.html") ;

    }else{
        resp.redirect("/") ;
    }
});
// app.get("/searchItems",function(req,resp,next){
//     var tests=['فرقی ندارد'];
//     var labratories = ['فرقی ندارد'];
//     Test_TypeModel.find({}, function(err, labs) {
//         for (var i = 0, len = labs.length; i < len; i++) {
//             labratories.push(labs[i].Lab_Name);
//             tests.push(labs[i].Test_Name);
//         }
//
//         var values={test: unique(tests) , labs:unique(labratories)};
//         resp.json(values);
//
//
//     });
// });
app.get("/searchItems",function(req,resp,next){
    var tests=['فرقی ندارد'];
    var labratories = ['فرقی ندارد'];
    var Cities =['فرقی ندارد'];
    Test_TypeModel.find({}, function(err, labs) {
        for (var i = 0, len = labs.length; i < len; i++) {
            Cities.push(labs[i].City);
            labratories.push(labs[i].Lab_Name);
            tests.push(labs[i].Test_Name);
        }

        var values={test: unique(tests) , labs:unique(labratories) , cities: unique(Cities)};
        resp.json(values);


    });
});

app.post("/search" , function(req,resp,next){

    
    if(req.session.auth != undefined){
        if(req.body.test_name!='none' && req.body.labratory!='none'){
            Test_TypeModel.find({  Lab_Name : req.body.labratory , Test_Name : req.body.test_name},function(err, result){
            if (err) {
                throw err
            }else{

                resp.json(unique(result));
            }
            });

        }
        else if(req.body.test_name!='none'){
            Test_TypeModel.find({Test_Name : req.body.test_name},function(err, result){
            if (err) {
                throw err
            }else{
                resp.json(unique(result));
            }
            });

        }
        else if(req.body.labratory!='none'){
            Test_TypeModel.find({ Lab_Name : req.body.labratory },function(err, result){
            if (err) {
                throw err
            }else{
                resp.json(unique(result));
            }
            });
        }
        else{
            Test_TypeModel.find({},function(err, result){
                if (err) {
                    throw err
                }else{
                    resp.json(unique(result));
                }
            });
        }
    }else{
        resp.redirect("/");
    }
});
///////////////////////////////////////////////////////////////////home employees:
// app.get("/home_emp",function(req,resp,next){
//     if(req.session.auth != undefined){
//         resp.sendFile( __dirname + "/static/home_employee.html");
//     }
//     else{
//         resp.redirect("/");
//     }
// });
app.get("/home_emp",function(req,resp,next){
    if(req.session.auth != undefined){
        resp.sendFile( __dirname + "/static/employee_panel.html");
    }
    else{
        resp.redirect("/");
    }
});
app.get("/alltests",function(req,resp,next){
   var all=[];
    DocModel.find({}, function(err, doc) {
        
        for (var i = 0, len = doc.length; i < len; i++) {
            all.push(doc[i]);
        }
        
        resp.json(all);

    });


});
///////////////////////////////////////////////////////////////////add
app.get('/ezafe',function(req,resp,next){

    if(req.session.auth != undefined){
        resp.sendFile( __dirname + "/static/ezafe.html");
    }
    else{
        resp.redirect("/");
    }

});
app.post('/ezafe',function (req,resp,next) {

    var x=Math.floor((Math.random()*2000000) +1000000);
    var formdata=req.body;
    var newTest= new Test_TypeModel({
        randomID : x,
        Lab_Name : formdata.nameAzm,
        Test_Name : formdata.nameAz,
        doctor: formdata.nameDoc,
        Price: formdata.hazine

    });

    newTest.save();
    resp.json({status:true , msg : "ok shod"});
});
//////////////////////////////////////////////////////////////////savabegh
app.get('/savabegh',function(req,resp,next){
    if(req.session.auth != undefined){
        resp.sendFile( __dirname + "/static/savabegh.html");
    }
    else{
        resp.redirect("/");
    }
});
app.get('/allsavabegh',function(req,resp,next){
var all=[];
    DocModel.find({user_ID: req.session.auth.username},function(err,res){
        for (var i = 0, len = res.length; i < len; i++) {
            all.push(res[i]);
        }
        resp.json(all);
    });
});
//////////////////////////////////////////////////////////////////peygiri
app.get('/peygiry',function(req,resp,next){
    if(req.session.auth != undefined){
        resp.sendFile( __dirname + "/static/peygiry.html");
    }
    else{
        resp.redirect("/");
    }
});
app.post('/peygiry',function(req,resp,next){
    code = req.body.code;
    DocModel.findOne({ followingCode : code },function(err,res){
       resp.json(res);
    });
});
//////////////////////////////////////////////////////////////////reserve
app.post("/secreserve",function (req,resp,next) {
    var test_types = [];
    Test_TypeModel.find({Lab_Name : req.session.reserve.LabName , Test_Name : req.session.reserve.TestName},function (err,tstp) {
        for(var i=0,len=tstp.length;i<len;i++){
            test_types.push(tstp[i].Date_Time);
        }

        var values={timedate :unique(test_types),tstpDB : tstp};

        resp.json(values);

    });


});
app.post("/reserveaccepted",function (req,resp,next) {
    var x=Math.floor((Math.random()*2000000) +1000000);

    var newDoc = new DocModel({
    user_ID : req.session.auth.username,
        randomID : x,
    Test_Name : req.body.TestName,
    Date_Time : req.body.datetime,
    Paid_Status : false,
    Result_Date : req.body.resdate,
    done : true});
         
    newDoc.save();
    setTimeout(function(){

        DocModel.findOne(newDoc,function(err,res){
            req.session.resID=res.randomID;

            resp.redirect("/bank");
        });
    },500);




});
app.get("/bank",function(req,resp,next){
    var x=Math.floor((Math.random()*2000000) +1000000);
    DocModel.findOne({ randomID: req.session.resID },function(err,res){
        res.followingCode=x;
        res.save();
    });
    resp.sendFile(__dirname+"/static/bank.html");
});
app.post("/gotoreserve",function(req,resp,next){
    delete req.session.reserve ;
    req.session.reserve=req.body;
     resp.json({});
});
app.get("/gotoreserve",function(req,resp,next){
    resp.sendFile(__dirname + "/static/reserve.html");
});
////////////////////////////////////////////////////////////////////////
app.post("/gototest_page",function(req,resp,next){
    delete req.session.testID ;
    req.session.testID=req.body.ID;

    resp.json({ "s" : true});
});
app.get("/gototest_page",function(req,resp,next) {
    resp.sendFile(__dirname + "/static/test_page.html");
});
app.post('/test_page',function (req,resp,next) {


});
app.get('/test_page',function(req,resp,next){

    DocModel.findOne({ randomID : req.session.testID},function (err,dctp) {
        resp.json(dctp);
    });
});
app.post('/chiz',function(req,resp,next) {
    req.session.inID = req.body.inID;
    DocModel.findOne({ randomID : req.body.inID},function(err,doc)
        {
            if (err) throw err;
            resp.contentType(doc.img.contentType);
            resp.send(doc.img.data);

        }
    );

});
app.get('/resultsick',function(req,resp,next) {
    DocModel.findOne({ randomID : req.session.inID },function(err,doc)
        {
            if (err) throw err;
            resp.contentType(doc.img.contentType);
            resp.send(doc.img.data);
        }
    );
});
app.get('/resultemp',function(req,resp,next) {
    DocModel.findOne({randomID : req.session.testID},function(err,doc)
        {
            if (err) throw err;
            resp.contentType(doc.img.contentType);
            resp.send(doc.img.data);
        }
    );

});
//////////////////////////////////////////////////////////////////////upload photo:
app.post('/uploadresult',function(req,resp,next){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        DocModel.findOne({ randomID : req.session.testID },function(err,res){
            if(err)throw err;
            res.img.data = fs.readFileSync(oldpath);
            res.img.contentType = 'image/png';
            res.save();
            resp.json({status: true, msg: 'File uploaded and moved!'});

        });



    });
});

app.post('/updateDoc',function(req,resp,next){
    DocModel.findOne({ randomID : req.session.testID },function(err,res) {
        if (err) throw err;
        res.set({Paid_Status : req.body.paid , done : req.body.done});
        res.save();
        resp.json({status : true , msg : "ذخیره شد"}) ;
    });

});
////////////////////////////////////////////////////////////////////////
app.listen(8000) ;
console.log("app running on port 8000") ;
