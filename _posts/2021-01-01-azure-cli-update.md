---
layout: post
title: How To Automatically Update Azure CLI 
tags: [Azure]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/azure-cli-update.jpg
image: https://cdn.svenmalvik.com/images/azure-cli-update.jpg
---

Here is a brief introduction on how to keep the Azure CLI up to date on your local machine. I use the Azure CLI for 80% of all my interactions with Azure. I mean the portal is great but the CLI is awesome. The reason I keep the Azure CLI always up to date is for having always new features as we as all all bug fixes.

The Azure command-line interface (*Azure CLI*) is a set of commands used to create and manage Azure resources. The Azure CLI is available across almost all Azure services and is designed to get you working quickly with Azure.

The Azure CLI is simple update and you can do this by opening a PowerShell or Bash script window and type the following command:

`az upgrade`

Instead of going this way you can also keep the CLI up to date without having to do this manually and regularly. Try this command instead and you never need to worry again:

`az config set auto-upgrade.enable=yes`

Ok, not 100% correct yet because you get asked if you are really sure that you want to update. That is annoying. Keep the Azure CLI up to date without EVER being prompted:

`az config set auto-upgrade.prompt=no`

That’s it. You no longer need to worry about latest updates of Azure CLI.

## Useful Links

[Update the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/update-azure-cli?WT.mc_id=AZ-MVP-5004080)