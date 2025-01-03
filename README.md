# JS Snippets

A collection of reusable JavaScript animation snippets and effects.

## Snippets Overview


### iPadOS-Style Cursor
Files: [`ipadOS-cursor.js`](web/ipadOS-cursor.js), [`ipadOS-cursor.css`](web/ipadOS-cursor.css)

A smooth, adaptive cursor animation that mimics the iPadOS cursor behavior:
- Morphs and snaps to interactive elements
- Follows mouse movement with smooth transitions
- Expands/contracts based on hoverable elements
- Responsive design with mobile fallback
- Customizable selectors for interactive elements
- Magnet effect on hovered elements
- View a live demo at https://wireway.ch

### Spring Physics Text Effect
File: [`text-spring.js`](web/text-spring.js)

A physics-based text animation:
- Letters spread apart on hover with spring physics
- Smooth return animation when mouse leaves
- Configurable spring tension and friction
- Random spread patterns for natural feel
- Performant requestAnimationFrame implementation
- View a live demo at https://wireway.ch at the top title

### Simple implementation of the wireway ai api
File: [`simple-command-line-ai-chatbot.js`](node/simple-command-line-ai-chatbot.js)

A simple command line chatbot that uses the wireway.ai API for natural language processing.
Run `node simple-command-line-ai-chatbot.js` to start the chatbot. 
## Usage

Each snippet is self-contained and can be used independently. Simply include the relevant JS and CSS files in your project and initialize the functionality as needed.

## License

You may modify all scripts to your liking. Attribution is appreciated but not required You are prohibited from claiming these scripts as your own work. Redistribution of unmodified scripts is not allowed.

There is an official mirror for all scripts: https://cdn.wireway.ch/js-snippets/.

Example usage: https://cdn.wireway.ch/js-snippets/web/ipadOS-cursor.js

## Browser Support

These snippets are built with modern JavaScript and CSS features, supporting all major modern browsers. Some of the snippets automatically disable on mobile devices where features are not supported.
