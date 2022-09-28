import Player from '@vimeo\\player';

const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const setTime = () => {
    if (!localStorage["videoplayer-current-time"]) {
        return;
    }
    let time = localStorage.getItem("videoplayer-current-time");
    player.setCurrentTime(time).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
        console.log(error.message);
});
}

const getTime = () => {
    player.getCurrentTime().then(function (seconds) {
        localStorage.setItem("videoplayer-current-time", seconds);
    }).catch(function (error) {
        console.log(error.message);
    });
}

player.on('timeupdate', throttle(getTime, 1000));

player.on('play', setTime);
