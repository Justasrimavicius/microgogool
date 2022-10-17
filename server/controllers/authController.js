const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyAXhsqjmEbJ4GGDFMjrnyhcPTEAD5WCSIo",
  authDomain: "microgoogol-c289a.firebaseapp.com",
  projectId: "microgoogol-c289a",
  storageBucket: "microgoogol-c289a.appspot.com",
  messagingSenderId: "329114844875",
  appId: "1:329114844875:web:21c29b604b3c54fa2fa54e"
};

app = firebase.initializeApp(firebaseConfig)


exports.signup = (req,res,next)=>{

}

exports.login = (req,res,next)=>{
        console.log(req.body)
        const email = req.body.email;
        const password = req.body.password;
        console.log(email);
        console.log(password);

        if(email==''){
            res.json(`Email can't be empty`);
            return;
        }
        if(password==''){
            res.json(`Password can't be empty`);
            return;
        }
        if(password.length<6){
            res.json(`Password is too short. Minimum 6 characters`);
            return;
        }
        const localAuth = getAuth(app);
        (function loginUser(){
            signInWithEmailAndPassword(localAuth, email, password)
           .then((userCredential) => {
            res.json({UID: userCredential.user.uid});
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