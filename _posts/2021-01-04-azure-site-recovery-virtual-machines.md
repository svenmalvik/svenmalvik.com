---
layout: post
title: How to do a Failover of a Windows Server VM with Azure Site Recovery
subtitle: Preparation for AZ-303 Exam for becoming an Azure Solution Architect | Azure Site Recovery
tags: [Azure, AZ-303, Azure Site Recovery]
categories: [AZ-303]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-yt.jpg
image: https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-yt.jpg
---

*In this post I will create a Windows Server 2016 Datacenter and then do an automatic failover to another region with Azure Site Recovery. Azure Site Recovery is part of the AZ-303 exam for becoming an Azure Solution Architect.*

{% include yt.html ytid=F9h-Fr7C-iU yttxt="Watch Azure Site Recovery in preparation for the AZ-303 exam" %}

I have already created a Windows Server 2016 Datacenter in Azure. Checkout a previous post about how to [Create a Windows Server 2016 Datacenter VM](https://www.svenmalvik.com/azure-vm/#cvm). After that we need the IIS Server. Here is how you can do this: [Installing Internet Information Service (IIS)](https://www.svenmalvik.com/azure-vm/#iis).

I will first make a minor change in the IIS Server so we are sure that we did a correct failover later.

![Open iisstart.html](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-1.jpg)*Open iisstart.html*

I make a minor text change and add ` - DR` in the title.

![Minor html change in IIS Server](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-2.jpg)*Minor html change in IIS Server*

I took the public IP address that we can see in the overview of the virtual machine. If you don't have a public IP address, you can watch the [Video about Azure Site Recovery](https://www.youtube.com/watch?v=F9h-Fr7C-iU) where I will walk through this. Everything works fine.

![Testing changed IIS server](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-3.jpg)*Testing changed IIS server*

Switch now over to the Azure portal and select your virtual machine. In the menu you'll find *Disaster Recovery* where you can choose the target region. It's the region that Azure will use to deploy a failover VM for you.

![Target region for failover of Azure Site Recovery](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-4.jpg)*Target region for failover of Azure Site Recovery*

Set your target settings.
![Target settings](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-5.jpg)*Target settings*

The *Cache storage account* is where the source VM data will be stored.

![Storage settings for Azure Site Recovery](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-6.jpg)*Storage settings for Azure Site Recovery*

*Replication Settings* is where you tell Azure what *Recovery Vault Service* you would like to use.

![Replication Settings for Azure Site Recovery](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-7.jpg)*Replication Settings for Azure Site Recovery*

I also set *Extension settings* with an Azure Automation Account so the entire failover flow will be managed by Azure.

![Extension settings for Azure Site Recovery](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-8.jpg)*Extension settings for Azure Site Recovery*

Now when we take a look in the *Backup Service Vault* that we use, we see that an initial job for replication is in progress.

![Enable replication for Azure Site Recovery](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-10.jpg)*Enable replication for Azure Site Recovery*

Enable replication for Azure Site Recovery takes time, in my case 25 minutes. I will now go over to my VM and initiate a test failover.

![Start test failover](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-11.jpg)*Start test failover*

You will get asked to set the virtual network. Remember that we do a test failover and it might be a good idea to choose a different virtual network the current region.

![Test failover](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-12.jpg)*Test failover*

After some while, the test failover VM is ready to test. What's still missing is a public IP address. Follow the [Video about Azure Site Recovery](https://www.youtube.com/watch?v=F9h-Fr7C-iU) where I will walk through this.

![VM with private IP address](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-13.jpg)*VM with private IP address*

![VM with public IP address](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-14.jpg)*VM with public IP address*

Finally I test the failover VM with the new IP address.

![Test of failover VM](https://cdn.svenmalvik.com/images/az-303/az-303-azure-asr-15.jpg)*Test of failover VM*

## Useful links

- [Run a test failover (disaster recovery drill) to Azure](https://docs.microsoft.com/en-us/azure/site-recovery/site-recovery-test-failover-to-azure?WT.mc_id=AZ-MVP-5004080)
- [Exam AZ-303: Microsoft Azure Architect Technologies](https://docs.microsoft.com/en-us/learn/certifications/exams/az-303?WT.mc_id=AZ-MVP-5004080)