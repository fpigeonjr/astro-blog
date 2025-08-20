---
title: "Syncing Dotfiles with stow"
description: "Don't lose your config settings"
pubDate: "Aug 20 2025"
heroImage: "../../assets/retro-mac.webp"
---

My mission was simple. Figure out a way to save and sync my dotfiles. Life happens and if I ever found myself in the situation with a busted arch setup or in need to reinstall my OS, getting back productive developer system would be a walk in the park. I also wanted a way to sync my settings across my two machines. 

> My work laptop runs macOS and my personal macBook Air runs Omarchy.<br/>
> [see more](/uses) 

Came across some Youtube videos that were inspiring and all recommended GNU Store.

1. To start created a `~/dotfiles` directory.

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
stow -R */  # Restow all packages
```

Happy coding friends.
