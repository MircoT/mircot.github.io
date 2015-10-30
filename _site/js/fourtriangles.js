(function() {
  var isDragging = false;
  var previousMousePosition = {
      x: 0,
      y: 0
  };

  var renderer = new THREE.WebGLRenderer({antialias:true});

  // Create material
  var cubeMaterialArray = [];
  cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
  cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
  cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
  cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
  cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x66b2ff } ) );
  cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
  cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x9933ff } ) );


  var myMaterial = new THREE.MeshFaceMaterial( cubeMaterialArray );
  //myMaterial.side = THREE.DoubleSide;

  var boxGeometry = new THREE.BoxGeometry(10, 10, 10);
  var cube = new THREE.Mesh(boxGeometry, myMaterial);
  
  // Create figure 1
  var figure1_g = new THREE.Geometry(); 

  figure1_g.vertices.push(new THREE.Vector3(0, 8, 5)); // 0
  figure1_g.vertices.push(new THREE.Vector3(8, 2, 5)); // 1
  figure1_g.vertices.push(new THREE.Vector3(-8, 2, 5)); // 2
  figure1_g.vertices.push(new THREE.Vector3(5, -8, 5)); // 3
  figure1_g.vertices.push(new THREE.Vector3(-5, -8, 5)); // 4

  figure1_g.vertices.push(new THREE.Vector3(0, 8, -5)); // 5
  figure1_g.vertices.push(new THREE.Vector3(8, 2, -5)); // 6
  figure1_g.vertices.push(new THREE.Vector3(-8, 2, -5)); // 7
  figure1_g.vertices.push(new THREE.Vector3(5, -8, -5)); // 8
  figure1_g.vertices.push(new THREE.Vector3(-5, -8, -5)); // 9

  figure1_g.faces.push( new THREE.Face3( 2, 1, 0, null, null, 0 ) );
  figure1_g.faces.push( new THREE.Face3( 4, 3, 2, null, null, 0 ) );
  figure1_g.faces.push( new THREE.Face3( 1, 2, 3, null, null, 0 ) );

  figure1_g.faces.push( new THREE.Face3( 5, 6, 7, null, null, 1 ) );
  figure1_g.faces.push( new THREE.Face3( 7, 8, 9, null, null, 1 ) );
  figure1_g.faces.push( new THREE.Face3( 7, 6, 8, null, null, 1 ) );

  figure1_g.faces.push( new THREE.Face3( 0, 1, 5, null, null, 2 ) );
  figure1_g.faces.push( new THREE.Face3( 6, 5, 1, null, null, 2 ) );

  figure1_g.faces.push( new THREE.Face3( 5, 2, 0, null, null, 3 ) );
  figure1_g.faces.push( new THREE.Face3( 2, 5, 7, null, null, 3 ) );

  figure1_g.faces.push( new THREE.Face3( 1, 3, 8, null, null, 4 ) );
  figure1_g.faces.push( new THREE.Face3( 1, 8, 6, null, null, 4 ) );

  figure1_g.faces.push( new THREE.Face3( 4, 2, 7, null, null, 5 ) );
  figure1_g.faces.push( new THREE.Face3( 4, 7, 9, null, null, 5 ) );

  figure1_g.faces.push( new THREE.Face3( 9, 8, 3, null, null, 6 ) );
  figure1_g.faces.push( new THREE.Face3( 3, 4, 9, null, null, 6 ) );

  var figure1 = new THREE.Mesh(figure1_g, myMaterial);
  
  // Create figure 2
  var figure2_g = new THREE.Geometry(); 

  figure2_g.vertices.push(new THREE.Vector3(-5, 0, 0)); // 0
  figure2_g.vertices.push(new THREE.Vector3(5, 0, 10)); // 1
  figure2_g.vertices.push(new THREE.Vector3(10, 16, 0)); // 2
  figure2_g.vertices.push(new THREE.Vector3(5, 0, -10)); // 3
  figure2_g.vertices.push(new THREE.Vector3(1, 0, 0)); // 4

  figure2_g.faces.push( new THREE.Face3( 0, 1, 2, null, null, 2 ) );
  figure2_g.faces.push( new THREE.Face3( 0, 2, 3, null, null, 4 ) );
  figure2_g.faces.push( new THREE.Face3( 4, 3, 2, null, null, 5 ) );
  figure2_g.faces.push( new THREE.Face3( 4, 2, 1, null, null, 1 ) );
  figure2_g.faces.push( new THREE.Face3( 4, 1, 0, null, null, 0 ) );
  figure2_g.faces.push( new THREE.Face3( 3, 4, 0, null, null, 3 ) );

  var figure2 = new THREE.Mesh(figure2_g, myMaterial);

  // Create figure 3
  var figure3_g = new THREE.Geometry(); 

  figure3_g.vertices.push(new THREE.Vector3(-6, 0, 0)); // 0
  figure3_g.vertices.push(new THREE.Vector3(6, 0, 0)); // 1
  figure3_g.vertices.push(new THREE.Vector3(6, 11, 0)); // 2
  figure3_g.vertices.push(new THREE.Vector3(-6, 0, -11)); // 3
  figure3_g.vertices.push(new THREE.Vector3(6, 3, -11)); // 4
  figure3_g.vertices.push(new THREE.Vector3(6, 11, -11)); // 5

  figure3_g.faces.push( new THREE.Face3( 0, 1, 2, null, null, 5 ) );

  figure3_g.faces.push( new THREE.Face3( 2, 4, 5, null, null, 4 ) );
  figure3_g.faces.push( new THREE.Face3( 4, 2, 1, null, null, 4 ) );

  figure3_g.faces.push( new THREE.Face3( 5, 3, 2, null, null, 3 ) );
  figure3_g.faces.push( new THREE.Face3( 0, 2, 3, null, null, 3 ) );

  figure3_g.faces.push( new THREE.Face3( 4, 1, 0, null, null, 2 ) );
  figure3_g.faces.push( new THREE.Face3( 0, 3, 4, null, null, 1 ) );

  figure3_g.faces.push( new THREE.Face3( 5, 4, 3, null, null, 0 ) );

  var figure3 = new THREE.Mesh(figure3_g, myMaterial);

  $(window).load(function(){
    var WIDTH = 640;
    var HEIGHT = 480;

    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xfafafa, 1);
    
    document.getElementById("threejscene").appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 0.1, 10000);

    var egh_1 = new THREE.EdgesHelper( cube, 0x000000 );
    var egh_2 = new THREE.EdgesHelper( figure1, 0x000000 );
    var egh_3 = new THREE.EdgesHelper( figure2, 0x000000 );
    var egh_4 = new THREE.EdgesHelper( figure3, 0x000000 );

    // Add helpers
    scene.add( egh_1 );
    scene.add( egh_2 );
    scene.add( egh_3 );
    scene.add( egh_4 );

    // Add camera
    camera.position.z = 50;
    scene.add(camera);

    // Add cube
    cube.position.y = 15;
    cube.rotation.set(0.6, 0.5, 0);
    scene.add(cube);

    // Add figure1
    figure1.position.x = -25;
    figure1.position.y = -10;
    figure1.rotation.set(0.1, 0, 0);
    scene.add(figure1);

    // Add figure2
    figure2.position.y = -20;
    figure2.rotation.set(0, 1.2, 0.5);
    scene.add(figure2);

    // Add figure3
    figure3.position.x = 25;
    figure3.position.y = -15;
    figure3.rotation.set(2, 0, 1);
    scene.add(figure3);

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
  });

  function toRadians(angle) {
      return angle * (Math.PI / 180);
  }

  function toDegrees(angle) {
      return angle * (180 / Math.PI);
  }

  $(renderer.domElement).on('mousedown', function(e) {
      isDragging = true;
    })
    .on('mousemove', function(e) {
        //console.log(e);
        var deltaMove = {
            x: e.offsetX-previousMousePosition.x,
            y: e.offsetY-previousMousePosition.y
        };

    if(isDragging) {

        var deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));

        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
        figure1.quaternion.multiplyQuaternions(deltaRotationQuaternion, figure1.quaternion);
        figure2.quaternion.multiplyQuaternions(deltaRotationQuaternion, figure2.quaternion);
        figure3.quaternion.multiplyQuaternions(deltaRotationQuaternion, figure3.quaternion);
    }

    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
  });

  $(document).on('mouseup', function(e) {
      isDragging = false;
  });
})();
