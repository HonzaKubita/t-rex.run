const settings = require("../modules/settings");

module.exports = class Game {
    constructor(lobbyCode) {
        this.lobbyCode = lobbyCode;
        this.players = [];
        this.gameState = "inLobby"; // inLobby is default when the game is created

        this.obstacleCooldown = 100;
        this.obstacleCooldownTimer = 0;

        this.podium = [];
    }

    // ws functions
    send(playerId, eventName, data) {
        this.players.forEach(player => {
            if (player.id == playerId) {
                player.send(eventName, data);
            }
        });
    }

    broadcast(eventName, data, excludePlayerId = "") {
        this.players.forEach(player => {
            if (player.id != excludePlayerId) {
                player.send(eventName, data);
            }
        });
    }

    // game functions
    addPlayer(player) {
        this.players.push(player);
        this.broadcast("playerJoined", {player: player.getSimplified()}, player.id);
    }

    removePlayer(playerId) {
        this.players = this.players.filter(player => player.id != playerId);
        this.broadcast("playerLeft", { playerId: playerId });
    }

    start() {
        this.gameState = "inGame";
        this.broadcast("gameStarted", {});

        // Add listeners for player actions
        this.players.forEach(player => {
            player.socket.on("game:playerUpdate", this.onPlayerUpdate.bind(this));
            player.socket.on("game:dead", this.onPlayerDead.bind(this));
        });

        // Start game after 1 second
        setTimeout(() => {
            this.broadcast("game:start", {});
            this.tick();
        }, 1000);
    }

    end() {
        this.gameState = "end";
        
        this.broadcast("game:end", { 
            podium: this.podium
                        .reverse()
                        .map(player => player.getSimplified()) 
        });

        // Remove listeners for player actions
        this.players.forEach(player => {
            player.socket.removeCallback("game:playerUpdate", this.onPlayerUpdate.bind(this));
            player.socket.removeCallback("game:dead", this.onPlayerDead.bind(this));
        });
    }

    // inGame callbacks and functions
    onPlayerUpdate(data) {
        const playerData = data.player;
        this.broadcast("game:playerUpdate", { player: playerData }, playerData.id);
    }

    onPlayerDead(data) {
        const playerId = data.playerId;
        this.broadcast("game:playerDead", { playerId: playerId }, playerId);

        // Update player status
        const player = this.players.find(player => player.id == playerId);
        player.alive = false;
        this.podium.push(player);

        // Check if all players are dead
        const alivePlayers = this.players.some(player => player.alive);

        // If all players are dead, end the game
        if (!alivePlayers) {
            this.end();
        }
    }

    requestPlayerUpdates() {
        this.broadcast("game:requestPlayerUpdate", {});
    }

    tick() { // Run every 1000/serverTicksPerSecond ms
        // Update player positions
        this.requestPlayerUpdates();

        // Creating obstacle
        if (this.obstacleCooldownTimer <= 0) {
            const shouldCreateObstacle = Math.random() < 0.3; // 30% chance to create an obstacle
            if (shouldCreateObstacle) {
                const obstacleType = Math.random() < 0.85 ? "cactus" : "bird"; // Randomly choose between "cactus" and "bird"
                const obstacleSize = Math.random() < 0.7 ? "small" : "big"; // Randomly choose between "small" and "big"
                const obstacleTier = Math.floor(Math.random() * 3); // Randomly choose between 0, 1, and 2
                const obstacle = { type: obstacleType, x: 1000, y: 10, size: obstacleSize, tier: obstacleTier };

                if (obstacleType == "bird") {
                    obstacle.y = Math.random() < 0.5 ? 10 : 30; // Randomly choose between 10 and 30 (bird height
                }

                this.broadcast("game:newObstacle", { obstacle });
                this.obstacleCooldownTimer = this.obstacleCooldown; // Reset the cooldown timer
            }
        } else {
            this.obstacleCooldownTimer--; // Decrease the cooldown
        }

        // Schedule next tick
        if (this.gameState == "inGame")
            setTimeout(this.tick.bind(this), 1000 / settings.serverTicksPerSecond);
    }
}