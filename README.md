# simplex-css

![Simplex.css Preview](https://github.com/sfearl1/sfearl1.github.io/blob/0d7649089acbe388f4f76684899885625c9c01a2/paint-worklets/simplex/assets/simplex.png)

## Installation

To use simplex-css in your project:

1. Install the package via npm:

```bash
npm install simplex-css
```

2. Register the worklet:

```javascript
(async () => {
    if (!CSS["paintWorklet"]) {
        await import("https://unpkg.com/css-paint-polyfill");
    } else {
        CSS.paintWorklet.addModule('https://unpkg.com/simplex-css@1.0.5/dist/simplex.min.js');
    }
})();
```

3. Customize it in your CSS:

```css
@layer simplex {

    @property --animate {
      syntax: "<number>";
      initial-value: 0;
      inherits: false;
    }
    
    @property --blend-mode {
      syntax: "<lighter | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity>";
      initial-value: lighter;
      inherits: false;
    }
    
    @property --t {
      syntax: "<number>";
      initial-value: 0;
      inherits: false;
    }
  
    @keyframes tick {
      from {
        --t: 0;
      }
      to {
        --t: 86400000;
      }
    }
    
    .simplex {
      --seed: 55555;
      --color: #a0a0a0;
      --line-width: 0.05;
      --line-count: 850;
      --amplitude: 1;
      --frequency: 0.3;
      --scale-x: 1;
      --scale-y: 1;
      --overall-scale: 1;
      --angle: 0;
      --opacity: 1;
      --smoothing: 10;
      --line-spacing: 1;
      /* Note: To animate, set --play-state to running but be aware it may impact performance. */
      --speed: 0.2;
      --play-state: paused;
      --animate: calc(mod(var(--t) / 50000, 50000));

      background-image: paint(simplex);
      animation: tick 86400000ms linear infinite;
      animation-play-state: var(--play-state, paused);
  }
}
```

4. Use it in your HTML:

```html
  <div class="simplex"></div>
```

## Browser Support

If you need to support browsers that do not natively support the CSS Paint API, you can use a polyfill:

```javascript
if (!CSS["paintWorklet"]) {
    await import("https://unpkg.com/css-paint-polyfill");
} else {
    CSS.paintWorklet.addModule('https://unpkg.com/simplex-css@1.0.5/dist/simplex.min.js');
}
```
    
For more information on browser support for the CSS Paint API, you can check the compatibility on [can I use](https://caniuse.com/css-paint-api).

## Demo

Live demo [here](https://sfearl1.github.io/paint-worklets/simplex/index.html).

## Contributing

Feel free to submit issues or pull requests to improve the package.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.