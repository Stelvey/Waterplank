// https://codepen.io/uenify/pen/KxzKVd

let achievementSound = new Audio('https://dl.dropboxusercontent.com/s/8qvrpd69ua7wio8/XboxAchievement.mp3')
let achievementSoundRare = new Audio('https://dl.dropboxusercontent.com/s/po1udpov43am81i/XboxOneRareAchievement.mp3')
const achievement = () => {
    let title = 'Connect to yourself'
    let score = '42'
    let rare = false
    document.querySelector('.achiev_name').innerText = title
    document.querySelector('.acheive_score').innerText = score
    document.getElementById("paste").firstElementChild.disabled = true
    document.getElementById("paste").firstElementChild.textContent = 'Error'
    document.querySelector('.unlocked').innerText = rare ? 'Rare achievement unlocked' : 'Achievement unlocked'
    if (rare) {
        achievementSoundRare.play()
        document.querySelector('.achievement').classList.add('rare')
    } else {
        achievementSound.play()
    }
    document.querySelector('.circle').classList.add('circle_animate')
    document.querySelector('.banner').classList.add('banner-animate')
    document.querySelector('.achieve_disp').classList.add('achieve_disp_animate')
    setTimeout(() => {
        document.querySelector('.circle').classList.remove('circle_animate')
        document.querySelector('.banner').classList.remove('banner-animate')
        document.querySelector('.achieve_disp').classList.remove('achieve_disp_animate')
        document.getElementById("paste").firstElementChild.disabled = false
    document.getElementById("paste").firstElementChild.textContent = 'Paste ID'
        if (rare) {
            document.querySelector('.achievement').classList.remove('rare')
        }
    }, 12000)
}