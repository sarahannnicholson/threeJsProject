import React, { Component } from 'react';
import * as THREE from 'three'
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);
var OrbitControls = require('three-orbit-controls')(THREE)

 
class Cube extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
        var container, stats;
        var camera, scene, renderer;
        var mesh, geometry;
        var pointLight;

        init();
        animate();
        
        function init() {
            container = document.getElementById( 'characterCanvas' );

            // Camera
            camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
            camera.position.z = 3000;
            
            // Controls
            var controls = new OrbitControls( camera );
            controls.minPolarAngle = Math.PI / 2 ; // radians
            controls.maxPolarAngle = Math.PI / 2; // radians
            controls.enablePan = false;
            controls.maxDistance = 3000;
            
            // Scene
            var background = new THREE.CubeTextureLoader()
                .setPath( './scenes/' )
                .load( [ 'dark-s_px.jpg', 'dark-s_nx.jpg', 'dark-s_py.jpg', 'dark-s_ny.jpg', 'dark-s_pz.jpg', 'dark-s_nz.jpg' ] );        
            background.format = THREE.RGBFormat;

            scene = new THREE.Scene();
            scene.background = background;

            // Ground 
            var geometry = new THREE.CircleGeometry( 500, 32 );
            var material = new THREE.MeshBasicMaterial( { color: 0x808080 } );
            var circle = new THREE.Mesh( geometry, material );
            circle.position.set( 0, -500, 0 );
            circle.rotation.x = - Math.PI / 2;
            scene.add( circle )

            // Lights
            var ambient = new THREE.AmbientLight( 0xffffff );
            scene.add( ambient );
            pointLight = new THREE.PointLight( 0xffffff, 2 );
            scene.add( pointLight );
                      
            // Models
            var objLoader = new THREE.OBJLoader();
            objLoader.load( './models/female02.obj', function ( object ) {
                var character = object;
                character.scale.multiplyScalar( 8 );
                character.position.y = -500;
                scene.add( character )
            } );
            
            // Renderer
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );

            container.appendChild( renderer.domElement );
            window.addEventListener( 'resize', onWindowResize, false );
        }
        
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }
        
        function animate() {
            requestAnimationFrame( animate );
            renderObj();
        }

        function renderObj() {
            renderer.render( scene, camera );
        }
    }

    render() {
        return (
            <div>
                <h2>Character</h2>
                <div id="characterCanvas"></div>
                <p id='feedback'></p>
            </div>
        );
    }
  }
  
  export default Cube;
  

  