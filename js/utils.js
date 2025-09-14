export class Utils {
    static URL_READER = "reader.html";
    static URL_WRITER = "writer.html";
    static URL_INDEX = "index.html";

    // When element loses "focus" after changing its value
    static ON_CHANGE_EVENT = "change";
    static ON_CLICK_EVENT = "click";
    static ON_UNLOAD_EVENT = "delete";

    static EMPTY_HTML = "";

    static goTo(pageName) {
        window.location.href = pageName;
    }
}