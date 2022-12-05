class Control<T extends keyof HTMLElementTagNameMap> {
    node: HTMLElementTagNameMap[T];
    constructor(parentNode: HTMLElement, tagName: T, className?: string, text?: string) {
        this.node = document.createElement(tagName);
        this.node.className = className || '';
        this.node.textContent = text || '';
        parentNode.append(this.node)
    }

    destroy(): void {
        this.node.remove()
    }
}

export {
    Control
}
