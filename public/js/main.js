let controls;

function init() {

    container = document.getElementById("threejs-container");
    console.log(container)
    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.set(0, 0, 5);
    scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xffffff);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, container);
    controls.target.set(0, 0, 0);

    var sphereMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
			
    /* sphere = new THREE.Mesh(
        new THREE.SphereGeometry( 1,0,0 ),
        sphereMaterial );
        

    scene.add( sphere ); */

    const objLoader = new THREE.OBJLoader2();
    objLoader.load('./assets/tablet-nouvs-nomat.obj ', (event) => {
      const root = event.detail.loaderRootNode;
      scene.add(root);
    });

}

function update() {
    requestAnimationFrame(update);
    
    controls.update();
    
    renderer.render(scene, camera);
}

console.log("HELLO!")
init();
update();