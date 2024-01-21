// JavaScript (your-script.js)
let ccount = 0;
let ucount = 0;
const computerGuessDisplay = document.getElementById('ans');
let displayedWords = [];

function fetchWords() {
    return fetch('dictionary.txt')
        .then(response => response.text())
        .then(content => content.split('\n').map(word => word.trim()))
        .catch(error => {
            console.error('Error fetching the file:', error);
        });
}

function game() {
    const userInput = document.getElementById('qty').value;
    ucount = ucount + userInput.length;
    console.log(ucount);

    // Clear the input field
    document.getElementById('qty').value = '';

    let list1 = [];

    // Fetch words and populate the list
    fetchWords().then(wordsList => {
        list1 = wordsList;

        const uword = userInput;
        const b = uword[uword.length - 1];

        // Filter out words already displayed
        const availableWords = list1.filter(word => !displayedWords.includes(word) && b === word[0]);

        if (availableWords.length > 0) {
            const longWord = availableWords.reduce((prev, current) => (prev.length > current.length) ? prev : current);

            // Add the displayed word to the list
            displayedWords.push(longWord);

            computerGuessDisplay.innerHTML = "Computer guess: "+longWord;
            ccount=ccount+longWord.length
        } else {
            computerGuessDisplay.innerHTML = 'Computer runs out of words';
        }
        return ucount;
    });
}

function end() {
    const userscore = document.getElementById('score');
    const compscore = document.getElementById('cscore');
    const res = document.getElementById('result');
    userscore.innerHTML = "Your score: " + ucount;
    compscore.innerHTML = "Computer score : " + ccount;
    if(ccount>ucount){
        res.innerHTML = "Computer wins!";
    }
    else{
        res.innerHTML = "Congratulations! You win";
    }
    }

