import { DOM_LAST_SAVED, TAG_LAST_SAVED, UserMessages } from "../lang/messages/en/user.js";
import noteRepo from "./note-repository.js";
import { Note } from "./note.js";
import { Utils } from "./utils.js";

export class NoteContainer {

    static NOTE_CONTAINER_HTML = "div";
    static NOTE_CONTAINER_CLASS_CSS = "note_container";

    constructor(isWriter, parent) {
        this.noteRepo = this.initRepo();
        this.noteContainer = this.initContainer();
        this.lastSaved = document.getElementById(DOM_LAST_SAVED);
        this.lastSaved.textContent = UserMessages[DOM_LAST_SAVED]
            .replace(TAG_LAST_SAVED, this.noteRepo.lastSaved);
        this.parent = null;
        this.isWriter = isWriter;

        if(parent) {
            this.setParent(parent);
        }
        this.noteRepo.notify();
    }

    initRepo() {
        const repo = noteRepo;
        repo.subscribe(this);
        
        // Certify unsubscription when page is unloaded
        window.addEventListener(Utils.ON_UNLOAD_EVENT, () => {
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

    initNewNote(note) {
        note.addOnChange(() => this.noteRepo.update(note));
        note.addOnDelete(() => this.noteRepo.delete(note));
        if(this.isWriter) note.enable();
        else note.disable();
    }

    createNote() {
        const note = new Note(this.noteContainer);
        this.initNewNote(note);   
        this.noteRepo.add(note);
    }

    displayNotes(notes) {
        this.noteContainer.innerHTML = Utils.EMPTY_HTML;
        this.lastSaved.textContent = UserMessages[DOM_LAST_SAVED]
            .replace(TAG_LAST_SAVED, this.noteRepo.lastSaved);
        notes.forEach(json => {
            const note = Note.fromJSON(json, this.noteContainer);
            this.initNewNote(note);
            note.setParent(this.noteContainer);
        });
    }

}