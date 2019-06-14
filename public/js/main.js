let controls, tablet, vs, fs, backMaterial, frameMaterial, frameMaterials, backMaterials;
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
        c_red: 212/255,
        c_green: 175/255,
        c_blue: 55/255,
        roughness: 0.5,
        metalness: 1
    }

    var uniforms = {
        c:	{ type: "v3", value: new THREE.Vector3() },
        roughness: {type: "f", value: 0.5},
        //numberOfLights: numLights,
        metalness: {type: "f", value: 0.5},
        pointLightsPosition:	{ type: "v3[]", value: new Array(3) },
        clight:	{ type: "v3", value: new THREE.Vector3() },

    };

    var lightsPosition = [
        new THREE.Vector3(-5, 5,0),
        new THREE.Vector3(5,5,0),
        new THREE.Vector3(0, 5, -1),
    ]

    // control light position
    uniforms.pointLightsPosition.value = lightsPosition;
    uniforms.c.value = new THREE.Vector3(materialParameters.c_red,
    materialParameters.c_green,materialParameters.c_blue);
    uniforms.roughness.value = materialParameters.roughness;
    uniforms.metalness.value = materialParameters.metalness;
    uniforms.clight.value = new THREE.Vector3(
        lightParameters.red * lightParameters.intensity,
        lightParameters.green * lightParameters.intensity,
        lightParameters.blue * lightParameters.intensity
    );


    /* var materialParametersFrame = {
        c_red: 192/255,
        c_green: 192/255,
        c_blue: 192/255,
        roughness: 1,
        metalness: 0.1
    } */

    var materialParametersFrame = {
        c_red: 5/255,
        c_green: 5/255,
        c_blue: 5/255,
        roughness: .2,
        metalness: 0
    }

    var uniformsFrame = {
        c:	{ type: "v3", value: new THREE.Vector3() },
        roughness: {type: "f", value: 0.9},
        metalness: {type: "f", value: 0.9},
        //numberOfLights: numLights,
        pointLightsPosition: { type: "v3[]", value: new Array(3) },
        clight:	{ type: "v3", value: new THREE.Vector3() },
    };

    // // control light position
        uniformsFrame.pointLightsPosition.value = lightsPosition;

        uniformsFrame.c.value = new THREE.Vector3(materialParametersFrame.c_red,
        materialParametersFrame.c_green,materialParametersFrame.c_blue);
        uniformsFrame.roughness.value = materialParametersFrame.roughness;
        uniformsFrame.metalness.value = materialParametersFrame.metalness;
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
    backMaterial = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });
    frameMaterial = new THREE.ShaderMaterial({ uniforms: uniformsFrame, vertexShader: vs, fragmentShader: fs });
    
    frameMaterials = [
        new THREE.ShaderMaterial({ uniforms: uniformsFrame, vertexShader: vs, fragmentShader: fs }),
        new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs })
    ] 

    backMaterials = [
        new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs }),
        new THREE.ShaderMaterial({ uniforms: uniformsFrame, vertexShader: vs, fragmentShader: fs })
        
    ] 
    

}




function update() {
    if(tablet.isReady()) {
        tablet.changeMaterial(BACK, backMaterial);
        tablet.changeMaterial(FRAME, frameMaterial);
        tablet.rotatePosition();
        
    }
    requestAnimationFrame(update);
    
    controls.update();
    
    renderer.render(scene, camera);
}

init();

update();

let changeMaterial = (code) => {
    code = code.split("-");
    console.log(parseInt(code[1]))
    if(code[0]=="f"){
        frameMaterial = frameMaterials[parseInt(code[1])-1];
    }
    if(code[0] == "b"){
        backMaterial = backMaterials[parseInt(code[1])-1];
    }

    update();
}


//click listener
document.addEventListener('click', function (event) {
	// If the clicked element doesn't have the right selector, bail
	if (!event.target.parentNode.matches('.prop-images .selection')) return;

	// Don't follow the link
	event.preventDefault();

    changeMaterial(event.target.parentNode.getAttribute("data-value"))
    // Log the clicked element in the console
    let children = event.target.parentNode.parentNode.children
    for(let i=0; i<children.length; i++) {
        children[i].classList.remove("active")   
    }
    event.target.parentNode.classList.add("active")

}, false);