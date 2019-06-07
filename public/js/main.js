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

    var sphereMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
			
    sphere = new THREE.Mesh(
        new THREE.SphereGeometry( 1,0,0 ),
        sphereMaterial );
        

    scene.add( sphere );

}

function update() {
    requestAnimationFrame(update);
    
    renderer.render(scene, camera);
}

console.log("HELLO!")
init();
update();