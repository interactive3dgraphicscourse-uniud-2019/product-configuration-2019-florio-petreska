let controls, tablet, vs, fs, tvs, tfs, backMaterial, frameMaterial, screenMaterial, frameMaterials, backMaterials, container, renderer, camera;
const numLights = 3;
const BACK = 0;
const FRAME = 1;
const SCREEN = 2;

container = document.getElementById("threejs-container");
console.log(container)
camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 1000);
scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer({ antialias: true });
controls = new THREE.OrbitControls(camera, container);

var stats = new Stats();

/* lights setup */
var lightParameters = {
    red: 1.0,
    green: 1.0,
    blue: 1.0,
    intensity: 2,
}
var lightsPosition = [
    new THREE.Vector3(-5, 5,-2),
    new THREE.Vector3(5,5,0),
    new THREE.Vector3(0, 5, -1),
]
let ambientLight = new THREE.Vector3(.2,.2,.2)

var loader = new THREE.CubeTextureLoader();
//var loader = new THREE.HDRCubeTextureLoader();
loader.setPath( 'textures/Studio/' );
//loader.setType( THREE.UnsignedByteType );

var textureCube = loader.load( [
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png'
] );

/* var textureCube = loader.load( [
    'px.hdr', 'nx.hdr',
    'py.hdr', 'ny.hdr',
    'pz.hdr', 'nz.hdr'
] ); */

scene.background = textureCube;


/* materials setup */

// (SHINY) PLASTIC
let plasticParameters = {
    roughness: 0.3,
    metalness: 0
}
// plastic colors
let black = new THREE.Vector3(.01, .01, .01);
let uBlackPlastic = {
    c:	{ type: "v3", value: black },
    roughness: {type: "f", value: plasticParameters.roughness },
    metalness: {type: "f", value: plasticParameters.metalness },
    pointLightsPosition:	{ type: "v3[]", value: lightsPosition },
    ambientLight: {type:"vec3", value: ambientLight},
    envMap: {type:"t", value: textureCube},
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
    ambientLight: {type:"vec3", value: ambientLight},
    envMap: {type:"t", value: textureCube},
    pointLightsPosition:	{ type: "v3[]", value: lightsPosition },
    clight:	{ type: "v3", 
        value: new THREE.Vector3(
            lightParameters.red * lightParameters.intensity,
            lightParameters.green * lightParameters.intensity,
            lightParameters.blue * lightParameters.intensity
        ) 
    },
}

let screenBlack = new THREE.Vector3(.02, .02, .02);
let uScreen = {
    c:	{ type: "v3", value: screenBlack },
    roughness: {type: "f", value: 0.2 },
    metalness: {type: "f", value: plasticParameters.metalness },
    pointLightsPosition:	{ type: "v3[]", value: lightsPosition },
    ambientLight: {type:"vec3", value: ambientLight},
    envMap: {type:"t", value: textureCube},
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
    roughness: .9,
    metalness: 0
}
let darkGrey = new THREE.Vector3(.01, .01, .01);
let uBlackPlasticOpaque = {
    c:	{ type: "v3", value: darkGrey },
    roughness: {type: "f", value: opaquePlasticParameters.roughness },
    metalness: {type: "f", value: opaquePlasticParameters.metalness },
    ambientLight: {type:"vec3", value: ambientLight},
    envMap: {type:"t", value: textureCube},
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
    roughness: 0.2,
    metalness: 1
}  
// metals colors
let gold = new THREE.Vector3(212/255, 175/255, 55/255);
let silver = new THREE.Vector3(196/255, 202/255, 206/255);
//let roseGold = new THREE.Vector3(184/255, 107/255, 119/255);

let uGold = {
    c:	{ type: "v3", value: gold },
    roughness: {type: "f", value: metalParameters.roughness },
    metalness: {type: "f", value: metalParameters.metalness },
    ambientLight: {type:"vec3", value: ambientLight},
    envMap: {type:"t", value: textureCube},
    pointLightsPosition:	{ type: "v3[]", value: lightsPosition },
    clight:	{ type: "v3", 
        value: new THREE.Vector3(
            lightParameters.red * lightParameters.intensity,
            lightParameters.green * lightParameters.intensity,
            lightParameters.blue * lightParameters.intensity
        ) 
    },
}

