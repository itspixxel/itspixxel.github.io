---
title: Implementing Fluid Movement in Ember's Edge
description: The movement system in Ember's Edge was designed with fluidity and
  player expression in mind. We wanted players to chain together different
  movement mechanics seamlessly, creating their own unique ways to traverse the
  environment.
date: 2024-03-15
tags:
  - Development
image: /media/EmbersEdgeIcon.webp
featured: true
draft: true
sample: false
---

### The Core Movement System

The movement system in Ember's Edge was designed with fluidity and player expression in mind. We wanted players to chain together different movement mechanics seamlessly, creating their own unique ways to traverse the environment.

Key features of the system include:

- Wall-running with adjustable gravity and stick duration
- Air dashing with momentum preservation
- Double jumping with variable height control
- Slide mechanics that interact with terrain slope

### Technical Implementation

The system was built using Unreal Engine's Character Movement Component as a foundation, with several custom modifications to achieve the desired feel:

```cpp
// Custom movement mode for wall-running
void AEmberCharacter::WallRun()
{
    FVector WallNormal = GetCurrentWallNormal();
    FVector RunDirection = FVector::CrossProduct(WallNormal, FVector::UpVector);

    // Apply wall-run forces
    GetCharacterMovement()->Velocity = RunDirection * WallRunSpeed;
    GetCharacterMovement()->GravityScale = WallRunGravityScale;
}
```
