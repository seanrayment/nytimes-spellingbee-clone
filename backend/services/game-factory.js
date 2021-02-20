require('dotenv').config();
const Game = require('../models/game');
const readline = require('readline');
const mongoose = require('mongoose');
const fs = require('fs');

async function processWords() {
    const fileStream = fs.createReadStream('./words.txt', 'latin1');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let dictWords = [];
    let pangrams = [];

    for await (const line of rl) {
        const word = line.trim();
        dictWords.push(word);
        const cset = new Set(word.split(''));
        if ((cset.size === 7) && !(cset.has('s'))) {
            pangrams.push(word);
        }
    }
    return [dictWords, pangrams];
}

function validWord(word, cset, centerLetter) {
    const wordChars = new Set(word);
    if (!wordChars.has(centerLetter)) {
        return false;
    }
    for (let char of word) {
        if (!(cset.has(char))) {
            return false;
        }
    }
    return true;
}

function isPangram(word, letters) {
    const a = new Set(word);
    const b = new Set(letters);
    // sets are equal if same size and one is subset of other
    return (a.size === b.size && [...a].every(c => b.has(c)));
}

async function findAnswersAndPangrams(letters, centerLetter, words) {
    const cset = new Set(letters);
    let pangrams = [];
    let validWords = [];
    words.forEach(async (word) => {
        const valid = await validWord(word, cset, centerLetter);
        if ((word.length > 3) && valid) {
            validWords.push(word);
            if (isPangram(word, letters)) {
                pangrams.push(word);
            }
        }
    });

    return [validWords, pangrams];
}

function randomElement(wordArr) {
    return wordArr[Math.floor(Math.random() * wordArr.length)];
}

async function createGame(pangram, words) {
    const cset = new Set(pangram.trim().split(''));
    const letters = Array.from(cset);
    const centerLetter = randomElement(letters);
    const [answers, gamePangrams] = await findAnswersAndPangrams(letters, centerLetter, words);

    const game = new Game({
        pangrams: gamePangrams,
        letters: letters,
        centerLetter: centerLetter,
        answers: answers
    });
    console.log(`New Game: ${game}`);
    try {
        const newGame = await game.save();
        console.log(newGame);
        return newGame;
    } catch (err) {
        console.log(err);
    }
}

async function buildGame() {
    const [dictWords, dictPangrams] = await processWords();
    const newGame = await createGame(dictPangrams[Math.floor(Math.random() * dictPangrams.length)], dictWords);
    return newGame;
}

exports.buildGame = buildGame;