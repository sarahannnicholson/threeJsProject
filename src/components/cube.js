import React, { Component } from 'react';
import * as THREE from 'three';

class Cube extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var camera, scene, renderer;
        var mesh;
        init();
        animate();
        function init() {
            camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.outerHeight, 1, 1000 );
            camera.position.z = 400;
            scene = new THREE.Scene();
            //var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
            var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
            var material = new THREE.MeshBasicMaterial(  );
            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );
            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.outerWidth, window.outerHeight );
            document.getElementById('cubeCanvas').appendChild( renderer.domElement );
            window.addEventListener( 'resize', onWindowResize, false );
        }
        function onWindowResize() {
            camera.aspect = window.outerWidth / window.outerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.outerWidth, window.outerHeight );
        }
        function animate() {
            requestAnimationFrame( animate );
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;
            renderer.render( scene, camera );
        }
    }
    render() {
        return (
            <div>
                <h2>Cube</h2>
                <div id="cubeCanvas"></div>
            </div>
        );
    }
  }
  
  export default Cube;
  

  