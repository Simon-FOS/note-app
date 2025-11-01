// --------------------------------------
// NOTE-APP FUNCTIONALITY SCRIPT
// --------------------------------------

// Select essential elements from the HTML
const createButton = document.querySelector(".container button");
const notesContainer = document.querySelector(".notes-container");

// Load existing notes from Local Storage when the page loads
// If notes exist, display them inside the container
window.addEventListener("DOMContentLoaded", () => {
    showNotes();
});

// --------------------------------------
// FUNCTION: Create a new note
// --------------------------------------
createButton.addEventListener("click", () => {
    // Create a new paragraph (each note is a paragraph)
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    // Add classes and attributes
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true"); // Allows editing text
    img.src = "/static/images/delet.png"; // Delete icon
    img.alt = "delete-icon";

    // Append delete icon inside the note
    inputBox.appendChild(img);

    // Add the new note to the container
    notesContainer.appendChild(inputBox);

    // Save the updated notes list to Local Storage
    saveNotes();
});

// --------------------------------------
// FUNCTION: Save notes to Local Storage
// --------------------------------------
function saveNotes() {
    const notes = document.querySelectorAll(".input-box");
    const data = [];

    // Loop through all note boxes and save their text content
    notes.forEach(note => {
        data.push(note.innerText); // Get text only, excluding HTML tags
    });

    // Store the notes array as a string in Local Storage
    localStorage.setItem("notes", JSON.stringify(data));
}

// --------------------------------------
// FUNCTION: Display saved notes when page loads
// --------------------------------------
function showNotes() {
    // Get notes from Local Storage
    const storedNotes = JSON.parse(localStorage.getItem("notes"));

    // If there are saved notes, display them
    if (storedNotes) {
        storedNotes.forEach(noteText => {
            let inputBox = document.createElement("p");
            let img = document.createElement("img");

            inputBox.className = "input-box";
            inputBox.setAttribute("contenteditable", "true");
            inputBox.innerText = noteText;

            img.src = "/static/images/delet.png";
            img.alt = "delete-icon";

            // Append delete icon
            inputBox.appendChild(img);
            notesContainer.appendChild(inputBox);
        });
    }
}

// --------------------------------------
// EVENT DELEGATION: Handle delete and save
// --------------------------------------

// Listen for click events on the whole document
// This helps handle both existing and dynamically created notes
notesContainer.addEventListener("click", (event) => {
    // If the clicked element is the delete icon
    if (event.target.tagName === "IMG") {
        // Remove its parent note box
        event.target.parentElement.remove();
        saveNotes(); // Update Local Storage
    }
});

// Listen for keyup events to auto-save while typing
notesContainer.addEventListener("keyup", (event) => {
    saveNotes();
});
