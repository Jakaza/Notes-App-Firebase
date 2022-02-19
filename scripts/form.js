import {addNote} from "./modula.js";

const formEl = document.getElementById("stripe-login");

formEl.addEventListener('submit', function(el){
    el.preventDefault();
    addNote();
    formEl.reset();
})