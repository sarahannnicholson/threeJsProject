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
            container = document.getElementById( 'cubeCanvas' );

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

            // Lights
            var ambient = new THREE.AmbientLight( 0xffffff );
            scene.add( ambient );
            pointLight = new THREE.PointLight( 0xffffff, 2 );
            scene.add( pointLight );
            
            // Materials
            var cubeMaterial3 = new THREE.MeshLambertMaterial( { color: 0xff6600, combine: THREE.MixOperation, reflectivity: 0.3 } );
            var cubeMaterial2 = new THREE.MeshLambertMaterial( { color: 0xffee00} );
            var cubeMaterial1 = new THREE.MeshLambertMaterial( { color: 0xffffff} );
            
            // Models
            var objLoader = new THREE.OBJLoader();
            objLoader.load( './models/female02.obj', function ( object ) {
                var head = object;
                head.scale.multiplyScalar( 8 );
                head.position.y = -500;
                //head.material = cubeMaterial1;
                var head2 = head.clone();
                head2.position.x = - 900;
                //head2.material = cubeMaterial2;
                var head3 = head.clone();
                head3.position.x = 900;
                //head3.material = cubeMaterial3;
                scene.add( head, head2, head3 )
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
                <h2>Cube</h2>
                <div id="cubeCanvas"></div>
                <p id='feedback'></p>
            </div>
        );
    }
  }
  
  export default Cube;
  

  