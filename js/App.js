/* when add note is clicked add note to localstorage */

showNotes();

let addBtn = document.getElementById('addBtn').addEventListener('click', function (e) {
   
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');

    //object is created which consist of title and notes text
    let addNote = {
        title: addTitle.value,
        note: addTxt.value
    };

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addNote);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";
    showNotes();
});

/*FUNCTION TO show notes FROM LOCAL STORAGE */
function showNotes() {
    let notes = localStorage.getItem('notes');

    if (notes == null && title==null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    html = "";
    notesObj.forEach((element, index) => {
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element['title']}</h5>
            <p class="card-text">${element['note']}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>
        `
    });


    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `No Notes are added please add on in "Add a Note"`
    }
}

//FUNCTION TO DELETE A NOTE
function deleteNote(index) {

    let notes = localStorage.getItem('notes');
    notesObj = JSON.parse(notes);
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}


//searh notes
let search = document.getElementById('searchTxt');
search.addEventListener('input', function (element) {
    let inputVal = search.value.toLowerCase();
    // console.log('Input event is fired', inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(element => {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        let cardTitle = element.getElementsByTagName('h5')[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)||cardTitle.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    })
})


/* 
1. Add Title
2. Mark a note as important
3. Seperates notes by user
4. Sync and host to web server
*/