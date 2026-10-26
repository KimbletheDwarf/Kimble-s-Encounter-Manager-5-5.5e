# Kimble's Encounter Manager 5/5.5e

An encounter builder and combat tracker for 5e (2014 and 2024 rules) that runs alongside [Owlbear Rodeo](https://www.owlbear.rodeo).

- **Owlbear tracker for everyone:**
  - who's up and who's next, with the full initiative order on demand
  - tokens linked to creatures
  - condition badges on the tokens
  - the active party between fights
- **A GM window** (a separate browser window) holding the whole app:
  - **Encounter builder:** 2014 and 2024 encounter math, a generator, and minion groups
  - **Combat runner:** initiative, HP and temporary HP, conditions, concentration saves, recharges, and legendary actions
  - **Stat blocks:** every bonus and damage roll is clickable, with 3D dice
  - **Reference:** spells, conditions, and the SRD 5.2.1 monsters (330) and spells (339)
  - **Monster Maker:** reads a stat block from a screenshot, offline, in your browser

Nothing runs on a server. The app is a set of files on GitHub Pages, and **your library (monsters, characters, encounters) stays in your own browser** unless you choose to keep it in your own GitHub repository (see below).

## Add it to Owlbear Rodeo

1. In Owlbear Rodeo, open your profile (top left) > **Extensions** > **Add Extension**, and paste:

   ```
   https://kimblethedwarf.github.io/Kimble-s-Encounter-Manager-5-5.5e/manifest.json
   ```

2. Turn it on for your room (the room's extension settings).
3. Everyone in the room now has the tracker icon in the top-left bar. The GM opens it and presses **Open / reconnect GM window**. If nothing opens, allow pop-ups for owlbear.rodeo.

**If the GM window loses its link** (for example after you press F5 in it), press **Open / reconnect GM window** again in Owlbear. It finds the open window and reconnects it, without reloading.

## Running a session

- **Party tab:** add your characters. A D&D Beyond PDF export can be imported, or type them in.
- **Run Encounter > Choose characters:** pick the active party. Right-click a character to **Link to token…**, then click its token on the map. The token takes the character's name.
- **Encounter Builder:** build an encounter (or Generate one), then **Run** it from Run Encounter.
  - The party comes in as they are, already linked.
  - Right-click a creature to link its token. A group links member by member.
- **Conditions:** add them with **+ Condition**, and badges appear on the linked tokens. A monster at 0 HP shows a skull, and a character at 0 HP shows Unconscious.
- **Next / Undo** work from the GM window or from the GM's tracker panel in Owlbear.
- **Party HP for players:** tick **Show party HP to players** in the GM's panel. Monster HP is never shown to players.

## Your library

The GM window keeps your library in that browser, on that computer. Clearing the site's data deletes it, so keep a copy. There are two ways:

- **Export library… / Import library…** (the 📁 menu): the whole library as one file.
- **GitHub library…** (the 📁 menu): keep the library in **your own private GitHub repository**. It's a backup, and the same library on every computer you use. **Load from GitHub** and **Save to GitHub** are in the same dialog. Tick *Save automatically* to save a minute after each change.

### Setting up your own GitHub library

You need a free GitHub account. The library goes in **your** repository; nobody else, including this project, can see it.

1. On github.com, create a new repository: **+** (top right) > **New repository**, or go to [github.com/new](https://github.com/new).
   - Give it any name, e.g. `my-encounter-library`.
   - Choose **Private**, and leave everything else empty (no README, no licence).
2. Create an access token for it: your picture (top right) > **Settings** > **Developer settings** (at the bottom of the left menu) > **Personal access tokens** > **Fine-grained tokens** > **Generate new token**. Or go straight to [the new token page](https://github.com/settings/personal-access-tokens/new).
   - **Name and expiration:** anything you like. When the token expires, make a new one the same way.
   - **Repository access:** **Only select repositories**, and pick the repository from step 1.
   - **Permissions** > **Repository permissions** > **Contents:** **Read and write**. Nothing else is needed.
   - Generate it and copy it. It starts with `github_pat_`, and GitHub shows it **only once**. **Never share it:** anyone with it can change your library.
3. In the GM window, open the 📁 menu > **GitHub library…**.
   - Enter the repository (`your-name/my-encounter-library`) and paste the token.
   - Press **Check connection**. It should say *Connected* and *private*.
   - Press **Save to GitHub**.
4. **On another computer or browser:** enter the same repository and a token, then **Load from GitHub**.

**How the merge works:**
- **Loading** merges: new items are added, items changed more recently in the file replace yours, and yours stay where they are newer.
- **Saving** checks first that nobody saved from somewhere else in between. If someone did, it asks you to load first, so nothing is overwritten unasked.

**Privacy:** the token is kept only in that browser, and only ever sent to `api.github.com`. Players never receive your library or the token. Use **Forget the token** in the dialog to remove it, and revoke it on GitHub whenever you like.

## Licences and credits

The app's own code is under the MIT licence ([LICENSE](LICENSE)). The SRD content and the bundled libraries keep their own licences, below.

This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

The 3D dice use three.js and cannon-es (MIT). Text recognition is by Tesseract.js (Apache 2.0), PDF reading by PDF.js (Apache 2.0), and spelling uses nspell (MIT) with the SCOWL dictionary (MIT/BSD). The full licence texts are in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). The condition icons were drawn for this project.

This is an unofficial fan project. It is not affiliated with or endorsed by Wizards of the Coast, D&D Beyond or Owlbear Rodeo.
