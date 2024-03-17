// RPS thingy
// 0 = R
// 1 = P
// 2 = S

// 0 + 1 = 1 | R loses P
// 0 + 2 = 2 | R wins S
// 1 + 0 = 1 | P wins R
// 1 + 2 = 3 | P loses S
// 2 + 0 = 2 | S loses R
// 2 + 1 = 3 | S wins P

function getComputerChoice() {
    return Math.floor(Math.random() * 4);
} 