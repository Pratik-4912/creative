document.addEventListener("DOMContentLoaded", () => {
    const noteTitle = document.getElementById("note-title");
    const noteContent = document.getElementById("note-content");
    const noteCategory = document.getElementById("note-category");
    const addNoteButton = document.getElementById("add-note");
    const notesList = document.getElementById("notes-list");
    const searchBar = document.getElementById("search-bar");

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    function displayNotes() {
        notesList.innerHTML = "";
        notes.forEach((note, index) => {
            const noteDiv = document.createElement("div");
            noteDiv.classList.add("note", note.category);
            noteDiv.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button class="delete-btn" data-index="${index}">X</button>
            `;
            notesList.appendChild(noteDiv);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                notes.splice(index, 1);
                saveNotes();
                displayNotes();
            });
        });
    }

    function saveNotes() {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    addNoteButton.addEventListener("click", () => {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        const category = noteCategory.value;

        if (title && content) {
            notes.push({ title, content, category });
            saveNotes();
            displayNotes();
            noteTitle.value = "";
            noteContent.value = "";
        }
    });

    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value.toLowerCase();
        document.querySelectorAll(".note").forEach(note => {
            const title = note.querySelector("h3").textContent.toLowerCase();
            const content = note.querySelector("p").textContent.toLowerCase();
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                note.style.display = "block";
            } else {
                note.style.display = "none";
            }
        });
    });

    displayNotes();
});