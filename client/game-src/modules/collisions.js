import DebugCollisionBox from '../objects/gameObjects/debugCollisionBox'

export class CollisionBox {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width || 0;
        this.height = height || 0;

        // Create a visual representation of the collision box for debugging
        this.debugBox = new DebugCollisionBox(this);
    }
}

export function checkCollision(object1, object2) {
    let box1 = {
        x: object1.position.x + object1.collisionBox.x,
        y: object1.position.y + object1.collisionBox.y,
        width: object1.collisionBox.width,
        height: object1.collisionBox.height
    };

    let box2 = {
        x: object2.position.x + object2.collisionBox.x,
        y: object2.position.y + object2.collisionBox.y,
        width: object2.collisionBox.width,
        height: object2.collisionBox.height
    };

    return box1.x < box2.x + box2.width &&
           box1.x + box1.width > box2.x &&
           box1.y < box2.y + box2.height &&
           box1.y + box1.height > box2.y;
}

export function checkCollisions(subject, otherObjects) {
    let collisions = [];
    for (let i = 0; i < otherObjects.length; i++) {
        if (checkCollision(subject, otherObjects[i])) {
            collisions.push(otherObjects[i]);
        }
    }
    return collisions;
}