---
layout: post
title: Custom Routes in Azure
subtitle: Preparation for AZ-303 Exam for becoming an Azure Solution Architect - Custom Routes
tags: [Azure, AZ-303, UDR]
comments: true
published: false
share-img: https://cdn.svenmalvik.com/images/az-303/azure-udr.jpg
image: https://cdn.svenmalvik.com/images/az-303/azure-icon-route-tables.jpg
featured-image: https://cdn.svenmalvik.com/images/az-303/azure-icon-route-tables.jpg
---

*Custom Routes, or user defined routing, is part of the az-303 certification for becoming an Azure Solution Architect. In this video I tell why you would want a custom route, and then demonstrate how to create one based on a use case.*

[![TEXT](https://cdn.svenmalvik.com/images/az-303/azure-udr-yt.jpg "AZ-303: Azure Custom Routes")](https://www.youtube.com/watch?v=9RZEyQhwVBA)*Watch Azure Custom Routes in preparation for the AZ-303 exam*

## Use Case

I have provisioned a virtual network with the default IP address range `10.0.0.0/16`. Within this range I created 4 subnets, `subnetA`, `subnetB`, `subnetC`, and `AzureBastionSubnet`, all with a small IP address range of `/29`. Azure Bastion needs at least a range of `/27`, and we use it to login to the virtual machines that I created inside the subnets. All VMs are of the same type **Windows 2016 Datacenter**. On the virtual machine that I named `c-vm`, I installed the Internet Information Service IIS.

![Pre setup of custom routes](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-1.jpg)*Pre setup of custom routes*

Here's want we can do, but maybe shouldn't.

![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-2.jpg)*TEXT*
![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-3.jpg)*TEXT*
![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-4.jpg)*TEXT*
![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-5.jpg)*TEXT*

## Demo

![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-6.jpg)*TEXT*
![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-7.jpg)*TEXT*
![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-8.jpg)*TEXT*
![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-9.jpg)*TEXT*
![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-10.jpg)*TEXT*
![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-11.jpg)*TEXT*
![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-12.jpg)*TEXT*
![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-13.jpg)*TEXT*
![TEXT](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-14.jpg)*TEXT*


## Useful links

- [Virtual network traffic routing](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview?WT.mc_id=AZ-MVP-5004080)
- [Exam AZ-303: Microsoft Azure Architect Technologies](https://docs.microsoft.com/en-us/learn/certifications/exams/az-303?WT.mc_id=AZ-MVP-5004080)