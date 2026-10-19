---
title: Neptune – Advanced Ocean System
description: Water rendering, buoyancy, and artist tools built in six weeks for a
  collaborative student game in Unreal Engine 5.
image: /media/NeptuneCover.webp
imageAlt: Neptune – Advanced Ocean System · project screenshot
tags:
  - Unreal Engine
  - Technical Art
  - Tool
featured: true
order: 1
status: Portfolio project
engine: Unreal Engine
role: Senior Technical Artist
duration: 6 weeks
team: 30-person student game team
year: ""
draft: false
sample: false
gallery:
  - src: /media/NeptuneCover.webp
    alt: Neptune ocean system in the game environment
  - src: /media/NeptuneBuoyancy.webp
    alt: Buoyancy test with floating crates and gameplay objects
  - src: /media/NeptuneDF.webp
    alt: Shoreline foam using distance fields
  - src: /media/NeptunePP.webp
    alt: Underwater post-processing in the game environment
  - src: /media/NeptuneWaterline.webp
    alt: Split view across the waterline
video: https://www.youtube.com/embed/th1fw4S07NQ
links: []
note: A little trigonometry. A lot of water.
---

## My contribution

I built Neptune for a collaborative student game with a team of 30. As Senior Technical Artist, I worked on the water system's design, prototypes, integration, and documentation over six weeks.

The brief covered oceans, rivers, lakes, and waterfalls. It also needed to work with gameplay objects and give artists and designers controls they could use in their levels.

## From a water shader to a procedural ocean

Neptune started as a simple water material. The biggest challenge was taking it beyond the surface appearance and building a procedural ocean with actual waves and buoyancy. It took several iterations to get from that first shader to the finished system.

The final version uses Gerstner waves with adjustable parameters, alongside buoyancy for floating actors and gameplay objects. That progression became the main technical work of the project: moving from a material effect to a water system that could support gameplay.

### Waves, buoyancy, and boats

The system includes wave resistance and interaction with static and dynamic bodies. A stencil mask keeps water out of boats. The capture below shows a buoyancy test with crates and other gameplay objects in the ocean.

![Buoyancy test with crates and gameplay objects floating in the ocean.](/media/NeptuneBuoyancy.webp)

## Where water meets the level

Shorelines combine distance-field foam with a wet-sand shader. Rivers use splines to control their path, flow, and foam. A separate waterfall actor uses noise blending, and the materials include a tile-repeat solver to reduce visible repetition.

![Distance-field shoreline foam around the beach and rocks.](/media/NeptuneDF.webp)

## Below the surface

Underwater rendering includes fog, caustics, and post-processing. Depth colouring, refraction distortion, and a fake subsurface-scattering effect handle the appearance of the water itself.

![Underwater post-processing showing the submerged level.](/media/NeptunePP.webp)

![The waterline separating the underwater view from the scene above.](/media/NeptuneWaterline.webp)

## Working with the team

Material instances and exposed parameters let artists and designers customise the water. I also provided documentation and training to help the team integrate it into their levels.

**Tools:** Unreal Engine 5 Materials, Blueprints, Niagara, Blender, Photoshop, Substance Designer, and Git.
