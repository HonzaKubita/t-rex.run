// FE modules
import { useMainStore } from '@/stores/mainStore'

// Game engine modules
import render from './modules/render'
import input from './modules/input'

// Game objects
import Trex from './objects/gameObjects/trex'
import Nickname from './objects/gameObjects/nickname'
import Cactus from './objects/gameObjects/cactus'
import Score from './objects/gameObjects/score'
import Bird from './objects/gameObjects/bird'
import Ground from './objects/gameObjects/ground'
import Cloud from './objects/gameObjects/cloud'
import GameOver from './objects/gameObjects/gameOver'


function gameLoop() {
    render.renderAll();
}

function start() {
    input.init();
}

export default {
    mountDiv: (divId) => {render.mount(divId)},
    start
} 