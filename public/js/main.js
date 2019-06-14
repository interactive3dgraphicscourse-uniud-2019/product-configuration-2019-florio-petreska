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

    /* lights setup */

    var lightParameters = {
        red: 1.0,
        green: 1.0,
        blue: 1.0,
        intensity: 2,
    }

    var lightsPosition = [
        new THREE.Vector3(-5, 5,0),
        new THREE.Vector3(5,5,0),
        new THREE.Vector3(0, 5, -1),
    ]


    /* materials setup */

    // (SHINY) PLASTIC
    let plasticParameters = {
        roughness: 0.2,
        metalness: 0
    }

    // plastic colors
    let black = new THREE.Vector3(.01, .01, .01);
    let uBlackPlastic = {
        c:	{ type: "v3", value: black },
        roughness: {type: "f", value: plasticParameters.roughness },
        metalness: {type: "f", value: plasticParameters.metalness },
        pointLightsPosition:	{ type: "v3[]", value: lightsPosition },
        clight:	{ type: "v3", 
            value: new THREE.Vector3(
                lightParameters.red * lightParameters.intensity,
                lightParameters.green * lightParameters.intensity,
                lightParameters.blue * lightParameters.intensity
            ) 
        },
    }

    let white = new THREE.Vector3(1, 1, 1);
    let uWhitePlastic = {
        c:	{ type: "v3", value: white },
        roughness: {type: "f", value: plasticParameters.roughness },
        metalness: {type: "f", value: plasticParameters.metalness },
        pointLightsPosition:	{ type: "v3[]", value: lightsPosition },
        clight:	{ type: "v3", 
            value: new THREE.Vector3(
                lightParameters.red * lightParameters.intensity,
                lightParameters.green * lightParameters.intensity,
                lightParameters.blue * lightParameters.intensity
            ) 
        },
    }


    // (OPAQUE) PLASTIC
    let opaquePlasticParameters = {
        roughness: 0.9,
        metalness: 0
    }

    let darkGrey = new THREE.Vector3(.05, .05, .05);
    let uBlackPlasticOpaque = {
        c:	{ type: "v3", value: darkGrey },
        roughness: {type: "f", value: opaquePlasticParameters.roughness },
        metalness: {type: "f", value: opaquePlasticParameters.metalness },
        pointLightsPosition:	{ type: "v3[]", value: lightsPosition },
        clight:	{ type: "v3", 
            value: new THREE.Vector3(
                lightParameters.red * lightParameters.intensity,
                lightParameters.green * lightParameters.intensity,
                lightParameters.blue * lightParameters.intensity
            ) 
        },
    }


    // METALS
    let metalParameters = {
        roughness: 0.4,
        metalness: 1
    }  

    // metals colors
    let gold = new THREE.Vector3(212/255, 175/255, 55/255);
    let roseGold = new THREE.Vector3(184/255, 107/255, 119/255);

    let uGold = {
        c:	{ type: "v3", value: gold },
        roughness: {type: "f", value: metalParameters.roughness },
        metalness: {type: "f", value: metalParameters.metalness },
        pointLightsPosition:	{ type: "v3[]", value: lightsPosition },
        clight:	{ type: "v3", 
            value: new THREE.Vector3(
                lightParameters.red * lightParameters.intensity,
                lightParameters.green * lightParameters.intensity,
                lightParameters.blue * lightParameters.intensity
            ) 
        },
    }

    let uRoseGold = {
        c:	{ type: "v3", value: roseGold },
        roughness: {type: "f", value: metalParameters.roughness },
        metalness: {type: "f", value: metalParameters.metalness },
        pointLightsPosition:	{ type: "v3[]", value: lightsPosition },
        clight:	{ type: "v3", 
            value: new THREE.Vector3(
                lightParameters.red * lightParameters.intensity,
                lightParameters.green * lightParameters.intensity,
                lightParameters.blue * lightParameters.intensity
            ) 
        },
    }

    /* Tablet loader */
    tablet = new Tablet('./assets/tablet-groups-1.obj');
    tablet.loadObject((event)=> {
        tablet.loaded(event);
        tablet.addToScene(scene);
    });


    /* shaders retrieval */
    // COMBINED
    vs = document.getElementById("vertex").textContent;
    fs = document.getElementById("fragment").textContent;


    /* scene initialization */
    backMaterial = new THREE.ShaderMaterial({ uniforms: uGold, vertexShader: vs, fragmentShader: fs });
    frameMaterial = new THREE.ShaderMaterial({ uniforms: uBlackPlastic, vertexShader: vs, fragmentShader: fs });
    
    frameMaterials = [
        new THREE.ShaderMaterial({ uniforms: uBlackPlastic, vertexShader: vs, fragmentShader: fs }),
        new THREE.ShaderMaterial({ uniforms: uWhitePlastic, vertexShader: vs, fragmentShader: fs })
    ] 

    backMaterials = [
        new THREE.ShaderMaterial({ uniforms: uGold, vertexShader: vs, fragmentShader: fs }),
        new THREE.ShaderMaterial({ uniforms: uRoseGold, vertexShader: vs, fragmentShader: fs }),
        new THREE.ShaderMaterial({ uniforms: uBlackPlasticOpaque, vertexShader: vs, fragmentShader: fs })
        
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