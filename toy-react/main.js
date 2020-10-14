import {createElement, Componet, render} from "./toy-react.js"

class MyComponet extends Componet{
    render() {
        return <div>
            <h1>my Componet</h1>
            {this.children}
            </div>
    }
}


for(let i of [1,2,3]) {
    console.log(i);
}




render(<MyComponet  id='a' class='c'>
    <div>abc</div>
    <div></div>
    <div></div>
</MyComponet>, document.body);
