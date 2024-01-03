import GameObject from "../templates/gameObject";
import { RenderModule } from '../../modules/render.js'

export default class DebugCollisionBox extends GameObject {
    constructor(collisionBox) {
        super();
        this.render = new RenderModule('div');
        this.collisionBox = collisionBox;
    }
    renderUpdate() {
        this.render.properties.el.style = `opacity: 0.5; z-index: 2; border: 1px solid red; width: ${this.collisionBox.width}px; height: ${this.collisionBox.height}px;`;
        this.position = {x: this.collisionBox.x, y: this.collisionBox.y};
    }
}