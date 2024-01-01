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

// Local synced to server
let localTrex = null;

// Local only
let clouds = [];

// Objects from server
let trexes = {
    // playerid: trex
};
let obstacles = [
    // cactuses and birds
];

function init() {
    input.init();

    // Create a trex for each player
    store.players.forEach(player => {
        const trex = new Trex(0, 8, player, player.id == store.localPlayerId);
        const nickname = new Nickname(player.name);
        trex.addChild(nickname);
        
        render.addObject(trex);
    });

    // Create a ground object
    const ground = new Ground(0, 10);
    render.addObject(ground);

    // Create a score object
    const score = new Score(450, 130);
    render.addObject(score);

    gameLoop();
}

function gameLoop() {
    render.renderAll();

    requestAnimationFrame(gameLoop);
}

function start() {
    gameLoop();
}

export default {
    mountDiv: (divId) => {render.mount(divId)},
    init,
    start,
} 