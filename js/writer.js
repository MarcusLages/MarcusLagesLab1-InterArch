import { DOM_ADD_NOTE_BTN, DOM_BACK_BTN, DOM_TITLE, DOM_WRITER_TITLE, UserMessages } from "../lang/messages/en/user.js";
import { Utils } from "./utils.js";
import { NoteContainer } from "./notes-container.js";

class WriterUI {

    static DOM_NOTE_CONTAINER = "notes_container";

    constructor(noteContainer) {
        document.title = UserMessages[DOM_TITLE];
        this.title = document.getElementById(DOM_WRITER_TITLE);
        this.backBtn = document.getElementById(DOM_BACK_BTN);
        this.addNoteBtn = document.getElementById(DOM_ADD_NOTE_BTN);
        this.noteContainerDom = document.getElementById(WriterUI.DOM_NOTE_CONTAINER);
        this.noteContainer = noteContainer;
    }

    initMsg() {
        this.title.textContent = UserMessages[DOM_WRITER_TITLE];
        this.backBtn.textContent = UserMessages[DOM_BACK_BTN];
        this.addNoteBtn.textContent = UserMessages[DOM_ADD_NOTE_BTN];
    }

    init() {
        this.initMsg();
        this.noteContainer.setParent(this.noteContainerDom);
        this.backBtn.addEventListener(Utils.ON_CLICK_EVENT, () => {
            Utils.goTo(Utils.URL_INDEX);
        });
        this.addNoteBtn.addEventListener(Utils.ON_CLICK_EVENT, () => {
            this.noteContainer.createNote();
        });
    }
}

const wNoteContainer = new NoteContainer(true);
const ui = new WriterUI(wNoteContainer);
ui.init();