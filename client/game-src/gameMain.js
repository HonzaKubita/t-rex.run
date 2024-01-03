// FE modules
import client from '../multiplayerjs'
import { useMainStore } from '../stores/mainStore'
const store = useMainStore();

// Game engine modules
import render from './modules/render'

// Game modules
import serverGame from './modules/serverGame'
import localGame from './modules/localGame'
import { checkCollisions } from './modules/collisions';

let onEnd = () => {};

function bindOnEnd(callback) {
    onEnd = callback;
}

let gameRunning = true;

function init() {
    serverGame.init();
    localGame.init();

    // Register game callbacks
    client.on("game:requestPlayerUpdate", (data) => {
        // Send player update to server
        client.send('game:playerUpdate', { 
            player: {
                id: store.localPlayerId,
                velocity: localGame.localTrex.velocity,
                position: localGame.localTrex.position,
                state: localGame.localTrex.state,
            }
        });
    });

    client.on("game:end", (data) => {
        console.log("GAME END");
        gameRunning = false;
        serverGame.removeEventCallbacks();
        onEnd(data.podium);
    });
}

let alive = true;

let lastTime = Date.now();

function gameLoop() {
    // Delta time
    let now = Date.now();
    let deltaTime = (now - lastTime) / 1000.0 // Calculate delta time
    lastTime = now;

    if (!gameRunning) return;

    // Local game
    if (alive) {

        localGame.update(deltaTime);

        const collisions = checkCollisions(localGame.localTrex, serverGame.obstacles);
        if (collisions.length > 0) {
            // Trex has collided with an obstacle = dead
            alive = false;
            client.send('game:dead', { playerId: store.localPlayerId });

            localGame.localTrex.state = "dead";
            localGame.localTrex.render.domElements.div.classList.add('game-trex-dead');

            console.log("DEAD");
        }
    }

    serverGame.update(deltaTime);

    render.renderAll();

    setTimeout(gameLoop);
}

function start() {
    gameLoop();
}

export default {
    mountDiv: (divId) => {render.mount(divId)},
    init,
    start,
    bindOnEnd,
} 