import { DOM_LAST_SAVED, TAG_LAST_SAVED, UserMessages } from "../lang/messages/en/user.js";
import noteRepo from "./note-repository.js";
import { Note } from "./note.js";
import { Utils } from "./utils.js";

/**
 * Class responsible for handling the graphical and logical part of the 
 * container that stores and displays notes.
 * Connects to the NoteRepository to save, load and update notes.
 * 
 * ! DISCLAIMER: Chat GPT was used to give tips on the integration between
 * !             NotesRepository and NoteContainer
 */
export class NoteContainer {

    static NOTE_CONTAINER_HTML = "div";
    static NOTE_CONTAINER_CLASS_CSS = "note_container";

    constructor(isWriter, parent) {
        this.noteRepo = this.initRepo();
        this.noteContainer = this.initContainer();
        this.lastSaved = document.getElementById(DOM_LAST_SAVED);
        this.lastSaved.textContent = UserMessages[DOM_LAST_SAVED]
            .replace(TAG_LAST_SAVED, this.noteRepo.lastSaved);
        this.isWriter = isWriter;
        this.parent = null;

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

    /**
     * Displays the content given in the array of json objects.
     * Objects should contain necessary information to create a displayable
     * Note using Note.fromJSON().
     * 
     * @param {Array[object]} notesJson 
     */
    displayNotes(notesJson) {
        this.noteContainer.innerHTML = Utils.EMPTY_HTML;
        this.lastSaved.textContent = UserMessages[DOM_LAST_SAVED]
            .replace(TAG_LAST_SAVED, this.noteRepo.lastSaved);
        notesJson.forEach(json => {
            const note = Note.fromJSON(json, this.noteContainer);
            this.initNewNote(note);
            note.setParent(this.noteContainer);
        });
    }

}