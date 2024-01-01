import { getuuid } from '../../utils.js'
export default class GameObject {
    constructor() {
        this.id = getuuid();
        this.position = {x: 0, y: 0};
        this.parentId = "mainGameContainer";
        this.children = [];
    }

    addChild(object) {
        object.parentId = this.id;
        this.children.push(object);
    }

    update() {};
}