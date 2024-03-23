// 0 = R; 1 = P; 2 = S (functions that retrieve choices always return one of these numbers!)
console.info('%cYou can start the game by entering playGame() in the console. You can optionally specify the number of rounds to play in the parentheses',
'background-color: rgba(255, 210, 105, 0.2); padding: 10px; text-align: center; border-radius: 5px;');

// Get computer's choice
function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

// Get player's choice: words, emojis (any style: punctuation and/or -case)
function getPlayerChoice() {
    // Get input and return null if there was absolutely no input whatsoever
    answer = prompt('Pick between water, plank and fire!', getChoiceText());
    if (!answer) {
        return null;
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

// Play a single round: 0 = draw; 1 = 1p; 2 = 2p
function playRound(firstChoice = getPlayerChoice(), secondChoice = getComputerChoice()) {
    // Cancel if no input at all (return null)
    if (firstChoice === null || secondChoice === null) {
        console.log('ROUND CANCELED BY USER! 🚫');
        return null;
    }

    // Log choices
    console.log(`%c${getChoiceText(firstChoice)} %cVS%c ${getChoiceText(secondChoice)}`,
    'font-size: 16px;', 'font-size: 32px;', 'font-size: 16px;');

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
            console.log('Second player wins! 💪');
            return 2;
        case 2:
            if (firstLarger) {
                console.log('Second player wins! 💪');
                return 2;
            }
            console.log('First player wins! ✊');
            return 1;
        case 3:
            if (firstLarger) {
                console.log('First player wins! ✊');
                return 1;
            }
            console.log('Second player wins! 💪');
            return 2;
    }
}

// Play a whole game and determine the outcome over multiple rounds
function playGame(boValue = 5) {
    // Declare the variables for scoring and shit
    let firstScore = 0;
    let secondScore = 0;
    let drawAmount = 0;

    let firstChoice;
    let secondChoice;
    for (let i = 0; i < boValue; i++) {
        // Collect choices and cancel in case of empty inputs
        firstChoice = getPlayerChoice();
        secondChoice = getComputerChoice();
        if (firstChoice === null || secondChoice === null) {
            console.log('GAME CANCELED BY USER! 🚫');
            return null;
        }

        // Play a round and determine the outcome
        console.group(`%cRound ${i + 1}!`,
        'font-size: 16px;');
        switch (playRound(firstChoice, secondChoice)) {
            case 0:
                drawAmount++;
                console.log(`The score is %c${firstScore} VS ${secondScore}`,
                'font-size: 16px;');
                break;
            case 1:
                firstScore++;
                console.log(`The score is now %c${firstScore} VS ${secondScore}`,
                'font-size: 16px;');
                break;
            case 2:
                secondScore++;
                console.log(`The score is now %c${firstScore} VS ${secondScore}`,
                'font-size: 16px;');
        }
        console.groupEnd();

        // Check if anyone has won yet (TO-DO: This check is very suspicious! Test before publishing!)
        if ((firstScore > (boValue - drawAmount) / 2) || (secondScore > (boValue - drawAmount) / 2)) {
            break;
        }
    }
    // Conclude who is the winner of the game! (return + log it)
    if (firstScore > secondScore) {
        console.log('%cFirst player has won the game! 🏅',
        'font-size: 16px;');
        return 1;
    } else if (firstScore < secondScore) {
        console.log('%cSecond player has won the game! 🏅',
        'font-size: 16px;');
        return 2;
    } else {
        console.log('%cIt is a draw! 🤜🤛',
        'font-size: 16px;');
        return 0;
    }
}