---
title: ADAPTIK
description: A final-year study of procedural foot placement and terrain adaptation in Unreal Engine 5 Control Rig.
image: /media/AdaptikCover.webp
imageAlt: ADAPTIK · project screenshot
tags:
  - Unreal Engine
  - Tools
category: Tools
featured: true
order: 2
status: Final-year university project
engine: Unreal Engine
role: Development and dissertation
year: ""
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
  - label: Read the dissertation (Word)
    url: /docs/other/Realtime%20Procedural%20IK%20Animation.docx
  - label: Tutorial by Lincoln Margison
    url: https://www.youtube.com/watch?v=vKiqs_h1WXM
note: Finding its feet, one frame at a time.
duration: 4 months
showCarousel: false
sections:
  - title: Learning the system by building it
    text: |-
      I learned the approach through Lincoln Margison's “Step by Step” Procedural Animation tutorial. ADAPTIK was my implementation of that approach, developed as the practical project for my final-year dissertation.

      The question I explored was how a quadruped could adjust its feet to the ground in real time. A movement that looks right on a flat surface can stop making sense at a kerb or an obstacle. This project let me study that problem through a working Control Rig setup and a set of terrain tests.

      The linked tutorial is the foundation for the implementation. My dissertation records the research, testing, and limitations of the project.
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

      The dissertation considers flat, uneven, sloped, and moving surfaces. Its reported results were strongest on flat ground, with accuracy falling as the terrain became less predictable. Abrupt changes and faster movement could still produce sliding or misalignment.

      Testing different surfaces made those limits visible. It gave me a way to compare the behaviour on ordinary ground with the cases that needed more refinement.
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
      The project demonstrated real-time terrain adaptation, but the dissertation also records the trade-offs. Terrain scanning and IK added CPU work. Moving surfaces and sudden changes could cause frame spikes or desynchronisation, and more demanding terrain still exposed foot-placement errors.

      The next steps would be better collision handling, lower CPU overhead, and testing across more complex environments. The project gave me a practical foundation in Control Rig and terrain-aware animation, as well as a clearer understanding of where the system needed more work.

      The dissertation is linked above for the full methodology and reported measurements. The source repository and the tutorial I followed are available alongside it.
    image: /media/AdaptikTable.webp
    imageAlt: ADAPTIK standing on a raised workbench inside the demonstration garage
    caption: A raised workbench provides another surface for the character to stand on.
---

## The project

ADAPTIK was my final-year investigation into procedural locomotion for a four-legged character, using Unreal Engine 5 and Control Rig. I built the implementation by following [Lincoln Margison's “Step by Step” Procedural Animation tutorial](https://www.youtube.com/watch?v=vKiqs_h1WXM), then documented and evaluated the system in my dissertation.

The focus was terrain adaptation: placing feet on uneven ground, responding to height changes, and understanding where the approach starts to struggle.
