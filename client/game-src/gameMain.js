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

const groundHeight = 8;
const gravity = -0.5;
const trexMoveSpeed = 5;
const trexJumpSpeed = 9;

// Local synced to server
let localTrex = null;

// Local only
const clouds = [];
let ground = null;

// Objects from server
const trexes = {
    // playerid: trex
};
const obstacles = [
    // cactuses and birds
];

let distance = 0;

function init() {
    input.init();

    // Create a trex for each player
    store.players.forEach(player => {
        const trex = new Trex(0, groundHeight + 10, player, player.id == store.localPlayerId);
        const nickname = new Nickname(player.name);
        trex.addChild(nickname);
        
        render.addObject(trex);

        // Add trex to localTrex or trexes
        if (player.id == store.localPlayerId) {
            localTrex = trex;
        }
        else {
            trexes[player.id] = trex;
        }
    });

    // Modify localTrex
    localTrex.velocity = { x: 0, y: 0 };
    localTrex.controlsVelocity = { x: 0, y: 0 };

    // Create a ground object
    ground = new Ground(0, 10);
    render.addObject(ground);

    // Create a score object
    const score = new Score(450, 130);
    render.addObject(score);

    gameLoop();
}

function localGameUpdate() {
    // Local gameplay update

    // Gravity
    localTrex.velocity.y += gravity;

    // Check if trex hits the ground
    if (localTrex.position.y <= groundHeight) {
        localTrex.velocity.y = 0;
        localTrex.position.y = groundHeight;
    }

    // Check if trex hits the walls
    if (localTrex.position.x < 0) {
        localTrex.velocity.x = 0;
        localTrex.position.x = 0;
    }
    if (localTrex.position.x > 600 - 44) {
        localTrex.velocity.x = 0;
        localTrex.position.x = 600 - 44;
    }

    // Reset controls velocity
    localTrex.controlsVelocity.x = 0;
    localTrex.controlsVelocity.y = 0;

    // User input
    if (input.isPressed("ArrowUp") && localTrex.position.y <= groundHeight) {
        localTrex.velocity.y += trexJumpSpeed;
    }
    if (input.isPressed("ArrowDown") && localTrex.position.y > groundHeight) {
        localTrex.controlsVelocity.y = -trexMoveSpeed;
    }
    if (input.isPressed("ArrowLeft")) {
        localTrex.controlsVelocity.x = -trexMoveSpeed;
    }
    if (input.isPressed("ArrowRight")) {
        localTrex.controlsVelocity.x = trexMoveSpeed;
    }

    // Apply velocity to position
    localTrex.position.x += localTrex.velocity.x + localTrex.controlsVelocity.x;
    localTrex.position.y += localTrex.velocity.y + localTrex.controlsVelocity.y;

    // Update trex state
    if (localTrex.position.y == groundHeight) {
        localTrex.state = "run";
    }

    if (localTrex.position.y > groundHeight) {
        localTrex.state = "jump";
    }
}

function gameLoop() {

    localGameUpdate();

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