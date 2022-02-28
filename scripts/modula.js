
export function fetchOldData(searchID){
    db.collection('notes').doc(searchID).get().then((data)=>{
        const res = data.data();
        titleEl.value = res.title;
        bodyEl.value = res.body;
    })
    .catch((err)=>{
        console.log('Data not found');
    })
}

export function addNote(){
    if(titleEl && bodyEl){
            db.collection("notes").add({
                title : titleEl.value,
                body : bodyEl.value,
                date : createDate(),
                time : createTime(),
                likes: 0,
                shares: 0
            })
            .then((docRef) => {
                console.log(docRef);
                window.location.assign('/index.html')
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
    }


export function upDateNotes(searchID){
    db.collection("notes").doc(searchID).update(
        {
            title : titleEl.value,
            body : bodyEl.value,
            date : createDate(),
            time : createTime(),
            likes: 0,
            shares: 0
        })
    .then((docRef)=>{
        console.log(docRef);
        window.location.assign('/index.html')
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}


const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function createDate(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    
    let createdDate = `${day}-${mL[month]}-${year}`;
    return createdDate;
}

function createTime(){
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    
    if(hour < 10)
    hour = `0${hour}`;

    if(min < 10)
    min = `0${min}`;
    let createdTime = `${hour}:${min}`;
    return createdTime;
}

const noteElContainer = document.querySelector(".inner-display-main-container");
let template = "";

export function displayNotes(noteDoc){
    let note = noteDoc.data();

    console.log(noteDoc);
    // noteDoc.forEach(element => {
        
    // });
        template += `
        <div class="card-container">
        <div class="card-body-con">
          <h5>${note.title}</h5>
          <p class="card-text">${slicePara(note ,noteDoc)} </p>
          <h6 class="card-subtitle mb-2 text-muted">Time : ${note.time}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Date : ${note.date}</h6>
          <div class="div-buttons-container" style="display: flex; justify-content: space-between; width: 100%;">
            <div class="links">
                <button class="button-15" style="width: fit-content; padding: 3px 10px;">
                    <a href="form.html?id=${noteDoc.id}" class="card-link">Edit</a>
                </button>
                
                <button  id="${noteDoc.id}" class="button-16 delete" style="width: fit-content; padding: 3px 10px;">
                    Delate
                </button>
               
            </div>
            <div class="likes-container">
                <button class="like">
                    <i id="${noteDoc.id}" class="fa fa-thumbs-up" aria-hidden="true"></i>
                    <br><span id="${noteDoc.id}" >${note.likes}</span>
                </button>
                <button class="share">
                    <i id="${noteDoc.id}" class="fa fa-share"  aria-hidden="true"></i>
                    <br> <span data-id="${noteDoc.id}">${note.shares}</span>
                </button>
            </div>
          </div>
        </div>
      </div>
        `
        noteElContainer.innerHTML = template;
        var editButton = document.querySelectorAll('.edit');
        var deleteButton = document.querySelectorAll('.delete');
        var likeButton = document.querySelectorAll('.like');
        var shareButton = document.querySelectorAll('.share');

        deleteNote(deleteButton);
        updateLikes(likeButton)
        updateShares(shareButton)
}

function deleteNote(buttons){
    buttons.forEach(button => {
        button.addEventListener('click', function(el){
                const buttonID  = el.target.id;

            db.collection("notes").doc(buttonID).delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
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


let likes = 0;
let shares = 0;

function updateLikes(buttons){

    buttons.forEach(button => {
        button.addEventListener('click', function(el){

        const buttonID = el.target.id;
        console.log(buttonID);

        db.collection('notes').doc(buttonID).get().then((data)=>{
            likes = data.data().likes;
        })
        .then(()=> {

            db.collection("notes").doc(buttonID).update({'likes' : 1 + likes})
            .then(()=>{
                console.log("successfully updated");
            })
        });
     })
    });
}


function updateShares(buttons){

    buttons.forEach(button => {
        button.addEventListener('click', function(el){

        const buttonID = el.target.id;
        console.log(buttonID);

        db.collection('notes').doc(buttonID).get().then((data)=>{
            shares = data.data().shares;
        })
        .then(()=> {

            db.collection("notes").doc(buttonID).update({'shares' : 1 + shares})
            .then(()=>{
                console.log("successfully updated");
            })
        });
     })
    });
}
