//Read data 
import { displayNotes} from "./modula.js";

db.collection('notes').get().then((data)=>{
    data.forEach(note => {
        displayNotes(note);
    });
})


//Real Time Changes (Listener)

// db.collection('notes').onSnapshot(snapshot=>{
//     const changes = snapshot.docChanges();
//     changes.forEach(note =>{
//         displayNotes(note.doc);
//     })
// })


//Delete note
var deleteButton = document.querySelectorAll('.delete');


console.log(deleteButton);

// const buttonIDdelete = deleteNote(deleteButton);


function deleteNote(buttons){

    let buttonID = "";
    
    buttons.forEach(button => {

        button.addEventListener('click', function(el){

            buttonID  = el.target.id;
        })
        
    });

    return buttonID;
}
