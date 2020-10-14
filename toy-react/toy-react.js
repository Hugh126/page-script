class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(componet){
        this.root.appendChild(componet.root);
    }
}

export class Componet {
    constructor() {
        // 创建绝对空对象
        this.props = Object.create(null);
        // 创建子节点
        this.children = [];
        this._root = null;
    }
    setAttribute(name, value) {
        this.props[name]=value;
    }
    appendChild(componet){
        this.children.push(componet); 
    }
    // 产生getter, 去调用一下render
    get root() {
        if(!this._root) {
            this._root = this.render().root;
        }
        return this._root;
    }
}

// 文本NODE
class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
    
}

export function createElement(type, attributes, ...children){
    let e;
    if (typeof type === "string") {
        e = new ElementWrapper(type);
    }else {
        e = new type;
    }

    
    for (let p in attributes) {
        e.setAttribute(p, attributes[p]);
    }
    let insertChildren = (children) => {
        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child);
            }
            if(typeof child === "object" && child instanceof Array) {
                // 递归
                insertChildren(child);
            }else {
                e.appendChild(child);
            }
        }    
    }

    insertChildren(children);
    return e;
}

export function render(componet, parentElement) {
    parentElement.appendChild(componet.root);

}