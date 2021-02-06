---
layout: post
title: How Virtual Machine Classic is Different to "Normal" VM in Azure
tags: [Azure, ARM]
categories: [ARM]
comments: true
published: true
date: 2021-02-06 12:00:00
share-img: https://cdn.svenmalvik.com/images/azure-arm-asm.jpg
image: https://cdn.svenmalvik.com/images/azure-arm-asm.jpg
---

*Have you ever wondered what a "classic" Virtual Machines in Azure is? Some virtual machines are classic and some others are not. Why is that? The short answer is that it's the same virtual machine. What's different is the way it was deployed. This post will explain the history behind classic virtual machines in Azure and what you need to know.*

{% include articleAd.html %}

## Two Different Deployment Models

Until recently in February 2020, a year ago, you could choose whether you wanted to deploy a VM with "classic" or with the "Resource Manager". The Azure Resource Manager that we call ARM is the current deployment model in Azure where we describe the resources we are going to deploy in a JSON format called ARM template. ARM templates exists since 2014. One of the greatest features that came with ARM was **Resource Groups** that groups resources that share the same lifecycle. This wasn't always possible in Azure. Before ARM was introduces, the deployment model was called Azure Service Management (ASM). When you had a set of 10 resources that shared the same lifecycle, you had to deploy all resources independently. Managing all resources independently was a lot of complexity to handle which wasn't so much fun. ARM takes this burden away from us and make life easier. Today, we see classic deployed resources almost only for some VMs. It's because it took some time to migrate all Azure resources from ASM to ARM. More specifically it means that resources that were deployed through the ASM API had to be changed to use the ARM API. This process took some years and will be finished soon. The complete retirement starts March, 2023.

{% include articleAd.html %}

## ASM vs ARM

The ASM API had limited capabilities. It lacked access control, resource groups, dependency management, tags and more. With ARM you got the following capabilities that we are so used to today:

- Deploy, manage, and monitor all resources as one group.
- Deploy resources in a consistent state.
- Apply access control to all resources.
- Apply tags to resources.
- Describe your infrastructure in JSON, the ARM template.
- Define dependencies between resources to ensure the correct order.

{% include articleAd.html %}

## Useful Links

- [Azure Resource Manager vs. classic deployment: Understand deployment models and the state of your resources](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/deployment-models?WT.mc_id=AZ-MVP-5004080)
