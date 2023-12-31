<template>
<div class="index">

    <h1 class="title">T-rex Multiplayer</h1>

    <div class="index-menu">

        <div class="index-inputs">
            <div>
                <p>Nickname</p>
                <input type="text" placeholder="T-rex" class="input" v-model="nicknameInput" @input="resetErrorText"/>
            </div>

            <div v-if="lobbyCodeRequired">
                <p>Lobby Code</p>
                <input type="text" placeholder="4JX2M0" class="input" v-model="lobbyCodeInput" @input="resetErrorText"/>
            </div>

            <p class="index-error" v-if="errorText">{{ errorText }}</p>

        </div>

        <div class="index-buttons">
            <button class="button" @click="hostLobby">Host Game</button>
            <button class="button" @click="joinLobby">Join Game</button>
        </div>
    </div>

    <div class="index-decorations">
        <img src="/assets/game/trex/still.png" @click="animateTrex" :class="{'t-rex-jumping': trexJumping}">
    </div>

</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import client from "@/multiplayerjs";
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();
const { localPlayerId } = storeToRefs(store);

const nicknameInput = ref("");
const lobbyCodeInput = ref("");
const lobbyCodeRequired = ref(false);

const errorText = ref("");

function resetErrorText() {
    errorText.value = "";
}

function hostLobby() {
    client.send("hostLobby", { name: nicknameInput.value });
}

function joinLobby() {
    if (!lobbyCodeRequired.value) {
        lobbyCodeRequired.value = true;
        return;
    }
    client.send("joinLobby", { lobbyCode: lobbyCodeInput.value, name: nicknameInput.value });
}

function onHostLobbySuccess(data) {
    const lobbyCode = data.lobbyCode;
    console.log(`Hosted lobby ${lobbyCode}`);

    // Add the hosting player to the store
    store.addPlayer({
        id: localPlayerId,
        name: nicknameInput.value,
        isMaster: true
    });

    store.setLobbyCode(lobbyCode);

    navigateTo("/lobby/" + lobbyCode);
}

function onHostLobbyError(data) {
    const error = data.error;
    errorText.value = error;
}

function onJoinLobbySuccess(data) {
    const players = data.players;
    store.addPlayers(players);
    store.setLobbyCode(lobbyCodeInput.value);
    console.log(`Joined lobby ${lobbyCodeInput.value} with players: ${players.map(p => p.name)}`);
    navigateTo("/lobby/" + lobbyCodeInput.value);
}

function onJoinLobbyError(data) {
    const error = data.error;
    errorText.value = error;
}

// Register callbacks
client.on("hostLobbySuccess", onHostLobbySuccess);
client.on("hostLobbyError", onHostLobbyError);
client.on("joinLobbySuccess", onJoinLobbySuccess);
client.on("joinLobbyError", onJoinLobbyError);

// Unregister callbacks before leaving page
onUnmounted(() => {
    client.removeCallback("hostLobbySuccess", onHostLobbySuccess);
    client.removeCallback("hostLobbyError", onHostLobbyError);
    client.removeCallback("joinLobbySuccess", onJoinLobbySuccess);
    client.removeCallback("joinLobbyError", onJoinLobbyError);
});


// Small easter egg
const trexJumping = ref(true);

function animateTrex() {
    trexJumping.value = true;
    setTimeout(() => {
        trexJumping.value = false;
    }, 500);
}

</script>

<style>

.index {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.index-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin: 10px;
}

.index-inputs {
    margin: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.index-error {
    color: red;
}

.index-buttons {
    display: flex;
    flex-direction: row;
    
    gap: 20px;
}


.index-decorations {
    width: 100vw;

    position: fixed;
    bottom: 0;
    left: 0;

    padding-left: 30px;

    margin-bottom: 10px;

    background-image: url("/assets/game/ground.png");
    background-repeat: repeat-x;
    background-position: bottom;
}

.t-rex-jumping {
    animation: trex-jump 0.5s ease-in-out;
}

@keyframes trex-jump {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0px);
    }
}

</style>