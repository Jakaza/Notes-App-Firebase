// db.collection('notes').get().then((data)=>{
//     data.forEach(note => {
//         displayNotes(note);
//     });
// })

let template = "";

//Real Time Changes (Listener)
db.collection('notes').onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(note =>{
        template = "";
        displayNotes(note);
    })
})

const noteElContainer = document.querySelector(".inner-display-main-container");

function displayNotes(noteDoc){
    const note = noteDoc.doc;
    console.log(note.data());

        template = `
        <div class="card-container" id="${note.id}">
        <div class="card-body-con">
          <h5>${note.data().title}</h5>
          <p class="card-text">${slicePara(note.data(), note)}</p>
          <h6 class="card-subtitle mb-2 text-muted">Time : ${note.data().time}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Date : ${note.data().date}</h6>
          <div class="div-buttons-container" style="display: flex; justify-content: space-between; width: 100%;">
            <div class="links">
                <button class="button-15" style="width: fit-content; padding: 3px 10px;">
                    <a href="form.html?id=${note.id}" class="card-link">Edit</a>
                </button>
                
                <button  id="${note.id}" class="button-16 delete" style="width: fit-content; padding: 3px 10px;">
                    Delate
                </button>
               
            </div>
            <div class="likes-container">
                <button class="like">
                    <i id="${note.id}" class="fa fa-thumbs-up" aria-hidden="true"></i>
                    <br><span id="${note.id}" >${note.data().likes}</span>
                </button>
                <button class="share">
                    <i id="${note.id}" class="fa fa-share"  aria-hidden="true"></i>
                    <br> <span data-id="${note.id}">${note.data().shares}</span>
                </button>
            </div>
          </div>
        </div>
      </div>
        `
        noteElContainer.insertAdjacentHTML('beforeend', template);

        var deleteButtons = document.querySelectorAll('.delete');
        var likeButtons = document.querySelectorAll('.like');
        var shareButtons = document.querySelectorAll('.share');

        deleteButtons.forEach(deleteButton =>{
            deleteButton.addEventListener('click',function(el){
                let currId = el.target;
                const container = currId.parentElement.parentElement.parentElement.parentElement;

                if(container.id == currId.id)
                    container.remove();

                deteleNote(currId.id)
            })
        })

        likeButtons.forEach(likeButton =>{
            likeButton.addEventListener('click',function(el){
                console.log(el.target.id);
                updateLikes(el.target.id);
            })
        })

        shareButtons.forEach(shareButton =>{
            shareButton.addEventListener('click',function(el){
                console.log(el.target);
            })
        })
}

function deteleNote(buttonID){
    db.collection("notes").doc(buttonID).delete()
    .then(() => {
        console.log("Document successfully deleted!");
    })
    .catch((error) => {
        console.error("Error removing document: ", error);
    });
}

let likes = 0;
let shares = 0;

function updateLikes(buttonID){
        db.collection('notes').doc(buttonID).get().then((data)=>{
            likes = data.data().likes;
        })
        .then(()=> {
            db.collection("notes").doc(buttonID).update({'likes' : 1 + likes})
            .then(()=>{
                console.log("successfully updated");
            })
        });
}

function slicePara(len, noteDoc){
    if(len.body.length  > 200){
        return len.body.slice(0, 200)+`... <a style=" text-decoration: none;" href="details.html?id=${noteDoc.id}">Read More</a>`
    }else{
        return len.body;
    }
}