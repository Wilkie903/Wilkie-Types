const textContainer = document.getElementById('text-container');
const textToTypeElement = document.getElementById('text-to-type');
const caret = document.getElementById('caret');
const wpmCounter = document.getElementById('wpm-counter');
const restartButton = document.getElementById('restart-button');

const words = ["the", "and", "to", "of", "a", "in", "that", "is", "it", "was", "for", "on", "are", "with", "as", "I", "his", "they", "be", "at", "one", "have", "this", "from", "or", "had", "by", "hot", "word", "but", "what", "some", "we", "can", "out", "other", "were", "all", "there", "when", "up", "use", "your", "how", "said", "an", "each", "she"];

let textToType = generateRandomText(200);
let typedText = '';
let currentCharIndex = 0;
let startTime;
let typingInterval;

function generateRandomText(wordCount) {
    let text = '';
    for (let i = 0; i < wordCount; i++) {
        text += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return text.trim();
}

function displayText() {
    textToTypeElement.innerHTML = '';
    for (let i = 0; i < textToType.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = textToType[i];
        if (i < typedText.length) {
            charSpan.className = typedText[i] === textToType[i] ? 'correct' : 'incorrect';
        } else {
            charSpan.style.color = '#808080';  // Default grey color for remaining characters
        }
        textToTypeElement.appendChild(charSpan);
    }
}

function updateCaret() {
    caret.style.left = `${textToTypeElement.children[currentCharIndex].offsetLeft}px`;
    caret.style.top = `${textToTypeElement.children[currentCharIndex].offsetTop}px`;
}

function startGame() {
    typedText = '';
    currentCharIndex = 0;
    textToType = generateRandomText(200);
    displayText();
    updateCaret();
    restartButton.style.display = 'none';
    startTime = new Date().getTime();
    typingInterval = setInterval(updateWPM, 1000);
    document.addEventListener('keydown', handleTyping);
    setTimeout(endGame, 30000); // 30 seconds
}

function handleTyping(event) {
    if (event.key.length === 1) {  // Only process printable characters
        if (currentCharIndex < textToType.length) {
            typedText += event.key;
            currentCharIndex++;
            displayText();
            updateCaret();
        }
    }
}

function updateWPM() {
    const elapsedTime = (new Date().getTime() - startTime) / 1000 / 60;
    const wordsTyped = typedText.split(' ').length;
    const wpm = Math.floor(wordsTyped / elapsedTime);
    wpmCounter.textContent = `WPM: ${wpm}`;
}

function endGame() {
    clearInterval(typingInterval);
    document.removeEventListener('keydown', handleTyping);
    restartButton.style.display = 'block';
}

function restartGame() {
    startGame();
}

startGame();
