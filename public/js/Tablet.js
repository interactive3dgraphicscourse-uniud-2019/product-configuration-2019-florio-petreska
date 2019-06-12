class Tablet {
    constructor(path) {
        this.path = path;
        this.pivot = new THREE.Object3D();
        this.ready = false;
    }
    
    loadObject(callback) {
        const objLoader = new THREE.OBJLoader2();
        return objLoader.load(this.path, (event) => callback(event));
    }

    loaded(event) {
            this.logo = event.detail.loaderRootNode.children[0];
            this.frame = event.detail.loaderRootNode.children[1];
            this.screen = event.detail.loaderRootNode.children[2];
            this.back = event.detail.loaderRootNode.children[3];
            console.log(this.back);
            this.pivot.add(this.logo);
            this.pivot.add(this.frame);
            this.pivot.add(this.screen);
            this.pivot.add(this.back);
            this.ready = true;
    }

    addToScene(scene) {
        scene.add(this.pivot)
    }

    changeMaterial(geom, material) {
        switch(geom) {
            case 0: 
                this.back.material = material;
                this.logo.material = material;
                break;
            case 1: 
                this.frame.material = material;
                break;
        }

    }

    isReady() {
        return this.ready;
    }

    rotatePosition(){
        this.pivot.rotation.z = -195* Math.PI/180;     
        this.pivot.rotation.x = 75* Math.PI/180; 
    }
    
}
