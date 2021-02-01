---
layout: post
title: Introduction to Azure API Management
categories: [Azure API Management]
tags: [Azure, Azure API Management]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/azure-apim-introduction.jpg
image: https://cdn.svenmalvik.com/images/azure-apim-introduction.jpg
---

*Azure API Management (APIM) is a way to create consistent and modern API gateways for existing backend services. It provides an interface for your backend services and APIs while making sure they’re secured, monitored, maintained, well documented and published in the cloud. This post is a brief introduction into Azure API Management.*

## An overview of what you get with APIM

- **Rate-limiting:** Control the amount of incoming requests. You know your APIs and you know that it might not make sense that a requester pays a bill 10 times in a minute. Rate-limiting can be set based on keys that you choose yourself.
- **Monitor APIs:** Identify issues like slow responses.
- **Unify backend APIs:** Azure API Management works as an orchestration tool of your backend APIs whether they are in Azure or on-premise. A unified API interface is simple to use for your clients.
- **Analytics:** Do you want to monetize your services? Azure API Management got an interface for that. It can also be integrated with Application Insights. You'll get a full dashboard to see all the data you need.
- **Security:** An security breach can ruin your organization.Azure API Management provides OAuth 2.0 user authorization and can be integrated with Azure Active Directory. It can validate JWT token and much more.
- **Transform Data:** Policies in Azure API Management let you transform payload into different formats like `xml` to `json`. That's just one feature. As you code policies with .NET Core in C# you got all the flexibility you want.
- **Performance:** Caching let you improvement the performance of requests and make your clients happy.
- **Cost Management:** There are different pricing options for Azure API Management.

Hopefully, this gave you a somewhat overview of what APIM can do and what the platform has to offer. Now we’re going to dive deeper into the different tools and talk about some of the functions and advantages in detail.

## Abstract your back-end implementation & API documentation

 Azure API Management supports several API formats. Let's take a look:

![Azure API Management API Format Overview](https://cdn.svenmalvik.com/images/azure-apim-overview-1.jpg)*Azure API Management API Format Overview*

| Type        | Details          |
| ------------- |-------------|
| Blank API      | Create a blank API definition and then specify all required parameters. |
| OpenAPI      | OpenAPI was called Swagger is a specification that document all endpoints and all parameters.      |
| WADL | Web Application Description Language is a xml description of Http-based web services. It' lighter that WSDL.      |
| WSDL | Web Service Description Language is a xml description of any network type. WADL focuses only on http.       |
| Logic App | Logic Apps orchestrate and automate workflows and integrations with many data sources.      |
| App Service | APIs hosted in an App service.      |
| Function App | Serverless code that can be triggered.      |

<br>

Azure API Management comes with a Developer Portal for you clients. It's a web portal where API clients can learn about your APIs. It contains of the APIs that are deployed in your Azure API Management instance. The content is generated based on the APIs. You have the option to customize the developer portal and adjust the look and feel so it fits better to your organization.

## System groups

APIM has 3 build-in groups:

- **Administrators:** Members of this group are the Azure subscription administrators. The administrators can manage APIM service instances and create the APIs, operations, and products that are used by the developers.
- **Developers:** Authenticated developer portal users are members of this group. Developers are the customers that build applications using your APIs. The developers can access the developer portal and build applications that call the operations of an API.
- **Guests:** Unauthenticated developer portal users, such as prospective customers visiting the developer portal of an API Management instance are members of this group. They can be granted certain read-only access, such as the ability to view APIs but not call them.

You are not limited to these 3 groups and can create your own custom groups or use existing groups in Azure Active Directory.

APIM policies let you change the behavior of APIs. These are statements executed on the request or response. You can perform access management based on http headers. Authentication policies, cross-domain validations, and any other security measure can be checked before reaching your backends. Learn all details [policies in Azure APIM](https://docs.microsoft.com/en-us/azure/api-management/api-management-policies?WT.mc_id=AZ-MVP-5004080).

## Data Manipulation

Azure API Management let you transform data like back and forth from `xml` to `json`. But APIM has a lot more features that can be used within policies. Take a look:

![Azure API Management Policy Snippets](https://cdn.svenmalvik.com/images/azure-apim-overview-2.jpg)*Azure API Management Policy Snippets*

## Monitor APIs

APIM provide metrics that may help to analyze backend calls, errors and performance by using Azure Monitor with diagnostic settings.

![Azure API Management Metrics](https://cdn.svenmalvik.com/images/azure-apim-overview-3.jpg)*Azure API Management Metrics*

## Cost Management

Azure API Management has 5 different pricing tiers to choose from:

- **Developer, Premium:** The developer tier is great for developers that use the premium tier in production as both share the same features like vnet integration.
- **Basic, Standard:** Both are production level tiers that go from entry-level production to medium-volume production.
- **Consumption:** The serverless consumption tier lets you pay for what you use - 1M calls for free. It deploys within 2 minutes compared to the others of approx. 45 minutes so it's great for testing out APIs. For production use it's great as it has a built-in high availability and autoscaling. Switching between consumption and dedicated SKU tiers (Developer, Basic, Standard, and Premium) is not supported as this plan has not all the features as the rest. Take a look at [Azure API Management Key Parameters](https://www.svenmalvik.com/azure-apim-key-parameters/) for a more detailed overview of all tiers.

## Conclusion

Azure API Management is a great tool for unifying your backend API landscape, especially if you have them mixed in different Azure services like AKS, Functions and App Service but also if some are running still on-premise.