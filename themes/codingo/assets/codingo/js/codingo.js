
var container = document.getElementById('fss-container');
var renderer = new FSS.CanvasRenderer();
var scene = new FSS.Scene();
var light = new FSS.Light('#880066', '#ff8800');
var light2 = new FSS.Light('#880066', '#ff8800');
var geometry = new FSS.Plane(container.offsetWidth + 200 , container.offsetHeight + 200, 12, 10);
var material = new FSS.Material('#100089', '#FFFFFF');
var mesh = new FSS.Mesh(geometry, material);
var now, start = Date.now();

var MESH = {
    width: 1.4,
    height: 1.4,
    depth: 10,
    segments: 20,
    slices: 20,
    xRange: 0.23,
    yRange: 0.24,
    zRange: 1.0,
    ambient: '#100089',
    diffuse: '#FFFFFF',
    speed: 0.0003
};


function initialise() {
    scene.add(mesh);
    scene.add(light);
    // scene.add(light2);
    
    light.mass = Math.randomInRange(0.5, 1.4);
    // light.setPosition(300*Math.sin(now*0.001), 200*Math.cos(now*0.0005), 60);
    light.setPosition(container.offsetWidth / 2.4, container.offsetHeight / 2.4 , 300 );
    // Augment vertices for animation
    var v, vertex;
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      vertex.anchor = FSS.Vector3.clone(vertex.position);
      vertex.step = FSS.Vector3.create(
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0)
      );
      vertex.time = Math.randomInRange(0, Math.PIM2);
    }


    container.appendChild(renderer.element);
    window.addEventListener('resize', resize);
}

function resize() {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}


function animate() {
    now = Date.now() - start;


    var ox, oy, oz, l, v, vertex, offset = MESH.depth/2;

    // Animate Vertices
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
        vertex = geometry.vertices[v];
        ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
        oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
        oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
        FSS.Vector3.set(vertex.position,
            MESH.xRange*geometry.segmentWidth*ox,
            MESH.yRange*geometry.sliceHeight*oy,
            MESH.zRange*offset*oz - offset);
        FSS.Vector3.add(vertex.position, vertex.anchor);
    }

    renderer.render(scene);
    requestAnimationFrame(animate);
}

initialise();
resize();
animate();