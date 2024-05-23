// 0 = R; 1 = P; 2 = S (functions that retrieve choices always return one of these numbers!)

// The logic is based around additions like so:
// 0 BEATS 2 = 2nd combination
// 1 BEATS 0 = 1st combination
// 2 BEATS 1 = 3rd combination

console.info('%cYou can start the game by entering playGame() in the console. You will be playing until either player achieves the score of 3 on any of the elements',
'background-color: rgba(255, 210, 105, 0.2); padding: 10px; text-align: center; border-radius: 5px;');

// Globally declare the scoring variables
let firstScore = [0, 0, 0];
let secondScore = [0, 0, 0];

// Get computer's choice (a random int from 0 to 2)
function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

// Get player's choice: words, emojis (any style: punctuation and/or -case)
function getPlayerChoice(answer) {
    // Get input through prompt if none provided and return null if there was absolutely no input whatsoever
    if (!answer) {
        answer = prompt('Pick between water, plank and fire!', getChoiceText());
    }
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

// Play rounds until someone wins
function playGame() {
    // Iteration counter
    let i = 0;
    while (!(Math.max(...firstScore) === 3 || Math.max(...secondScore) === 3)) {
        // Collect choices and cancel in case of empty inputs
        const firstChoice = getPlayerChoice();
        const secondChoice = getComputerChoice();
        if (firstChoice === null || secondChoice === null) {
            console.log('GAME CANCELED BY USER! 🚫');
            // Reset scores before canceling
            firstScore = [0, 0, 0];
            secondScore = [0, 0, 0];
            return null;
        }

        // Play a round and determine the outcome
        console.group(`%cRound ${i + 1}!`,
        'font-size: 16px;');
        switch (playRound(firstChoice, secondChoice)) {
            case 0:
                console.log(`%cYour scores:       💧 = ${firstScore[0]} | 🪵 = ${firstScore[1]} | 🔥 = ${firstScore[2]}`,
                'font-size: 16px;');
                console.log(`%cOpponent's scores: 💧 = ${secondScore[0]} | 🪵 = ${secondScore[1]} | 🔥 = ${secondScore[2]}`,
                'font-size: 16px;');
                break;
            case 1:
                firstScore[firstChoice]++;
                console.log(`%cYour scores:       💧 = ${firstScore[0]} | 🪵 = ${firstScore[1]} | 🔥 = ${firstScore[2]}`,
                'font-size: 16px;');
                console.log(`%cOpponent's scores: 💧 = ${secondScore[0]} | 🪵 = ${secondScore[1]} | 🔥 = ${secondScore[2]}`,
                'font-size: 16px;');
                break;
            case 2:
                secondScore[secondChoice]++;
                console.log(`%cYour scores:       💧 = ${firstScore[0]} | 🪵 = ${firstScore[1]} | 🔥 = ${firstScore[2]}`,
                'font-size: 16px;');
                console.log(`%cOpponent's scores: 💧 = ${secondScore[0]} | 🪵 = ${secondScore[1]} | 🔥 = ${secondScore[2]}`,
                'font-size: 16px;');
        }
        console.groupEnd();

        // Update the iteration counter
        i++;
    }
    // Conclude who is the winner of the game! (return + log it) & reset the scores
    if (Math.max(...firstScore) === 3) {
        console.log('%cFirst player has won the game! 🏅',
        'font-size: 16px;');
        firstScore = [0, 0, 0];
        secondScore = [0, 0, 0];
        return 1;
    } else {
        console.log('%cSecond player has won the game! 🏅',
        'font-size: 16px;');
        firstScore = [0, 0, 0];
        secondScore = [0, 0, 0];
        return 2;
    }
}



// DOM PART
const playerBtns = document.querySelector('#playerChoice');
const computerBtns = document.querySelector('#computerChoice');

playerBtns.addEventListener('click', (e) => {
    // Do the function if the working button has been clicked
    if (e.target.className) {
        // Unselect previous choices
        for (listItem of playerBtns.children) {
            const name = listItem.firstElementChild.classList[0];
            listItem.firstElementChild.className = name;
        }
        for (listItem of computerBtns.children) {
            const name = listItem.firstElementChild.classList[0];
            listItem.firstElementChild.className = name;
        }
        
        // Get computer's choice
        const computerChoice = getComputerChoice();

        // Select the first player's button and play the round, change buttons to corresponding colors
        result = playRound(getPlayerChoice(e.target.className), computerChoice);

        switch (result) {
            case 0:
                e.target.classList.add('draw');
                computerBtns.children[computerChoice].firstElementChild.classList.add('draw');
                break;
            case 1:
                e.target.classList.add('winner');
                computerBtns.children[computerChoice].firstElementChild.classList.add('loser');
                break;
            case 2:
                e.target.classList.add('loser');
                computerBtns.children[computerChoice].firstElementChild.classList.add('winner');
        }
    };
});