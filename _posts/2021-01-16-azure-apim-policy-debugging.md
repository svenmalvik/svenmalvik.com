---
layout: post
title: Step-by-Step Guide on How To Debug Policies in Azure API Management
tags: [featured, Azure, Azure API Management]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-cover.jpg
image: https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-cover.jpg
categories: [Azure API Management]
---

*In this post I want to briefly go through the Azure API Management extension for VSCode and how we can debug policies. It's one of the questions I get a lot when holding workshops on APIM. How to effective develop policies in Azure API Management. The post is a collection of screenshots that will explain in detail what you need to do step-by-step.*

- [Install Extensions](#ie)
- [Testing Azure API Management Extension](#tapim)
- [Setting Up a new API](#neewapi)
- [Debugging Policy](#dp)
- [Useful links](#ul)

## <a name="ie"></a>Install Extensions

Before we start we need 2 VSCode extensions. The C# extension is useful for getting IntelliSense support for the VCCode Azure API Management extension. You get both by following the links under [Useful links](#ul).

![VSCode extension for Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-0.jpg)*VSCode extension for Azure API Management*

![VSCode extension C#](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-2.jpg)*VSCode extension C#*

This is my configuration of the VCCode Azure API Management extension. I disabled `Show Save Promp` as it irritates me getting asked every time I save *Are you sure you want to do this?*.

![Configuring VSCode extension for Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-3.jpg)*Configuring VSCode extension for Azure API Management*

Before I do anything I tried the VCCode Azure API Management extension first and look at all the commands that it gives me. This post focuses on policies, so I won't need much of the rest.

![Commands overview](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-4.jpg)*Commands overview*

So, I know that the extension is up and running and I check out its capabilities.

## <a name="tapim"></a>Testing Azure API Management Extension

I have already provisioned an instance of Azure API Management with `Developer`-SKU. The documentation says that debugging policies is supported only in this SKU.

Select the Azure icon on the left side and choose the instance you want to play with. I will copy the `master subscription key` first because I know I will need it. This master-key is only for testing. Do never give it away since it allows access to all APIs.

![Copy Master Subscription Key](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-5.jpg)*Copy Master Subscription Key*

Right-click on a GET endpoint of the one *Echo API* that is available and hit *Test Operation*. Then replace `<Subscription Key>` with the master- subscription key from the previous step. Then click on *Send Request*. It's not very visible but you should find it :).

![Testing API](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-6.jpg)*Testing API*

The response is presented in a separate VSCode row.

![API Response in VSCode](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-7.jpg)*API Response in VSCode*

## <a name="neewapi"></a>Setting Up a new API

I start by importing the public available [Conference API](https://conferenceapi.azurewebsites.net/?format=json) with the help of the Azure API Management extension and select *Import from OpenAPI link*.

![Import API from URL into Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-8.jpg)*Import API from URL into Azure API Management*

Follow the steps 1-4 for importing an API from a URL. Step 5 is just to show you how it should look at the end.

![Import API from URL into Azure API Management 2](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-9.jpg)*Import API from URL into Azure API Management 2*

Click on the *ConferenceAPI* and change the value for `subscriptionRequired` from true to `false`. This way it's easier to test.

![Setting Subscription Key requirement to false](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-10.jpg)*Setting Subscription Key requirement to false*

## <a name="dp"></a>Debugging Policy

Now we can finally debug a policy. But first, let's create/change the policy for the operation `getTopics`. I use this endpoint because it doesn't require any parameters when sending a request.

You can just write your policy now. In this example, I started by writing *set-va* and the extension will show you all the policies that start with this text. Click enter, and vóila, the code for `set-variable` is automatically inserted. I do the same with `set-header`.

I set a variable iin the `inbound`-section that I will read in the `outbound`-section and set it as the value for the response header.

![Changing API Operation Policy in Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-11.jpg)*Changing API Operation Policy in Azure API Management*

I right-click on the operation and hit *Test Operation* and `Send Request` as I've done previously to make sure it works.

![Testing API Operation Policy](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-12.jpg)*Testing API Operation Policy*

Now I will again right-click on the operation I hit *Start Policy Debugging* and then *Send Request*.

![Start Debugging Policy in Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-13.jpg)*Start Debugging Policy in Azure API Management*

What happens in debug-mode now is that the request is being stopped at the top if the `inbound`-section. On the left side we can see all the information and data of the request. In the top we see the usual commands for debugging.

I set a breakpoint at line 15+7=**23**.

![Hitting Breakpoint when Debugging Policy in Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-14.jpg)*Hitting Breakpoint when Debugging Policy in Azure API Management*

As we continue debugging by clicking on the *Play*-button, the request will stop at the next breakpoint. We can now see in the *Variables*-window our variable `test`.

![Variables in Debugging Policy in Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-policy-debugging-15.jpg)*Variables in Debugging Policy in Azure API Management*

We have now seen how we can debug policies. This is of course a simple example with one policy. You can go on from here and implement your product-, api- and global- policies in a much simpler way than before. I really hop this post helped you a bit.

## <a name="ul"></a>Useful links

- [API Management policies](https://docs.microsoft.com/en-us/azure/api-management/api-management-policies?WT.mc_id=AZ-MVP-5004080)
- [Azure API Management Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-apimanagement?WT.mc_id=AZ-MVP-5004080)