---
title: EMP Kunai
description: An original throwable EMP ability in Niagara, with trails, a distortion shockwave, electric arcs, and target reactions timed to read clearly in play.
image: /media/KunaiEMPCover.webp
draft: false
category: VFX
featured: false
sample: false
tags:
  - Unreal Engine
  - Niagara VFX
imageAlt: The EMP Kunai detonating in a burst of electric streaks
order: 3
status: Personal study
engine: Unreal Engine
role: VFX and ability prototyping
year: "2025"
note: The timing is the effect.
video: https://www.youtube.com/embed/PwMb2yd_A-o
links:
  - label: ArtStation
    url: https://www.artstation.com/artwork/dyWeGe
  - label: About GradEX
    url: https://www.staffs.ac.uk/gradex
gallery:
  - src: /media/KunaiEMPIcon.webp
    alt: The EMP detonating among target drones, with electric streaks bursting outward
---

## The idea

I made EMP Kunai after feedback on ADAPTIK at [GradEX](https://www.staffs.ac.uk/gradex) pushed me to show more of my problem-solving as a technical artist. It's an original study of a throwable EMP ability: the character throws a kunai, it detonates, and nearby targets react.

## What I built

- **Projectile trail:** a trail on the kunai, so the throw is easy to follow.
- **EMP detonation:** a distortion shockwave and electric arcs that burst outward.
- **Reactions:** hit effects on the targets caught in the blast.
- **Integration:** the effects are wired up through reusable Blueprints, so the same setup can drive other abilities.

Most of the work went into timing: making the throw, detonation, and reaction land in an order a player can read in the middle of a fight.

## Tools

Unreal Engine 5 Niagara, materials, Blueprints, and character animation.
