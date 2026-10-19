---
title: Tactical Takedown
description: A top-down survival shooter in Unity with procedurally generated maps that are always beatable.
image: /media/TacticalTakedownL2.webp
imageAlt: A generated map seen from above, with enemies closing in on the player
tags:
  - Unity
  - Procedural Generation
category: Games
featured: false
order: 13
status: Complete prototype
engine: Unity
role: Solo project
year: "2023"
draft: false
sample: false
gallery:
  - src: /media/TacticalTakedownL2.webp
    alt: A generated map seen from above, with enemies closing in on the player
  - src: /media/TacticalTakedownL1.webp
    alt: A second generated map, with the score and survival timer
  - src: /media/TacticalTakedownL3.webp
    alt: A third generated map layout, later in a run
  - src: /media/TacticalTakedownYD.webp
    alt: The “You died” screen with play again and quit buttons
video: https://www.youtube.com/embed/qwYHcx8pUR0
links:
  - label: GitHub Repository
    url: https://github.com/itspixxel/Tactical-Takedown
note: A new map every run.
---

## The project

Tactical Takedown is a 3D top-down shooter. The player survives as long as possible on a procedurally generated map, shooting enemies to build a score.

I made it on my own in Unity, including the player, enemy, and weapon models and animations.

## What I worked on

- **Map generation:** obstacles are placed with a Fisher-Yates shuffle, and a flood fill checks that every open tile is still reachable. A map that would cut the player off is never used, so every run is beatable.
- **Spawning:** the player and enemies start in random positions each run.
- **Game feel:** camera shake, bullet trails, enemy death particles, sound effects, and music.
- **UI:** a score counter with a streak system, a survival timer, and win and lose screens.

## Tools

Unity, C#, Unity's particle system, Git.
