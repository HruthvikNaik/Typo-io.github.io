const randomQuoteUrl = "https://api.quotable.io/random"
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const text = document.querySelector("textarea")
mistakeTag = document.querySelector(".mistake span");

let charIndex = mistakes = 0;
text.addEventListener("keyup", e =>{
    text.style.height = "63px";
    let height = e.target.scrollHeight;
    text.style.height = `${height}px`;
});
let correct = true
quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if (character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else{
            mistakes++;
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false

        }
        mistakeTag.innerText = mistakes;
        characterSpan.classList.add("active");

    })
    if (correct) getNextQuote()
    
})

function getRandQuote () {
    return fetch(randomQuoteUrl)
        .then(response => response.json())
        .then(data => data.content)
    
}

async function getNextQuote() {
    const quote = await getRandQuote()
    quoteDisplayElement.innerText= ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
        
    })
    quoteInputElement.value = null
    startTimer()
    
}
let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}
getNextQuote()

