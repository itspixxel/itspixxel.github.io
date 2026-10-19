---
title: Superhero Arena
description: Venom, Doctor Strange, Green Lantern, and the performance work behind them, on a live Roblox battlegrounds game with 12M+ visits.
image: /media/SuperheroArenaCover.webp
imageAlt: Superhero Arena key art showing two Roblox heroes clashing
tags:
  - Roblox
  - VFX
  - Live game
category: Games
featured: true
order: 0
status: Live game at AriseMedia
engine: Roblox Studio
role: Game Developer at AriseMedia
duration: June 2026 – present
team: One of two game developers
year: "2026"
draft: false
sample: false
gallery: []
video: ""
trailer: /media/superhero-arena-trailer.mp4
links:
  - label: Play on Roblox
    url: https://www.roblox.com/games/78710221869926/Superhero-Arena
note: Shipped, and still shipping.
showCarousel: false
sections: []
---

## The game

Superhero Arena is a Roblox battlegrounds fighting game. Players pick a hero, defeat other players to unlock more, and work their way up to Thanos. It launched in September 2026 and passed **12 million visits** and 40,000 favourites in its first six weeks.

I'm one of two game developers at AriseMedia. The team writes a short design brief for each hero; I build it: abilities, VFX, networking, and the performance work to keep it running on phones.

**Highlights**

- **Venom**, my biggest build: about 13,000 lines of Luau across 19 modules. Procedural symbiote goo, tendrils with secondary motion, four abilities, and a bake pipeline that moved the whole look off the per-frame budget.
- **Doctor Strange** and **Green Lantern**, two full heroes built from brief to release in October.
- **Performance passes** across a dozen heroes, cutting the frame cost of casting an ability by up to 85%.

## Venom: making the symbiote feel alive

The brief asked for Venom's tendrils to look like Kaneki's kagune from *Tokyo Ghoul* rather than flat effects, and for his goo to look like thick black syrup. Everything below is client-side and cosmetic: nothing replicates or collides, so it costs the server nothing.

- **Tendrils.** Six procedural tubes fan out from his back. Each one is muscular at the root, then tapers to a blade point, with a spine ridge, a slight twist, and chevron ridges down its length. Each is a **verlet chain chasing a pose**: stiff at the root and loose at the tip. When he runs, jumps or turns, they trail, overshoot and whip back instead of riding rigidly on his back.
- **Goo.** Drips off his hands are 8-node verlet ropes. They sag, swing with the body, thin to a neck, and **snap**: the bead falls, the remnant springs back, and a bead that hits the ground becomes a puddle. Thin streaks creep down his limbs and feed the drips. Goo webs stretched between his arms and legs thin as the limbs separate, then snap and re-form.
- **Details.** Veins over every limb, gooey footprints that dry and fade, and a near-black colour with no reflectance. Any reflectance mirrored the sky and read as blue.

## Four abilities built from his own body

- **Tendril Slam (E).** The upper tendril on his back is the weapon. It lashes out up to 75 studs, coils round the victim as a tightening helix, and slams them left, right, then overhead into a crater, all in about two seconds. The server owns the victim's body and walks it along the slam path. Every client draws the tendril from Venom's back to wherever that body actually is, frame by frame, so it never detaches.
- **Possess (F).** Venom melts into a slick of glossy black goo that slithers like a snake and leaves a mucus trail that dries and fades. When it catches someone, it crawls up them and a **goo coat grows from their feet to their head**, behind a ragged, swelling front.
- **Feeding Frenzy (R).** A tendril reels the nearest enemy in to his face, he bites four times, then shoves them into a ragdoll. The server keeps the same clock as the animation, so every bite lands on its beat.
- **Symbiote Axe (Q).** The axe grows out of his right arm. The handle is a chain of nodes with fake physics: it lags, overshoots, sags and drags on the floor. It swings over his shoulder, buries edge-first, quivers, rips out the way the body was thrown, and melts back into his hand.

All four share one session system, so they can never overlap, and every path that doesn't reach the last hit still cleans up. The caster is never left stuck mid-ability.

## Baking the goo for phones

