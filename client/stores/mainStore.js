import { defineStore } from 'pinia';
import client from '@/multiplayerjs';

export const useMainStore = defineStore('mainStore', {
    state: () => ({
  
        players: [],
        localPlayerId: null,
  
    }),

    getters: {
        getPlayerById: (state) => {
            return (playerId) => state.players.find(player => player.id == playerId);
        },

        localPlayer: (state) => {
            return state.getPlayerById(state.localPlayerId);
        },
    },

    actions: {
        addPlayer(player) {
            this.players.push(player);
        },
      
        addPlayers(players) {
            this.players.push(...players);
        },
    
        removePlayer(playerId) {
            this.players = this.players.filter(player => player.id != playerId);
        },

        // Event handlers
        onPlayerJoined(data) {
            const player = data.player;
            console.log(`Player ${player.name} joined`);
            this.addPlayer(player);
        },

        onPlayerLeft(data) {
            const playerId = data.playerId;
            console.log(`Player ${this.getPlayerById(playerId).name} left`);
            this.removePlayer(playerId);
        },

        onPlayerId(data) {
            const playerId = data.playerId;
            console.log(`Player ID: ${playerId}`);
            this.localPlayerId = playerId;
        },

        // Callback registration
        registerCallbacks() {
            // Bind the callback functions to the store instance
            client.on('playerJoined', this.onPlayerJoined.bind(this));
            client.on('playerLeft', this.onPlayerLeft.bind(this));
            client.on('playerId', this.onPlayerId.bind(this));
        },
    },
});