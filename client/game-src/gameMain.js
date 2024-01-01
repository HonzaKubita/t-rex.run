// FE modules
import { useMainStore } from '@/stores/mainStore'
const store = useMainStore();

// Game engine modules
import render from './modules/render'
import input from './modules/input'

// Game objects
import Trex from './objects/gameObjects/trex'
import Nickname from './objects/gameObjects/nickname'
import Cactus from './objects/gameObjects/cactus'
import Score from './objects/gameObjects/score'
import Bird from './objects/gameObjects/bird'
import Ground from './objects/gameObjects/ground'
import Cloud from './objects/gameObjects/cloud'
import GameOver from './objects/gameObjects/gameOver'


function gameLoop() {
    render.renderAll();

    requestAnimationFrame(gameLoop);
}

function start() {
    input.init();

    // Create a trex for each player
    store.players.forEach(player => {
        const trex = new Trex(10, 10, player, player.id == store.localPlayerId);
        const nickname = new Nickname(trex);
        
        render.addObject(trex);
        render.addObject(nickname);
    });

    gameLoop();
}

export default {
    mountDiv: (divId) => {render.mount(divId)},
    start
} 