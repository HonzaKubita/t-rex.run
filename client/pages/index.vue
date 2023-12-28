<template>
<div class="index">

    <h1 class="title">T-rex Multiplayer</h1>

    <div class="index-menu">

        <div class="index-inputs">
            <p>Nickname</p>
            <input type="text" placeholder="T-rex" class="input"/>

            <div>
                <p>Lobby Code</p>
                <input type="text" placeholder="4JX2M0" class="input"/>
            </div>

        </div>

        <div class="index-buttons">
            <button @click="hostGame" class="button">Host Game</button>
            <button @click="joinGame" class="button">Join Game</button>
        </div>
    </div>

    <div class="index-decorations">
        <img src="/assets/game/trex/still.png" @click="animateTrex" :class="{'t-rex-jumping': trexJumping}">
    </div>

</div>
</template>

<script setup>
import client from "@/multiplayerjs";

function hostGame() {
  
}

function joinGame() {

}


const trexJumping = ref(false);

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