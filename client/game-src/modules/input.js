export default {
    pressedKeys: [], // Array of currently pressed keys
    init() {
        document.onkeydown = ({key}) => { // When key is pressed add it to array
            this.pressedKeys.push(key);
            console.log(key);
        }
        document.onkeyup = ({key}) => { // When key is released remove it from array
            this.pressedKeys.splice(this.pressedKeys.indexOf(key), 1);
        }
    },
}