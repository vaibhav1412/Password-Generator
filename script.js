
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
let checkCount = 1;

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
    return String.fromCharCode(getRandomInt(97,123))
};
function generateUpperCase()
{
    return String.fromCharCode(getRandomInt(65,971))
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