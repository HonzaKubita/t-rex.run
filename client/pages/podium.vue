<template>
<div class="podium">

    <h1 class="title">Podium</h1>

    <div class="podium-top3">

        <!-- 2nd place -->
        <div class="podium-2nd" v-if="podium.length >= 2">
            <img src="/assets/game/trex/still.png" class="trex-animation">
            <h3>2nd</h3>
            <h2>{{ podium[1].name }}</h2>
        </div>

        <!-- 1st place -->
        <div class="podium-1st" v-if="podium.length >= 1">
            <img src="/assets/game/trex/still.png" class="trex-animation">
            <h3>1st</h3>
            <h1>{{ podium[0].name }}</h1>
        </div>

        <!-- 3rd place -->
        <div class="podium-3rd" v-if="podium.length >= 3">
            <img src="/assets/game/trex/still.png" class="trex-animation">
            <h3>3rd</h3>
            <h3>{{ podium[2].name }}</h3>
        </div>

    </div>

    <!-- Rest of the players -->
    <div class="podium-rest" v-if="podium.length > 3">
        <div v-for="(player, index) in podium.slice(3)" class="podium-rest-player">
            <img src="/assets/game/trex/still.png" class="trex-animation">
            <p>{{ index + 4 }}th</p>
            <h3>{{ player.name }}</h3>
        </div>
    </div>

    <div class="podium-buttons">
        <button class="button" @click="toMenu">Back to menu</button>
    </div>

</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from "@/stores/mainStore";
import client from "@/multiplayerjs";

const store = useMainStore();
const { podium } = storeToRefs(store);

function toMenu() {
    store.resetLobby();
    client.send("leaveLobby", {});
    navigateTo("/");
}

</script>

<style>

.podium {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 30px;
}

.podium-top3 {
    width: 90vw;

    margin-top: 10px;

    display: flex;
    flex-direction: row;
    justify-content: center;
}

.podium-2nd, .podium-3rd {
    width: 30vw;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0 30px;
}

.podium-2nd {
    align-items: flex-end;
}

.podium-3rd {
    align-items: flex-start;
}

.podium-2nd img {
    width: 200px;
}

.podium-3rd img {
    width: 150px;
}

.podium-1st {
    width: 30vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin: 30px;
}

.podium-1st img {
    width: 300px;
}

.podium-top3 p {
    margin: 5px;

    font-size: 20px;
}

.podium-rest {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.podium-rest-player {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin: 20px;
}

.trex-animation {
    animation: trex-spin 1.2s infinite;
}

/* Funny funky trex animation */
@keyframes trex-spin {
    0% {
        transform: rotate(0deg) translateY(0px) rotateY(180deg);
    }
    25% {
        transform: rotate(10deg) translateY(-10px) rotateY(180deg);
    }
    50% {
        transform: rotate(0deg) translateY(0px) rotateY(0deg);
    }
    75% {
        transform: rotate(-10deg) translateY(-10px) rotateY(0deg);
    }
    100% {
        transform: rotate(0deg) translateY(0px) rotateY(180deg);
    }
}

</style>