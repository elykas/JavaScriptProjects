const numString = (str, arr) => {
    let count = 0;
    
    const isSequence = (str,subStr) => {
        let j =0;
        for (let i  = 0; i < str.length;  i++) {
            if(str[i] === subStr[j]){
                j++;
            }
            if(j === subStr.length){
                return true
            };
        }
        return false;
    }
        
        arr.foreach(element =>{
            if(isSequence(str,element)){
                count++;
            }
        });
        return count; 
}
            
const haveBraclet= (string) => {
    let openBraclet = 0;
    
    for(i = 0; i < string.length; i++){
        if(string[i] === "{"){
            openBraclet ++
        } else if (string[i] === "}"){
            if (openBraclet === 0) {
                
                return false;
            }
            openBraclet--; 
        
    }}
    return openBraclet === 0;
 }

 const formation = (str1,str2) => {
    if(str1.length !== str2.length){
        return false;
    }

    const sortedStr1 = str1.split("").sort().join("");
    const sortedStr2 = str2.split("").sort().join("");

    return sortedStr1 === sortedStr2;
 }

 const secondNum = (arr) => {
    let uniqueArr = [...new Set(arr)];
     uniqueArr.sort((a,b) => b - a)
    return uniqueArr[1]
 }

 const mazLength = (str) => {
    const arr = str.split("")
    let maxLen = 0;
    let j = arr[0];
    for(let i =0; i < arr.length; i++){
        if(j === arr[i]){
            let newarr = arr.slice(j,i);
            j = arr[i]
            if(newarr.length > maxLen){
                maxLen = newarr.length
            }

        }
    }
    return maxLen   
 }
console.log(mazLength("abab@abcabcdw!"));



 // 1. Function to count how many substrings exist in the main string in order but not necessarily consecutively
function countSubstringsInOrder(mainStr, substrings) {
    let count = 0;
    let startIndex = 0;

    substrings.forEach(subStr => {
        let index = mainStr.indexOf(subStr, startIndex);
        if (index !== -1) {
            count++;
            startIndex = index + subStr.length;
        }
    });

    return count;
}

// 2. Function to check if the expression has balanced curly braces
function isValidExpression(expression) {
    let balance = 0;
    
    for (let char of expression) {
        if (char === '{') balance++;
        else if (char === '}') balance--;
        
        if (balance < 0) return false;
    }

    return balance === 0;
}

// 3. Function to check if two strings are permutations of each other
function arePermutations(str1, str2) {
    if (str1.length !== str2.length) return false;

    let sortedStr1 = str1.split('').sort().join('');
    let sortedStr2 = str2.split('').sort().join('');

    return sortedStr1 === sortedStr2;
}

// 4. Function to return the largest number that can be made by adding the digit 5
function maxNumberWithFive(num) {
    let numStr = num.toString();
    let maxNum = -Infinity;

    for (let i = 0; i <= numStr.length; i++) {
        let newNum = parseInt(numStr.slice(0, i) + '5' + numStr.slice(i));
        maxNum = Math.max(maxNum, newNum);
    }

    return maxNum;
}

// 5. Function to find the second largest number in an array
function secondLargest(arr) {
    let uniqueArr = [...new Set(arr)];
    if (uniqueArr.length < 2) return null;

    uniqueArr.sort((a, b) => b - a);
    return uniqueArr[1];
}

// 6. Function to find the length of the longest substring without repeating characters
function longestUniqueSubstring(str) {
    let maxLen = 0;
    let currentStr = '';
    
    for (let char of str) {
        let index = currentStr.indexOf(char);
        if (index !== -1) {
            currentStr = currentStr.slice(index + 1);
        }
        currentStr += char;
        maxLen = Math.max(maxLen, currentStr.length);
    }

    return maxLen;
}

// 7. Function to check if a number is a palindrome
function isPalindrome(num) {
    let numStr = num.toString();
    return numStr === numStr.split('').reverse().join('');
}

// Example usage:

// // 1. Counting substrings in order
// console.log(countSubstringsInOrder("abcdef", ["ad", "de", "ba"])); // 2

// // 2. Checking if expression is valid
// console.log(isValidExpression("}sad{+}ds{sad}}")); // true
// console.log(isValidExpression("}}asd}}{sad}}")); // false

// // 3. Checking if two strings are permutations
// console.log(arePermutations("abc", "cab")); // true
// console.log(arePermutations("abc", "def")); // false

// // 4. Getting the largest number by adding 5
// console.log(maxNumberWithFive(268)); // 5268

// // 5. Finding the second largest number
// console.log(secondLargest([3, 6, 2, 3])); // 3

// // 6. Finding the longest substring without repeating characters
 console.log(longestUniqueSubstring("abab@abcabcdw!")); // 6

// // 7. Checking if a number is a palindrome
// console.log(isPalindrome(12321)); // true
// console.log(isPalindrome(12312)); // false


