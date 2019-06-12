let controls, tablet, vs, fs, ourMaterial, frameMaterial;
const numLights = 3;
const BACK = 0;
const FRAME = 1;

function init() {

    container = document.getElementById("threejs-container");
    console.log(container)
    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.set(0, 0, 5);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
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

    var lightParameters = {
        red: 1.0,
        green: 1.0,
        blue: 1.0,
        intensity: 1,
    }
    var materialParameters = {
        cdiff_red: 0,
        cdiff_green: 0,
        cdiff_blue: 0,
        cspec_red: 212/255,
        cspec_green: 175/255,
        cspec_blue: 55/255,
        roughness: .6
    }

    var uniforms = {
        cspec:	{ type: "v3", value: new THREE.Vector3() },
        cdiff:	{ type: "v3", value: new THREE.Vector3() },
        roughness: {type: "f", value: 0.5},
        //numberOfLights: numLights,
        pointLightsPosition:	{ type: "v3[]", value: new Array(3) },
        clight:	{ type: "v3", value: new THREE.Vector3() },

    };

    var lightsPosition = [
        new THREE.Vector3(-5,-5,0),
        new THREE.Vector3(5,5,0),
        new THREE.Vector3(0,-3,0),
    ]

    // control light position
    uniforms.pointLightsPosition.value = lightsPosition;
        uniforms.cspec.value = new THREE.Vector3(materialParameters.cspec_red,
        materialParameters.cspec_green,materialParameters.cspec_blue);
        uniforms.cdiff.value = new THREE.Vector3(materialParameters.cdiff_red,
        materialParameters.cdiff_green,materialParameters.cdiff_blue);
        uniforms.roughness.value = materialParameters.roughness>0.0?materialParameters.roughness:0.01;
        uniforms.clight.value = new THREE.Vector3(
        lightParameters.red * lightParameters.intensity,
        lightParameters.green * lightParameters.intensity,
        lightParameters.blue * lightParameters.intensity);


    var materialParametersFrame = {
        cdiff_red: 0,
        cdiff_green: 0,
        cdiff_blue: 0,
        cspec_red: 192/255,
        cspec_green: 192/255,
        cspec_blue: 192/255,
        roughness: .7
    }

    var uniformsFrame = {
        cspec:	{ type: "v3", value: new THREE.Vector3() },
        cdiff:	{ type: "v3", value: new THREE.Vector3() },
        roughness: {type: "f", value: 0.9},
        //numberOfLights: numLights,
        pointLightsPosition: { type: "v3[]", value: new Array(3) },
        clight:	{ type: "v3", value: new THREE.Vector3() },
    };

    // // control light position
        uniformsFrame.pointLightsPosition.value = lightsPosition;

        uniformsFrame.cspec.value = new THREE.Vector3(materialParametersFrame.cspec_red,
        materialParametersFrame.cspec_green,materialParametersFrame.cspec_blue);
        uniformsFrame.cdiff.value = new THREE.Vector3(materialParametersFrame.cdiff_red,
        materialParametersFrame.cdiff_green,materialParametersFrame.cdiff_blue);
        uniformsFrame.roughness.value = materialParameters.roughness>0.0?materialParametersFrame.roughness:0.01;
        uniformsFrame.clight.value = new THREE.Vector3(
        lightParameters.red * lightParameters.intensity,
        lightParameters.green * lightParameters.intensity,
        lightParameters.blue * lightParameters.intensity);







    tablet = new Tablet('./assets/tablet-groups-1.obj');
    tablet.loadObject((event)=> {
        tablet.loaded(event);
        tablet.addToScene(scene);
    });

   
    vs = document.getElementById("vertex").textContent;
    fs = document.getElementById("fragment").textContent;
    ourMaterial = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });
    frameMaterial = new THREE.ShaderMaterial({ uniforms: uniformsFrame, vertexShader: vs, fragmentShader: fs });
    

}




function update() {
    if(tablet.isReady()) {
        let backMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
        //let frameMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00})
        tablet.changeMaterial(BACK, ourMaterial);
        tablet.changeMaterial(FRAME, frameMaterial);
        tablet.rotatePosition();
        
    }
    requestAnimationFrame(update);
    
    controls.update();
    
    renderer.render(scene, camera);
}

init();

update();