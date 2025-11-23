let nums = [10,3,7,20,13,2];

let squares = nums.map(num=>num*num);
console.log(squares);

function Prime(n){
    if(n<=1){
        return false;
    }
    for(let i=2;i<=Math.sqrt(n);i++){
        if(n%i === 0)
        {
            return false;
        }
        return true;
    }
}
let primes=nums.filter(Prime);
console.log(primes);

let sum = nums.reduce((acc,num)=> acc+num,0);
console.log(sum);

let desort=nums.sort((a,b)=>b-a);
console.log(desort);