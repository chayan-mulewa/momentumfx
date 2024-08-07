# MomentumFX

**MomentumFX** is a React library designed for high-performance smooth scrolling with inertia effects. It provides a way to implement momentum-based scrolling that works across modern browsers.

## Features

- **Smooth Scrolling**: Implement inertia-based scrolling for a fluid experience.
- **Cross-Browser Support**: Compatible with major modern browsers.

## Live Demo

Check out a live demo of MomentumFX in action:

[Live Demo](https://momentumfx.vercel.app)

## Installation

To install MomentumFX, use npm:

```
npm install momentumfx --save

```

## Usage

To get started with MomentumFX, you need to import and use the useSmoothScroll hook : 

```
import { useSmoothScroll } from 'momentumfx';

const [smoothScroll] = useSmoothScroll();
smoothScroll(0.04, 0.02, 4);

```

## Available Options for smoothScroll()

```
Parameter       | Type          | Default   | Value
-----------------------------------------------------------
momentum        | number	| 0.04	    | 0.01 - 1
touchMomentum   | number	| 0.02	    | 0.01 - 1
speed	        | number	| 4         | 1 - 10
-----------------------------------------------------------
```

## Browser Compatibility

```
Browser                 | Version
---------------------------------------------------
Chrome                  | 51+
Firefox                 | 52+
Safari                  | 10.1+
Edge                    | 79+
Internet Explorer       | Not supported
---------------------------------------------------
```

## Created By

Chayan Mulewa with ❤️ Love
