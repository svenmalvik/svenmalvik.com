---
layout: post
title: DevReal News 4/2021
tags: [DevReal, DevOps]
categories: [DevReal News]
comments: true
published: false
share-img: https://cdn.svenmalvik.com/images/
image: https://cdn.svenmalvik.com/images/
---

## Azure Updates

## Public preview: Automatic Cluster Upgrades in AKS

A recent update from the AKS product group stated that customers can now configure an AKS cluster to *automatically* upgrade to a user defined version on a regular basis. That means that users can now specify between multiple upgrade channels, such as the latest rapid minor version, an older stable minor version, or the latest patch version. They wrote further that this will eliminate the need for customers to manually track and upgrade Kubernetes releases to their clusters and nodes.

I must say that we had challenges when performing an ordinary AKS upgrade. We ended up with provisioning a new AKS cluster with a new version and then switch the traffic over. Of course it's more expensive but at the same time we can test everything. This new update would at least help us within the *patch*-channel.

[Learn how to automatically upgrade an Azure Kubernetes Service (AKS) cluster](https://docs.microsoft.com/en-us/azure/aks/upgrade-cluster#set-auto-upgrade-channel?WT.mc_id=AZ-MVP-5004080)

## Upcoming Free Online Events

### GitHub Talk: What's next for DevOps? - FREE digital event

**February 4, 2021 11:00 AM (PT)**


![What's next for DevOps?](https://pbs.twimg.com/media/EsgyoUoU4AIUR-K?format=jpg&name=medium)*What's next for DevOps?*

On Thursday is a free online event about the future of DevOps, not Azure DevOps but DevOps in general. It's about tools, infrastructure, and operating models that have changed. To support modern software delivery, it’s critical for organizations to know and prepare for what’s coming next.
**Join GitHub and panelists from Red Hat, Lightstep, and RedMonk as they explore the future of DevOps**, from developer experience and automation to security and compliance.

Personally I would like to hear about the future of Azure DevOps as well and if it has a future in the same way as GitHub. If you know more, let me know and snd me a message. You can use the contact on this site.

[Register for free: What's next for DevOps?](https://resources.github.com/webcasts/Whats-next-for-DevOps/)