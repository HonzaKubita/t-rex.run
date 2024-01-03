<template>
<div class="lobby">

    <h1 class="title">Lobby</h1>

    <h3>Players {{ players.length }}/6</h3>

    <div class="lobby-player-list">
        <p class="button lobby-player-container" v-for="player in players">
            <img src="/assets/crown.svg" v-if="player.isMaster">
            {{ player.name }}
        </p>
    </div>

    <div class="lobby-button-container">
        <button class="button" @click="leaveLobby">Leave</button>
        <button class="button" @click="copyLobbyCode">{{ invitePlayersText }}</button>
        <button class="button lobby-start-game" @click="startGame" v-if="localPlayer?.isMaster">Start Game</button>
    </div>

</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from "@/stores/mainStore";
import client from '@/multiplayerjs';

const store = useMainStore();

const { lobbyCode, localPlayer, players } = storeToRefs(store);

const invitePlayersText = ref("Invite Players");
function copyLobbyCode() {
    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/?join=${lobbyCode.value}`);
    invitePlayersText.value = "Link Copied!";
    setTimeout(() => invitePlayersText.value = "Invite Players", 2000);
}

function leaveLobby() {
    client.send("leaveLobby", {});
    store.resetLobby();
    navigateTo("/");
}

// Function to start game as host
function startGame() {
    client.send("startGame", {});
}

// Callback for when the host starts the game 
// (both when the host is the local player and when the host is a remote player)
// The event gets broadcasted to all players in the lobby
function onGameStarted() {
    navigateTo("/game");
}
client.on("gameStarted", onGameStarted);

onUnmounted(() => {
    client.removeCallback("startGame", onGameStarted);
});
</script>

<style>

.lobby {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 20px;
}

.lobby > .title {
    margin-bottom: 10px;
}

.lobby-player-container img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

.lobby-player-list {
    max-width: 75vw;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    margin: 150px;

    gap: 10px;
}

.lobby-button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 30px;

    gap: 10px;
}

.lobby-start-game {
    color: #ffffff;
    background-color: #000000;
}

.lobby-start-game:hover {
    color: black;
    background-color: #ffffff;
}

</style>