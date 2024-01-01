import TextGameObject from "../templates/textObject.js";

export default class Nickname extends TextGameObject {
    constructor(playerName) {
        super();
        this.text = playerName;
        this.position = {x: 32-((this.text.length / 2) * 8), y: 50}
    }
}