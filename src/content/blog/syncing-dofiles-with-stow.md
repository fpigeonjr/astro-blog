---
title: "Syncing Dotfiles across systems"
description: "Don't lose your config settings"
pubDate: "Aug 20 2025"
heroImage: "../../assets/retro-mac.webp"
---

Was looking for a way to save my dotfiles especially since I wanted a way to sync them across machines. Also lowers the impact of a OS re-install.

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