let uSilver = {
    c:	{ type: "v3", value: silver },
    roughness: {type: "f", value: metalParameters.roughness },
    metalness: {type: "f", value: metalParameters.metalness },
    ambientLight: {type:"vec3", value: ambientLight},
    envMap: {type:"t", value: textureCube},
    pointLightsPosition:	{ type: "v3[]", value: lightsPosition },
    clight:	{ type: "v3", 
        value: new THREE.Vector3(
            lightParameters.red * lightParameters.intensity,
            lightParameters.green * lightParameters.intensity,
            lightParameters.blue * lightParameters.intensity
        ) 
    },
}
/* let uRoseGold = {
    c:	{ type: "v3", value: roseGold },
    roughness: {type: "f", value: metalParameters.roughness },
    metalness: {type: "f", value: metalParameters.metalness },
    ambientLight: {type:"vec3", value: ambientLight},
    envMap: {type:"t", value: textureCube},
    pointLightsPosition:	{ type: "v3[]", value: lightsPosition },
    clight:	{ type: "v3", 
        value: new THREE.Vector3(
            lightParameters.red * lightParameters.intensity,
            lightParameters.green * lightParameters.intensity,
            lightParameters.blue * lightParameters.intensity
        ) 
    },
} */

/* textured materials */

let textureParameters = {
    cloth: "HerbTanCottonTwill",
    gold: "Tcom_Plastic_SpaceBlanketFolds",
    //material: "Wood_Wicker",
}

let diffuseMap = loadTexture( "textures/" + textureParameters.cloth + "_Base_Color.jpg" );
let specularMap = loadTexture( "textures/" + textureParameters.cloth + "_Metallic.jpg" );
let roughnessMap = loadTexture( "textures/" + textureParameters.cloth + "_Roughness.jpg" );
let normalMap = loadTexture( "textures/" + textureParameters.cloth + "_Normal.jpg" );
let aoMap = loadTexture( "textures/" + textureParameters.cloth + "_Ambient_Occlusion.jpg" );
let alphaMap = loadTexture( "textures/acme_fill.png" );
let alphaMapInverted = loadTexture( "textures/acme_fill_inverted.png" );

let uACMECotton = {
    c:	{ type: "v3", value: silver },
    aRoughness: {type: "f", value: .2 },
    aMetalness: {type: "f", value: metalParameters.metalness },
    diffuseMap: { type: "t", value: diffuseMap},
    specularMap: { type: "t", value: specularMap},
    roughnessMap:	{ type: "t", value: roughnessMap},
    normalMap:	{ type: "t", value: normalMap},
    alphaMap: {type:"t", value: alphaMap},
    aoMap:	{ type: "t", value: aoMap},
    ambientLight: {type:"v3", value: ambientLight},
    envMap: {type:"t", value: textureCube},
    pointLightsPosition:	{ type: "v3[]", value: lightsPosition   },
    clight:	{ type: "v3", 
        value: new THREE.Vector3(
            lightParameters.red * lightParameters.intensity,
            lightParameters.green * lightParameters.intensity,
            lightParameters.blue * lightParameters.intensity
        ) 
    },
    textureRepeat: { type: "v2", value: new THREE.Vector2(3,4) }
};

let uACMECottonInverted = {
    c:	{ type: "v3", value: silver },
    aRoughness: {type: "f", value: .3 },
    aMetalness: {type: "f", value: metalParameters.metalness },
    diffuseMap: { type: "t", value: alphaMapInverted},
    specularMap: { type: "t", value: specularMap},
    roughnessMap:	{ type: "t", value: roughnessMap},
    normalMap:	{ type: "t", value: normalMap},
    alphaMap: {type:"t", value: alphaMapInverted},
    aoMap:	{ type: "t", value: aoMap},
    ambientLight: {type:"v3", value: ambientLight},
    envMap: {type:"t", value: textureCube},
    pointLightsPosition:	{ type: "v3[]", value: lightsPosition   },
    clight:	{ type: "v3", 
        value: new THREE.Vector3(
            lightParameters.red * lightParameters.intensity,
            lightParameters.green * lightParameters.intensity,
            lightParameters.blue * lightParameters.intensity
        ) 
    },
    textureRepeat: { type: "v2", value: new THREE.Vector2(3,4) }
};

let gdiffuseMap = loadTexture( "textures/" + textureParameters.gold + "_Base_Color.jpg" );
let gspecularMap = loadTexture( "textures/" + textureParameters.gold + "_Metallic.jpg" );
let groughnessMap = loadTexture( "textures/" + textureParameters.gold + "_Roughness.jpg" );
let gnormalMap = loadTexture( "textures/" + textureParameters.gold + "_Normal.jpg" );
let gaoMap = loadTexture( "textures/" + textureParameters.gold + "_Ambient_Occlusion.jpg" );


