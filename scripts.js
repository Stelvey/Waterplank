// 0 = R; 1 = P; 2 = S (functions that retrieve choices always return one of these numbers!)

// Get computer's choice
function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

// Get player's choice: words, emojis (any style: punctuation and/or -case)
function getPlayerChoice(answer) {
    // Ask the user for the input (if none was in the function's argument)
    if (!answer) {
        answer = prompt('Pick between water, plank and fire!', getChoiceText());
    }

    // Retrieve booleans through regex to know which words exist in the answer
    let water = /(water)|[💦🔫🌊💧]/imu;
    let plank = /(plank)|🪵/imu;
    let fire = /(fire)|🔥/imu;

    water = water.test(answer);
    plank = plank.test(answer);
    fire = fire.test(answer);

    // Still no answer? Force them to make one
    if (!(water || plank || fire)) {
        alert('Please, make a choice 🙏🏻');
        return getPlayerChoice();
    }

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

// This gets a sample text of a choice, it is random by default
function getChoiceText(input = getComputerChoice()) {
    switch (input) {
        case 0:
            return 'Water! 💧';
        case 1:
            return 'Plank! 🪵';
        case 2:
            return 'Fire! 🔥';
    }
}

// TO-DO: AFRAID IT MAY HAVE BUGS? NOT ALL POSSIBLE GAMES WERE CHECKED
// Play a single round: 0 = draw; 1 = 1p; 2 = 2p
function playRound(firstChoice, secondChoice) {
    // Log choices
    console.log(`First player picks ${getChoiceText(firstChoice).toLowerCase()}`);
    console.log(`Second player picks ${getChoiceText(secondChoice).toLowerCase()}`);

    // Check for draw (return + log it)
    if (firstChoice === secondChoice) {
        console.log('It\'s a draw! 🤝');
        return 0;
    }

    // It's important to know which number is larger to determine the winner of the combination
    let firstLarger = firstChoice > secondChoice ? true : false;
    // Check the winner (return + log it)
    switch (firstChoice + secondChoice) {
        case 1:
            if (firstLarger) {
                console.log('First player wins! ✊');
                return 1;
            }
            console.log('Second player wins! ✊');
            return 2;
        case 2:
            if (firstLarger) {
                console.log('Second player wins! ✊');
                return 2;
            }
            console.log('First player wins! ✊');
            return 1;
        case 3:
            if (firstLarger) {
                console.log('First player wins! ✊');
                return 1;
            }
            console.log('Second player wins! ✊');
            return 2;
    }
}

// function playGame(boValue = 5) {
//     for (let i = 0; i < boValue; i++) {
        
//     }
// }