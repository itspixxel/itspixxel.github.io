---
title: Superhero Arena
description: Twelve heroes built from scratch and ten more reworked, with the procedural animation, VFX, networking and phone performance behind them, on a live Roblox fighting game with 12M+ visits.
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
team: Small studio team
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
sections:
  - title: The game
    text: |-
      Superhero Arena is a Roblox battlegrounds fighting game. Players pick a hero, defeat other players to unlock more, and work their way up to Thanos. It launched in September 2026 and passed **12 million visits** and 40,000 favourites in its first six weeks.

      I'm a game developer at AriseMedia. The leads write a short design brief for each hero, and I build it: the morph, every ability, the animation, VFX and sound, the server logic, and the performance work to keep it running on phones.
    image: /media/sa-lobby-squad.webp
    imageAlt: "Six players by the hero display stands in the lobby, with rank nameplates over their heads"
    caption: "Players in the lobby by the hero stands, with rank nameplates."
  - title: Twelve heroes from scratch
    text: |-
      - **Venom.** A procedural symbiote with four abilities built from his own body. The full breakdown is below.
      - **Scarlet Witch.** The biggest kit in the game: two modes, Hexweaver and Chaos Control, that swap her whole moveset, plus two domain abilities, Mind Altering and Reality Erasure.
      - **Doctor Strange.** An Energy Whip that lassoes, whirls and throws, an Infinite Portal Trap, and a Magic Overcharge bolt that hops along the ground. The sling-ring portals are live windows that show the far side.
      - **Green Lantern.** A construct fist flown round a loop and back into his hand, an Emerald Strike dive, an Energy Scythe combo, and a beam aimed live at the crosshair. Every construct shares one look: a near-white neon core in a ForceField shell.
      - **Ultron.** Drone Onslaught, Triple Threat and Hover Barrage. The barrage fires a seeded shot pattern, and his pooled effects kit became the base that later heroes reuse.
      - **Silver Surfer.** Cosmic Momentum, Atomic Pull, an Intangibility Spin, and Liquidify, a liquid form built in EditableMesh with its own performance pass.
      - **Ant-Man.** Ant Swarm, Ant Dash, Quantum Cannon and Giant Ground Pound. The swarm moves hundreds of ants on every client (more below).
      - **Black Panther.** A homing Spear Throw, Predator Pounce, and a Bubble Shield: a Wakandan forcefield dome that blocks every hit for five seconds and ripples where each one lands.
      - **Homelander.** Super Punch, Ground Pound, and Laser Execution: a face grab, heat vision held on the target, a slam, then a throw.
      - **Darkseid.** Omega Beams, Boom Tube Parademon, Omega Erasure and Tyrant's Charge, over a God Armor passive.
      - **Nightwing.** Escrima Assault, Escrima Throw, Grapple Takedown and Electro Dash.
      - **Red Hulk.** Thunder Clap, Roar, Rage and a reworked Hulk Leap.

      I also reworked ten more: Iron Man (a new ability), Hulk, Frozone, The Flash, Storm, Thor, Groot, Raven, Superman, and Thanos, including his Galactic Thanos variant.
  - title: "Venom: making the symbiote feel alive"
    text: |-
      The brief asked for Venom's tendrils to look like Kaneki's kagune from *Tokyo Ghoul* rather than flat effects, and for his goo to look like thick black syrup. Everything below is client-side and cosmetic: nothing replicates or collides, so it costs the server nothing.

      - **Tendrils.** Six procedural tubes fan out from his back. Each one is muscular at the root, then tapers to a blade point, with a spine ridge, a slight twist, and chevron ridges down its length. Each is a **verlet chain chasing a pose**: stiff at the root and loose at the tip. When he runs, jumps or turns, they trail, overshoot and whip back instead of riding rigidly on his back.
      - **Goo.** Drips off his hands are 8-node verlet ropes. They sag, swing with the body, thin to a neck, and **snap**: the bead falls, the remnant springs back, and a bead that hits the ground becomes a puddle. Thin streaks creep down his limbs and feed the drips. Goo webs stretched between his arms and legs thin as the limbs separate, then snap and re-form.
      - **Details.** Veins over every limb, gooey footprints that dry and fade, and a near-black colour with no reflectance. Any reflectance mirrored the sky and read as blue.
    image: /media/sa-venom-tendril-slam.webp
    imageAlt: "Venom's Tendril Slam hoisting Spider-Man overhead on the Helicarrier deck"
    caption: "Tendril Slam, hoisting Spider-Man overhead on the Helicarrier deck."
  - title: Four abilities built from his own body
    text: |-
      - **Tendril Slam (E).** The upper tendril on his back is the weapon. It lashes out up to 75 studs, coils round the victim as a tightening helix, and slams them left, right, then overhead into a crater, all in about two seconds. The server owns the victim's body and walks it along the slam path. Every client draws the tendril from Venom's back to wherever that body actually is, frame by frame, so it never detaches.
      - **Possess (F).** Venom melts into a slick of glossy black goo that slithers like a snake and leaves a mucus trail that dries and fades. When it catches someone, it crawls up them and a **goo coat grows from their feet to their head**, behind a ragged, swelling front.
      - **Feeding Frenzy (R).** A tendril reels the nearest enemy in to his face, he bites four times, then shoves them into a ragdoll. The server keeps the same clock as the animation, so every bite lands on its beat.
      - **Symbiote Axe (Q).** The axe grows out of his right arm. The handle is a chain of nodes with fake physics: it lags, overshoots, sags and drags on the floor. It swings over his shoulder, buries edge-first, quivers, rips out the way the body was thrown, and melts back into his hand.

      All four share one session system, so they can never overlap, and every path that doesn't reach the last hit still cleans up. The caster is never left stuck mid-ability.
    image: /media/sa-venom-slam-impact.webp
    imageAlt: "Venom's Tendril Slam driving a target into the Helicarrier deck in a burst of light, his tendrils fanned behind him"
    caption: "Tendril Slam driving a target into the deck."
  - title: Baking the goo for phones
    text: |-
      The first version rebuilt Venom's goo every frame in EditableMesh: every vertex rewritten and the whole mesh re-uploaded. That looked great, but EditableMesh has a small memory budget per client, especially on phones. Other heroes' mesh pools were also pre-building on every client, and **the budget ran out about 5 seconds after joining**.

      With a large mobile audience, the team decided to bake his look. I built the bake pipeline and the runtime that plays it back:

      - **Studio bake tools** build each piece from the same procedural code with fixed seeds, preview it, then upload it as a mesh asset.
      - **Veins** became five plain meshes welded to his limbs. They have no per-frame cost, so every Venom gets them at any distance, not just the nearest few.
      - **Tendrils** became six skinned meshes with 14 bones each. Each frame only moves the bones along the same verlet chain, and the GPU bends the mesh.
      - **Only one live mesh is left:** the Tendril Slam tendril, because it has to stretch 75 studs and coil round a target.
      - **Mesh pools** for every hero are now gated on someone actually wearing that hero. They release 15 seconds after the last wearer leaves.

      **Thickness from bones.** Bones can bend a mesh but not thin it, and drips and the axe handle need to thin and swell. So each station along a baked tube has **two bones at the same spot**. Turned apart by ±θ, linear blend skinning's "candy wrapper" artefact shrinks the ring to cos θ of its radius, which gives any thickness from 0 to 1 without rebuilding anything. The usual skinning bug became the feature.
    image: /media/sa-venom-live-tendril.webp
    imageAlt: "Venom's Tendril Slam tendril stretched high, hoisting a target overhead, with the baked tendrils curling from his back"
    caption: "The one live mesh left: the Tendril Slam tendril, stretched to hoist its target. The rest are baked."
  - title: "Scarlet Witch: two kits in one hero"
    text: |-
      Scarlet Witch is the biggest kit in the game. Two modes, Hexweaver and Chaos Control, swap her whole moveset, and Hexweaver's Telekinesis grabs a target and finishes with a Slam, a Push or a Crush.

      Her Scarlet Hex drops a domain over the fight: the arena turns scarlet around a rune circle, and her hotbar swaps to the hex kit, Mystic Projection, Scarlet Mayhem, Reality Erasure and Mind Altering.
    image: /media/sa-scarlet-hex.webp
    imageAlt: "Scarlet Witch's Scarlet Hex domain turning the arena scarlet around a rune circle"
    caption: "The Scarlet Hex: the arena turns scarlet around her rune circle."
  - title: Hundreds of ants on a phone budget
    text: |-
      Ant-Man's Ant Swarm moves hundreds of small ant meshes on every client, so I measured what they actually cost in Studio, using 224 ants:

      - **The maths was cheap.** Aiming every ant took about 0.17 ms in total.
      - **Moving them was the cost.** BulkMoveTo runs at about 6 to 7 µs per part and scales linearly, so 500 ants is about 3.4 ms. Parenting them under the camera made it about 20% cheaper.
      - **Fading was the trap.** With every ant half-transparent, render CPU rose by 3 ms and GPU by 5 ms. So the swarm never fades: ants leave by burrowing, shrinking or popping instead.
    image: /media/sa-antman-swarm.webp
    imageAlt: "Ant-Man's Ant Swarm pouring off him toward the camera on the Helicarrier deck"
    caption: "Ant Swarm pouring off Ant-Man."
  - title: Tracing a rubber band
    text: |-
      Homelander's knockbacks rubber-banded: a body would arc too slowly, then snap back. Rather than keep guessing, I traced it live. The shared module that steers knocked-down bodies used a rigid AlignPosition, which tops out at about 80 studs a second whatever its force and velocity limits. His knockback ran at 150, so the body lagged behind the path every client was drawing, then snapped when control was handed back.

      Switching it to a non-rigid constraint with high limits brought the lag down to about 2.5 studs at 150 studs a second. Because the module is shared, the fix covers every knockback in the game, including ordinary punches, which had been running just past the cap.
    image: /media/sa-ultron-barrage.webp
    imageAlt: "Ultron hovering as his Hover Barrage knocks a target back with red bolts"
    caption: "Ultron's Hover Barrage knocking a target back. Every knockback runs through the fixed module."
  - title: "Duels: a ranked mode of its own"
    text: |-
      Duels is a separate place for ranked one-on-one and two-on-two fights. I built the floating city map and its performance pass, the queue lobby, the pick-and-ban flow, the VS and results screens, and Elo with ranks and leaderboards.
    image: /media/sa-duels-2v2.webp
    imageAlt: "Duels 2v2 victory screen, 3-0, with Homelander and Darkseid standing over Spider-Man and Black Panther, plus stat and Elo cards"
    caption: "A 2v2 victory, 3-0, as Homelander and Darkseid."
  - title: Results that read at a glance
    text: |-
      Every match ends on a results screen: a short cutscene of the winners over the losers, then a card per player with kills, hit accuracy, deaths, damage dealt, and the Elo they won or lost, with Rematch, Play Again and Return to Lobby.
    image: /media/sa-duels-1v1.webp
    imageAlt: "Duels 1v1 victory, 3-2, Scarlet Witch over Iron Man in the floating city"
    caption: "A 1v1 victory, 3-2, Scarlet Witch over Iron Man in the floating city."
  - title: Performance passes
    text: |-
      I split a performance pass across the roster with another developer and took twelve heroes. The fixes were mostly:

      - object pools instead of cloning effects on every cast;
      - pre-building large effects as hidden spares;
      - warming first-use costs at load. The first Highlight in a session cost about 70 ms, and Thanos's first post-processing effect went from 64 ms to 16 ms.

      Measured in Studio:

      - **Doctor Strange: Energy Whip:** 24 → 5.5 ms on press, 55 → 20 ms worst frame
      - **Doctor Strange: Portal Trap:** 48 → 15 ms on press, 72 → 36 ms worst frame
      - **Doctor Strange: Overcharge:** 21 → 3.5 ms on press, 57 → 28 ms worst frame
      - **Deadpool: dash:** 41 → 6 ms on press, 59 → 19 ms worst frame
      - **Ghost Rider: cast:** 11.3 → 2.4 ms on press, 29 → 18 ms worst frame

      Two of the fixes were just wasted work: the hotbar was walking 6,390 instances on every key press, and Spider-Man scanned 29,500 instances (about 4.8 ms) per press. Both are now cached or gone.
    image: /media/sa-panther-shield.webp
    imageAlt: "Black Panther inside his Bubble Shield, a blue hexagonal forcefield dome on the Helicarrier deck"
    caption: "Black Panther's Bubble Shield: the dome is pooled and warmed at load, with no per-frame work on the client."
  - title: Fixing a live game
    text: |-
      - **Server-side invincibility frames.** Hulk Smash set its invincibility frames on the client, but client-set attributes don't replicate, so the server's damage check never saw them. I moved them to the server at the start of the wind-up and broadcast the wind-up so other players see the telegraph.
      - **Beams that always end.** Superman's and Thanos's lasers now cancel cleanly on a hit, ragdoll, freeze, death or leaving. One idempotent end routine, watched by a single incapacitated signal, means a re-cast can't soft-lock the hero.
      - **Aquaman's ocean.** The water launches him up to three times, refilled by touching ground, then he drowns. The server relays the bounce when it owns a knocked-down body.
---

## At a glance

- **12 of the 35 heroes built from scratch**, and 10 more reworked. I've worked on 30 of the 35 heroes in the game.
- **Venom**, my biggest build: about 13,000 lines of Luau across 19 modules, with procedural symbiote goo, tendrils with secondary motion, four abilities, and a bake pipeline that moved the whole look off the per-frame budget.
- **Performance passes** across a dozen heroes, cutting the frame cost of casting an ability by up to 85%.
- **Duels**, a ranked mode for 1v1 and 2v2 fights, with its own map, lobby, pick-and-ban flow and Elo ratings.
