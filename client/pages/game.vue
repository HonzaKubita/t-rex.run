<template>
<div class="game">

    <h1 class="title">T-rex multiplayer</h1>

    <div class="game-canvas">
        <!-- Objects will be inserted here -->
    </div>

</div>
</template>

<script setup>
import game from "@/game-src/gameMain";

onMounted(() => {
    game.mountDiv(document.querySelector(".game-canvas"));
    game.init();
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



</style>