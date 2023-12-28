<template>
<div class="join">

    <h1>Join</h1>

    <div class="join-menu">
        <div>
            <p>Nickname</p>
            <input type="text" placeholder="T-rex" class="input" v-model="nicknameInput"/>
        </div>

        <button class="button" @click="joinLobby">Join Game</button>
    </div>

</div>
</template>

<script setup>
import client from "@/multiplayerjs";

const route = useRoute();

const nicknameInput = ref("");
const lobbyCode = route.params.lobbyCode;

function joinLobby() {
    client.joinLobby(lobbyCode, nicknameInput.value);
}

function onJoinLobbySuccess(data) {
    const players = data.players;
    console.log(`Joined lobby ${lobbyCode} with players: ${players.map(p => p.name)}`);
    navigateTo("/lobby/" + lobbyCode);
}

// Register callback
client.on("joinLobbySuccess", onJoinLobbySuccess);

// Unregister callback before leaving page
onUnmounted(() => {
    client.removeCallback("joinLobbySuccess", onJoinLobbySuccess);
});

</script>

<style>

.join {
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.join-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
}

</style>