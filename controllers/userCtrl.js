import User from '../models/userModel.js';
import jwt from "jwt-simple";
import keys from '../configs/keys.js'

var functions = {
    signUp: function (req, res){

        if((!req.body.email) || (!req.body.password)){
            res.json({success: false, msg: 'Enter all fields'})
        }

        User.findOne({
            email: req.body.email, 
        }, function(err, user){
            if(err) throw err;
            if(!user){
                // email is available
                var newUser = User({
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    isAdmin: req.body.isAdmin,
                    isTeacher: req.body.isTeacher
                });
                newUser.save(function(err,newUser){
                    if(err){
                        res.json({success: false, msg : err})
                    }
                    else{
                        res.json({success: true, msg: 'Saved user!'})
                    }
                })
            }
            else{
                res.json({success: false, msg: 'Account with this email already exists'});
            }
        })

    },

    signIn: function (req, res){
        if((!req.body.email) || (!req.body.password)){
            res.json({success: false, msg: 'Enter all fields'})
        }
        else{
            User.findOne({
                email: req.body.email, 
            }, function(err, user){
                if(err) throw err // !FIXME: Add error handling
                if (!user) {
                    res.status(403).send({success: false, msg: 'No such user in database'})
                }
                else{
                    user.matchPassword(req.body.password, function(err, isMatch){
                        if(isMatch && !err){
                            var token = jwt.encode(user, keys.secret)
                            res.json({success: true, token: token})
                        }
                        else{
                            return res.status(403).send({success: false, msg: 'Wrong password'})
                        }
                    })
                }
            })
        }
    },

    // !FIXME: add a check that only an authenticated user with admin priveledges can delete a user.
    deleteUser: function (req, res){
        User.findOneAndDelete({
            email: req.body.email
        }, function(err, user){
            if(err) throw err;
            if(!user){
                return res.status(403).send({success: false, msg: 'Can not delete what does not exist'})
            }
            else{
                return res.json({success: true, msg: 'User ' + user.name + ' deleted successfully'})
            }
        }
        )
    },

    getinfo: function (req, res) {
        if (req.headers.authorization) {
            var token = req.headers.authorization.split(' ')[0]
            var decodedtoken = jwt.decode(token, keys.secret)
            return res.json({success: true, msg: 'Hello ' + decodedtoken.name})
        }
        else {
            return res.json({success: false, msg: 'No Headers'})
        }
    }
}

export default functions;