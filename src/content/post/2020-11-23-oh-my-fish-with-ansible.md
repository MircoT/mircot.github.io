+++
author = "Mirco Tracolli"
title = "Oh-my-fish installation with ansible"
date = "2016-05-12"
description = "Oh-my-fish installation with ansible"
tags = [
    "fish",
    "shell",
    "ansible",
]
categories = [
    "shell",
    "system",
    "devops",
]
+++

The `fish` shell is a great alternative to `bash` that has a very interesting environment, rich as the most valuable alternatives like `zsh`. In that sense, there is a similar framework named [oh-my-fish](https://github.com/oh-my-fish/oh-my-fish) that is the perfect match for you if you come from [oh-my-zsh](https://ohmyz.sh/#install). Make an autonomous installation script with `ansible` is trivial but there is a small detail. For example, if we choose the installation from source, we can customize the installation like the following snippet:

```yml
- name: get oh-my-fish repo
  git:
    repo: 'https://github.com/oh-my-fish/oh-my-fish.git'
    dest: ~/.local/share/git/oh-my-fish

- name: install oh-my-fish
  shell:
    cmd: "bin/install --offline --noninteractive --yes"
    executable: /usr/bin/fish
    chdir: ~/.local/share/git/oh-my-fish
```

For a consistent installation script, the `--noninteractive --yes` are required for the following reasons:

* `--noninteractive`: to not open a new fish shell after the installation
  * **Note**: otherwise the `ansible` task will never end
* `--yes`: to overwrite the previous installations. However, if you don't want to run the installation again it is possible to remove `--yes` and use the `shell` parameter `creates` to check for the previous installation as follows.

   ```yml
    creates:
      - ~/.local/share/omf
      - ~/.config/omf
   ```
