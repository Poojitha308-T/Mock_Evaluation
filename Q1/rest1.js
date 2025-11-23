function sumAll(...number){
    return number.reduce((a,b)=>a+b,0);
}
console.log(sumAll(1,2,3,4));