export default function firebaseData(userCredentials){
    if(userCredentials.user){
        return userCredentials.user.uid;
    } else {
        return userCredentials.uid;
    }
}