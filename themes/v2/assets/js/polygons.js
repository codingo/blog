import { default as Util } from './utils';

let polygons = {
  siteContainer : null,
  renderer : null,
  scene : null,
  light : null,
  geometry : null,
  material : null,
  mesh : null,
  start : null,
  now : null,
  newgeometry : null,
  newMesh : null,
  MESH : {
    width: 1.4,
    height: 1.8,
    depth: 10,
    segments: 10,
    slices: 26,
    xRange: 0.23,
    yRange: 0.24,
    zRange: 1.0,
    ambient: '#100089',
    diffuse: '#FFFFFF',
    speed: 0.0004,
    colorHue: 80
  },

  initialise: (container)=>{
    // Note: must be a nice way to do this, check support for classes
    let fn = polygons;
    fn.center = FSS.Vector3.create();
    fn.container =  container;
    fn.siteContainer =  container.parentElement;
    fn.renderer =  new FSS.CanvasRenderer();
    fn.scene =  new FSS.Scene();
    fn.light =  new FSS.Light('#880066', '#c80404');
    // fn.geometry =  new FSS.Plane(fn.siteContainer.clientWidth + 200 , fn.siteContainer.clientHeight + 200, 12, 10);
    fn.start = Date.now();
    fn.now = fn.start;


    fn.container.setAttribute("style",`height:${fn.siteContainer.clientHeight}px`);

    fn.scene.add(fn.light);
    // scene.add(light2);
    
    fn.light.mass = Math.randomInRange(0.5, 1.4);
    // light.setPosition(300*Math.sin(now*0.001), 200*Math.cos(now*0.0005), 60);
    fn.light.setPosition(fn.container.clientWidth / 2.4, fn.container.clientHeight / 2.4 , 300 );
    // Augment vertices for animation

    fn.MESH.segments = (Math.sqrt(fn.container.clientWidth) / 2.5).toFixed(0);
    fn.MESH.slices = (Math.sqrt(fn.container.clientHeight) / 1.5).toFixed(0);
    
    fn.createMesh();

    fn.container.appendChild(fn.renderer.element);
    window.addEventListener('resize', fn.resize);

    setInterval(() => {
      if(fn.container.clientHeight != fn.siteContainer.clientHeight){
        fn.resize();
      }
    }, 250);


    fn.animate();
    fn.resize();
  },

  resize: ()=>{
    let fn = polygons;
    fn.renderer.setSize(fn.siteContainer.clientWidth, fn.siteContainer.clientHeight);
    FSS.Vector3.set(fn.center, fn.renderer.halfWidth, fn.renderer.halfHeight);
    fn.container.setAttribute("style",`height:${fn.siteContainer.clientHeight}px`);
    fn.createMesh();
  },

  createMesh: ()=>{
    let fn = polygons;
    fn.scene.remove(fn.mesh);
    fn.renderer.clear();
    fn.MESH.segments = (Math.sqrt(fn.container.clientWidth) / 2.5).toFixed(0);
    fn.MESH.slices = (Math.sqrt(fn.container.clientHeight) / 1.5).toFixed(0);
    fn.geometry = new FSS.Plane(fn.MESH.width * fn.renderer.width, fn.MESH.height * fn.renderer.height, fn.MESH.segments, fn.MESH.slices);
    fn.material = new FSS.Material(fn.MESH.ambient, fn.MESH.diffuse);
    fn.mesh = new FSS.Mesh(fn.geometry, fn.material);
    fn.scene.add(fn.mesh);

    // Augment vertices for animation
    var v, vertex;
    for (v = fn.geometry.vertices.length - 1; v >= 0; v--) {
      vertex = fn.geometry.vertices[v];
      vertex.anchor = FSS.Vector3.clone(vertex.position);
      vertex.step = FSS.Vector3.create(
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0)
      );
      vertex.time = Math.randomInRange(0, Math.PIM2);
    }
  },

  animate: ()=>{

    let fn = polygons;

    fn.now = Date.now() - fn.start;

    var ox, oy, oz, l, v, vertex, offset = fn.MESH.depth/2;
    // Animate Vertices
    for (v = fn.geometry.vertices.length - 1; v >= 0; v--) {
        vertex = fn.geometry.vertices[v];
        ox = Math.sin(vertex.time + vertex.step[0] * fn.now * fn.MESH.speed);
        oy = Math.cos(vertex.time + vertex.step[1] * fn.now * fn.MESH.speed);
        oz = Math.sin(vertex.time + vertex.step[2] * fn.now * fn.MESH.speed);
        FSS.Vector3.set(vertex.position,
          fn.MESH.xRange * fn.geometry.segmentWidth*ox,
          fn.MESH.yRange * fn.geometry.sliceHeight*oy,
          fn.MESH.zRange * offset * oz - offset);
        FSS.Vector3.add(vertex.position, vertex.anchor);
        
    }
    
    /** Animate color transition */
    let current = fn.MESH.colorHue;
    // 360 is the end value for HSL
    let target = 360;
    // Calculate the next step to reach target color, target has an offset value to 
    // set time to target relative to starting postion so it doesn't speed up.
    let step = (current + ((target + current) - current) * 0.0002);
    // Only the hue needs to chnage
    let hex = Util.HSLToHex( step , 96, 40);
    // console.log(`${current} - target:${target} - step:${step} - hex:${hex}`)
    // If we've reached our target which is the end of the rainbow then reset back to the start
    if(step >= 359) { step = 0 };
    // Gotta save this for the next animation frame
    fn.MESH.colorHue = step;
    // Create the new color on the existing light in the scene
    fn.light.diffuse = new FSS.Color(`${hex}`);

    fn.renderer.render(fn.scene);
    requestAnimationFrame(fn.animate);
  }

}

export default polygons;
