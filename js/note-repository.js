class NotesRepository {
    constructor() {
        this.notes = [];
        this.subscribers = [];
    }

    add(note) {
        this.notes.push(note);
        this.update();
    }

    delete(note) {
        this.notes = this.notes.filter(n => n !== note);
        this.update();
    }

    update() {
        this.subscribers.forEach(sub => {
            // TODO: Change it to use a function
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