const h1 = document.createElement("h1");
h1.innerHTML = "Hello World";
document.getElementById("main-div").appendChild(h1);

const btn = document.createElement("button");
btn.innerHTML = "Click"
btn.style.backgroundColor = "green"
btn.setAttribute("class","btn-class")
document.getElementsByClassName("btn=class")
document.getElementById("main-div").appendChild(btn);
btn.addEventListener("click",clickBtn)


function clickBtn(){
    alert("work")
}



const products = [
    {
        name: "milk",
        price: 6
    },
    {
        name: "bread",
        price: 9
    },
    {
        name: "cola",
        price: 8
    }
];

// const container = document.getElementById('products-container')

// products.forEach(p => {
//     const productDiv = document.createElement('div');

//     const h1 = document.createElement('h1');
//     h1.textContent = p.name;
//     productDiv.appendChild(h1);

//     const h2 = document.createElement('h2');
//     h2.textContent = `Price: ${p.price}₪`;
//     productDiv.appendChild(h2);

//     container.appendChild(productDiv);
// })


const mouse = document.createElement("h2");
mouse.textContent = "Mouse Out"
document.getElementById("main-div").appendChild(mouse);
mouse.addEventListener("mouseover",function(){
    mouse.textContent = 'In mouse'
});

mouse.addEventListener("mouseout",function(){
    mouse.textContent = 'Out mouse'
});


mouse.addEventListener("click",()=>{
    mouse.style.color = "blue";
    mouse.style.backgroundColor = "green";
    mouse.style.textDecoration = "underline blue";
    
})


const div = document.createElement("div");
div.style.height = "30px";
div.style.width = "40px";
div.style.background = "yellow";
div.style.height = "30px";
document.getElementById("main-div").appendChild(div);

const butn = document.createElement("button");
butn.textContent = "Click";
document.getElementById("main-div").appendChild(butn);
butn.addEventListener("click", ()=> div.style.backgroundColor = "red");

const select = document.createElement("select")
colors = ["blue","black","pink"];

colors.forEach(element => {
    const option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    select.appendChild(option);
});

document.getElementById("main-div").appendChild(select);

select.addEventListener("change",function(){
    const selected =select.value;
    div.style.backgroundColor = selected;
});

let previouscolor = div.style.backgroundColor;

const meteg = document.createElement("button");
meteg.textContent = "meteg";
document.getElementById("main-div").appendChild(meteg);

meteg.addEventListener("click", ()=> {
    if(div.style.backgroundColor !== "transparent"){
        previouscolor = div.style.backgroundColor;
        div.style.backgroundColor = "transparent"
    }else{
        div.style.backgroundColor =previouscolor;
    }
});


const input = document.createElement("input");
input.type = "text";
const submit = document.createElement("submit");
submit.textContent = "submit";

document.getElementById("main-div").appendChild(input);
document.getElementById("main-div").appendChild(submit);

submit.addEventListener("click",() => {
    const color = input.value.trim();

    if(color){
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    select.appendChild(option);
    input,value = "";
    }
})


const createDiv = (text,height,width) => {
    const div = document.createElement("div");

    div.textContent = text;
    div.style.height = height;
    div.style.width = width;
    div.style.position = "relative";
    div.style.border = "1px solid black";
    return div;
};

const createButton = (label,onClick,event) => {
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener(event,onClick);
    return button
};

const alignText = (alignment) => (div) => {
    return () => {
        div.style.textAlign =alignment;
    };
};

