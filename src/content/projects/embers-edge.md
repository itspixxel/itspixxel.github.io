---
title: Ember's Edge
description: A first-person parkour platformer in Unreal Engine 5, built in Blueprints around wall-running, vaulting, and dashing over rising lava.
image: /media/EmbersEdgeIcon.webp
imageAlt: Ember's Edge title art
tags:
  - Unreal Engine
  - Platformer
  - Blueprints
category: Games
featured: false
order: 8
status: University project
engine: Unreal Engine
role: Solo project
year: "2025"
draft: false
sample: false
gallery:
  - src: /media/EmbersEdgeIcon.webp
    alt: Ember's Edge title art
video: https://www.youtube.com/embed/I1429Fwx6cE
links:
  - label: GitHub Repository
    url: https://github.com/itspixxel/Embers-Edge
  - label: Technical design document
    url: /docs/tdd/EmbersEdgeTDD.pdf
note: Keep moving. The floor is lava.
---

## The project

Ember's Edge is a fast first-person parkour platformer. The floor is lava and it keeps rising, so the player has to keep moving and find their own line through each level. The references were Mirror's Edge and Clustertruck.

I built it on my own in Unreal Engine 5, entirely in Blueprints, and wrote a technical design document alongside it.

## What I worked on

- **Movement:** sprinting, jumping, vaulting, wall-running, and a dash with a cooldown. Speed carries into jump distance and vault height, so momentum matters.
- **Lava hazard:** a rising lava floor with instant death on contact.
- **Progression:** checkpoints that respawn the player, and a level timer that rewards faster runs.
- **Blueprint standards:** naming conventions, comment rules, and event-driven logic instead of tick, all set out in the design document.

The design document covers the movement flowchart, the lava state machine, and the checkpoint logic.

## Tools

Unreal Engine 5 (Blueprints, Enhanced Input, Niagara), Blender, Substance Painter, Git.