The first version rebuilt Venom's goo every frame in EditableMesh: every vertex rewritten and the whole mesh re-uploaded. That looked great, but EditableMesh has a small memory budget per client, especially on phones. Other heroes' mesh pools were also pre-building on every client, and **the budget ran out about 5 seconds after joining**.

With a large mobile audience, the team decided to bake his look. I built the bake pipeline and the runtime that plays it back:

- **Studio bake tools** build each piece from the same procedural code with fixed seeds, preview it, then upload it as a mesh asset.
- **Veins** became five plain meshes welded to his limbs. They have no per-frame cost, so every Venom gets them at any distance, not just the nearest few.
- **Tendrils** became six skinned meshes with 14 bones each. Each frame only moves the bones along the same verlet chain, and the GPU bends the mesh.
- **Thickness from bones.** Bones can bend a mesh but not thin it, and drips and the axe handle need to thin and swell. So each station along a baked tube has **two bones at the same spot**. Turned apart by ±θ, linear blend skinning's "candy wrapper" artefact shrinks the ring to cos θ of its radius, which gives any thickness from 0 to 1 without rebuilding anything.
- **Only one live mesh is left:** the Tendril Slam tendril, because it has to stretch 75 studs and coil round a target.
- **Mesh pools** for every hero are now gated on someone actually wearing that hero. They release 15 seconds after the last wearer leaves.

## Doctor Strange and Green Lantern

Two full heroes, at about 4,800 and 6,700 lines of client code. In both, the server decides every hit, and each client moves the held bodies from a plan the server broadcasts, so a grab looks the same on every screen.

- **Doctor Strange.** An Energy Whip that lassoes, whirls and throws. An Infinite Portal Trap: a warning mark and a 2-second charge, a range and line-of-sight check on the server, then portals above and below that drop the target in a loop, faster each time, before slamming them into the floor. And a Magic Overcharge lightning bolt that hops along the ground. The sling-ring portals are windows that show the far side.
- **Green Lantern.** A construct fist flown round a loop and back into his hand, a camera-steered dive, an Energy Scythe combo, and a beam aimed live at the crosshair. Every construct shares one look: a near-white neon core in a ForceField shell, rimmed by a Highlight. Every pose is authored in code, so nothing needs uploading and it plays the same live as in Studio.

Both use imported VFX kits as a base, recoloured, retimed and rebuilt to fit each hero.

## Performance passes

I split a performance pass across the roster with the other developer and took twelve heroes. The fixes were mostly:

- object pools instead of cloning effects on every cast;
- pre-building large effects as hidden spares;
- warming first-use costs at load. The first Highlight in a session cost about 70 ms, and Thanos's first post-processing effect went from 64 ms to 16 ms.

Measured in Studio:

| Ability | Frame on press | Worst frame |
|---|---|---|
| Doctor Strange: Energy Whip | 24 → 5.5 ms | 55 → 20 ms |
| Doctor Strange: Portal Trap | 48 → 15 ms | 72 → 36 ms |
| Doctor Strange: Overcharge | 21 → 3.5 ms | 57 → 28 ms |
| Deadpool: dash | 41 → 6 ms | 59 → 19 ms |
| Ghost Rider: cast | 11.3 → 2.4 ms | 29 → 18 ms |

Two of the fixes were just wasted work: the hotbar was walking 6,390 instances on every key press, and Spider-Man scanned 29,500 instances (about 4.8 ms) per press. Both are now cached or gone.

## Fixing a live game

- **Server-side invincibility frames.** Hulk Smash set its invincibility frames on the client, but client-set attributes don't replicate, so the server's damage check never saw them. I moved them to the server at the start of the wind-up and broadcast the wind-up so other players see the telegraph.
- **Beams that always end.** Superman's and Thanos's lasers now cancel cleanly on a hit, ragdoll, freeze, death or leaving. One idempotent end routine, watched by a single incapacitated signal, means a re-cast can't soft-lock the hero.
- **Aquaman's ocean.** The water launches him up to three times, refilled by touching ground, then he drowns. The server relays the bounce when it owns a knocked-down body.
