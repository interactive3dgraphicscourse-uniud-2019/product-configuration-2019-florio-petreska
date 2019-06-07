class Tablet {
    constructor(path) {
        this.path = path;
        this.pivot = new THREE.Object3D();
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
    }

    addToScene(scene) {
        scene.add(this.pivot)
    }
}
