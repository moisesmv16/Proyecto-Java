import Model from "./model.js";
import View from "./view.js";

document.addEventListener('DOMContentLoaded', ()=>{
    const model = new Model();
    const view = new View();
    model.setView(view);
    view.setModel(model); 
     
});

function test(num, f){
    return f(num);

}
function dup(num){
    return num * 2;
}

test(5, (num) => num*2);
