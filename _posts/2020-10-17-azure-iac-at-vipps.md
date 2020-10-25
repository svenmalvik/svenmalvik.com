---
layout: post
title: Infrastructure as Code in Azure
subtitle: Learnings and experiences from Vipps
tags: [Azure]
comments: true
published: true
featured-image: https://cdn.svenmalvik.com/images/vipps-logo1.svg
image: https://cdn.svenmalvik.com/images/vipps-logo1.svg
share-img: https://cdn.svenmalvik.com/images/azure-iac-vipps.png
---

*Infrastructure as code (IaC) is a hot topic, also at Vipps. This video is the recording of an internal event where development teams tell about their experiences with different technologies to deploy to Microsoft Azure. The video dives also into some newcomers like Pulumi, Farmer, and Bicep.*

[![Infrastructure as Code in Azure - Learnings from Vipps.](https://cdn.svenmalvik.com/images/azure-iac-vipps.png "Infrastructure as Code in Azure - Learnings from Vipps.")](https://www.youtube.com/watch?v=OhGLefi43Kk)*Watch this post on YouTube: https://www.youtube.com/watch?v=OhGLefi43Kk*

Two years ago, we worked from this office that you can see in the picture above. We started with Azure right here. Most of our interactions with Azure at that time were right from the Portal which is a great tool for testing, and learning, and getting started. That’s what we did two years ago. We created resources more randomly than structured because we tested, and we learned, and we started Our journey with Azure.

However, the problems with this so-called ClickOps approach and not having infrastructure as code are many. For example: 
ClickOps gives us no history about previous changes. We cannot review changes before they are in production, and we can’t repeat deployments several times, so we will end up with slightly different environments in test and production.

Infrastructure as code is also necessary because it gives us documentation. We need to know what we have deployed and we need to know how we configured our resources that we have deployed in a very structured way. It’s necessary because it’s required from us working in the finance industry.

ClickOps was two years ago. Everything has changed since then. We all know now that infrastructure as code is The only way for the future as we can imagine it today.

Today, a few teams deploy their Azure resources with ARM, some by using APIs, and others by using tools that uses ARM or APIs. To put it differently, our teams deal with infrastructure in different ways- and there are good reasons for that.

This video discusses those reasons.

We created 5 small sessions for you. Each session is dedicated to one team and takes about 10 minutes. At the end of all sessions we have a short  discussion on infrastructure as code in general.
