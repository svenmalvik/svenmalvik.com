---
layout: post
title: Azure Updates 4/2021
tags: [DevReal, DevOps]
categories: [Azure Updates]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/devrealnews-cover-421.jpg
image: https://cdn.svenmalvik.com/images/devrealnews-cover-421.jpg
ytid: aGYqJ9tMQnc
yttxt: Azure Updates on devreal.io/news
---

Welcome to my first episode of DevReal News. My name is Sven Malvik and I'm recording from Oslo. I'm an Azure MVP so I'm naturally very interested in what's happening in Azure. So let me update you on what has happened last week.

## Azure Updates

{% include yt.html %}

### Azure API Management Updates - January, 2021

My favorite service Azure API Management got an update. The Product Group announced several new capabilities. You can now use the `cache-response` attribute in the cache-store policy to specify when to cache the outgoing HTTP response. The product group also added some improvements for working with Azure Key Vault like the new `isKeyVaultRefreshFailed` query parameter to find for which the refresh from Azure Key Vault action failed. All details in a blog post provided in this post [Azure API Management Updates - January, 2021](https://azure.microsoft.com/en-us/updates/azure-api-management-updates-january-2021/?WT.mc_id=AZ-MVP-5004080).

### ARM Template Specs now Public Preview

Template Specs is a new resource type for storing ARM templates in resource groups for sharing, deployment, and role-based access control. It addresses today's challenges around ARM template management like access management in storage accounts. The announcement says that as a native solution, Template Specs will enable users to bring their ARM templates to Azure as a resource and securely store and share them within an Azure tenant. You you can read more about how this works in detail by following the link to this blog post. [ARM Template Specs now Public Preview](https://dev.to/azure/arm-template-specs-now-public-preview-5ap5)

### Zone to Zone Disaster Recovery with Azure Site Recovery

On Friday, Scott Hanselman presented a new episode of Azure Friday, Zone to Zone Disaster Recovery with Azure Site Recovery. Now you can bring the power of Availability zones to augment your Disaster Recovery story. Siddharth Deekshit shows how you can protect your Azure VMs by replicating them from one availability zone to another within the same region. This opens surly new possibilities also for improving SLAs for those that don't want to run in a different region. Let's watch what he has to say about when you would want this zone to zone DR.

### Automatic Cluster Upgrades in AKS in Public preview

A recent update from the AKS product group stated that customers can now configure an AKS cluster to *automatically* upgrade to a user defined version on a regular basis. That means that users can now specify between multiple upgrade channels, such as the latest rapid minor version, an older stable minor version, or the latest patch version. They wrote further that this will eliminate the need for customers to manually track and upgrade Kubernetes releases to their clusters and nodes.

[Learn how to automatically upgrade an Azure Kubernetes Service (AKS) cluster](https://docs.microsoft.com/en-us/azure/aks/upgrade-cluster#set-auto-upgrade-channel?WT.mc_id=AZ-MVP-5004080)

### Python 3.9 in Azure Functions is now in public preview

Python 3.9 in Azure Functions is out. If you run your code in an Azure Function plan and you would like to use Python 3.9, now you can :) It's still in public preview so don't use it in your production environment yet.

### AI powered Azure tools

If you are a frequent user of Azure CLI or Azure PowerShell, chances are that you have experienced one of the AI-powered features this service provides for the Azure command line tools. They include generating up-to-date command usage examples with each new Azure CLI and Azure PowerShell releases to to make sure the documentation is up to date. Also, enabling natural language search of a command in the Azure CLI like `az find` and assisting with failure recovery. Furthermore it's serves the recently released AZ Predictor for Azure PowerShell. To make sure that all your many thousands requests each second are being handled they use Azure App Service Environments. If you want to deep dive into how they do this, you can read all about the details in a Microsoft blog post. You find the address on this weeks post [Read the full post about AI powered Azure tools](https://techcommunity.microsoft.com/t5/azure-tools/ai-powered-azure-tools/ba-p/2080799?WT.mc_id=AZ-MVP-5004080).

## Upcoming Free Online Events

### GitHub Talk: What's next for DevOps? - FREE digital event

**February 4, 2021 11:00 AM (PT)**

On Thursday at 11:00 AM (PT) is a free online event about the future of DevOps, not Azure DevOps but DevOps in general. It's about tools, infrastructure, and operating models that have changed. They write further to support modern software delivery, it’s critical for organizations to know and prepare for what’s coming next.
**Join GitHub and panelists from Red Hat, Lightstep, and RedMonk as they explore the future of DevOps**, from developer experience and automation to security and compliance. [Sign up and register for free: What's next for DevOps?](https://resources.github.com/webcasts/Whats-next-for-DevOps/)

![What's next for DevOps?](https://pbs.twimg.com/media/EsgyoUoU4AIUR-K?format=jpg&name=medium)*What's next for DevOps?*

## End

That was week 4 about Azure updates, announcements and upcoming event. Hope to see you next week.

-Sven
