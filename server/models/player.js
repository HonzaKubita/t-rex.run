const { uuidv4 } = require('../utils');
const gameManager = require('../modules/gameManager');
const validators = require('../modules/validators');
const settings = require('../modules/settings');

module.exports = class Player {
    constructor(socket) {
        this.socket = socket;

        // Generate uidß
        this.id = uuidv4();

        // Initialize player variables
        this.name = "";
        this.lobbyCode = "";
        this.isMaster = false;

        // Bind socket events
        this.socket.on("joinLobby", this.joinLobby.bind(this));
        this.socket.on("hostLobby", this.hostLobby.bind(this));
        this.socket.on("leaveLobby", this.leaveLobby.bind(this));
        this.socket.on("startGame", this.startGame.bind(this));
        // Bind socket.ws close event
        this.socket.ws.on("close", this.leaveLobby.bind(this));
    }

    getSimplified() {
        return {
            id: this.id,
            name: this.name,
            lobbyCode: this.lobbyCode,
            isMaster: this.isMaster,
        };
    }

    send(eventName, data) {
        this.socket.send(eventName, data);
    }

    joinLobby(data) {
        const { lobbyCode, name } = data;
        // Check name
        const nameError = validators.checkNameError(name);
        if (nameError) {
            this.socket.send("joinLobbyError", {error: nameError});
            return;
        }

        // Check if the lobby exists (need to check this before checking if the name is taken)
        if (!gameManager.getGameByCode(lobbyCode)) {
            this.socket.send("joinLobbyError", {error: "Lobby does not exist"});
            return;
        }

        // If enabled, check if the name is already taken
        if (!settings.allowDuplicateNames) {
            const nameTaken = gameManager.getGameByCode(lobbyCode).players
                .some(player => player.name == name);
            if (nameTaken) {
                this.socket.send("joinLobbyError", {error: "Name is already taken"});
                return;
            }
        }

        // Save the name
        this.name = name;

        // Join the lobby
        const joinError = gameManager.joinPlayerToGame(lobbyCode, this);
        if (joinError) {
            this.socket.send("joinLobbyError", {error: joinError});
        } else {
            // Send success message with players in the lobby (including this player)
            const players = gameManager.getGameByCode(lobbyCode).players
                .map(player => player.getSimplified())
                // .filter(player => player.id != this.id);
            this.socket.send("joinLobbySuccess", {players: players});
            // Save the lobby code
            this.lobbyCode = lobbyCode;
        }
    }

    hostLobby(data) {
        const { name } = data;

        // Check name
        const nameError = validators.checkNameError(name);
        if (nameError) {
            this.socket.send("hostLobbyError", {error: nameError});
            return;
        }

        // Save the name
        this.name = name;

        // Create a new game
        const lobbyCode = gameManager.hostGame();

        // Save the lobby code
        this.lobbyCode = lobbyCode;

        // Set this player as the master
        this.isMaster = true;

        // Join the lobby (should not return any error as the lobby was just created)
        gameManager.joinPlayerToGame(lobbyCode, this);
   
        // Send the lobby code back to the client
        this.socket.send("hostLobbySuccess", { lobbyCode });
    }

    leaveLobby() {
        // Remove the player from the game
        gameManager.removePlayerFromGame(this.lobbyCode, this.id);
    }

    startGame() {
        // Check if the player is the master
        if (!this.isMaster) {
            this.socket.send("startGameError", {error: "Only the master can start the game"});
            return;
        }

        // Check if the player is in a game
        if (!this.lobbyCode) {
            this.socket.send("startGameError", {error: "You are not in a game"});
            return;
        }

        // Start the game
        const startGameError = gameManager.startGame(this.lobbyCode);
        if (startGameError) {
            this.socket.send("startGameError", {error: startGameError});
        } else {
            this.socket.send("startGameSuccess");
        }
    }
}