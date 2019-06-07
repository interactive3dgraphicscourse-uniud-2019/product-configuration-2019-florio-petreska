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
{
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
}
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
}

let tablet = new Tablet('./assets/tablet-groups.obj');
tablet.loadObject((event)=> {
    tablet.loaded(event);
    tablet.addToScene(scene);
})

    

}

function update() {
    requestAnimationFrame(update);
    
    controls.update();
    
    renderer.render(scene, camera);
}

console.log("HELLO!")
init();
update();