import { Utils } from "./utils.js";

/**
 * Class that stores all the Notes' data. Used to add, delete and update
 * notes, as well as inform all the subscribed pages and containers to update
 * their displayable notes. Also stores data about when the notes' data was
 * last saved.
 * 
 * ! Use it as a Singleton
 */
class NotesRepository {

    static LS_NOTES_KEY = "notes";
    static LS_LAST_SAVED_KEY = "lastSave";
    static NOT_FOUND = -1;

    constructor() {
        this.notes = JSON.parse(localStorage.getItem(NotesRepository.LS_NOTES_KEY) || "[]");
        this.lastSaved = JSON.parse(localStorage.getItem(NotesRepository.LS_LAST_SAVED_KEY));
        this.subscribers = [];

        window.addEventListener(Utils.ON_STORAGE_EVENT, (storedKey) => {
            if (storedKey.key === NotesRepository.LS_NOTES_KEY) {
                this.notes = JSON.parse(storedKey.newValue || "[]");
                this.lastSaved = new Date().toLocaleString();
                this.notify(); // update all containers in this tab
            }
        });
    }

    save() {
        localStorage.setItem(
            NotesRepository.LS_NOTES_KEY,
            JSON.stringify(this.notes)
        );
        this.lastSaved = new Date().toLocaleString();
        localStorage.setItem(
            NotesRepository.LS_LAST_SAVED_KEY,
            JSON.stringify(this.lastSaved)
        );
    }

    add(note) {
        this.notes.push(note.toJSON());
        this.save();
        this.notify();
    }

    delete(note) {
        this.notes = this.notes.filter(n => n.id !== note.id);
        this.save();
        this.notify();
    }

    update(note) {
        const idx = this.notes.findIndex(n => n.id === note.id);
        if(idx !== NotesRepository.NOT_FOUND) {
            // replace existing note with same ID
            this.notes[idx] = note.toJSON();
            this.save();
            this.notify();
        }
    }

    notify() {
        this.subscribers.forEach(sub => {
            sub.displayNotes(this.notes);
        });
    }

    subscribe(container) {
        if(!this.subscribers.includes(container)) {
            this.subscribers.push(container);
        }
    }

    unsubscribe(container) {
        this.subscribers = this.subscribers.filter(c => c !== container);
    }

}

// Singleton repository for reader and writer
export default new NotesRepository();