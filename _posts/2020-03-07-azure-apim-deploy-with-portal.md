---
layout: post
title: Azure API Management from the Portal
subtitle: Deployment Option &#35;1
tags: [Azure, Azure API Management, Azure Portal]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/zure-apim-gw-diagram.pn
image: https://cdn.svenmalvik.com/images/azure-apim-logo.jpg
featured-image: https://cdn.svenmalvik.com/images/azure-apim-logo.jpg
---

*We will provision Azure API Management. Creating an instance of it is just a click in the Azure Portal. We'll do it once to show how easy it is before we move forward to some other ways that enable us to automate it.*

The first thing we will do is to "Create a resource", type "Api Management" and click the resource that is shown in the drop down menu.

![Search Azure API Management in the Portal](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-portal-0.png)*Search Azure API Management in the Portal*

Then click `create`.

![Select Azure API Management in the Portal](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-portal-1.png)*Select Azure API Management in the Portal*

You will now see the pane where you set some important parameters.

![Azure API Management Form](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-portal-2.png)*Azure API Management Form*

Chose the subscription you want to provision you instance to and a resource group. We will talk about resource groups later because they are interesting when it comes to global services that we spin up. They also need the resource group which gets a region.

The most important parameter is the Pricing Tier (SKU). The default value is Developer. In case you just want to try out the service, Consumption is a good choice as we only pay per request, and we don't need to delete it when we need a longer break. It's also a good choice in case you are impatient. Creating an instance takes about a minute compared to the other choices that take up to an hour.

Do want to monitor your instance? If you just want to play with Azure API Management as we do, we probably don’t need it. We will save some money not enabling it for now.

We got now a our first instance of Azure API Management!

![Azure API Management Overview](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-portal-3.png)*Azure API Management Overview*

You know already all values that we see in the Overview of it. There is just one value that is new "Gateway URL". It's the Url that we the clients will use to access APIs. Let's try it out.

![Response from a test call to Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-portal-4.png)*Response from a test call to Azure API Management*

We have no API yet, so we won't get a meaningful result back. But we will get to that part in a bit. For now we are just happy and wonder how we can provision an instance with either real code or with a proper REST call.

## Conclusion
We have now created an instance of Azure API Management that does nothing. But it seems to work. Before we will dive into all the menus on the left side, we should look at some better options to create an instance. Options that we can use to automate our set up.
