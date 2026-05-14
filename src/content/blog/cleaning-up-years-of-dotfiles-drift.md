---
title: "Cleaning Up Years of Dotfiles Drift"
description: "Before onboarding to a locked-down government laptop, I cleaned up years of dotfiles drift, old SSH hosts, usernames, and cloud config cruft. Here's the checklist I used and what I'd recommend to other developers."
pubDate: "May 11 2026"
heroImage: "../../assets/retro-mac.webp"
---

A new work season is a good time to clean house.

As I prepared for onboarding to a government-furnished laptop, I realized my personal setup had slowly accumulated years of history: old SSH hosts, usernames from previous environments, stale work references, and configuration files that made sense at one point but no longer deserved to follow me forward.

None of it was dramatic. That was the problem.

Configuration drift rarely shows up as one obvious mistake. It shows up as a hundred tiny assumptions that were never reviewed because everything still mostly worked.

This time I wanted a cleaner boundary.

Not just because the upcoming machine would be more locked down than what I was used to, but because I did not want personal and work context bleeding into each other by default.

If you already manage your setup in a dotfiles repo, this is worth doing before a job transition, a laptop refresh, or any other environment change with tighter constraints.

If you don't already manage your setup that way, I wrote earlier about [syncing dotfiles with Stow](/blog/syncing-dofiles-with-stow/).

## What had accumulated over the years

My setup was not a disaster, but it definitely had layers.

A few examples:

- SSH config entries for hosts I no longer touched
- usernames and email settings tied to older work contexts
- cloud and AWS config I wanted to review instead of blindly carrying forward
- shell aliases that assumed certain repos, paths, or tools existed everywhere
- little convenience settings that were helpful on one machine but unnecessary on another

That kind of buildup is normal. Most developers do not rebuild their environment from first principles very often, so old assumptions stick around.

The danger is not only clutter. The bigger issue is that you stop knowing which parts of your environment are intentional.

## The cleanup checklist I used

I kept the process simple.

### 1. Review what is actually versioned

First I walked through the repo itself and asked a basic question:

> If I were setting up a fresh machine today, would I still want this here?

Anything that felt like historical residue went on the review list.

### 2. Audit SSH config

This was one of the easiest wins.

I reviewed host entries, key references, and comments. If a host was dead, renamed, replaced, or tied to an old project, it did not need to stay in the default path of every future machine.

A clean SSH config is not just prettier. It reduces confusion when you are moving quickly.

### 3. Review usernames, email addresses, and identity defaults

Git identity settings, shell environment variables, and tool defaults can quietly carry old context much longer than they should.

I checked anything that could accidentally apply the wrong identity in the wrong place.

### 4. Audit cloud config and credentials-related setup

I did not want stale assumptions around AWS or other cloud tooling hitching a ride into a new work season.

That meant reviewing config structure, pruning what was outdated, and making sure anything sensitive or context-specific stayed intentionally separated.

### 5. Look for machine-specific leakage

Some config belongs in a portable repo. Some does not.

I looked for anything that depended on:

- a specific employer
- a specific laptop
- a specific directory structure
- a one-off workaround I no longer needed

If it was not broadly useful, I either removed it or moved it out of the general path.

### 6. Keep the core, cut the nostalgia

This was probably the real lesson.

A lot of old config survives because it once solved a real problem. That does not mean it should be immortal.

I kept the parts that still made my setup faster, clearer, and more repeatable. I cut the parts I was only keeping because they had been there a long time.

## What I changed

At a high level, the cleanup led to a few practical changes:

- pruned stale SSH host entries
- removed or reviewed old usernames and work-specific references
- tightened up config that had become too environment-specific
- kept my portable baseline focused on tools and preferences I actually use
- made the separation between reusable setup and context-specific setup more deliberate

I was not trying to build the perfect universal dotfiles repo.

I was trying to build a repo I could trust.

That is a better goal.

## What I kept separate on purpose

This was the most important part.

A good dotfiles setup is not one giant bucket for every setting you have ever used.

I want my main setup to travel well across personal systems, but I do not want every work context hard-coded into that baseline.

So I treated a few categories more carefully:

- employer-specific configuration
- credentials and secrets
- machine-specific tweaks
- temporary project glue
- anything I would not want copied automatically to a new device

Separation creates a little friction, but in this case the friction is healthy. It forces me to be explicit.

## What I would recommend to other developers

If you are about to change jobs, receive a locked-down machine, or tighten the boundary between personal and work systems, here is my recommendation:

1. Review your dotfiles before you need them.
2. Remove dead SSH hosts and stale aliases.
3. Check identity defaults like usernames and email addresses.
4. Revisit cloud config instead of assuming old structure is still right.
5. Separate portable preferences from environment-specific setup.
6. Optimize for clarity, not cleverness.

The goal is not minimalism for its own sake.

The goal is to know what your environment is doing and why.

That matters even more when you are stepping into a context with stricter security, tighter controls, or less room for improvisation.

## Final thought

I am glad I did this before onboarding instead of after.

It gave me a cleaner personal baseline, a better boundary between contexts, and more confidence that my setup reflects how I actually work now instead of how I worked several years ago.

That is probably the real value of maintaining dotfiles in the first place.

Not just portability.

Intentionality.
