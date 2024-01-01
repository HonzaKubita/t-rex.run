<template>
<div class="game">

    <h1 class="title">Game</h1>

    <div class="game-canvas">
        <!-- Objects will be inserted here -->
    </div>

</div>
</template>

<script setup>
import game from "@/game-src/gameMain";

game.mountDiv(document.querySelector(".game-canvas"));

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