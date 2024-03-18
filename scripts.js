// 0 = R; 1 = P; 2 = S

// Get computer's choice
function getComputerChoice() {
    return Math.floor(Math.random() * 4);
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