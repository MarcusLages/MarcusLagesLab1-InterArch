import noteRepo from "./note-repository.js";
import { Note } from "./note.js";
import { Utils } from "./utils.js";

export class NoteContainer {

    static NOTE_CONTAINER_HTML = "div";
    static NOTE_CONTAINER_CLASS_CSS = "note_container";

    constructor(parent) {
        this.noteRepo = this.initRepo();
        this.noteContainer = this.initContainer();
        this.parent = null;

        if(parent) {
            this.setParent(parent);
        }
    }

    initRepo() {
        const repo = noteRepo;
        // TODO: Switch to display notes fun
        repo.subscribe(this);
        
        // Certify unsubscription when page is unloaded
        window.addEventListener(Utils.ON_UNLOAD_EVENT, () => {
            // TODO: Switch to display notes fun
            this.noteRepo.unsubscribe(this);
        });

        return repo;
    }

    initContainer() {
        const noteContainer = document.createElement(NoteContainer.NOTE_CONTAINER_HTML);
        noteContainer.className = NoteContainer.NOTE_CONTAINER_CLASS_CSS;
        return noteContainer;
    }

    // Used to assure composition, instead of association
    setParent(parent) {
        this.parent = parent;
        this.parent.appendChild(this.noteContainer);
    }

    createNote() {
        const note = new Note(this.noteContainer, false);
        note.addOnChange(() => this.noteRepo.update());
        note.addOnDelete(() => this.noteRepo.delete(note));
        this.noteRepo.add(note);
    }

    displayNotes(notes) {
        this.noteContainer.innerHTML = Utils.EMPTY_HTML;
        notes.forEach(note => {
            note.setParent(this.noteContainer);
        });
    }
}