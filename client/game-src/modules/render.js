export class RenderModule {
    constructor(el) {
        this.el = el,
        this.properties = {
            div: {},
            el: {},
        }
    }
    renderUpdate() {}
}

export default {
    _div: null, // Div element put objects in
    sceneObjects: [], // Objects in scene
    _inRender: [],

    // Setup functions
    mount(div) {
        this._div = div;
    },

    _updateObject(object) {
        object.renderUpdate();
        let div = document.getElementById(object.id);
        let el = document.getElementById(`${object.id}-el`);
        for (let i in object.render.properties.div) div[i]=object.render.properties.div[i]; // Copy object properties to div
        for (let i in object.render.properties.el) el[i]=object.render.properties.el[i]; // Copy object properties to element
        div.style.left = `${object.position.x}px`; // Move object
        div.style.bottom = `${object.position.y}px`;
    },

    addObject(object) {
        let el = document.createElement(object.render.el);
        el.id = `${object.id}-el`;

        let elDiv = document.createElement('div');
        elDiv.classList.add('game-object');
        elDiv.id = object.id;
        elDiv.appendChild(el);
        
        for (let i in object.render.properties.divProps) 
            div[i]=object.render.properties.divProps[i];  // Copy object properties to div
        for (let i in object.render.properties.elProps) 
            el[i]=object.render.properties.elProps[i];  // Copy object properties to element

        if (object.parentId != null) {
            let parent = document.getElementById(object.parentId);
            parent.appendChild(elDiv);
        } else {
            this._div.appendChild(elDiv);
        }

        this.sceneObjects.push(object);
    },

    removeObject(object) {
        let div = document.getElementById(object.id);
        this._div.removeChild(div);
        this.sceneObjects.splice(this.sceneObjects.indexOf(object), 1);
    },

    renderAll() {
        this.sceneObjects.forEach(object => { // Render (move)
            this._updateObject(object);
        })
    }
}