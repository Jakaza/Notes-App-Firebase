
export function addNote(){
    let titleEl = document.getElementById("title").value;
    let bodyEl = document.getElementById("body").value;

    if(titleEl && bodyEl){
        if(titleEl.length < 25 ){
            db.collection("notes").add({
                title : titleEl,
                body : bodyEl,
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
        else{
            console.log("lenght of the title must be less than 25");
        }
    }
    else{

    }
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
          <p class="card-text">${note.body.slice(0,300)}... <a style=" text-decoration: none;"  href="href="/form.html?id=${noteDoc.id}">Read More</a></p>
          <h6 class="card-subtitle mb-2 text-muted">Time : ${note.time}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Date : ${note.date}</h6>
          <div class="div-buttons-container" style="display: flex; justify-content: space-between; width: 100%;">
            <div class="links">
                <button class="button-15" style="width: fit-content; padding: 3px 10px;">
                    <a href="href="/form.html?id=${noteDoc.id}" class="card-link">Edit</a>
                </button>
                
                <button data-id="${noteDoc.id}" class="button-16" style="width: fit-content; padding: 3px 10px;">
                    Delate
                </button>
               
            </div>
            <div class="likes-container">
                <button>
                    <i data-id="${noteDoc.id}" class="fa fa-thumbs-up" aria-hidden="true"></i>
                    <br><span data-id="${noteDoc.id}" >${note.likes}</span>
                </button>
                <button>
                    <i data-id="${noteDoc.id}" class="fa fa-share"  aria-hidden="true"></i>
                    <br> <span data-id="${noteDoc.id}">${note.shares}</span>
                </button>
            </div>
          </div>
        </div>
      </div>
        `
        noteElContainer.innerHTML = template;
}