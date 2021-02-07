---
layout: post
title: How is Azure Firewall different from Network Security Groups?
tags: [featured, Azure, Azure Firewall, Network Security Groups]
categories: [Security]
comments: true
published: true
date: 2021-02-04 21:00:00
share-img: https://cdn.svenmalvik.com/images/azure-firewall-vs-nsg.jpg
image: https://cdn.svenmalvik.com/images/azure-firewall-vs-nsg.jpg
---

*Azure provides two security features in Azure for managing inbound and outbound traffic to and from Azure resources like virtual machines that are running an SQL Server, web applications, or domain services: Azure Firewall and Network Security Groups (NSGs). This post will discuss how the two differ from each other and how they can be paired up to secure traffic to resources in Azure.*

{% include articleAd.html %}

## Network Security Groups (NSG)

Azure Network Security Groups (NSGs) is an **OSI layer 3 & 4** network service for refining traffic to and from an Azure Virtual Network (VNet). They can be associated with subnets or network interfaces of Azure VMs. It’s recommended to associate NSGs to subnets or network interfaces, but not both. The same NSG can be applied to many subnets. A NSG consists of rules that allow or deny network traffic based on 5-tuple information:

- Protocol (TCP, UDP, ICMP)
- Source IP address
- Source port
- Destination IP address
- Destination port

## Azure Firewall

Azure Firewall is a highly available, managed firewall service that filters network and application level traffic. It detects the workload in a VNet and protects Azure resources from malicious traffic. It has the ability to process traffic across subscriptions and VNets that are deployed in a hub-spoke model. This managed firewall service can filter and analyze **OSI layer 3, 4 and 7** traffic. Azure Firewall provides the same capabilities as an NSG and more. This firewall service also eliminates the need for Load Balancer. Configuring two availability zones will give us a SLA of 99.99%.

{% include articleAd.html %}

## Feature Comparison

### Service Tags

Azure Firewall and NSG support service tags which are labels that represent a range of IP addresses for particular services such as Azure Key Vault, Data Lake, Container Registry, etc. These are managed by Microsoft and cannot be customized.

### FQDN Tags

Only Azure Firewall supports FQDN Tags. They represent a group of fully qualified domain names of Microsoft services such as Windows Update or Azure Backup. Like service tags, they are managed by Microsoft, one tag to rule them all :)

### SNAT

Only Azure Firewall supports Source Network Address Translation (SNAT). It’s possible to configure Azure Firewall with a public IP address that can be used to masked the IP address of Azure resources that are sending out via the Firewall.

### DNAT

Only Azure Firewall supports Source Destination Address Translation (DNAT) which is used to translate incoming traffic to the firewall’s public IP address to the private IP addresses of a VNet.

{% include articleAd.html %}

## When to use what?

NSGs and Azure Firewall work great together and should be used complimentary. We use NSGs for protecting incoming and outgoing traffic of a subnet. Azure Firewall is the service for filtering traffic to a VNet from the outside-world. It should be deployed in it’s own VNet and be isolated from other Azure resources. Azure Firewall is a highly available solution that can automatically scale.

## Useful Links

- [Azure Firewall documentation](https://docs.microsoft.com/en-us/azure/firewall/?WT.mc_id=AZ-MVP-5004080)
- [Network security groups](https://docs.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview?WT.mc_id=AZ-MVP-5004080)