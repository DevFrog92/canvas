import * as THREE from "../three.js-master/build/three.module.js"

class APP {
  constructor() {
    const divContainer = document.querySelector("#webgl-container");
    // field _은 private한 변수이다.
    this._divContainer = divContainer;
    // antialias => 3차원 장면이 렌더링될 때 오브젝트의 경계명이 부드러워진다.
    const renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.domElement canvas 속성의 객체
    divContainer.appendChild(renderer.domElement);
    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();

    // bind -> this가 이벤트 객체가 아닌 APP 클래스의 객체를 바라보게 하기 위해서.
    window.onresize = this.resize.bind(this);
    this.resize();
    // render는 실제 3차원 화면을 만들어 주는 method, 적절하고 최대한 빠르게 render method를 계속 불러주게 된다.
    // bind가 APP class 객체를 가리키기 위해서
    requestAnimationFrame(this.render.bind(this));
  }

  _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      100
    );

    camera.position.z = 2;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4);
    this._scene.add(light)
  }

  _setupModel(){
    // 정육면체 (가로, 세로, 깊이)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 파란색의 재질
    const material = new THREE.MeshPhongMaterial({color: 0x44a88});
    const cube = new THREE.Mesh(geometry, material)

    this._scene.add(cube);
    this._cube = cube;
  }

  resize(){
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(width, height);
  }
  // render이 시작된 이후에 경과된 시간 (ms)
  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time){
    // requestAnimationFrom 함수가 전달해 주는 값이다.
    time *= 0.001; //second unit
    this._cube.rotation.x = time;
    this._cube.rotation.y = time;
  }
}

window.onload = function() {
  new APP();
}

