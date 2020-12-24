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

Here's want we can do, but probably shouldn't be allowed to. We send a GET request from `a-vm` to `c-vm` to access the IIS directly on port 80.

![Connection from a-vm to c-vm](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-2.jpg)*Connection from a-vm to c-vm*

Imagine that we have to protect the workload or data that is on `c-vm`. Every package that is going into this virtual machine can potentially be harmful and damage what's stored there. Maybe it's a better idea not to access `c-vm` directly from `a-vm` in case we can't trust `a-vm`.

![a-vm sending harmful packages to c-vm](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-3.jpg)*a-vm sending harmful packages to c-vm*

What we can do instead is to inspect the traffic on another virtual machine `b-vm` that `c-vm` can trust. This `b-vm` can run software that checks all incoming traffic before forwarding it to `c-vm`.

![Using another VM to inspect packages](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-4.jpg)*Using another VM to inspect packages*

The virtual machine `a-vm` will still send its traffic to `c-vm`. To be able to get `b-vm` inspect the traffic, we will re-route the traffic coming from `subnetA` where the VM `a-vm` is running, to `b-vm` that can do its work before forwarding all packages to `c-vm`. To keep it simple, we will let `b-vm` forward all traffic to `c-vm` without inspecting the packages first.

We will create a route table with a route that applies for the traffic within `subnetA`, `subnetB`, and `subnetC`. Bastion can't be part of this route. Otherwise we couldn't use it as a jump host anymore.

![Diagram for Azure Route Table](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-5.jpg)*Diagram for Azure Route Table*

## Demo

To demonstrate that we can access the IIS that is running on `c-vm`, I used Azure Bastion to login to `a-vm`, and used the private IP address of `c-vm`.

![Accessing IIS from a-vm](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-6.jpg)*Accessing IIS from a-vm*

I will now re-route the traffic to go through `b-vm` by first creating an Azure Route table.

![Create Azure Route table](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-7.jpg)*Create Azure Route table*

The only parameters we need to set is the resource group, region, and a name. Then we click on *Create*.

![Configure Azure Route table](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-8.jpg)*Configure Azure Route table*

We can now create a route which needs an `Address prefix`. It's the IP address range for that the route will apply to. In our case we set `10.0.1.0/27` which includes all the subnets except the one for Bastion.

![Configuring a route 1](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-9.jpg)*Configuring a route 1*

As *Next hop address*, we set the private IP address of `b-vm`.

![Configuring a route 2](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-10.jpg)*Configuring a route 2*

After we have created a route, we should see it inn the route table.

![Route table with one route](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-11.jpg)*Route table with one route*

Right now we have created a route table and a route. What's left is associate the route to subnet `subnetA` where the VM `a-vm` is.

![Associate subnet to route](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-12.jpg)*Associate subnet to route*

The VM `b-vm` shall forward all traffic to the IP address that was originally requested from the client, in our case `a-vm`. We do this in the *IP configurations* of the VM `b-vm`.

![Forward traffic in IP configurations](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-13.jpg)*Forward traffic in IP configurations*

All is set now, and we can try to send a request again from `a-vm` to `c-vm`. The traffic is now going through `b-vm`.

![Sending a request vi b-vm](https://cdn.svenmalvik.com/images/az-303/az-303-azure-udr-14.jpg)*Sending a request vi b-vm*
## Useful links

- [Virtual network traffic routing](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview?WT.mc_id=AZ-MVP-5004080)
- [Exam AZ-303: Microsoft Azure Architect Technologies](https://docs.microsoft.com/en-us/learn/certifications/exams/az-303?WT.mc_id=AZ-MVP-5004080)