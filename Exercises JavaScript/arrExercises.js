function triangle(n,bool){
    if(bool){
        bool=">"
        console.log("-".repeat(n) + bool );
}
    else{
        bool = "<";
        console.log(bool + "-".repeat(n))
    }

}
triangle(5,false);

// function numbers(){
//     let nums = [];
//     let input;
//     while(true){
//         input = parseFloat(prompt("Enter a number:"));
//         if(input === 0)
//             break
//         if(!isNaN(input))
//             nums.push(input)
//     }
//     const max = Math.max(...nums);
//     const len = nums.length;
//     const sum = nums.reduce((acc,num) => acc + num,0);
//     const avg = sum/len;

//     console.log(max);
//     console.log(len);
//     console.log(sum);
//     console.log(avg);
    
    
//     if(len >= 4){
//         console.log(`${nums[3]}`);
//     }else{
//         console.log("no number");
        
//     }
        
// }

// numbers();

function tri(num){
    for(let i = 0; i <= num; i++){
        console.log("*".repeat(i));
    }
}
tri(5)       

function trirev(num){
    for(let i = num; i > 0; i--){
        console.log("*".repeat(i));
    }
}
trirev(5)       

function mult(n){
    for(let i = 1;i <= n; i++){
        for(let j =1; j <= 10; j++){
            console.log(i * j);
            
        }
    }
}
mult(7)

function reversenum(num){
    let str = String(num);
    let rev = str.split('').reverse().join('');
    return parseInt(rev,10)
}

const processStr = str => {
    if(!str){
        return ""
    }
    let trimed = str.trim();
    if(trimed.length === 0){
        return "_"
    }
    return trimed
}

const list1 = [2,4,5,7,3,8,5]
const list2 = [8,5,4,6,7,5,2]
const list = (list1,list2) =>{
    let list3 = []
    let sumList2 = list2.reduce((sum,num)=> sum + num,0)
   
    for(i = 0;i< list1.length -1;i++ ){
        const sumlist1 = list1.reduce((sum,acc,idx) => idx !== i ? sum * acc :sum,1 )
        list3.push(sumlist1*sumList2)
    }
    return list3;
}