let uAncientGold = {
    c:	{ type: "v3", value: darkGrey },
    aRoughness: {type: "f", value: opaquePlasticParameters.roughness },
    aMetalness: {type: "f", value: opaquePlasticParameters.metalness },
    diffuseMap: { type: "t", value: gdiffuseMap},
    specularMap: { type: "t", value: gspecularMap},
    roughnessMap:	{ type: "t", value: groughnessMap},
    normalMap:	{ type: "t", value: gnormalMap},
    alphaMap: {type:"t", value: alphaMap},
    aoMap:	{ type: "t", value: gaoMap},
    ambientLight: {type:"v3", value: ambientLight},
    envMap: {type:"t", value: textureCube},
    pointLightsPosition:	{ type: "v3[]", value: lightsPosition   },
    clight:	{ type: "v3", 
        value: new THREE.Vector3(
            lightParameters.red * lightParameters.intensity,
            lightParameters.green * lightParameters.intensity,
            lightParameters.blue * lightParameters.intensity
        ) 
    },
    textureRepeat: { type: "v2", value: new THREE.Vector2(3,3) }
};

/* shaders retrieval */
// COMBINED
//vs = document.getElementById("vertex").textContent;
fs = document.getElementById("fragment").textContent;
// TEXTURES
vs = document.getElementById("vertex-textures").textContent;
//tfs = document.getElementById("fragment-textures").textContent;
// BACKDOUBLE
dfs = document.getElementById("fragment-doublematerial").textContent;


function init() {
    camera.position.set(0, 0, 5);
    scene.background = new THREE.Color(0xeeeeee);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    controls.target.set(0, 0, 0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );
    
    /* scene initialization */
    backMaterial = new THREE.ShaderMaterial({ uniforms:  uACMECottonInverted, vertexShader: vs, fragmentShader: dfs }),
    frameMaterial = new THREE.ShaderMaterial({ uniforms: uBlackPlastic, vertexShader: vs, fragmentShader: fs })
    screenMaterial = new THREE.ShaderMaterial({ uniforms: uScreen, vertexShader: vs, fragmentShader: fs })
    
    /* Tablet loader */
    tablet = new Tablet('./assets/tablet-groups-2.obj');
    tablet.loadObject((event)=> {
        tablet.loaded(event);
        tablet.addToScene(scene);
        tablet.changeMaterial(SCREEN, screenMaterial);
    });  
    
    frameMaterials = [
        new THREE.ShaderMaterial({ uniforms: uBlackPlastic, vertexShader: vs, fragmentShader: fs }),
        new THREE.ShaderMaterial({ uniforms: uWhitePlastic, vertexShader: vs, fragmentShader: fs }),
        new THREE.ShaderMaterial({ uniforms: uBlackPlasticOpaque, vertexShader: vs, fragmentShader: fs })
        
    ] 

    backMaterials = [
        new THREE.ShaderMaterial({ uniforms: uACMECottonInverted, vertexShader: vs, fragmentShader: dfs }),
        new THREE.ShaderMaterial({ uniforms: uACMECotton, vertexShader: vs, fragmentShader: dfs }),
        new THREE.ShaderMaterial({ uniforms: uAncientGold, vertexShader: vs, fragmentShader: dfs }),
    ] 
    

}

function loadTexture(file) {
    var texture = new THREE.TextureLoader().load( file , function ( texture ) {
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.anisotropy = renderer.getMaxAnisotropy();
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set( 0, 0 );
        texture.needsUpdate = true;
        update();
    } )
    return texture;
}

function update() {
    if(tablet.isReady()) {
        tablet.changeMaterial(BACK, backMaterial);
        tablet.changeMaterial(FRAME, frameMaterial);
        tablet.rotatePosition();
        
    }
    requestAnimationFrame(update);
    
    controls.update();
    stats.update();
    renderer.render(scene, camera);
}

init();

update();

let changeMaterial = (code) => {
    code = code.split("-");
    if(code[0]=="f"){
        frameMaterial = frameMaterials[parseInt(code[1])-1];
        frameMaterial.vertexTangents = true;
    }
    if(code[0] == "b"){
        backMaterial = backMaterials[parseInt(code[1])-1];
        backMaterial.vertexTangents = true;
    }

    update();
}

function onResize() {
    renderer.setSize( container.clientWidth, container.clientHeight );
    camera.aspect = ( container.clientWidth / container.clientHeight );
    camera.updateProjectionMatrix();
    update()
}

//resize listener
window.addEventListener( 'resize', onResize, false );

//click listener
document.addEventListener('click', function (event) {
	// If the clicked element doesn't have the right selector, bail
	if (!event.target.parentNode.matches('.prop-images .selection')) return;

    changeMaterial(event.target.parentNode.getAttribute("data-value"))
    // Log the clicked element in the console
    let children = event.target.parentNode.parentNode.children
    for(let i=0; i<children.length; i++) {
        children[i].classList.remove("active")   
    }
    event.target.parentNode.classList.add("active")
    document.getElementsByClassName(event.target.parentNode.parentNode.getAttribute("target"))[0].children[0].children[0].innerText = event.target.getAttribute("alt")

}, false);