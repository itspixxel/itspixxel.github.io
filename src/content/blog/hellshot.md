---
title: Custom Weapon System in HellShot
description: The weapon system in HellShot was designed to be highly modular,
  allowing for quick iteration and easy addition of new weapons. Each weapon is
  composed of interchangeable components that define its behavior and
  characteristics.
date: 2024-03-10
tags:
  - Technical
image: /media/HellshotThumb.webp
featured: false
draft: false
sample: false
---

### Modular Weapon Architecture

The weapon system in HellShot was designed to be highly modular, allowing for quick iteration and easy addition of new weapons. Each weapon is composed of interchangeable components that define its behavior and characteristics.

- Component-based weapon modification system
- Dynamic reload animations based on weapon state
- Procedural recoil and weapon sway
- Advanced particle and sound effect system

### Technical Details

The weapon modification system uses a data-driven approach with scriptable objects:

```cpp
// Weapon modification structure
struct FWeaponModification
{
    UPROPERTY(EditDefaultsOnly)
    float DamageMultiplier;

    UPROPERTY(EditDefaultsOnly)
    float FireRateMultiplier;

    UPROPERTY(EditDefaultsOnly)
    TArray CustomEffects;
};
```
