export default {
    pressedKeys: [], // Array of currently pressed keys
    init() {
        document.onkeydown = ({key}) => { // When key is pressed add it to array
            if (!this.pressedKeys.includes(key)) this.pressedKeys.push(key);
        }
        document.onkeyup = ({key}) => { // When key is released remove it from array
            if (this.pressedKeys.includes(key)) this.pressedKeys.splice(this.pressedKeys.indexOf(key), 1);
        }
    },
    isPressed(key) { // Check if key is pressed
        return this.pressedKeys.includes(key);
    }
}