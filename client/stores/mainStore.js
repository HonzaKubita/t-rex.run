import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', {
    state: () => ({
  
        players: [],
  
    }),

    getters: {
        getPlayerById(playerId) {
            return this.players.find(player => player.id == playerId);
        },
    },

    actions: {
        addPlayer(player){
            this.players.push(player);
        },
      
        addPlayers(players){
            this.players.push(...players);
        },
    
        removePlayer(playerId) {
            this.players = this.players.filter(player => player.id != playerId);
        },
    },
  });