---
layout: post
title: Virtual Network Peering in Azure
subtitle: Preparation for AZ-303 Exam for becoming an Azure Solution Architect - Virtual Network Peering
tags: [Azure, AZ-303, VNet]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/az-303/azure-peerings.png
image: https://cdn.svenmalvik.com/images/az-303/az-303.jpg
featured-image: https://cdn.svenmalvik.com/images/az-303/az-303.jpg
---

*When we have two services running in two different virtual networks, they cannot communicate. To fix this, both VNet's have to be peered. Virtual Network Peering is part of the AZ-303 exam for becoming an Azure Solution Architect.*

[![Virtual Network Peering in Azure](https://cdn.svenmalvik.com/images/az-303/azure-peerings-yt.jpg "AZ-303: Virtual Network Peering in Azure")](https://www.youtube.com/watch?v=j_DCsXIPV_U)*Watch Virtual Network Peering in Azure in preparation for the AZ-303 exam*

Virtual network peering is also possible across subscriptions and tenants. In this post I will focus on VNet's that are in the same subscription as this is part of the AZ-303 exam.

## Use case

I provisioned two virtual networks with two subnets and two virtual machines of type Windows Server 2016 Datacenter. Both VMs have only a private IP address. The one VM `vm2` has the Internet Information Service (IIS) up and running. When we now would login to `vm1`, and try to send a request to `vm2` on port 80, we will get disappointed. `vm1` doesn't know about the other network. We'll try this out in a minute.

![vm1 sends request to another network to vm2](https://cdn.svenmalvik.com/images/az-303/az-303-peering-0.jpg)*vm1 sends request to another network to vm2*

What we need to do is to peer both virtual networks witch each other. In this case we can do this easily, and I will show you soon how. We can peer the networks because they have different IP address ranges and don't overlap. That's very important. Virtual network peering is only possible when the IP address ranges don't overlap.

![Diagram of VNet peering](https://cdn.svenmalvik.com/images/az-303/az-303-peering-1.jpg)*Diagram of VNet peering*

Let's now set the scene first.

## Preparation

I have already created two virtual networks with two subnets and two virtual machines of type Windows Server 2016 Datacenter as shown in the resource overview.

![Resource overview](https://cdn.svenmalvik.com/images/az-303/az-303-peering-2.jpg)*Resource overview*

I want to show you first that both networks don't know about each other at this point. We take a look at the IP address of `vm2` where the IIS is running, so we can test it from `vm1`.

![Virtual machine overview](https://cdn.svenmalvik.com/images/az-303/az-303-peering-3.jpg)*Virtual machine overview*

I login to `vm1` and try the private IP address of `vm2` in a browser. The result we get back is *NOTHING* as `vm1` doesn't know the other address.

![Try accessing VM from another network failed](https://cdn.svenmalvik.com/images/az-303/az-303-peering-4.jpg)*Try accessing VM from another network failed*

## Peering

To peer virtual networks, click on one of them ...

![VNet overview](https://cdn.svenmalvik.com/images/az-303/az-303-peering-5.jpg)*VNet overview*

... and select *Peerings*

![VNet peering](https://cdn.svenmalvik.com/images/az-303/az-303-peering-6.jpg)*VNet peering*

*Click* on add to configure and create a peering between two Azure virtual networks.

![Add Azure virtual networks](https://cdn.svenmalvik.com/images/az-303/az-303-peering-7.jpg)*Add Azure virtual networks*

Peering of two networks has two sides that we will name. I named the side where `vm1` is as `1and2`, stupid name I know - it's just a name for demo purposes :)

![Naming one side of VNet peering](https://cdn.svenmalvik.com/images/az-303/az-303-peering-8.jpg)*Naming one side of VNet peering*

We scroll down a bit and name the other side `2and1`, and set the other virtual network `vnet2`. After clicking *Create* Azure will create resources in both virtual networks.

![Setting the other side of Vet peering](https://cdn.svenmalvik.com/images/az-303/az-303-peering-9.jpg)*Setting the other side of Vet peering*

As we can see is `vnet1` now connected to `vnet2`.

![VNet peering overview of vnet1](https://cdn.svenmalvik.com/images/az-303/az-303-peering-10.jpg)*VNet peering overview of vnet1*

Taking a look on the other side as well we see that `vnet2` is connected to `vnet1`.

![VNet peering overview of vnet2](https://cdn.svenmalvik.com/images/az-303/az-303-peering-11.jpg)*VNet peering overview of vnet2*

## Test

Finally, we can repeat the test from the beginning by sending a request from `vm1` to `vm2` where the IIS is running.

![Accessing VM from another network succeeded](https://cdn.svenmalvik.com/images/az-303/az-303-peering-12.jpg)*Accessing VM from another network succeeded*

## Useful links

- [Virtual network peering](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview?WT.mc_id=AZ-MVP-5004080)
- [Exam AZ-303: Microsoft Azure Architect Technologies](https://docs.microsoft.com/en-us/learn/certifications/exams/az-303?WT.mc_id=AZ-MVP-5004080)