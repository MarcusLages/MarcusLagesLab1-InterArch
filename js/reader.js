import { DOM_BACK_BTN, DOM_READER_TITLE, DOM_TITLE, UserMessages } from "../lang/messages/en/user.js";
import { Utils } from "./utils.js";

class ReaderUI {
    constructor() {
        document.title = UserMessages[DOM_TITLE];
        this.title = document.getElementById(DOM_READER_TITLE);
        this.back_btn = document.getElementById(DOM_BACK_BTN);
    }
    
    initMsg() {
        this.title.textContent = UserMessages[DOM_READER_TITLE];
        this.back_btn.textContent = UserMessages[DOM_BACK_BTN];
    }

    init() {
        this.initMsg();
        this.back_btn.addEventListener(Utils.ON_CLICK_EVENT, () => {
            // Had to add since index is outside of pages
            Utils.goTo(Utils.URL_INDEX);
        });
    }
}

const ui = new ReaderUI();
ui.init();