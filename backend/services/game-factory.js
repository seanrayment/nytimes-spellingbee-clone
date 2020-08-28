require('dotenv').config();
const Game = require('../models/game');
const mongoose = require('mongoose');
const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

let words = [];
let pangrams = [];

async function processWords() {
    const fileStream = fs.createReadStream('./words.txt', 'latin1');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const word = line.trim();
        words.push(word);
        const cset = new Set(word.split(''));
        if (cset.size === 7) {
            pangrams.push(word)
        }
    }
}

function validWord(word, cset, centerLetter) {
    // console.log(`Testing ${word.split('')} against ${Array.from(cset)}`);
    const wordChars = new Set(word.split(''));
    if (!wordChars.has(centerLetter)) {
        return false;
    }
    for (let char of word.split('')) {
        if (!(cset.has(char))) {
            console.log(`${Array.from(cset)} does not contain ${char} from ${word}`);
            return false;
        }
    }
    return true;
}

async function findAnswers(letters, centerLetter) {
    const cset = new Set(letters);
    let validWords = [];
    words.forEach(async (word, i) => {
        const valid = await validWord(word, cset, centerLetter);
        if ((word.length > 3) && valid) {
            validWords.push(word)
        } else {
            console.log(`${word} is not valid`);
        }
    });

    return validWords;
}

async function createGame(pangram) {
    const cset = new Set(pangram.trim().split(''));
    const letters = Array.from(cset);
    const centerLetter = letters[Math.floor(Math.random() * letters.length)];
    const answers = await findAnswers(letters, centerLetter);
    const gamePangrams = [];
    gamePangrams.push(pangram);

    const game = new Game({
        pangrams: gamePangrams,
        letters: letters,
        centerLetter: centerLetter,
        answers: answers
    });
    try {
        const newGame = await game.save();
        return newGame;
    } catch (err) {
        console.log(err);
    }
}

async function buildGame() {
    await processWords();
    const newGame = await createGame(pangrams[Math.floor(Math.random() * pangrams.length)]);
    return newGame;
}

exports.buildGame = buildGame;