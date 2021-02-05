---
layout: post
title: Resource Tagging in Azure
subtitle: Why it is important
tags: [featured, Azure, Tagging]
categories: [Compliancy]
comment: true
share-img: https://cdn.svenmalvik.com/images/azure-resource-tagging.jpg
image: https://cdn.svenmalvik.com/images/azure-resource-tagging.jpg
---

*Moving services from on-premise to Azure cloud requires effort, technical knowledge, and some experience to make a business secure, compliant, and efficient. This post will discuss why tagging of resources plays an important role to achieve these goals and how you can do this.*

{% include articleAd.html %}

## Click-Ops is Costly, Insecure, and it Puts Your Business at Risk

Many developers like myself working for the first time in Azure, love how easy it is to get started, and to see results almost immediately. The Azure Portal simplifies this process of learning about the many different Azure services. We click a few buttons and vóila - resources are deployed. At some point, we create resources for the real world like the official test and production environment. Did we everything well and can continue with new tasks? What happens with the resources that we played with?

With Click-Ops, we can't consistently re-create the same resources in different environments as we will make mistakes at some point and re-create the resources again and again. Do we delete the resources that we don't need anymore? Maybe not always.

I think this is ok. We are humans and we love to perform and rush to the next task. Still, it's costly and we need to handle this somehow.

My experience is that Click-Ops leads over time to Azure resources that nobody knows about, hence can or cannot be deleted. We don't know without analyzing them. This is a problem, since analyzing eventually hundreds of resources is almost impossible if your business can't tolerate downtime which might happen when you delete resources that you thought were not in use anymore. Analyzing them first is important but impossible at some point.

The thing is that these arguments against Click-Ops are just the tip of the iceberg. Being able to consistently create resources requires code. With infrastructure as code, we can do more. We can tag our resources. I mean we could do this before, but good enough tagging can be time consuming.

{% include articleAd.html %}

## Tagging as Part of Infrastructure as Code Will Make Your Business More Stable

As we get more experienced in Azure, we put more resource deployments into code. That code will contain tagging of resources. Tagging makes it possible to simplify resources associations, show costs per team, identify mission critical resources, classifies resources, and may make your business compliant. You may even save money because you set a tag saying that a given resource is just temporary.

[Resource naming and tagging decision guide](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/decision-guides/resource-tagging/) descibes these arguments in more detail. My experience says that these following tags are important: `owner`, `confidentiality`, and `temporary`.

- `owner`: Tells you whom to contact in case you have any questions.
- `confidentiality`: Tells how to treat this resource. It may contain personal data that can't be shared.
- `temporary`: Tells about if this resource can be deleted soon.

## Conclusion

Tag every resource at least with the `owner` tag. I struggled with many resources because I didn't even know whom to talk to. Analyzing a resource may only tell you half of the story. Knowing who is the owner of a resource will put you in a position of having control over all the resources at any time.
