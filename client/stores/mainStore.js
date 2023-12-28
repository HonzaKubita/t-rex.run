import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', {
    state: () => ({
  
      players: [],
  
    }),
    
    addPlayer(player){
      this.players.push(player)
    },

    addPlayers(players){
      this.players.extend(players)
    },

    removePlayer(playerId) {
        this.players = this.players.filter(player => player.id != playerId)
    },

    getPlayerById(playerId) {
        return this.players.find(player => player.id == playerId)
    }
  })