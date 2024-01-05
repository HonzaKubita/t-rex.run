// FE modules
import { useMainStore } from '@/stores/mainStore'
const store = useMainStore();

// Game engine modules
import render from './render'
import input from './input'

// Game objects
import Trex from '../objects/gameObjects/trex'
import Nickname from '../objects/gameObjects/nickname'
import Cloud from '../objects/gameObjects/cloud'

// Module responsible for local gameplay
export default {
    // Constants
    groundHeight: 8,
    gravity: -1400,
    trexMoveSpeed: 300,
    trexJumpSpeed: 500,

    // Local synced to server
    localTrex: null,

    // Local only
    clouds: [],

    init() {
        input.init();
    
        // Create a trex for the local player
        this.localTrex = new Trex(0, this.groundHeight + 10, store.localPlayer, true);
        const nickname = new Nickname(store.localPlayer.name);
        this.localTrex.addChild(nickname);
        render.addObject(this.localTrex);
    
        // Modify localTrex
        this.localTrex.velocity = { x: 0, y: 0 };
        this.localTrex.controlsVelocity = { x: 0, y: 0 };
    },

    update(deltaTime) {
        // Local gameplay update
    
        // Gravity
        this.localTrex.velocity.y += this.gravity * deltaTime;
    
        // Check if trex hits the ground
        if (this.localTrex.position.y <= this.groundHeight) {
            this.localTrex.velocity.y = 0;
            this.localTrex.position.y = this.groundHeight;
        }
    
        // Check if trex hits the walls
        if (this.localTrex.position.x < 0) {
            this.localTrex.velocity.x = 0;
            this.localTrex.position.x = 0;
        }
        if (this.localTrex.position.x > 600 - 44) {
            this.localTrex.velocity.x = 0;
            this.localTrex.position.x = 600 - 44;
        }
    
        // Reset controls velocity
        this.localTrex.controlsVelocity.x = 0;
        this.localTrex.controlsVelocity.y = 0;
    
        // User input
        if ((input.isPressed("ArrowUp") || input.isPressed("w") || input.isPressed(" ")) && this.localTrex.position.y <= this.groundHeight) {
            this.localTrex.velocity.y += this.trexJumpSpeed;
        }
        if ((input.isPressed("ArrowDown") || input.isPressed("s")) && this.localTrex.position.y > this.groundHeight) {
            this.localTrex.controlsVelocity.y = -this.trexMoveSpeed;
        }
        if (input.isPressed("ArrowLeft") || input.isPressed("a")) {
            this.localTrex.controlsVelocity.x = -this.trexMoveSpeed;
        }
        if (input.isPressed("ArrowRight") || input.isPressed("d")) {
            this.localTrex.controlsVelocity.x = this.trexMoveSpeed;
        }
    
        // Apply velocity to position
        this.localTrex.position.x += (this.localTrex.velocity.x + this.localTrex.controlsVelocity.x) * deltaTime;
        this.localTrex.position.y += (this.localTrex.velocity.y + this.localTrex.controlsVelocity.y) * deltaTime;
    
        // Update trex state
        if (this.localTrex.position.y == this.groundHeight) {
            this.localTrex.state = "run";
        }
    
        if (this.localTrex.position.y > this.groundHeight) {
            this.localTrex.state = "jump";
        }

        if (this.localTrex.position.y == this.groundHeight && (input.isPressed("ArrowDown") || input.isPressed("s"))) {
            this.localTrex.state = "crouch";
        }
    }
}