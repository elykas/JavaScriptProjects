const sucssessPromise = () => {
    return new Promise((resolve,reject) => {
        resolve("Success!");
    });
}
sucssessPromise().then(result => {console.log(result);
});


const familyName = (firstName,lastName) => {
    return new Promise ((resolve,reject) => {
        setTimeout(() => {
            resolve(`${firstName} ${lastName}`)
        },1000);
    })
}

familyName("ely","kassab").then(result => console.log(result));


const addFive = (num) => {
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            resolve (num +5)
        },500)
    })
}

const multiplyByTwo = (num) => {
    return new Promise ((resolve,reject) => {
        setTimeout(()=> {
            resolve(num * 2)
        },500)
    })
}

const subtractTen = (num) =>{
    return new Promise((resolve, reject) => {
        setTimeout(( ) => {
            resolve( num -10)
        },500)
    })
}

addFive(20).then((result) => multiplyByTwo(result))
            .then((result) => subtractTen(result))
            .then((num) => console.log(num))


const divide = (num1,num2) => {
    return new Promise((resolve, reject) => {
        if(num2 !== 0){
            resolve(num1/num2)
        }
        else{
            reject("can't divide by 0")
        }
    },500)
}

divide(60,9).then(result => console.log(result))
            .catch((error) => console.log(error))


async function performsOperations() {
    let result = await multiplyByTwo(10);
    result =await addFive(result);
    result = await subtractTen(result);
    console.log(result);
    
}

performsOperations();

async function division() {
    try{
        const result = await divide(60, 0);  // Attempt to divide
        console.log(result);  
    }catch(error){
        console.log(error);
        
    }
}
division();

const block = document.getElementById("block");
const applyBtn = document.getElementById("apply-color");
const cancelBtn = document.getElementById("cancel-button");
const choiceColor = document.getElementById("choice-color");

let time;


applyBtn.addEventListener("click",() => {
   time= setTimeout(() => {
        block.style.backgroundColor = choiceColor.value;
    },3000)
})

cancelBtn.addEventListener("click", ()=>{
    clearTimeout(time);
})