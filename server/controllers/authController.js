const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const firebase = require("firebase/app");
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAXhsqjmEbJ4GGDFMjrnyhcPTEAD5WCSIo",
  authDomain: "microgoogol-c289a.firebaseapp.com",
  projectId: "microgoogol-c289a",
  storageBucket: "microgoogol-c289a.appspot.com",
  messagingSenderId: "329114844875",
  appId: "1:329114844875:web:21c29b604b3c54fa2fa54e"
};

app = firebase.initializeApp(firebaseConfig);

exports.app=app;

exports.signup = (req,res,next)=>{
    
    const email = req.body.email;
    const emailR = req.body.emailR;
    const password = req.body.password;
    const passwordR = req.body.passwordR;

    // email checking
    if(email!=emailR){
        res.json(`Emails don't match`)
        return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        res.json(`Not a valid email address`);
        return;
    }

    // password checking
    if(password!=passwordR){
        res.json(`Passwords don't match`);
        return;
    }
    if(password.length<8){
        res.json(`Password length must be greater than 7`);
        return;
    }

    // firebase authentication
    const localAuth = getAuth(app);
    (function createUser(){
        createUserWithEmailAndPassword(localAuth, email, password)
    .then(async(userCredential) => {
        if(userCredential.user){
            const db = getFirestore(app);
            const docRefTimeData = doc(db, "users", `${userCredential.user.uid}`,'loginData','timesWhenLoggedin');
            const mainUserDocRef = doc(db, "users", `${userCredential.user.uid}`);

            const date = new Date();
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const day = ("0" + date.getDate()).slice(-2);

            console.log(userCredential.user)
            await setDoc(mainUserDocRef,{
                SignupTime: `${year}-${month}-${day}`
            })
            await setDoc(docRefTimeData, {
                timesLoggedIn: [`${year}-${month}-${day}`],
            },{merge: true});

            res.json({UID: userCredential.user.uid});
        }
    })
    .catch((error) => {
        console.log(error.code)
        if(error.code=='auth/invalid-email'){
            res.json(`Not a valid email address`)
            return;
        }
        if(error.code=='auth/email-already-in-use'){
            res.json(`Email is already in use`);
            return;
        }
    });
        
})()
}

exports.login = (req,res,next)=>{
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