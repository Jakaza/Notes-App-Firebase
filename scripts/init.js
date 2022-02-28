firebase.initializeApp({
    apiKey: "AIzaSyAh_0bGyR7L8JqNToToHZJ21FoT-dGJuI0",
    authDomain: "notes-app-d97d5.firebaseapp.com",
    projectId: "notes-app-d97d5",
    storageBucket: "notes-app-d97d5.appspot.com",
    messagingSenderId: "205523281078",
    appId: "1:205523281078:web:1102587e0bc664ad94b217"
});
let db = firebase.firestore();

let titleEl = document.getElementById("title");
let bodyEl = document.getElementById("body");
