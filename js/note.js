import { DOM_NOTE_PLACEHOLDER, DOM_REMOVE_NOTE_BTN, UserMessages } from "../lang/messages/en/user.js";
import { Utils } from "./utils.js";

export class Note {
    static NOTE_HTML = "textarea";
    static NOTE_CARD_HTML = "div";
    static REMOVE_BTN_HTML = "button";

    static NOTE_CLASS_CSS = "note_txt";
    static NOTES_CARD_CLASS_CSS = "note_card";
    static REMOVE_BTN_CLASS_CSS = DOM_REMOVE_NOTE_BTN;

    constructor(parent, disable = false, msg = "", onChange, onDelete) {
        this.parent = parent;
        this.note = this.initNoteText(msg, disable, onChange);
        this.noteCard = this.initNoteCard();
        this.removeBtn = this.initRemoveBtn(onDelete);
        
        this.noteCard.appendChild(this.note);
        this.noteCard.appendChild(this.removeBtn);

        this.parent.appendChild(this.noteCard);        
    }

    initNoteText(msg, disable, onChange) {
        let note = document.createElement(Note.NOTE_HTML);
        note.placeholder = UserMessages[DOM_NOTE_PLACEHOLDER];
        note.textContent = msg;
        note.className = Note.NOTE_CLASS_CSS;
        note.disabled = disable;

        if(onChange) {
            note.addEventListener(Utils.ON_CHANGE_EVENT, () => onChange());
        }
        return note;
    }
    
    initNoteCard() {
        let noteCard = document.createElement(Note.NOTE_CARD_HTML);
        noteCard.className = Note.NOTES_CARD_CLASS_CSS;
        return noteCard;
    }
    
    initRemoveBtn(onDelete) {
        let removeBtn = document.createElement(Note.REMOVE_BTN_HTML);
        removeBtn.className = Note.REMOVE_BTN_CLASS_CSS;
        removeBtn.textContent = UserMessages[DOM_REMOVE_NOTE_BTN];
        if(onDelete) {
            removeBtn.addEventListener(Utils.ON_CLICK_EVENT, () => onDelete() );
        }
        return removeBtn;
    }

    addOnChange(onChange) {
        this.note.addEventListener(Utils.ON_CHANGE_EVENT, () => onChange());
    }

    addOnDelete(onDelete) {
        this.removeBtn.addEventListener(Utils.ON_CLICK_EVENT, () => onDelete());
    }

    setParent(parent) {
        this.parent = parent;
        this.parent.appendChild(this.noteCard);
    }
}