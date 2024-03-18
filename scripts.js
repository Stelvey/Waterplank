// 0 = R; 1 = P; 2 = S (functions that retrieve choices always return one of these numbers!)

// Get computer's choice
function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

// Get player's choice: words, emojis (any style: punctuation and/or -case)
function getPlayerChoice(answer) {
    // Ask the user for the input (if none was in the function's argument)
    if (!answer) {
        answer = prompt('Pick between water, plank and fire!', getRandomSuggestion());
    }

    // Still no answer? Force them to make one
    if (!answer) {
        alert('Please, make a choice 🙏🏻');
        return getPlayerChoice();
    }

    // Retrieve booleans through regex to know which words exist in the answer
    let water = /(water)|[💦🔫🌊💧]/imu;
    let plank = /(plank)|🪵/imu;
    let fire = /(fire)|🔥/imu;

    water = water.test(answer);
    plank = plank.test(answer);
    fire = fire.test(answer);

    // Retrieve a choice indefinitely only until the user inputs 1 choice only
    if (water + plank + fire > 1) {
        alert('Please, pick only ONE choice');
        return getPlayerChoice();
    }

    // Return a number corresponding to the choice made
    switch (true) {
        case water:
            return 0;
        case plank:
            return 1;
        case fire:
            return 2;
    }
}

// This is for getting a random sample text in a prompt window
function getRandomSuggestion() {
    switch (getComputerChoice()) {
        case 0:
            return 'Water! 💧';
        case 1:
            return 'Plank! 🪵';
        case 2:
            return 'Fire! 🔥';
    }
}

// Play a single round: 0 = draw; 1 = 1p; 2 = 2p
function playRound(firstChoice, secondChoice) {
    // Check for draw
    if (firstChoice === secondChoice) {
        return 0;
    }

    // It's important to know which number is larger to determine the winner of the combination
    let firstLarger = firstChoice > secondChoice ? true : false;
    switch (firstChoice + secondChoice) {
        case 1:
            if (firstLarger) {
                return 1;
            }
            return 2;
        case 2:
            if (firstLarger) {
                return 2;
            }
            return 1;
        case 3:
            if (firstLarger) {
                return 1;
            }
            return 2;
    }
}

// function playGame(boValue = 5) {
//     for (let i = 0; i < boValue; i++) {
        
//     }
// }