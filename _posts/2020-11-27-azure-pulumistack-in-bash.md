---
layout: post
title: Pulumi Stack in Bash Custom Prompt
subtitle: Showing custom information in the console
tags: [Pulumi, Bash]
comments: true
published: true
#share-img: https://cdn.svenmalvik.com/images/
#image: https://cdn.svenmalvik.com/images/
#featured-image: https://cdn.svenmalvik.com/images/
---

*This post describes how we can add custom information to a bash prompt.*

Instead of using features for interacting with GitHub, Azure and my file system from within an IDE, I prefer to use my tools from a terminal. This approach forces me to learn, to understand, and to remember how a tool works. I also want to have certain information visible at all time. Examples are the branch name of a Git project, and the stack name of a Pulumi project. The script below adds those two information to the bash prompt. Put it in the `.bashrc` or `.bash_profile` and restart the terminal or read the file with `source .bashrc`.

```bash
dirinfo() {
        FILE=./Pulumi.yaml
        pulumistack=""
        if [ -f "$FILE" ]; then
                pulumistack="(p.$(pulumi stack --show-name))"
        fi
        if [ -d ".git" ]; then
                gitbranch="(g.$(git rev-parse --abbrev-ref HEAD))"
        fi
        echo $pulumistack $gitbranch
}
export PS1='\w $(dirinfo) $ '
```
