import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const CURRENT_TIME = 'videoplayer-current-time';
const onPlay = throttle(({ seconds }) => {
  localStorage.setItem(CURRENT_TIME, seconds);
}, 1000);

player.setCurrentTime(localStorage.getItem(CURRENT_TIME) || 0);
player.on('timeupdate', onPlay);
