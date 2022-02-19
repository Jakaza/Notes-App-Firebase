//Read data 
import { displayNotes} from "./modula.js";

db.collection('notes').get().then((data)=>{
    data.forEach(note => {
        displayNotes(note);
    });
})