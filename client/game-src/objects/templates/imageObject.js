import GameObject from "./gameObject";
import { RenderModule } from '../../modules/render.js'
export default class ImageGameObject extends GameObject {
    constructor() {
        super();
        this.render = new RenderModule('img');
        this.imgSrc = '';
        this._imgSrc = '';
        this._fullSrc = '';
    }
    renderUpdate() {
        // Only update the image if the src has changed
        if (this.imgSrc != this._imgSrc) {
            this._imgSrc = this.imgSrc;
            this._fullSrc = new URL(this._imgSrc, window.location.href);
        }
        this.render.properties.el.src = this._fullSrc;
    }
}