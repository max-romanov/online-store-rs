import {Control} from "@/scripts/common/control/control";
import "@/styles/index.css"

class App extends Control<"div"> {
    constructor(parent: HTMLElement) {
        super(parent, "div");
        const title = new Control<"h1">(this.node, "h1", "text-red-500 text-[5em] text-center", "Hello World")
    }
}

new App(document.body)
