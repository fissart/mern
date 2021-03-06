import React, { Component } from 'react';
import ww_w from '../assests/www.gltf';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
			import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
export default class ww1 extends Component {
	componentDidMount() {
		const pStyle = {
			fontSize: '15px',
			textAlign: 'center',
		};

		var scene = new THREE.Scene();
		const loader = new GLTFLoader();
		const loaderglb = new GLTFLoader();

		//

    //scene.background = new THREE.Color("rgb(250,250,200)");
		scene.background = null;

		/*
    scene.background = new THREE.CubeTextureLoader()
      .setPath( "./assets/" )
      .load( [
        src,
        src,
        'foto.png',
        'ny.png',
        'pz.png',
        'nz.png'
      ] );
*/
		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		loader.load(
			// resource URL
			ww_w,
			// called when the resource is loaded
			function(gltf) {
				var sword = gltf.scene; // sword 3D object is loaded
				sword.scale.set(1, 1, 1);
				sword.position.y = 0;
				scene.add(sword);
				//scene.add( gltf.scene );
			}
		);
		var renderer = new THREE.WebGLRenderer({ antialias: true, autoSize: true, alpha: true });
		renderer.setSize(window.innerWidth,  window.innerHeight);
		this.mount.appendChild(renderer.domElement);
		renderer.domElement.style.height = '100%';
		renderer.domElement.style.width = '100%';
		renderer.domElement.style.display = 'inline';
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.update();

		var geometry = new THREE.TorusKnotGeometry(0.7, 0.05, 200, 32, 1, 3);
		var geometry2 = new THREE.SphereGeometry(0.3, 10, 20);
		var geometry3 = new THREE.SphereGeometry(0.2, 10, 20);
		var material = new THREE.MeshPhongMaterial({
			color: 'cyan',
			//flatShading: true,
			//shading: THREE.SmoothShading,
		});
		var material1 = new THREE.MeshPhongMaterial({
			color: 'blue',
		});
		var cube = new THREE.Mesh(geometry, material);
		//var sphere = new THREE.Mesh(geometry2, material1);
		var sphere2 = new THREE.Mesh(geometry3, material);
		//scene.add(cube, sphere2);

		const light = new THREE.SpotLight('rgb(250,250,250)', 1);
		light.position.set(0, 3, 0);
		light.castShadow = true;
		light.shadow.bias = -0.0001;
		light.shadow.mapSize.width = 1024 * 4;
		light.shadow.mapSize.height = 1024 * 4;

		const light1 = new THREE.DirectionalLight('rgb(250,250,250)', 1);
		light1.position.set(0, -3, 0);
		light1.castShadow = true;
		light1.shadow.bias = -0.01;
		light1.shadow.mapSize.width = 1024 * 4;
		light1.shadow.mapSize.height = 1024 * 4;
		scene.add(light);
		scene.add(light1);

		const light3 = new THREE.AmbientLight('rgb(250,250,250)', 1); // soft white light
		scene.add(light3);

		controls.mouseButtons = {
			LEFT: THREE.MOUSE.ROTATE,
			MIDDLE: THREE.MOUSE.DOLLY,
			RIGHT: THREE.MOUSE.PAN,
		};
		camera.position.z = 1;
		camera.position.y = 1;
		camera.position.x = 1;
		var animate = function() {
			requestAnimationFrame(animate);
			//cube.rotation.x += 0.001;
			//cube.rotation.y += 0.01;
			//cube.rotation.z += 0.01;
			controls.update();
			renderer.render(scene, camera);
		};
		animate();
	}

	render() {
		return (
			<div>
				<div className="w-100 text-center" ref={ref => this.mount = ref} />
			</div>
		);
	}
}
