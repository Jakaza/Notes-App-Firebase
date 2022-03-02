let params = new URLSearchParams(document.location.search).get('id')
const searchID =  params;

if(searchID)
    fetchOldData(searchID)

const formEl = document.getElementById("stripe-login");
const updateFormEl = document.getElementById("stripe-login");

formEl.addEventListener('submit', function(el){
    el.preventDefault();

    if(searchID)
        upDateNotes(searchID); 
    else
        addNote();

    formEl.reset();
})

let titleEl = document.getElementById("title");
let bodyEl = document.getElementById("body");

function addNote(){
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

function upDateNotes(searchID){
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

function fetchOldData(searchID){
    db.collection('notes').doc(searchID).get().then((data)=>{
        const res = data.data();
        titleEl.value = res.title;
        bodyEl.value = res.body;
    })
    .catch((err)=>{
        console.log('Data not found');
    })
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