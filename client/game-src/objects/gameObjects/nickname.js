import TextGameObject from "../templates/textObject.js";

export default class Nickname extends TextGameObject {
    constructor(trex) {
        super();
        this.text = trex.player.name;
        this.parentId = trex.id;
        this.position = {x: 32-((this.text.length / 2) * 8), y: 50}
    }
}