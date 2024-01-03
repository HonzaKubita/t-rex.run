// FE modules
import { useMainStore } from '@/stores/mainStore'
const store = useMainStore();
import client from '../../multiplayerjs'

// Game engine modules
import render from './render'

// Game objects
import Trex from '../objects/gameObjects/trex'
import Nickname from '../objects/gameObjects/nickname'
import Score from '../objects/gameObjects/score'
import Cactus from '../objects/gameObjects/cactus'
import Bird from '../objects/gameObjects/bird'
import Ground from '../objects/gameObjects/ground'

export default {

    // Objects from server
    trexes: {
        // playerid: trex
    },
    obstacles: [
        // cactuses and birds
    ],

    ground: null,

    score: null,
    speed: 1,

    // Callbacks

    onGamePlayerUpdate(data) {
        const player = data.player;
        if (player.id == store.localPlayerId) return;
        this.trexes[player.id].velocity = player.velocity;
        this.trexes[player.id].position = player.position;
        this.trexes[player.id].state = player.state;
    },

    onGameNewObstacle(data) {
        const obstacle = data.obstacle;
        let obstacleObject;
        if (obstacle.type == 'cactus') {
            obstacleObject = new Cactus(obstacle.x, obstacle.y, obstacle.size, obstacle.tier);
        } else if (obstacle.type == 'bird') {
            obstacleObject = new Bird(obstacle.x, obstacle.y);
        }
        render.addObject(obstacleObject);
        this.obstacles.push(obstacleObject);
    },

    onGamePlayerDead(data) {
        const playerId = data.playerId;

        if (playerId == store.localPlayerId) return;

        this.trexes[playerId].state = "dead";
        this.trexes[playerId].render.domElements.div.classList.add('game-trex-dead');
    },

    onPlayerLeft(data) {
        const playerId = data.playerId;
        render.removeObject(this.trexes[playerId]);
        delete this.trexes[playerId];
    },

    init() {
        // Create a trex for each player except local player
        store.players
            .filter((player) => player.id != store.localPlayerId)
            .forEach(player => {
                const trex = new Trex(0, 10, player, player.id == store.localPlayerId);
                const nickname = new Nickname(player.name);
                trex.addChild(nickname);
                
                render.addObject(trex);
        
                this.trexes[player.id] = trex;
        });

        // Create a score object
        this.score = new Score(450, 130);
        render.addObject(this.score);

        // Create a ground object
        this.ground = new Ground(0, 10);
        render.addObject(this.ground);

        // Register game callbacks
        client.on('game:playerUpdate', this.onGamePlayerUpdate.bind(this));
        client.on("game:newObstacle", this.onGameNewObstacle.bind(this));
        client.on("game:playerDead", this.onGamePlayerDead.bind(this));

        // Register general callbacks
        client.on('playerLeft', this.onPlayerLeft.bind(this));
    },

    update() {
        // Move obstacles
        this.obstacles.forEach(obstacle => {
            obstacle.position.x -= this.speed;
        });

        // Move ground
        this.ground.position.x -= this.speed;
        if (this.ground.position.x <= -1200) {
            this.ground.position.x = 0;
        }
    },

    removeEventCallbacks() {
        client.removeCallback('game:playerUpdate', this.onGamePlayerUpdate.bind(this));
        client.removeCallback('game:newObstacle', this.onGameNewObstacle.bind(this));
        client.removeCallback('game:playerDead', this.onGamePlayerDead.bind(this));
        client.removeCallback('playerLeft', this.onPlayerLeft.bind(this));
    }
}