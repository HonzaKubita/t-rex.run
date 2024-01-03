import ImageGameObject from '../templates/imageObject.js'
import { CollisionBox } from '../../modules/collisions.js'

export default class Bird extends ImageGameObject {
    constructor(x, y) {
        super();
        this.imgSrc = '/assets/game/bird.gif';
        this.position = {x, y};
        this.collisionBox = new CollisionBox(4, 10, 46 - 8, 40 - 10 - 10);
        this.addChild(this.collisionBox.debugBox);
    }
}