
const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyMsg=document.querySelector("[data-copyMsg]");
const copyBtn=document.querySelector("[data-copyBtn]");
const upperCheck=document.querySelector("#upperCase");
const lowerCheck=document.querySelector("#lowerCase");
const numbers=document.querySelector("#numbers");
const symbol=document.querySelector("#symbol");
const indicator=document.querySelector("[data-indicator]");
const generateButtton=document.querySelector(".generate-Button");
const allCheckBox=document.querySelectorAll("input[type=checkbox]")

const Symbols="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"

let password="";
let passwordLength=10;
let checkCount = 0;

handelslider();

// set passwordLength

function handelslider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}

function Setindicator(color)
{
    indicator.style.backgroundColor = color;
}

// getRandom integer generator

function getRandomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min)
};

function generateRandomNum()
{
    return getRandomInt(0,9);
};
function generateLowerCase()
{
    return String.fromCharCode(getRandomInt(97,122))
};
function generateUpperCase()
{
    return String.fromCharCode(getRandomInt(65,90))
};
function generateSymol()
{
  let randomNum = getRandomInt(0,Symbols.length)
  return Symbols.charAt(randomNum);
}
function calcStreingth(){
    let hasNum = false;
    let hasLower = false;
    let hasUpper = false;
    let hasSymbol = false;

    if (upperCheck.checked) hasUpper=true;
    if (lowerCheck.checked) hasLower=true;
    if (numbers.checked) hasNum=true;
    if (symbol.checked) hasSymbol=true;

    if(hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength>=8)
    {
        Setindicator("#0f0")
    }
    else if((hasUpper || hasLower) && (hasNum || hasSymbol) && passwordLength>=6)
    {
        Setindicator("#ff0")
    }
    else{
        Setindicator("#f00")
    }
}

// Copy The Content
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText="Coppied"
    }
    catch(e)
    {
        copyMsg.innerText="Failed"  
    }
    copyMsg.classList.add("active")

    setTimeout(()=>{
        copyMsg.classList.remove("active")
    },2000)
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{

        if(checkbox.checked){
            checkCount++;
        }
    })

    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handelslider();
    }
}
//Fisher–Yates method
function shufflePassword(array)
{
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0..i
    [array[i], array[j]] = [array[j], array[i]];   // swap
    }

    let str = "";

    array.forEach((item, index) => {
      str += item;
    });

    return str;
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("change", handleCheckBoxChange)
})

inputSlider.addEventListener("input",(e)=>
{
    passwordLength=e.target.value;
    handelslider();
})

copyBtn.addEventListener("click",()=>{
    
   if(passwordDisplay.value) copyContent();
})

generateButtton.addEventListener("click",()=>{
    if (checkCount<=0) return

    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handelslider()
    }

    // let start find new pass

    //remove old

    password=""

    // lets put stuffs mentuioned by checkbox

    let funcArray=[]
    if(upperCheck.checked)
    {
        funcArray.push(generateUpperCase)
    }
    if(lowerCheck.checked)
    {
        funcArray.push(generateLowerCase)
    }
    if(numbers.checked)
    {
        funcArray.push(generateRandomNum)
    }
    if(symbol.checked)
    {
        funcArray.push(generateSymol)
    }

    for(let i=0; i<funcArray.length; i++)
    {
        password+=funcArray[i]()
    }
    for(let i=0; i<passwordLength-funcArray.length; i++)
    {
        let randInd = getRandomInt(0,funcArray.length-1);
        password+=funcArray[randInd]();
    }

    // shuffle password

    password=shufflePassword(Array.from(password));
    passwordDisplay.value=password;

    calcStreingth()

})