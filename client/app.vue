<template>
<div>
    <NuxtPage />

    <a href="https://github.com/HonzaKubita/t-rex.run" target="_blank" class="github-link">
        <img src="/assets/github.svg">
    </a>
</div>
</template>

<script setup>
import { useMainStore } from "@/stores/mainStore";
import client from "@/multiplayerjs";

const store = useMainStore();

// Make pinia register callbacks for player joining/leaving
store.registerCallbacks();

client.connect("ws://localhost:5432");

</script>

<style>

.github-link {
    position: fixed;
    bottom: 10px;
    right: 10px;

    width: 50px;
    height: 50px;
}

</style>