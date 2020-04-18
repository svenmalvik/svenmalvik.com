---
layout: post
title: Logging in Azure API Management
subtitle: Sending logs to Azure Event Hub
tags: [Azure, Azure API Management, Azure Event Hub, Azure Application Insights, PowerShell]
comments: false
---

*This post is a complete step-by-step guide on how to send logs from Azure API Management to Azure Event Hub with PowerShell. We start by creating an instance of APIM, Event Hubs Namespace together with an Event Hub, and finish by watching incoming events with help of a VS Code Plugin.*

---

## Agenda

- Deploy Azure API Management
- Add API
- Deploy Azure Event Hub
- Add logger to APIM
- Install Azure Event Hub Plugin in VSCode

---

## Connecting to Azure
There are many ways we can use to connect to Azure like using [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest), [Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/overview), or PowerShell. In this post, I'm using Azure Cloud Shell from within [VS Code](https://code.visualstudio.com/), but it doesn't really matter if we just focus on logging from APIM to Event Hub.

![Azure Cloud Shell in Azure Portal](https://cdn.svenmalvik.com/images/azure-apim-with-eventhub-0.png)*Azure Cloud Shell in Azure Portal*

## Create Resource Group

I create a resource group where I will put all the resources. This way I can easily delete all together once I don't need it anymore without being unsure whether I can delete a resource or not.

```powershell
# Create Resource Group
New-AzResourceGroup -Name "apim101-rg" -Location "West Europe"
```

## Deploy Azure API Management

I have previously created 5 posts about different ways of provisioning Azure API Management. Check them out in case you want to go with another option that with PowerShell.

I want to log requests from an API that we first need to deploy. A simple way of doing that is by importing a Swagger-file that specifies an online API like the the [Conference API](https://conferenceapi.azurewebsites.net?format=json).

```powershell
# Deploy new instance of Azure API Management
New-AzApiManagement -ResourceGroupName "apim101-rg" -Name "svenmalvik-apim" -Sku "Consumption" -Capacity 0 -Location "West Europe" -Organization "svenmalvik.com" -AdminEmail "sven@malvik.de"

# The context tells us what instance of APIM we're working with
$apimCtx = New-AzApiManagementContext -ResourceGroupName "apim101-rg" -ServiceName "svenmalvik-apim"

# Add Conference API to the APIM instance
Import-AzApiManagementApi -Context $apimCtx -SpecificationFormat "Swagger" -SpecificationUrl "https://conferenceapi.azurewebsites.net?format=json" -Path "conf" -ApiId "confapi"
```
We have an instance of Azure API Management up and running, and we have an API with a backend deployed. We can now check if everything works as expected by clicking APIs in the menu of the instance from within the Azure portal.

![Test API in Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-with-eventhub-1.png)*Test API in Azure API Management*

## Deploy Azure Event Hub

I'm using Azure Event Hub to send logs to. Check out the [Azure Event Hub documentation](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about) for more details.

I will first create an Azure Event Hubs namespace. An Event Hubs namespace provides a unique scoping container in which I will create an event hub.

```powershell
# Create Event Hub namespace
New-AzEventHubNamespace -ResourceGroupName "apim101-rg" -Name "svenmalvik-eh-ns" -Location "West Europe" -SkuName "Basic" -SkuCapacity 1

# Create Event Hub
New-AzEventHub -ResourceGroupName "apim101-rg" -NamespaceName "svenmalvik-eh-ns" -Name "svenmalvik-eh"
```

## Add Azure API Management EventHub logger

Now that we have Azure API Management and Azure Event Hub in place, we need to tell APIM where to send logs to. We do this by creating a logger. We can add as many loggers to Azure API Management as we want. We could use one logger for sending logs to Event Hub and another logger for sending logs to Azure Application Insights.

```powershell
# Add Access to Event Hubs namespace
New-AzEventHubAuthorizationRule -ResourceGroupName "apim101-rg" -NamespaceName "svenmalvik-eh-ns" -AuthorizationRuleName "svenmalvik-eh-auth-rule" -Rights @("Listen", "Send")

# Get the connectionString to the Event Hubs namespace
$ehConnection = (Get-AzEventHubKey -ResourceGroupName "apim101-rg" -NamespaceName "svenmalvik-eh-ns" -AuthorizationRuleName "svenmalvik-eh-auth-rule").PrimaryConnectionString

# Create Azure API Management Event Hub logger
New-AzApiManagementLogger -Context $apimCtx -LoggerId "svenmalvik-logger" -Name "svenmalvik-logger" -ConnectionString "$ehConnection;EntityPath=svenmalvik-eh"
```

## Add Event Hub logger to API policy

We haven't talked about policies in Azure API Management. Policies are a powerful capability of the system that allow the publisher to change the behavior of the API through configuration. Policies are a collection of Statements that are executed sequentially on the request or response of an API. You will find more information about [Azure API Management policies](https://docs.microsoft.com/en-us/azure/api-management/api-management-policies) in the documentation.

We can either deploy a policy with PowerShell, or we open the policy for our API in the portal and add the logger from there. For simplicity reason and to focus on adding the logger, I will add the logger from within the Azure portal.

![Azure API Management API policy](https://cdn.svenmalvik.com/images/azure-apim-with-eventhub-3.png)*Azure API Management API policy*

Add the xml code you see below to the `inbound`-section of the policy.

```xml
<!-- Create API policy and add Event Hub logger to API -->
<log-to-eventhub logger-id ='svenmalvik-logger'>
    @( string.Join(",", DateTime.UtcNow, context.Deployment.ServiceName, context.RequestId, context.Request.IpAddress, context.Operation.Name) )
</log-to-eventhub>
```

## Install Azure Event Hub Plugin in VS Code

We have set up everything we needed, and the only remaining task we have to do now is to test if logging to the Event Hub is working. For that, I will install the `Azure Event Hub Explorer` plugin to VS Code.

![VS Code Plugin Azure Event Hub Explorer](https://cdn.svenmalvik.com/images/azure-apim-with-eventhub-4.png)*VS Code Plugin Azure Event Hub Explorer*

Configure now the plugin to manage the newly created Event Hub and start monitoring.

![Configure Azure Event Hub Explorer](https://cdn.svenmalvik.com/images/azure-apim-with-eventhub-5.png)*Configure Azure Event Hub Explorer*

When we now send a request to the API, we'll need to wait some seconds for the plugin to read from the Event Hub.

```
Azure Event Hub Explorer > Start monitoring event hub
Azure Event Hub Explorer > Created partition receiver [1] for consumerGroup [$Default]
Azure Event Hub Explorer > Created partition receiver [0] for consumerGroup [$Default]
Azure Event Hub Explorer > Message Received:
"4/8/2020 5:33:09 PM,svenmalvik-apim.azure-api.net,00a166ad-beb4-4b1a-bc56-8faf699eca6e,51.175.196.188,GetTopics"
Azure Event Hub Explorer > Stop monitoring event hub
```

## Conclusion

There were a lot of steps involved in setting up everything from the ground to logging to Azure Event Hub, and I hope this post could help you. Let me know if you have any questions regarding one of the previous steps or some other questions about Azure API Management, and I will try to answer them.