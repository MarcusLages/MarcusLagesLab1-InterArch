import { DOM_BACK_BTN, DOM_LAST_SAVED, DOM_READER_TITLE, DOM_TITLE, UserMessages } from "../lang/messages/en/user.js";
import { NoteContainer } from "./notes-container.js";
import { Utils } from "./utils.js";

class ReaderUI {

    static DOM_NOTE_CONTAINER = "notes_container";

    constructor(noteContainer) {
        document.title = UserMessages[DOM_TITLE];
        this.title = document.getElementById(DOM_READER_TITLE);
        this.backBtn = document.getElementById(DOM_BACK_BTN);
        this.noteContainerDom = document.getElementById(ReaderUI.DOM_NOTE_CONTAINER);
        this.noteContainer = noteContainer;
    }
    
    initMsg() {
        this.title.textContent = UserMessages[DOM_READER_TITLE];
        this.backBtn.textContent = UserMessages[DOM_BACK_BTN];
    }

    init() {
        this.initMsg();
        this.noteContainer.setParent(this.noteContainerDom);
        this.backBtn.addEventListener(Utils.ON_CLICK_EVENT, () => {
            // Had to add since index is outside of pages
            Utils.goTo(Utils.URL_INDEX);
        });
    }
}

const rNoteContainer = new NoteContainer(false);
const ui = new ReaderUI(rNoteContainer);
ui.init();