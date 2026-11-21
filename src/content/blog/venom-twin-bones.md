---
title: Turning a skinning bug into a thickness control
description: How Venom's baked goo in Superhero Arena thins and swells with no mesh rebuilds, by putting two bones at the same spot and leaning on linear blend skinning's candy-wrapper artefact.
date: 2026-11-21
tags:
  - Technical
image: /media/SuperheroArenaCover.webp
featured: false
draft: true
sample: false
---

Venom's goo in [Superhero Arena](/projects/superhero-arena/) started life as a live EditableMesh, rebuilt every frame. It looked right, but it ate the per-client mesh memory budget on phones, so I moved it to baked skinned meshes. That created a new problem, and this note covers the fix I'm happiest with.

## Bones can bend a mesh, but not thin it

A skinned tube is easy to bend: put bones along it and move them. The tendrils work that way, with 14 bones each following the same verlet chain the live version used.

Drips and the axe handle need more than bending. A drip has to thin to a neck before it snaps, and the handle swells and sags. A bone only carries a position and a rotation, so there is no scale to turn down, and rebuilding the mesh was exactly what I was trying to get away from.

## Two bones, one spot

Each station along the baked tube gets **two bones at the same position**, and every vertex in that ring is weighted half to each.

Linear blend skinning averages each vertex's *positions*, not its rotations. Rotate one bone by +θ around the tube's axis and the other by −θ, and a ring vertex at `p` ends up at:

```
p' = ½·R(+θ)·p + ½·R(−θ)·p = cos θ · p
```

The sine terms cancel and the cosine terms add, so the ring doesn't twist. It shrinks uniformly to `cos θ` of its radius.

That's the "candy wrapper" artefact: the reason a twisted forearm collapses to a pinch in a badly rigged character. Usually it's a bug. Here it's the feature.

## Thickness as an angle

To get a thickness `t` between 0 and 1, turn the pair apart by:

```
θ = acos(t)
```

At θ = 0 the ring is full size. At 90° it collapses to a point. Anything in between is a smooth neck, so a drip can thin to a neck before it snaps, from bone rotations alone.

## What it bought

- **No rebuilds:** every frame only sets bone transforms, and the GPU does the rest.
- **One bake, any shape:** the same uploaded mesh covers a fat bead and a thin neck.
- **The budget back:** with the goo baked, the only live mesh left on Venom is the Tendril Slam tendril, which has to stretch 75 studs and coil round a target.

The full case study, including the rest of the bake pipeline and the performance passes, is on the [Superhero Arena page](/projects/superhero-arena/).
