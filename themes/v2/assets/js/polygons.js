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
    height: 1.4,
    depth: 10,
    segments: 20,
    slices: 20,
    xRange: 0.23,
    yRange: 0.24,
    zRange: 1.0,
    ambient: '#c80404',
    diffuse: '#FFFFFF',
    speed: 0.0002,
    colorHue: 45
  },

  initialise: (container)=>{
    // Note: must be a nice way to do this, check support for classes
    let fn = polygons;

    fn.container =  container;
    fn.siteContainer =  document.getElementById('site-intro');
    fn.renderer =  new FSS.CanvasRenderer();
    fn.scene =  new FSS.Scene();
    fn.light =  new FSS.Light('#880066', '#c80404');
    fn.geometry =  new FSS.Plane(fn.siteContainer.offsetWidth + 200 , fn.siteContainer.offsetHeight + 200, 12, 10);
    fn.material =  new FSS.Material('#100089', '#FFFFFF');
    fn.mesh =  new FSS.Mesh(polygons.geometry, polygons.material);
    fn.start = Date.now();
    fn.now = fn.start;
    fn.newgeometry = null;
    fn.newMesh = null;

    fn.container.setAttribute("style",`height:${fn.siteContainer.offsetHeight}px`);

    fn.scene.add(fn.mesh);
    fn.scene.add(fn.light);
    // scene.add(light2);
    
    fn.light.mass = Math.randomInRange(0.5, 1.4);
    // light.setPosition(300*Math.sin(now*0.001), 200*Math.cos(now*0.0005), 60);
    fn.light.setPosition(fn.container.offsetWidth / 2.4, fn.container.offsetHeight / 2.4 , 300 );
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


    fn.container.appendChild(fn.renderer.element);
    window.addEventListener('resize', fn.resize);

    fn.animate();
    fn.resize();
  },

  resize: ()=>{
    let fn = polygons;
    fn.renderer.setSize(fn.siteContainer.offsetWidth, fn.siteContainer.offsetHeight);
    // scene.remove(mesh);
    // geometry = new FSS.Plane(siteContainer.offsetWidth + 200 , siteContainer.offsetHeight + 200, 12, 10);
    // mesh = new FSS.Mesh(newgeometry, material);
    // scene.add(mesh);
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
