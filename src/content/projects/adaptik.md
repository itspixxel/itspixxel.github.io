---
title: ADAPTIK
description: A final-year study of terrain-adaptive foot placement for a quadruped in UE5 Control Rig, measured across flat, uneven, sloped, and moving ground.
image: /media/AdaptikCover.webp
imageAlt: ADAPTIK title art over the four-legged robot in a street scene
tags:
  - Unreal Engine
  - Procedural Animation
category: Tools
featured: true
order: 4
status: Final-year university project
engine: Unreal Engine
role: Implementation, testing, and dissertation
year: "2025"
draft: false
sample: false
gallery:
  - src: /media/AdaptikIcon.webp
    alt: ADAPTIK · development capture
  - src: /media/AdaptikTruck.webp
    alt: ADAPTIK · development capture
  - src: /media/AdaptikWire.webp
    alt: ADAPTIK · development capture
  - src: /media/AdaptikTable.webp
    alt: ADAPTIK · development capture
  - src: /media/AdaptikSidewalk.webp
    alt: ADAPTIK · development capture
  - src: /media/AdaptikPL.webp
    alt: ADAPTIK · development capture
  - src: /media/AdaptikCR.webp
    alt: ADAPTIK · development capture
video: https://www.youtube.com/embed/iTTy5FUacPo
links:
  - label: Source on GitHub
    url: https://github.com/itspixxel/ADAPTIK
  - label: Read the dissertation (PDF)
    url: /docs/other/ADAPTIK-dissertation.pdf
note: Finding its feet, one frame at a time.
duration: 4 months
showCarousel: false
sections:
  - title: The question
    text: |-
      How well can a quadruped adjust its feet to the ground in real time, and what does that cost? A walk that looks right on a flat floor can stop making sense at a kerb or a cable on the ground.

      I answered that with a working Control Rig setup and a set of terrain tests. The test scenes, measurements, and analysis make up the dissertation.
    image: /media/AdaptikCR.webp
    imageAlt: ADAPTIK's four-legged robot in the Unreal Engine demonstration scene
    caption: The demonstration character, built around an Unreal Engine 5 Control Rig setup.
  - title: Finding somewhere to put each foot
    text: |-
      The system uses terrain detection and inverse kinematics to adjust the feet to the environment. Ground information supplies the targets, and the rig adjusts the limbs to reach them during movement.

      The kerb is a useful example because the feet need to deal with different ground heights at the same time. Keeping them in a fixed pose would leave some feet above the ground or passing through it. The procedural setup adjusts placement as the character crosses the change in height.

      This was the central focus of the dissertation: whether terrain-aware placement could make the character respond more convincingly than movement that does not account for the ground.
    image: /media/AdaptikSidewalk.webp
    imageAlt: ADAPTIK crossing the height change between a road and a raised pavement
    caption: A pavement edge gives the feet different ground heights to accommodate.
  - title: Testing beyond flat ground
    text: |-
      The demonstration includes raised surfaces and obstacles around the environment. The captures show the character on a workbench and interacting with a cable beside a vehicle. These make changes in foot placement easier to see than a walk across an empty floor.

      I measured foot drift and successful placements on four surface types. On flat ground, 98% of placements succeeded with 0.5 cm of average drift. That fell to 90% on uneven terrain, 85% on slopes, and 78% on moving surfaces, where drift reached 4.7 cm.

      The rig adapted to a change in terrain within about 12 ms. Abrupt changes and faster movement were where it struggled, with occasional sliding or misalignment.
    image: /media/AdaptikWire.webp
    imageAlt: ADAPTIK's legs positioned around a raised cable beside a vehicle
    caption: A small obstacle introduces a more local change in ground height.
  - title: The body needs to respond too
    text: |-
      The demonstration also shows procedural leaning. Foot placement is only part of the visible movement: the body posture needs to make sense alongside the changing leg positions.

      The capture shows the character leaning near a doorway. Along with the terrain examples, it helps show how the procedural setup affects the character as a whole, rather than looking at each foot in isolation.

      I used the dissertation to examine both the usefulness and the cost of this kind of adaptation. It also notes that authored animations still have a role where a character needs distinctive personality, idle behaviour, or jumps.
    image: /media/AdaptikPL.webp
    imageAlt: ADAPTIK leaning beside a doorway in the test environment
    caption: Procedural leaning shown as part of the character demonstration.
  - title: What the evaluation showed
    text: |-
      The project demonstrated real-time terrain adaptation, and the dissertation also records what it costs. Terrain scanning and IK added about 20% CPU usage compared with keyframed animation, while GPU load barely changed. The scene averaged 120 FPS on high-end hardware and 85 FPS on mid-range hardware. Moving surfaces and sudden changes could still cause frame spikes or desynchronisation.

      The next steps would be better collision handling, lower CPU overhead, and testing across more complex environments. The project gave me a practical foundation in Control Rig and terrain-aware animation, as well as a clearer understanding of where the system needed more work.

      The dissertation is linked above for the full methodology and reported measurements. The source repository is available alongside it.
    image: /media/AdaptikTable.webp
    imageAlt: ADAPTIK standing on a raised workbench inside the demonstration garage
    caption: A raised workbench provides another surface for the character to stand on.
---

## The project

ADAPTIK was my final-year investigation into procedural locomotion for a four-legged character in Unreal Engine 5 Control Rig. The focus was terrain adaptation: placing feet on uneven ground, responding to height changes, and finding out where the approach starts to struggle.

I tested the rig on flat, uneven, sloped, and moving ground and measured how often each foot landed where it should. Placement held at 98% on flat ground and dropped to 78% on moving surfaces, for roughly 20% more CPU than keyframed animation.
