import { tween } from 'popmotion';

const element = document.querySelector('.ball');

tween({ to: 300, duration: 500 })
    .start((v) => element.style += 'translateX(' + v + 'px)');