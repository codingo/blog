(() => {
  // ns-hugo:/home/runner/work/blog/blog/themes/v2/assets/js/utils.js
  var util = {
    hexToHSL: (H) => {
      let r = 0, g = 0, b = 0;
      if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
      } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
      }
      r /= 255;
      g /= 255;
      b /= 255;
      let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
      if (delta == 0)
        h = 0;
      else if (cmax == r)
        h = (g - b) / delta % 6;
      else if (cmax == g)
        h = (b - r) / delta + 2;
      else
        h = (r - g) / delta + 4;
      h = Math.round(h * 60);
      if (h < 0)
        h += 360;
      l = (cmax + cmin) / 2;
      s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);
      return {
        h,
        s,
        l
      };
    },
    HSLToHex: (h, s, l) => {
      s /= 100;
      l /= 100;
      let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(h / 60 % 2 - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
      if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
      } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
      } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
      } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
      } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
      } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
      }
      r = Math.round((r + m) * 255).toString(16);
      g = Math.round((g + m) * 255).toString(16);
      b = Math.round((b + m) * 255).toString(16);
      if (r.length == 1)
        r = "0" + r;
      if (g.length == 1)
        g = "0" + g;
      if (b.length == 1)
        b = "0" + b;
      return "#" + r + g + b;
    }
  };
  var utils_default = util;

  // <stdin>
  var container = document.getElementById("fss-container");
  var siteContainer = document.getElementById("site-intro");
  container.setAttribute("style", `height:${siteContainer.offsetHeight}px`);
  var renderer = new FSS.CanvasRenderer();
  var scene = new FSS.Scene();
  var light = new FSS.Light("#880066", "#c80404");
  var geometry = new FSS.Plane(siteContainer.offsetWidth + 200, siteContainer.offsetHeight + 200, 12, 10);
  var material = new FSS.Material("#100089", "#FFFFFF");
  var mesh = new FSS.Mesh(geometry, material);
  var now;
  var start = Date.now();
  var MESH = {
    width: 1.4,
    height: 1.4,
    depth: 10,
    segments: 20,
    slices: 20,
    xRange: 0.23,
    yRange: 0.24,
    zRange: 1,
    ambient: "#c80404",
    diffuse: "#FFFFFF",
    speed: 2e-4,
    colorHue: 45
  };
  function initialise() {
    scene.add(mesh);
    scene.add(light);
    light.mass = Math.randomInRange(0.5, 1.4);
    light.setPosition(container.offsetWidth / 2.4, container.offsetHeight / 2.4, 300);
    var v, vertex;
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      vertex.anchor = FSS.Vector3.clone(vertex.position);
      vertex.step = FSS.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1));
      vertex.time = Math.randomInRange(0, Math.PIM2);
    }
    container.appendChild(renderer.element);
    window.addEventListener("resize", resize);
  }
  function resize() {
    renderer.setSize(siteContainer.offsetWidth, siteContainer.offsetHeight);
  }
  function animate() {
    now = Date.now() - start;
    var ox, oy, oz, l, v, vertex, offset = MESH.depth / 2;
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
      oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
      oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
      FSS.Vector3.set(vertex.position, MESH.xRange * geometry.segmentWidth * ox, MESH.yRange * geometry.sliceHeight * oy, MESH.zRange * offset * oz - offset);
      FSS.Vector3.add(vertex.position, vertex.anchor);
    }
    let current = MESH.colorHue;
    let target = 360;
    step = current + (target + current - current) * 2e-4;
    let hex = utils_default.HSLToHex(step, 96, 40);
    if (step >= 359) {
      step = 0;
    }
    ;
    MESH.colorHue = step;
    light.diffuse = new FSS.Color(`${hex}`);
    renderer.render(scene);
    requestAnimationFrame(animate);
  }
  initialise();
  animate();
  resize();
})();
