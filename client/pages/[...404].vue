<template>
<div class="notfound">

    <img src="/assets/404.png" alt="404">
    <h1>404 Not Found!</h1>
    <NuxtLink to="/" class="button">Back to home</NuxtLink>

</div>
</template>

<style>

.notfound {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.notfound > .button {
    margin-top: 20px;
    text-decoration: none;
}

</style>