---
title: Kimble's Encounter Manager 5/5.5e
description: Build and run 5e encounters (2014 and 2024 rules) from a GM window, with linked tokens, condition badges, loot and movement trails
author: Kimble
image: https://kimblethedwarf.github.io/Kimble-s-Encounter-Manager-5-5.5e/logo/hero.webp
icon: https://kimblethedwarf.github.io/Kimble-s-Encounter-Manager-5-5.5e/logo/logo.png
tags:
  - combat
  - tool
  - automation
manifest: https://kimblethedwarf.github.io/Kimble-s-Encounter-Manager-5-5.5e/manifest.json
learn-more: https://github.com/KimbletheDwarf/Kimble-s-Encounter-Manager-5-5.5e
---

# Kimble's Encounter Manager 5/5.5e

![Kimble's Encounter Manager](https://kimblethedwarf.github.io/Kimble-s-Encounter-Manager-5-5.5e/logo/logo-animated.webp)

An encounter builder and combat tracker for 5e (2014 and 2024 rules). The GM runs everything from a **GM window**; Owlbear shows the turn order, condition badges and movement to everyone in the room.

Includes the SRD 5.2.1 monsters (330), spells (339) and items. Nothing runs on a server: your library stays in your browser, or in your own private GitHub repository.

## Getting started

1. Turn the extension on for your room. Everyone gets the tracker icon in the top-left bar.
2. The GM opens it and presses **Open / reconnect GM window** (allow pop-ups for owlbear.rodeo if nothing opens).
3. If the GM window loses its link (after F5, say), press **Open / reconnect GM window** again.

## Build an encounter

**Party:** add your characters, typed in or from a D&D Beyond PDF. **Encounter Builder:** add monsters (or **Generate**) and watch the difficulty as you go.

![Encounter builder](https://kimblethedwarf.github.io/Kimble-s-Encounter-Manager-5-5.5e/store/builder.webp)

## Run the fight and link tokens

In **Run Encounter**, press **Run**, roll initiative and **Start combat**. Bonuses and damage in the stat blocks are clickable, with 3D dice.

- **Link a token:** right-click a creature or character in the tracker > **Link to token…**, then click its token on the map. A group links member by member.
- **Conditions:** **+ Condition** puts a badge on the linked token. 0 HP shows a skull (monsters) or Unconscious (characters).
- **Next / Undo** work from the GM window or from the GM's panel in Owlbear. Players see whose turn it is; monster HP is never shown to them.

![Combat runner](https://kimblethedwarf.github.io/Kimble-s-Encounter-Manager-5-5.5e/store/combat.webp)

## Movement

During a fight, the linked token whose turn it is leaves a green trail with a dot every 5 ft and shows **15 / 30 ft** against its speed. Players' Move tool switches to **Move with trail** while a fight is on. Right-click a token > **Reset movement** to send it back. Switch any of this off in the GM's panel.

## Screenshot to monster or item

**Maker:** paste or drop a screenshot of a stat block (or a magic item card). It's read in your browser, saved to your library, and ready to drop into an encounter. Fix any misread text and press **Read text**.

![Maker](https://kimblethedwarf.github.io/Kimble-s-Encounter-Manager-5-5.5e/store/maker.webp)

## Loot

After a fight, **Loot** rolls coins, gear, pocket items and harvestable parts from every enemy's type and CR. Set the generosity, tick **Magic items found** for a set number of magic items, and hover any name for its card. Edit what each kind of creature carries in **Creatures > Loot tables**.

![Loot](https://kimblethedwarf.github.io/Kimble-s-Encounter-Manager-5-5.5e/store/loot.webp)

## Your library

Your monsters, items, characters and encounters live in the GM window's browser. Keep a copy:

- **📁 > Export / Import library:** the whole library as one file.
- **📁 > GitHub library:** keep it in your own private GitHub repository, the same library on every computer. You need a free GitHub account and a token for that one repository; the [full steps are here](https://github.com/KimbletheDwarf/Kimble-s-Encounter-Manager-5-5.5e#setting-up-your-own-github-library). The token stays in your browser and is only sent to GitHub.

## Support

Questions and bug reports: [GitHub issues](https://github.com/KimbletheDwarf/Kimble-s-Encounter-Manager-5-5.5e/issues).

This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd, licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode). This is an unofficial fan project, not affiliated with or endorsed by Wizards of the Coast or Owlbear Rodeo.
