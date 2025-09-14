import { DOM_READER_BTN, DOM_TITLE, DOM_WRITER_BTN, UserMessages } from "../lang/messages/en/user.js";
import { Utils } from "./utils.js";

// Linked to index.html and responsible to UI logic of the page
class IndexUI {
    constructor() {
        this.title = document.getElementById(DOM_TITLE);
        document.title = UserMessages[DOM_TITLE];
        this.reader_btn = document.getElementById(DOM_READER_BTN);
        this.writer_btn = document.getElementById(DOM_WRITER_BTN);
    }

    initMsg() {
        this.title.textContent = UserMessages[DOM_TITLE];
        this.reader_btn.textContent = UserMessages[DOM_READER_BTN];
        this.writer_btn.textContent = UserMessages[DOM_WRITER_BTN];
    }

    init() {
        this.initMsg();
        this.reader_btn.addEventListener(Utils.ON_CLICK_EVENT, () => {
            Utils.goTo(Utils.URL_READER);
        });
        this.writer_btn.addEventListener(Utils.ON_CLICK_EVENT, () => {
            Utils.goTo(Utils.URL_WRITER);
        });
    }
}

const ui = new IndexUI();
ui.init();