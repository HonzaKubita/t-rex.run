import ImageGameObject from '../templates/imageObject.js'
import { CollisionBox } from '../../modules/collisions.js'

export default class Trex extends ImageGameObject {
    constructor(x, y, player, isUser=false) {
        super();
        this.state = '';
        this.isUser = isUser;
        this.render.properties.div.style = `${isUser ? 'opacity: 1; z-index: 2;' : 'opacity: 0.5;'}`;
        if (!isUser)
            this.render.domElements.div.classList.add('game-ghost');
        this.imgSrc = '/assets/game/trex/still.png';
        this.position = {x: x, y: y};
        this.player = player;

        this.collisionBox = new CollisionBox(8, 8, 24, 31);
        this.addChild(this.collisionBox.debugBox);
    }
    renderUpdate() {
        switch(this.state) {
        default:
            this.imgSrc = '/assets/game/trex/still.png';
            this.collisionBox.width = 24;
            this.collisionBox.height = 31;
            break;
        case 'still':
            this.imgSrc = '/assets/game/trex/still.png';
            this.collisionBox.width = 24;
            this.collisionBox.height = 31;
            break;
        case 'run':
            this.imgSrc = '/assets/game/trex/run.gif';
            this.collisionBox.width = 24;
            this.collisionBox.height = 31;
            break;
        case 'crouch':
            this.imgSrc = '/assets/game/trex/crouch.gif';
            this.collisionBox.width = 45;
            this.collisionBox.height = 20;
            break;
        case 'jump':
            this.imgSrc = '/assets/game/trex/jump.png';
            this.collisionBox.width = 24;
            this.collisionBox.height = 31;
            break;
        case 'dead':
            this.imgSrc = '/assets/game/trex/dead.png';
            this.collisionBox.width = 24;
            this.collisionBox.height = 31;
            break;
        }
        super.renderUpdate();
    }
}