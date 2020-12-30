---
layout: post
title: How to configure Azure Storage Accounts to Allow Access from Specific Subnets
subtitle: Preparation for AZ-303 Exam for becoming an Azure Solution Architect - Service Endpoints
tags: [Azure, AZ-303]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/az-303/azure-se-yt.png
image: https://cdn.svenmalvik.com/images/az-303/az-303.jpg
featured-image: https://cdn.svenmalvik.com/images/az-303/az-303.jpg
---

*Sometimes we store items in a storage account and want to restrict the access to certain services or clients. I will demonstrate how to restrict the access to a subnet where a Windows Server 2016 Datacenter VM is running. Service Endpoints in Azure is part of the AZ-303 exam for becoming an Azure Solution Architect.*

[![AZ-303: Service Endpoints in Azure](https://cdn.svenmalvik.com/images/az-303/azure-se-yt.jpg "AZ-303: Service Endpoints in Azure")](https://www.youtube.com/watch?v=w1Sx9Jcwa0k)*Watch Service Endpoints in Azure in preparation for the AZ-303 exam*


When we create an Azure Storage Account, and store items there, we can access them by using the URL that is provided to us. The traffic is then going over the internet. If we want to restrict the access to certain clients, we can route the traffic over the Azure backbone by using a service connection. It's more secure and less latency.

![Diagram of Service Endpoints in Azure](https://cdn.svenmalvik.com/images/az-303/az-303-sc-14.jpg)*Diagram of Service Endpoints in Azure*

In preparation to this step-by-step guide, I already provisioned a few resources that we will need.

- Storage Account with container and an image
- Windows Server 2016 Datacenter Virtual Machine in VNet/subnet
- Azure Bastion and Public IP address

![Service Endpoint Resource Overview](https://cdn.svenmalvik.com/images/az-303/az-303-sc-0.jpg)*Service Endpoint Resource Overview*

As you can see I have one image stored in the storage account.

![Content of container in Azure Storage Account](https://cdn.svenmalvik.com/images/az-303/az-303-sc-1.jpg)*Content of container in Azure Storage Account*

To show you that the traffic is going over the internet for now, I create an URL with a SAS token as the containers access level is private per default.

![Create URL with SAS token for item in container in Azure Storage Account](https://cdn.svenmalvik.com/images/az-303/az-303-sc-2.jpg)*Create URL with SAS token for item in container in Azure Storage Account*

When pasting the URL into the browser of my workstation, you can see that it's perfectly accessible.

![Accessing item in container in Azure Storage Account from workstation](https://cdn.svenmalvik.com/images/az-303/az-303-sc-3.jpg)*Accessing item in container in Azure Storage Account from workstation*

I'm now going to select *Service endpoints* in the virtual network of the Windows Server 2016 Datacenter VM.

![Service endpoints menu in virtual network](https://cdn.svenmalvik.com/images/az-303/az-303-sc-5.jpg)*Service endpoints menu in virtual network*

Click on **Add** to create a service endpoint and select the service `Microsoft Storage` and the subnet of the Windows Server 2016 Datacenter VM.

![Adding a service endpoint to subnet](https://cdn.svenmalvik.com/images/az-303/az-303-sc-6.jpg)*Adding a service endpoint to subnet*

After creating the service endpoint for the subnet, you should see an entry in the overview of *Service Endpoints*.

![Overview of Service Endpoints](https://cdn.svenmalvik.com/images/az-303/az-303-sc-7.jpg)*Overview of Service Endpoints*

We head now over to the storage account, and select *Networking*. As you see, there is no virtual network selected for now which means that the content isn't restricted to a location yet. To change this we *select networks*.

![Starting restricting access to networks](https://cdn.svenmalvik.com/images/az-303/az-303-sc-8.jpg)*Starting restricting access to networks*

Now we can click on **Add existing virtual network** and select the subnet in which the VM is we would like to give access.

![Restricting access to subnet for Azure Storage Account](https://cdn.svenmalvik.com/images/az-303/az-303-sc-9.jpg)*Restricting access to subnet for Azure Storage Account*

As we now have restricted the access to the Windows Server 2016 Datacenter VM, I am not longer allowed to access the content of the storage account from my own workstation.

![No access to Azure Storage Account](https://cdn.svenmalvik.com/images/az-303/az-303-sc-10.jpg)*No access to Azure Storage Account*

I use Azure Bastion to login to the Windows Server 2016 Datacenter VM.

![Login to VM with Azure Bastion](https://cdn.svenmalvik.com/images/az-303/az-303-sc-11.jpg)*Login to VM with Azure Bastion*

Vóila. We have access from the subnet where this VM is provisioned to.

![Access to Azure Storage Account](https://cdn.svenmalvik.com/images/az-303/az-303-sc-12.jpg)*Access to Azure Storage Account*

## Useful links

- [Configure Azure Storage firewalls and virtual networks](https://docs.microsoft.com/en-us/azure/storage/common/storage-network-security?toc=/azure/virtual-network/toc.json#grant-access-from-a-virtual-network?WT.mc_id=AZ-MVP-5004080)
- [Virtual Network service endpoints](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview?WT.mc_id=AZ-MVP-5004080)
- [Exam AZ-303: Microsoft Azure Architect Technologies](https://docs.microsoft.com/en-us/learn/certifications/exams/az-303?WT.mc_id=AZ-MVP-5004080)