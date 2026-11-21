---
title: Neptune – Advanced Ocean System
description: "A UE5 water system I built in six weeks for a 30-person student game:
  Gerstner ocean, buoyancy for gameplay objects, rivers, shorelines, and underwater
  rendering, handed over to level artists with docs and training."
image: /media/NeptuneCover.webp
imageAlt: Neptune ocean around a rocky island with a lighthouse
tags:
  - Unreal Engine
  - Technical Art
  - Tool
category: Tools
featured: true
order: 1
status: Portfolio project
engine: Unreal Engine
role: Technical Artist, water system
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
showCarousel: false
sections:
  - title: Waves that gameplay can stand on
    text: |-
      Neptune started as a simple water material. The real step up was making the surface something gameplay could use, not just look at.

      Ocean: Gerstner waves with adjustable parameters, so artists can tune the swell per level.

      Buoyancy: floating actors and gameplay objects ride the waves, with wave resistance and interaction with both static and dynamic bodies.

      Boats: a stencil mask keeps the water surface out of hull interiors without cutting a hole in the surrounding ocean.
    image: /media/NeptuneBuoyancy.webp
    imageAlt: Crates and gameplay objects floating in Neptune's ocean
    caption: Buoyancy test with objects of different shapes.
  - title: Rivers, shorelines and waterfalls
    text: |-
      The brief also covered rivers, lakes, waterfalls, and the edges against beaches and rocks.

      Shorelines: distance-field foam combined with a wet-sand shader, so the transition follows whatever geometry the water touches.

      Rivers: splines control the path, flow, and foam.

      Waterfalls: a separate actor using noise blending.

      Tiling: a tile-repeat solver reduces visible repetition across large surfaces.
    image: /media/NeptuneDF.webp
    imageAlt: Foam tracing the beach and rocks using distance fields
    caption: Distance-field foam following the beach and rocks.
  - title: Below the surface
    text: |-
      The camera can go underwater, so the system needed a second look: fog, caustics, depth colouring, refraction distortion, and a fake subsurface-scattering effect, applied as an underwater post-process.
    image: /media/NeptuneWaterline.webp
    imageAlt: A split view showing Neptune above and below the waterline
    caption: Surface and underwater rendering at the waterline.
  - title: Handing it over
    text: |-
      On a 30-person team, the water was only useful if artists and designers could place and tune it without me. Every feature is exposed through material instances and parameters, and I wrote the documentation and ran training so the team could integrate and customise water in their own levels.

      Tools used: Unreal Engine 5 materials, Blueprints, Niagara, Blender, Photoshop, Substance Designer, and Git.
    image: /media/NeptunePP.webp
    imageAlt: Underwater post-processing over the submerged level geometry and coral
    caption: The underwater post-process across the submerged level.
---

## The brief

Build the water for a 30-person student game in Unreal Engine 5: oceans, rivers, lakes, and waterfalls that support gameplay objects and give artists and designers controls they can use in their levels.

I owned the water system for six weeks: design, prototyping, integration with the rest of the game, and documentation.
