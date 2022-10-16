const app = require('../firebase');
const firebaseAuth = require('firebase/auth');
// import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

exports.signup = (req,res,next)=>{

}

exports.login = (req,res,next)=>{

        console.log(req.body)
        const email = req.body.email;
        const password = req.body.password;

        if(email==''){
            res.json(`Email can't be empty`);
            return;
        }
        if(password==''){
            res.json(`Password can't be empty`);
            return;
        }
        const localAuth = firebaseAuth.getAuth(app);
        (function loginUser(){
            firebaseAuth.signInWithEmailAndPassword(localAuth, email, password)
           .then((userCredential) => {
            res.json(userCredential);
           })
           .catch((error) => {
            console.log(error.code)
            if(error.code=='auth/user-not-found'){
                res.json(`User not found`);
                return;
            } else if(error.code=='auth/wrong-password'){
                res.json('Wrong password');
                return;
            } else if(error.code=='auth/network-request-failed'){
                res.json('Network request failed. Please try again later');
                return;
            } else{
                res.json('Unrecognized error message. Check the email format');
                return;
            }
           });
       })()
};