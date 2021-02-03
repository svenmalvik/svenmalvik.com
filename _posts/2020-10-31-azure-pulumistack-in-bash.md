---
layout: post
title: Pulumi Stack Name in Bash Prompt
subtitle: Showing custom information in the bash prompt
tags: [Pulumi, Bash]
categories: [IaC]
comments: true
published: true
#share-img: https://cdn.svenmalvik.com/images/
#image: https://cdn.svenmalvik.com/images/
#featured-image: https://cdn.svenmalvik.com/images/
---

*This post describes how we can add custom information to a bash prompt.*

Instead of using features for interacting with GitHub, Azure and my file system from within an IDE, I prefer to use my tools from a terminal. This approach forces me to learn, to understand, and to remember how a tool works. I also want to have certain information visible at all time. Examples are the branch name of a Git project, and the stack name of a Pulumi project. The script below adds those two information to the bash prompt. Put it in the `.bashrc` or `.bash_profile` and restart the terminal or read the file with `source .bashrc`.

{% include articleAd.html %}

```bash
# We use tput to define colors
_GREEN=$(tput setaf 2)
_YELLOW=$(tput setaf 3)
_BLUE=$(tput setaf 4)
_RED=$(tput setaf 1)
_RESET=$(tput sgr0)
_BOLD=$(tput bold)

# Print stack name
pulumiinfo() {
        FILE=./Pulumi.yaml
        output=""
        if [ -f "$FILE" ]; then
                output="(p.$(pulumi stack --show-name))"
        fi
        echo $output
}


# Print git branch
gitinfo() {
        output=""
        if [ -d ".git" ]; then 
                output="(g.$(git rev-parse --abbrev-ref HEAD))"
        fi
        echo $output
}

# Set custom bash prompt
export PS1='${_BLUE}\w ${_RED}$(gitinfo)${_YELLOW}$(pulumiinfo) ${_GREEN} ${_BOLD}$ ${_RESET}'
```

{% include articleAd.html %}

## Next steps
The problem here might be for some that it doesn't print any information if we aren't in the root directory of a Git or Pulumi project. Personally, I want to be reminded of that I'm not in the root directory, so this is fine for me. In addition we print some empty characters in cases where we don't have any additional information. This is all details that can be implemented as well.
