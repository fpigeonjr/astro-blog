---
title: "Syncing Dotfiles with Stow"
description: "Don't lose your config settings. This post effectively explains the dotfiles syncing workflow and would be helpful for developers looking to manage their configurations across multiple machines."
pubDate: "Aug 20 2025"
heroImage: "../../assets/retro-mac.webp"
---

My mission was simple. Figure out a way to save and sync my dotfiles. Life happens and if I ever found myself in the situation with a busted arch setup or in need to reinstall my OS, getting back a productive developer system would be a walk in the park. I also wanted a way to sync my settings across my two machines.

My work laptop runs macOS and my personal macBook Air runs Arch Linux.<br/>
[see more](/uses)

I came across some Youtube videos that were inspiring and all recommended GNU Stow.

> **GNU Stow** is a "a symlink farm manager which takes distinct sets of software and/or data located in separate directories on the filesystem, and makes them appear to be installed in a single directory tree".

This exactly what I was looking for to solve this problem.

1. To start let's create a _dotfiles_ directory in the home directory.

   ```bash
   mkdir ~/dotfiles
   ```

2. Then you create a directory to match the config you want to sync.
   ```bash
   mkdir ~/dotfiles/newpackage
   ```
3. Next you would move the config file or directory to the dotfiles directory.
   ```bash
   mv ~/.someconfig ~/dotfiles/newpackage/
   ```
4. Then stow the new package
   ```bash
   cd ~/dotfiles
   stow newpackage
   ```
   This will symlink the files and changes will be persisted in a two way link. Make sure you commit and push changes to ensure all other systems will stay in sync.
5. To sync across systems you would

   ```bash
   # On machine A (after making changes)

   git add .
   git commit -m "Update configurations"
   git push

   # On machine B

   git pull
   stow -R */ # Restow all packages
   ```

## Real World Example

Let's add a real world example. Let's say we would like to add our `.gitconfig` to sync across systems.

1. Let's add the directory to our dotfiles.

   ```bash
   mkdir ~/dotfiles/git
   ```

2. Then we move the current config into the newly created dotfiles directory for the git config.
   ```bash
   mv ~/.gitconfig ~/dotfiles/git/
   ```
3. Apply the changes using Stow.
   ```bash
   cd ~/dotfiles
   stow git
   ```

## Handling Conflicts

If you ever get into a situation where after attempting to apply stow and you see an error, it is likely a conflict with an existing library or package already on the system.

First thing is to make a backup of the conflicting file. Let's continue with the `.gitconfig` example. After everything is safely backed up, we can then run stow again and all will be well.

```bash
# Make a backup of the conflicting file
cp ~/.gitconfig ~/.gitconfig.backup

# Remove conflicting file manually
rm ~/.gitconfig

# Then stow again
stow git
```

Happy coding friends.

## Resources

- [stow docs](https://www.gnu.org/software/stow/manual/stow.html)
- [my dotfiles repo](https://github.com/fpigeonjr/dotfiles)
- [typecraft Youtube](https://www.youtube.com/watch?v=NoFiYOqnC4o)
