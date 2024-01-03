import ImageGameObject from '../templates/imageObject.js'
import { CollisionBox } from '../../modules/collisions.js'

const collisionBoxes = {
    small: {
        0: {x: 4, y: 4, width: 17 - 8, height: 35 - 8},
        1: {x: 4, y: 4, width: 34 - 8, height: 35 - 8},
        2: {x: 4, y: 4, width: 50 - 8, height: 35 - 8},
    },
    big: {
        0: {x: 6, y: 8, width: 25 - 12, height: 50 - 16},
        1: {x: 6, y: 8, width: 50 - 12, height: 50 - 16},
        2: {x: 6, y: 8, width: 75 - 12, height: 50 - 16},
    },
}

export default class Cactus extends ImageGameObject {
    constructor(x, y, size, tier) {
        super();
        this.imgSrc = `/assets/game/cactus/${size}_${tier}.png`;
        this.position = {x, y};
        this.size = size;
        this.tier = tier;

        const collisionBoxSize = collisionBoxes[size][tier];
        this.collisionBox = new CollisionBox(collisionBoxSize.x, collisionBoxSize.y, collisionBoxSize.width, collisionBoxSize.height);
        // this.addChild(this.collisionBox.debugBox);
    }
}