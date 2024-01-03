export class RenderModule {
    constructor(el) {
        this.el = el;

        this.domElements = {
            div: document.createElement('div'),
            el: document.createElement(el),
        };

        this.properties = {
            div: {},
            el: {},
        };
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
        // All objects have mainGameContainer as their default parentId
        // so by default all objects are added to the mainGameContainer
        this._div.id = "mainGameContainer";
    },

    _updateObject(object) {
        object.renderUpdate();
        let div = document.getElementById(object.id);
        let el = document.getElementById(`${object.id}-el`);

        // Update div properties only if they don't match the object's properties
        for (let i in object.render.properties.div) {
            if (div[i] != object.render.properties.div[i]) {
                div[i] = object.render.properties.div[i];
            }
        }

        // Update el properties only if they don't match the object's properties
        for (let i in object.render.properties.el) {
            if (el[i] != object.render.properties.el[i]) {
                el[i] = object.render.properties.el[i];
            }
        }

        // Update position only if it doesn't match the object's position
        if (div.style.left != `${object.position.x}px` || div.style.bottom !== `${object.position.y}px`) {
            div.style.left = `${object.position.x}px`; // Move object
            div.style.bottom = `${object.position.y}px`;
        }
    },

    addObject(object) {
        const el = object.render.domElements.el;
        el.id = `${object.id}-el`;

        let elDiv = object.render.domElements.div;
        elDiv.classList.add('game-object');
        elDiv.id = object.id;
        elDiv.appendChild(el);
        
        for (let i in object.render.properties.divProps) 
            div[i]=object.render.properties.divProps[i];  // Copy object properties to div
        for (let i in object.render.properties.elProps) 
            el[i]=object.render.properties.elProps[i];  // Copy object properties to element

        // Add object to their parent (default is mainGameContainer)
        let parent = document.getElementById(object.parentId);
        parent.appendChild(elDiv);

        // Add all children to the scene 
        // (they will be added into this object as their parentId is not null)
        object.children.forEach(child => {
            this.addObject(child);
        });

        // Add object to the sceneObjects array so it can be updated with renderAll()
        this.sceneObjects.push(object);
    },

    removeObject(object) {
        let div = document.getElementById(object.id);
        const parent = document.getElementById(object.parentId);
        parent.removeChild(div);
        this.sceneObjects.splice(this.sceneObjects.indexOf(object), 1);
    },

    renderAll() {
        // Update all objects and their children
        this.sceneObjects.forEach(object => {
            // Update
            this._updateObject(object);

            // Update children
            object.children.forEach(child => {
                this._updateObject(child);
            });
        })
    }
}