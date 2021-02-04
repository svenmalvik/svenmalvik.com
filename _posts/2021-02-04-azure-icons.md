---
layout: post
title: Secret Behind Pretty Azure Architecture Diagrams
tags: [Azure]
categories: [Azure]
comments: true
published: true
date: 2021-02-04 17:00:00
share-img: https://cdn.svenmalvik.com/images/azure-icons.jpg
image: https://cdn.svenmalvik.com/images/azure-icons.jpg
---

*One of my fellow cloud engineers in my team asked today in the morning about these pretty architecture diagrams that we nowadays have and what the secret behind is. That was great question, and easy to answer. I think that if one person asks a question, then there will be soe more people asking the same question. So here's the "Secret" behind Pretty Architecture Diagrams in Azure"*.

## Updated Azure Icons

Creating architecture diagrams can be fun when we manage to make them in a way that others understand them quickly. If they are at the same time pretty to look at, it's even more fun :) Earlier last year Microsoft Azure refreshed its icons and made them prettier. Now in January 2021 they added even ~26 more beautiful icons. You can [download all Azure Icons](https://docs.microsoft.com/en-us/azure/architecture/icons/?WT.mc_id=AZ-MVP-5004080) from the documentation.

Here is what you **CAN DO** with the icons:
- Use the icon to illustrate how products can work together
- In diagrams, Microsoft recommends to include the product name somewhere close to the icon
- Use the icons as they would appear within Azure

Here is what you **CAN NOT DO** with the icons:
- Don’t crop, flip or rotate icons
- Don’t distort or change icon shape in any way
- Don’t use Microsoft product icons to represent your product or service

## Clean Azure Architecture Diagrams

Pretty icons is just half of the story to make an Azure architecture diagrams great. Even more important is structure. A diagram should show as few elements like icons, rectangular and lines as possible. There is one thing that I see often and that should never ever be done in an Architecture Diagrams in general. That is crossing lines. When ever there are crossing lines it can be a sign of a bad architecture. I suggest to take some extra rounds and revisit a diagram where you can't get rid of crossing lines.

### Examples

Here are some examples of clean Azure architecture diagrams. 

![Hub-spoke network topology in Azure](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/hybrid-networking/images/hub-spoke.png?WT.mc_id=AZ-MVP-5004080)

*Image above: [Hub-spoke network topology in Azure](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/hybrid-networking/hub-spoke?tabs=cli?WT.mc_id=AZ-MVP-5004080)*

![Intelligent product search engine for e-commerce](https://docs.microsoft.com/en-us/azure/architecture/example-scenario/apps/media/architecture-ecommerce-search.png?WT.mc_id=AZ-MVP-5004080)

*Image above: [Intelligent product search engine for e-commerce](https://docs.microsoft.com/en-us/azure/architecture/example-scenario/apps/ecommerce-search?WT.mc_id=AZ-MVP-5004080)*

![Run a Jenkins server on Azure](https://docs.microsoft.com/en-us/azure/architecture/example-scenario/apps/media/architecture-jenkins.png?WT.mc_id=AZ-MVP-5004080)

*Image above: [Run a Jenkins server on Azure](https://docs.microsoft.com/en-us/azure/architecture/example-scenario/apps/jenkins?WT.mc_id=AZ-MVP-5004080)*

![SQL Server 2008 R2 failover cluster in Azure](https://docs.microsoft.com/en-us/azure/architecture/example-scenario/sql-failover/windows-server-2008-r2-failover-cluster-with-azure-shared-disk.png?WT.mc_id=AZ-MVP-5004080)

*Image above: [SQL Server 2008 R2 failover cluster in Azure](https://docs.microsoft.com/en-us/azure/architecture/example-scenario/sql-failover/sql-failover-2008r2?WT.mc_id=AZ-MVP-5004080)*

-Sven