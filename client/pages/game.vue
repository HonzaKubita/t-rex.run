<template>
<div class="game" :class="{'fadeOut': fadeOut}">

    <h1 class="title">T-rex multiplayer</h1>

    <div class="game-canvas">
        <!-- Objects will be inserted here -->
    </div>

</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from "@/stores/mainStore";
import game from "@/game-src/gameMain";

const store = useMainStore();
const { podium } = storeToRefs(store);

const fadeOut = ref(false);

onMounted(() => {
    game.mountDiv(document.querySelector(".game-canvas"));

    game.bindOnEnd((podiumData) => {

        podium.value = podiumData;

        setTimeout(() => fadeOut.value = true, 500);
        setTimeout(() => navigateTo("/podium"), 2500);
    });

    game.init();
    game.start();
});

</script>

<style>

.game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.game .title {
    margin: 30px
}

.fadeOut {
    opacity: 0;
    animation: fadeOut 2s;
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

/* Game */

.game-canvas {
    width: 600px;
    height: 150px;

    margin-top: 70px;

    overflow: hidden;
    position: relative;
    border: 1px solid black /* Remove in production */
}

.game-object {
    position: absolute;
}

/* .game-canvas div {
    background-color: rgba(255, 0, 0, 0.603);
} */

.game-canvas p {
    font-size: 8px;
}

.game-ghost {
    transition: all 50ms;
}

.game-trex-dead {
    transition: all 100ms;
    transform: scale(0);
    animation: trex-dead 1s;
}

@keyframes trex-dead {
    0% {
        transform: translateX(0px) translateY(0px) rotate(0deg) scale(1);;
    }
    99% {
        transform: translateX(-600px) translateY(-100px) rotate(-180deg) scale(1);;
    }
    100% {
        transform: translateY(300px) scale(0);
    }
}

</style>