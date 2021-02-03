---
layout: post
title: How to Secure Azure Functions App with Azure API Management
tags: [Azure, Azure API Management]
categories: [Azure API Management]
comments: true
published: true
date: 2021-02-202T20:20:00Z
share-img: https://cdn.svenmalvik.com/images/azure-apim-function-identity.jpg
image: https://cdn.svenmalvik.com/images/azure-apim-function-identity.jpg
---

*How to use an Azure Managed Identity to authenticate against an Azure Functions app that is exposed through Azure API Management. Our Function App is by default public available to everyone. There are two things we can do to prevent this. Either by enabling Azure AD authentication or by IP whitelisting. This post discusses authentication with Azure AD authentication with Managed Identities.*

![Public available Azure Function App](https://cdn.svenmalvik.com/images/azure-apim-function-identity-5.jpg)*Public available Azure Function App*

Enabling Azure AD authentication on a Functions App means Azure API Management (APIM) needs to authenticate itself. This is where Managed Identities comes into play.

{% include articleAd.html %}

A system-assigned Managed Identity is enabled directly on the Azure resource. When the identity is enabled, Azure creates an identity for the instance in the Azure AD tenant. After the identity is created, the credentials are provisioned onto the instance. The lifecycle of a system-assigned identity is directly tied to the Azure resource that it’s enabled on. If the resource is deleted, Azure automatically cleans up the credentials and the identity in Azure AD. There's no need to save passwords, no need to rotate credentials etc. Everything is done automatically for your in the background. Let's make this happen now.

## Setup

I created an instance of Azure API Management with the Consumption tier and an Azure Function App that I can access as you can see in the picture above.

![Azure API Management and Function App setup](https://cdn.svenmalvik.com/images/azure-apim-function-identity-0.jpg)*Azure API Management and Function App setup*

## Enabling Managed Identity on Azure API Management

Enabling a Managed Identity for Azure API Management takes about 5 minutes. Click on Managed Identity and then enable it as shown below.

![Enabling Managed Identity in Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-function-identity-1.jpg)*Enabling Managed Identity in Azure API Management*

## Enabling AAD Authentication in Azure Functions

We can now continue and enable Azure AD authentication in the Functions App. Follow the steps as shown.

![Enabling AAD Authentication in Azure Functions 1](https://cdn.svenmalvik.com/images/azure-apim-function-identity-4.jpg)*Enabling AAD Authentication in Azure Functions 1*

Select Azure Active Directory as the authentication provider, not Facebook :)

![Enabling AAD Authentication in Azure Functions 2](https://cdn.svenmalvik.com/images/azure-apim-function-identity-3.jpg)*Enabling AAD Authentication in Azure Functions 2*

Now we try to access the Function App once again ... and we can see that we need to authenticate.

![Azure Function App enabled authentication with AAD](https://cdn.svenmalvik.com/images/azure-apim-function-identity-6.jpg)*Azure Function App enabled authentication with AAD*

## Azure API Management Policy using Managed Identity

{% include articleAd.html %}

For Azure API Management to authenticate against AAD and receive a bearer token we need add some code in the inbound section of the API or Operation (Endpoint) of the Function App that I already have in APIM. We will use the authentication-managed-identity policy to authenticate with our Azure Functions App using the managed identity of APIM. This policy uses the managed identity to obtain an access token from AAD for accessing the specified resource. After successfully obtaining the token, the policy will set the value of the token in the Authorization header using the Bearer scheme.

First, we get the Application ID of the Function App in AAD as shown below.

![Application ID of Function App in AAD](https://cdn.svenmalvik.com/images/azure-apim-function-identity-9.jpg)*Application ID of Function App in AAD*

Second, we open the policy we want to change. In this example I chose the API level policy.

![Opening Editor of Azure API Management API Policy](https://cdn.svenmalvik.com/images/azure-apim-function-identity-7.jpg)*Opening Editor of Azure API Management API Policy*

Third, we add `authentication-managed-identity` to the inbound section and pointing to the application for the Function App. That's the Application ID of Function App in AAD.

![Editing Azure API Management Policy](https://cdn.svenmalvik.com/images/azure-apim-function-identity-12.jpg)*Editing Azure API Management Policy*

Now we can test the endpoint from within the portal directly ...
![Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-function-identity-11.jpg)*Azure API Management*

... or from a browser. I disabled the requirement of a subscription key to make it simpler.

![Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-function-identity-10.jpg)*Azure API Management*

## Conclusion

{% include articleAd.html %}

Managed Identities make life easier and more secure.
