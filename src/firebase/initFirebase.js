import firebase from "firebase";
 
const config = {
    apiKey: "AIzaSyB3XebFpHH4tg5ckGLv1qyEaSktXy7COw8",
    authDomain: "applearnrussian.firebaseapp.com",
    databaseURL: "https://applearnrussian.firebaseio.com",
    projectId: "applearnrussian",
    storageBucket: "applearnrussian.appspot.com",
    messagingSenderId: "274851687562",
    appId: "1:274851687562:web:dfd54fa0d3df01dd575173"  
};
firebase.initializeApp(config);
export default firebase;