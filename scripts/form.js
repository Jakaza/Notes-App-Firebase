import {addNote} from "./modula.js";
import {upDateNotes} from "./modula.js";
import {fetchOldData} from "./modula.js";

const formEl = document.getElementById("stripe-login");
const updateFormEl = document.getElementById("stripe-login");

let params = new URLSearchParams(document.location.search).get('id')
const searchID =  params;

if(searchID){
    fetchOldData(searchID)
}


formEl.addEventListener('submit', function(el){
    el.preventDefault();

    if(searchID){   

        upDateNotes(searchID); 

    }else{

        // alert("call add new note function")
        addNote();
        formEl.reset();
    }
})
