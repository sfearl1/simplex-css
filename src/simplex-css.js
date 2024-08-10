import { createNoise3D } from 'simplex-noise';

registerPaint('simplex', class {
  static get inputProperties() {
    return [
      '--seed',
      '--animate',
      '--line-width',
      '--color',
      '--line-count',
      '--amplitude',
      '--frequency',
      '--speed',
      '--scale-x',
      '--scale-y',
      '--overall-scale',
      '--angle',
      '--opacity',
      '--smoothing',
      '--circle',
      '--strength-x',
      '--strength-y',
      '--line-spacing',
    ];
  }

  paint(ctx, geom, properties) {

    const w = geom.width;
    const h = geom.height;

    const simplexSeed = (a) => {
      return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    };

    const getProp = (prop, defaultValue) => {
      const value = properties.get('--' + prop);
      return value ? parseFloat(value.toString().trim()) : defaultValue;
    };

    const seed = getProp('seed', 55555);

    const animate = getProp('animate', 0);
    const speed = getProp('speed', 1);

    const lineCount = getProp('line-count', 146);
    const lineWidth = getProp('line-width', 0.2);
    const lineSpacing = getProp('line-spacing', 0.5);

    const amplitude = getProp('amplitude', 10);
    const frequency = getProp('frequency', 0.3);

    const opacity = getProp('opacity', 0.05);
    const smoothing = getProp('smoothing', 3);
    const angle = getProp('angle', 0);
    
    const overallScale = getProp('overall-scale', 1);
    const zoom = h * 0.3 * overallScale;
    
    let scaleX = getProp('scale-x', 1);
    let scaleY = getProp('scale-y', 1);

    scaleX *= Math.min(w, h) * 0.1;
    scaleY *= h * 0.1;

    let colorProp = properties.get('--color');
    let color;
    if (colorProp === undefined || colorProp === null || colorProp.toString().trim() === '') {
      color = `rgba(255, 255, 255, 0.05)`;
    } else {
      color = colorProp.toString();
    }
    
    ctx.globalCompositeOperation = "lighter";

    const t = animate * (speed * 10);

    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-w / 2, -h / 2);

    ctx.globalAlpha = opacity;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;

    const prng = simplexSeed(seed);
    const simplex = createNoise3D(prng);

    const totalHeight = lineCount * lineSpacing;
    const startY = (h - totalHeight) / 2;
    
    for (let i = 0; i < lineCount; i++) {
      const y = startY + i * lineSpacing;
      ctx.beginPath();
      for (let x = -scaleX; x < w + scaleX; x += smoothing) {
        let n1 = simplex(x / zoom * frequency, y / zoom, t) * amplitude * scaleX;
        let n2 = simplex(x / zoom * frequency + 1000, y / zoom + 1000, t + 1000) * amplitude * scaleY;
        ctx.lineTo(x + n1, y + n2);
      }
      ctx.stroke();
    }

    ctx.restore();
  }
});