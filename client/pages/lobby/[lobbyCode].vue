<template>
<div class="lobby">

    <h1 class="title">Lobby</h1>

    <h3>Players</h3>

    <div class="lobby-player-list">
        <p class="button lobby-player-container" v-for="player in store.players">
            <img src="/assets/crown.svg" v-if="player.isMaster">
            {{ player.name }}
        </p>
    </div>

</div>
</template>

<script setup>
import client from "@/multiplayerjs";
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();

</script>

<style>

.lobby {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 20px;
}

.lobby-player-container img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

.lobby-player-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    margin: 30px;

    gap: 10px;
}

</style>