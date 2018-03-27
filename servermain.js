var express = require('express');
var app = express();	
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoclient = require('mongodb').MongoClient;
var server = require('mongodb').Server;
var cookiesession  = require('cookie-session');
var db;
app.use(express.static('public'));

mongoclient.connect('mongodb://<dbuser>:<dbpassword>@ds239965.mlab.com:39965/online_banking_system',function(err,db1){
    if(err)
    {
        return console.log(err);
    }
    db=db1;

    app.listen(4410,function(){
        console.log("connected to port: 4410");	
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    maxAge: 30*60*1000
}))

var auth = function(req, res, next) {
    console.log(req.session.user_id);
    if (req.session && req.session.user_id)
        return next();
    else
        return res.sendStatus(404);
};



app.get('/',function(req,res){
console.log("get request for homepage. ('/')");
res.sendFile(__dirname + '/wthtml/homepagetest.html');
});

app.get('/wthtml/homepagetest.html',function(req,res){
console.log("get request for homepage. ('/wthtml/homepagetest.html')");
res.sendFile(__dirname + '/wthtml/homepagetest.html');
});


app.get('/wthtml/Register.html',function(req,res){
console.log("get request for register. ('/register')");
res.sendFile(__dirname + '/wthtml/Register.html');
});


app.get('/wthtml/LogIn.html',function(req,res){
console.log("get request for login. ('/login')");
res.sendFile(__dirname + '/wthtml/LogIn.html');
});


app.get('/wthtml/bankaccount.html',function(req,res){
console.log("get request for bankaccount. ('/bankaccount')");
res.sendFile(__dirname + '/wthtml/bankaccount.html');
});

app.get('/wthtml/bankdeposits.html',function(req,res){
console.log("get request for bankdeposits. ('/bankdeposits')");
res.sendFile(__dirname + '/wthtml/bankdeposits.html');
});

app.get('/wthtml/bankloan.html',function(req,res){
console.log("get request for bankloan. ('/bankloan')");
res.sendFile(__dirname + '/wthtml/bankloan.html');
});

app.get('/wthtml/bankinsurance.html',function(req,res){
console.log("get request for register. ('/bankinsurance')");
res.sendFile(__dirname + '/wthtml/bankinsurance.html');
});

app.get('/wthtml/bankcards.html',function(req,res){
console.log("get request for register. ('/bankcards')");
res.sendFile(__dirname + '/wthtml/bankcards.html');
});

app.get('/wthtml/bankfacilities.html',function(req,res){
console.log("get request for register. ('/bankfacilities')");
res.sendFile(__dirname + '/wthtml/bankfacilities.html');
});

app.get('/wthtml/bankoffers.html',function(req,res){
console.log("get request for register. ('/bankoffers')");
res.sendFile(__dirname + '/wthtml/bankoffers.html');
});

app.get('/wthtml/bankinvestments.html',function(req,res){
console.log("get request for register. ('/bankinvestments')");
res.sendFile(__dirname + '/wthtml/bankinvestments.html');
});

app.get('/wthtml/bankphishing.html',function(req,res){
console.log("get request for register. ('/bankphishing')");
res.sendFile(__dirname + '/wthtml/bankphishing.html');
});

app.get('/wthtml/bankcontactus.html',function(req,res){
console.log("get request for register. ('/bankcontactus')");
res.sendFile(__dirname + '/wthtml/bankcontactus.html');
});

app.get('/wthtml/adminbranch.html',function(req,res){
console.log("get request for branch. ('/branchadmin')");
res.sendFile(__dirname + '/wthtml/adminbranch.html');
});

app.get('/wthtml/adminuser.html',function(req,res){
console.log("get request for register. ('/adminuser')");
res.sendFile(__dirname + '/wthtml/adminuser.html');
});

app.get('/wthtml/adminaccount.html',function(req,res){
console.log("get request for register. ('/accountadmin')");
res.sendFile(__dirname + '/wthtml/adminaccount.html');
});

app.get('/wthtml/logintemplate.html',function(req,res){
console.log("get request for loginpage. ('/wthtml/logintemplate.html')");
res.sendFile(__dirname + '/wthtml/logintemplate.html');
});

app.get('/wthtml/myaccount.html',function(req,res){
console.log("get request for myaccount. ('/accountuser')");
res.sendFile(__dirname + '/wthtml/myaccount.html');
});

app.get('/wthtml/makepayment.html',function(req,res){
console.log("get request for makepayments. ('/makepayment')");
res.sendFile(__dirname + '/wthtml/makepayment.html');
});

app.get('/wthtml/transactionhistory.html',function(req,res){
console.log("get request for makepayments. ('/transactionhistory')");
res.sendFile(__dirname + '/wthtml/transactionhistory.html');
});

app.get('/wthtml/changepassword.html',function(req,res){
console.log("get request for makepayments. ('/changepassword')");
res.sendFile(__dirname + '/wthtml/changepassword.html');
});


app.post('/adminuserdatasubmit',function(req,res){
    

    console.log(req.body);

    db.collection('user').findOne({'user_id':req.body.user_id},function(err,result){

        if(err){
            console.log('error admin findOne!!');
            res.send('An unexpected error occured. Try to register again!!!');
        }

        if(!result){

            console.log('New customer of bank');

            var new_user={'user_id':req.body.user_id, 'password':'', 'fname':req.body.fname, 'mname':req.body.mname, 'lname':req.body.lname, 'gender':req.body.gender, 'city':req.body.city, 'dob':req.body.dob, 'pin_code':req.body.pin_code, 'email':req.body.email, 'phone':req.body.phone, 'branch_id':req.body.branch_id};
            db.collection('user').save(new_user,function(err,dz){
            if(err)
                {
                    console.log('error admin save!!');
                    res.send('An unexpected error occured. Try to register again!!!');
                }	
                    
                console.log('Saved customer record.');
                res.send('Saved customer record successfully.');
                

            });
        }
        else{
            console.log('Customer already exists!!');
            res.send("Customer already exists!!!");
            
        }
        
    });
});

app.post('/adminbranchdatasubmit',function(req,res){
    

    console.log(req.body);
    var new_branch={'branch_id':req.body.branch_id, 'branch_name':req.body.branch_name, 'branch_city':req.body.branch_city, 'branch_address_1':req.body.branch_address_1, 'branch_address_2':req.body.branch_address_2, 'branch_phone':req.body.branch_phone};
    db.collection('branch').findOne({'branch_id':req.body.branch_id},function(err,result){

        if(err){
            console.log('error admin findOne!!');
            res.send('An unexpected error occured. Try to create branch again!!!');
        }

        if(!result){

            console.log('New branch of bank');

            db.collection('branch').save(new_branch,function(err,dz){
            if(err)
                {
                    console.log('error admin save!!');
                    res.send('An unexpected error occured. Try to create branch again!!!');
                }	
                    
                console.log('Saved new branch record.');
                res.send('Saved new branch record successfully.');
               

            });
        }
        else{
            console.log('Branch already exists!!');
            res.send("Branch already exists!!!");
            
        }
        
    });
});

app.post('/adminaccountdatasubmit',function(req,res){
    

    console.log(req.body);
    var new_branch={'user_id':req.body.user_id, 'acc_no':req.body.acc_no, 'sdate':req.body.sdate, 'balance':req.body.balance, 'Account_type':req.body.Account_type, 'interestrate':req.body.interestrate};
    db.collection('account').findOne({'acc_no':req.body.acc_no},function(err,result){

        if(err){
            console.log('error admin findOne!!');
            res.send('An unexpected error occured. Try to create account again!!!');
        }

        if(!result){

            console.log('New account of bank');

            db.collection('account').save(req.body,function(err,dz){
            if(err)
                {
                    console.log('error admin save!!');
                    res.send('An unexpected error occured. Try to create account again!!!');
                }	
                    
                console.log('Saved new account record.');
                res.send('Saved new acount record successfully.');

            });
        }
        else{
            console.log('Account already exists!!');
            res.send("Account already exists!!!");
            
        }
        
    });
});








app.post('/userregister',function(req,res){
    
    console.log(req.body);
    
    db.collection('user').findOne({'user_id':req.body.user_id ,'password':''},function(err,result){

        if(err){
            console.log('error register findOne!!');
            res.send('An unexpected error occured. Try to register again!!!');
        }

        if(!result){

            console.log('User already registered (OR) the USER ID entered is wrong.!!');
            res.send("User already registered (OR) the USER ID entered is wrong!!!");      
        }
        else{
        
            console.log('New user applyed for registration.');

            if(req.body.password == req.body.c_password){

                console.log('Password and Confirm password Match.');

                var user_to_be_found={'user_id':req.body.user_id, 'fname':req.body.fname, 'mname':req.body.mname, 'lname':req.body.lname, 'gender':req.body.gender, 'city':req.body.city, 'dob':req.body.dob, 'pin_code':req.body.pin_code, 'email':req.body.email, 'phone':req.body.phone, 'branch_id':req.body.branch_id};
                    
                var new_value_for_user={'user_id':req.body.user_id, 'password':req.body.password, 'fname':req.body.fname, 'mname':req.body.mname, 'lname':req.body.lname, 'gender':req.body.gender, 'city':req.body.city, 'dob':req.body.dob, 'pin_code':req.body.pin_code, 'email':req.body.email, 'phone':req.body.phone, 'branch_id':req.body.branch_id};

                db.collection('user').updateOne(user_to_be_found,new_value_for_user,function(err,dz){

                    if(err){
                        console.log('error register updateOne!!');
                        res.send('An unexpected error occured. Try to register again!!!');
                    }	
                        
                    console.log('User successfully registered.');
                    res.send('You have been successfully registered.');

                });
            }
        }
    });
});

app.post('/userlogin', function(req,res){
    
    var post=req.body;
    console.log(post);

    db.collection('user').findOne({'user_id':req.body.user_id},function(err,result){

        if(err){
            console.log('error login findOne userId!!');
            res.send('An unexpected error occured. Try to register again!!!');
        }

        if(result){

            console.log('Old user trying to login.');

            var old_user={'user_id':post.user_id, 'password':post.password};
            db.collection('user').findOne(old_user,function(err,success){
                if(err){
                    console.log('error login findOne password validation!!');
                    res.send('An unexpected error occured. Try to login again!!!');
                }	
                if(success){
                    req.session.user_id = post.user_id;
                    console.log(req.session.user_id);
                    console.log('User logged in successfully.');
                    res.sendFile(__dirname + '/wthtml/logintemplate.html');
                }
                else{
                    console.log("Wrong password entered!!");
                    res.send('Wrong Password Entered');

                }

            });
        }
        else{
            console.log('User does not exists!!');
            res.send("User does not exists OR You entered a wrong userID !!");
        }
        
    });
});

app.get('/logout', function(req,res){
    req.session.destroy();
    res.redirect('/wthtml/LogIn.html');
});





    

app.get('/userdetails', auth, function(req,res){
    console.log(req.session);
        db.collection('user').findOne({'user_id':req.session.user_id},function(err,result){
            if(err){
                console.log('error login findOne userId!!');
            }
            console.log(result);
            res.send(result);   
        }
    );
});

app.get('/accountdetails',function(req,res){
    console.log(req.session);
        db.collection('account').findOne({'user_id':req.session.user_id},function(err,result){
            if(err){
                console.log('error login findOne userId!!');
            }
            console.log(result);
            res.send(result);   
        }
    );
});

app.post('/makepayment',function(req,res){

    console.log(req.session);
    console.log(req.body);
    var date=new Date();

    db.collection('account').findOne({'acc_no':req.body.to_account},function(err,validtoacc){

        if(err){
            console.log('error to_acc findOne!!');
            res.send('An unexpected error occured. Try to do transaction again!!!');
        }
        if(!validtoacc){
            console.log('No such account exists.');
            res.send("No such account with entered account number exists.");
        }
        else{
            db.collection('account').findOne({'user_id':req.session.user_id},function(err,validfromacc){
                if(err){
                    console.log('error register findOne!!');
                    res.send('An unexpected error occured. Try to register again!!!');
                }
                if(!validfromacc){
                    console.log('No such account exists.');
                    res.send("You are currently logged out. Please loging again to transfer money.");
                }
                else if(validtoacc.acc_no==validfromacc.acc_no){
                    console.log("Can't transfer money to self.");
                    res.send("You can't transfer money to same account. Please choose different account to transfer money.");
                }
                else{
                    if(parseFloat(validfromacc.balance)>=parseFloat(req.body.amount)){
                        var newbalance11=parseFloat(validtoacc.balance);
                        var newbalance12=newbalance11+parseFloat(req.body.amount);
                        var old_toacc={'acc_no':req.body.to_account};
                        var new_toacc={'user_id':validtoacc.user_id,'acc_no':req.body.to_account,'sdate':validtoacc.sdate,'balance':newbalance12,'Account_type':validtoacc.Account_type,'interestrate':validtoacc.interestrate};
                        db.collection('account').updateOne(old_toacc,new_toacc,function(err,updatedone){
                            if(err){
                                console.log('Error transaction updateOne!!');
                                res.send('An unexpected error occured. Try to do transaction again!!!');
                            }
                            console.log('Successfully Updated to_account balance.');
                        });
                        var newbalance21=parseFloat(validfromacc.balance);
                        var newbalance22=newbalance21-parseFloat(req.body.amount);
                        var old_fromacc={'acc_no':validfromacc.acc_no};
                        var new_fromacc={'user_id':req.session.user_id,'acc_no':validfromacc.acc_no,'sdate':validfromacc.sdate,'balance':newbalance22,'Account_type':validfromacc.Account_type,'interestrate':validfromacc.interestrate};
                        db.collection('account').updateOne(old_fromacc,new_fromacc,function(err,updatedone){
                            if(err){
                                console.log('Error transaction updateOne!!');
                                res.send('An unexpected error occured. Try to do transaction again!!!');
                            }
                            console.log('Successfully Updated to_account balance.');
                        });
                        var tid1=req.body.to_account.toString()+date.getTime().toString();
                        var toacc_transdetail={'t_id':tid1,'to_acc':req.body.to_account,'from_acc':validfromacc.acc_no,'t_date':date.toLocaleDateString(),'t_amt':req.body.amount,'to_acc_balance':newbalance12,'from_acc_balance':newbalance22};
                        db.collection('transaction').save(toacc_transdetail,function(err,updatedone){
                            if(err){
                                console.log('Error transaction updateOne!!');
                                res.send('An unexpected error occured. Try to do transaction again!!!');
                            }
                            console.log('Successfully Updated to_account transaction history.');
                            res.send('Transaction successfull and updated to your transaction history.');
                        });
                    }
                    else{
                        console.log("Insufficient balance.");
                        res.send("!!!!!!INSUFFICIENT BALANCE!!!!!!");
                    }
                }
            });
        }
    });
});

app.get('/transfromhistorydetails',function(req,res){

    console.log(req.session);
    console.log(req.body);
    db.collection('account').findOne({'user_id':req.session.user_id},function(err,result){

        if(err){
            console.log('error register findOne!!');
            res.send('An unexpected error occured. Try to register again!!!');
        }

        if(result){

            console.log('Request for transaction history arrived.');
            console.log(result);
            var query={from_acc: result.acc_no};
            db.collection('transaction').find(query).toArray(function(err,fromhistory){
                if(err){
                    console.log('error transaction history!!');
                }
                res.send(fromhistory);
            });
        }
    });
});

app.get('/transtohistorydetails',function(req,res){

    console.log(req.session);
    console.log(req.body);

    db.collection('account').findOne({'user_id':req.session.user_id},function(err,result){

        if(err){
            console.log('error register findOne!!');
            res.send('An unexpected error occured. Try to register again!!!');
        }

        if(result){

            console.log('Request for transaction history arrived.');
            var query={'to_acc':result.acc_no};
            db.collection('transaction').find(query).toArray(function(err,tohistory){
                if(err){
                    console.log('error transaction history!!');
                }
                res.send(tohistory);
            });
        }
    });
});

app.post('/changepassword',function(req,res){

    console.log(req.session);
    console.log(req.body);

    db.collection('user').findOne({'user_id':req.session.user_id ,'password':req.body.old_password},function(err,result){

        if(err){
            console.log('error register findOne!!');
            res.send('An unexpected error occured. Try to register again!!!');
        }

        if(result){

            console.log('Request for change password arrived.');

            db.collection('user').findOne({'user_id':req.session.user_id},function(err,result){
            if(err){
                console.log('error login findOne userId!!');
            }
            var new_value_for_user={'user_id':result.user_id, 'password':req.body.new_password, 'fname':result.fname, 'mname':result.mname, 'lname':result.lname, 'gender':result.gender, 'city':result.city, 'dob':result.dob, 'pin_code':result.pin_code, 'email':result.email, 'phone':result.phone, 'branch_id':result.branch_id};
            var old_value_for_user={'user_id':req.session.user_id};
            db.collection('user').updateOne(old_value_for_user,new_value_for_user,function(err,dz){
                if(err){
                    console.log('Error change password updateOne!!');
                    res.send('An unexpected error occured. Try to change password again!!!');
                }
                console.log('User successfully changed his/her password.');
                res.send('You have successfully changed your password.');
            });
            });
        }
    });
});
