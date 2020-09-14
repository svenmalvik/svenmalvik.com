---
layout: post
title: Event-Driven Infrastructure with App Configuration
subtitle: Triggering Azure API Management Deployments
tags: [Azure, Azure App Configuration, Azure Event Grid, Azure Automation Runbooks]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/appc-apim-autmation-eventgrid-logos.png
image: https://cdn.svenmalvik.com/images/appc-apim-autmation-eventgrid-logos.png
featured-image: https://cdn.svenmalvik.com/images/appc-apim-autmation-eventgrid-logos.png
---

*Azure App Configuration is great for externalizing application configurations. What we also can use it for is for updating infrastructure. At [Vipps](https://vipps.no) we have two AKS clusters. Only one cluster is active at any given time. We use the second cluster to test AKS upgrades. In front of AKS is Azure API Management that can route traffic to AKS-blue or AKS-green. The information of what cluster is active and what is inactive can be stored in Azure App Configuration. In this post, I will show you how we can automate a switch from one AKS cluster to the other cluster with Azure Event Grid. This scenario was a study that i did to find out how we can use Azure App Configuration for an Even-Driven Infrastructure.*

![Event flow diagram of how Azure App Configuration events trigger Azure API Management deployments](https://cdn.svenmalvik.com/images/apim-aks-blue-green.png){: style="max-width: 300px"}

## Agenda

* [Overview](#overview)
* [Deploy App Configuration](#deploy-azure-app-configuration)
* [Deploy API Management](#deploy-azure-api-management)
* [Create Azure Automation Account](#create-azure-automation-account)
* [Create Runbook](#create-runbook)
* [Importing Az modules into Azure Automation Account](#importing-az-modules-into-azure-automation-account)
* [Deploy named value to Azure API Management](#deploy-named-value-to-azure-api-management)
* [Reading key/value pairs from App Configuration](#reading-key-value-pairs-from-azure-app-configuration)
* [Create Webhook](#create-webhook)
* [Create Event subscription from Azure App Configuration](#create-event-subscription-from-azure-app-configuration)
* [Testing](#testing)
* [Resources](#resources)

## <a name="overview"></a>Overview

Before we start, I will give a high-level overview of the event flow between the services we use. The data of what cluster is active is stored in Azure App Configuration. Whenever we change this value, meaning we set the other AKS cluster as active, a change event is send to Azure Event Grid. Azure Automation subscribes to Event Grid and triggers an update in Azure API Management that routes the traffic to either AKS-blue or AKS-green. You find more information about [Policies in Azure API Management](https://www.svenmalvik.com/azure-apim-policies/) in a previous post.

![Event flow diagram of how Azure App Configuration events trigger Azure API Management deployments](https://cdn.svenmalvik.com/images/appc-apim-autmation-eventgrid.png)*Event flow diagram of how Azure App Configuration events trigger Azure API Management deployments*

## <a name="deploy-azure-app-configuration"></a>Deploy Azure App Configuration

We will deploy an instance of Azure App Configuration Service from Azure Cloud Shell with Azure CLI. To do so we select `Bash` as shown below.

![Azure Cloud Shell for Bash](https://cdn.svenmalvik.com/images/azure-appconfiguration-0.png)*Azure Cloud Shell for Bash*

Before we start, we have to make sure that we are in the correct subscription.

```bash
# Make sure you are in the correct subscription
az account show

# Eventually switch the current subscription
az account set --subscription "YOUR-SUBSCRIPTION"
```

We can now deploy a new instance of Azure App Configuration Service.

> [Complete list of all Azure CLI commands for Azure App Configuration](https://docs.microsoft.com/en-us/cli/azure/appconfig?view=azure-cli-latest)

```bash
# We'll put our resources into a new resource group.
az group create --name "appc2apim-rg" --location "westeurope"

# You can have one Free instance per subscription
az appconfig create --name "appc2apim-appc" --location "westeurope" --resource-group "appc2apim-rg" --sku free
```

## <a name="deploy-azure-api-management"></a>Deploy Azure API Management

To deploy an instance of Azure API Management we use PowerShell from within Cloud Shell. You can easily switch from Bash to PowerShell:

![Azure Cloud Shell Bash and PowerShell](https://cdn.svenmalvik.com/images/cloud-shell.png)*Azure Cloud Shell Bash and PowerShell*

Now run the following command to create an instance of Azure API Management. This will take about 2 minutes.

```powershell
New-AzApiManagement -ResourceGroupName "appc2apim-rg" -Name "appc2apim-apim-service" -Location "westeurope" -Organization "<ORGANIZATION>" -AdminEmail "<YOUR_EMAIL" --Sku "Consumption"
```

## <a name="create-azure-automation-account"></a>Create Azure Automation Account

Now that we have Azure App Configuration and Azure API Management in place, we need to tie them together. First, we create an Azure Automation Account.

![Create Azure Automation Account](https://cdn.svenmalvik.com/images/azure-automation-1.png)*Create Azure Automation Account*

We give it a name, subscription, a resource group. We also create a service principle.

![Configure Azure Automation Account](https://cdn.svenmalvik.com/images/azure-automation-2.png)*Configure Azure Automation Account*

We can see that a service principle was created.

![Azure Automation Account Service Principle](https://cdn.svenmalvik.com/images/azure-automation-3.png)*Azure Automation Account Service Principle*

## <a name="create-runbook"></a>Create Runbook

When we first created our Automation Account, we will notice that we got three runbooks that we could use to get started. You can chose to delete those like I did.

![Default Runbooks](https://cdn.svenmalvik.com/images/azure-automation-4.png)*Default Runbooks*

Then I created a runbook with type PowerShell. This will be empty and we will write the code for it later.

![Create Runbook](https://cdn.svenmalvik.com/images/azure-automation-6.png)*Create Runbook*

## <a name="importing-az-modules-into-azure-automation-account"></a>Importing Az modules into Azure Automation Account

We need the Az.ApiManagement PowerShell Module to update named values in API Management. The named value that we are going to update is a key/value pair telling about what AKS cluster currently is active. We'll get this from Azure App Configuration.
 
![Az.ApiManagement PowerShell Module](https://cdn.svenmalvik.com/images/azure-automation-8.png)*Az.ApiManagement PowerShell Module*

Click import to make this module available.

![Importing Az.ApiManagement PowerShell Module](https://cdn.svenmalvik.com/images/azure-automation-9.png)*Importing Az.ApiManagement PowerShell Module*

We also need the Az.AppConfiguration PowerShell Module to read the key/value pair that is telling about the active cluster.

![Az.AppConfiguration PowerShell Module](https://cdn.svenmalvik.com/images/azure-automation-11.png)*Az.AppConfiguration PowerShell Module*

At this time the Az.AppConfiguration PowerShell Module does not provide a `Get-`-function to read configurations from Azure App Configuration. This is of course a problem and requires to use the REST interface of App Configuration instead.

![Az.AppConfiguration Functions Available](https://cdn.svenmalvik.com/images/azure-automation-12.png)*Az.AppConfiguration Functions Available*

## <a name="deploy-named-value-to-azure-api-management"></a>Deploy named value to Azure API Management

In this section we will deploy a random value as named value to Azure API Management from our runbook. Copy the code into your runbook and test it.
[update-apim-nv-from-runbook.ps1](https://gist.githubusercontent.com/svenmalvik/a3fec9487aa82948d46f45f87ae805dc/raw/3d27e0513452bb66f81ed19a0a918a1cffb5f9ee/update-apim-nv-from-runbook.ps1)

## <a name="reading-key-value-pairs-from-azure-app-configuration"></a>Reading key/value pairs from Azure App Configuration

As mentioned previously, Az.AppConfiguration PowerShell Module does not provide a `Get-`-function to read configurations from Azure App Configuration yet. This requires from us to use the REST interface of App Configuration instead. In a previous post, I write about [how to use Postman to read from Azure App Configuration](https://www.svenmalvik.com/azure-appconfiguration/). As we are using PowerShell in our runbook, we would need to convert the code from Javascript to PowerShell. I haven't done this yet.

## <a name="create-webhook"></a>Create Webhook

To be able to trigger this runbook, we need a webhook that Azure Event Grid can request.

![Create Webhook in Runbook](https://cdn.svenmalvik.com/images/azure-automation-13.png)*Create Webhook in Runbook*

What we then get is a URL that we need to copy immediately and save somewhere. We will need it in the next section where we create an event subscription.

![URL in Webhook in Runbook](https://cdn.svenmalvik.com/images/azure-automation-14.png)*URL in Webhook in Runbook*

## <a name="create-event-subscription-from-azure-app-configuration"></a>Create Event subscription from Azure App Configuration

The only service we are missing is an Event Subscription in Azure Event Grid. One way of creating it is from our Azure App Configuration service.

![Create Event Subscription in Azure App Configuration](https://cdn.svenmalvik.com/images/azure-automation-16.png)*Create Event Subscription in Azure App Configuration*

We need now the Webhook URL from the previous section that you need to set as the endpoint. In addition you will set a name for the topic.

![Configuring Event Subscription](https://cdn.svenmalvik.com/images/azure-automation-17.png)*Configuring Event Subscription*

## <a name="testing"></a>Testing

We create a named value in Azure API Management that we want to be updated.

![Named Value in Azure API Management](https://cdn.svenmalvik.com/images/azure-automation-20.png)*Named Value in Azure API Management*

We create a key/value pair that will triggers an event.

![Key in Azure App Configuration](https://cdn.svenmalvik.com/images/azure-app-configuration-key.png)*Key in Azure App Configuration*

We see now a new job in the Runbook queue.

![Runbook Job in Queue](https://cdn.svenmalvik.com/images/azure-automation-23.png)*Runbook Job in Queue*

Short time later, we see that the named value in Azure API Management was updated with the current time.

![Updated Named Value in Azure API Management](https://cdn.svenmalvik.com/images/azure-automation-21.png)*Updated Named Value in Azure API Management*

Looking at the details of the event, we see our key from Azure App Configuration that triggered the chain.

![Input Event to Runbook](https://cdn.svenmalvik.com/images/azure-automation-19.png)*Input Event to Runbook*

## Next Step

We saw that we can keep infrastructure configurations in Azure App Configuration. A change will trigger an event which will then execute a Runbook. As a runbook just runs code, and we can implement whatever we want, we can re-configure whatever we want, also infrastructure-as in our case. Azure App Configuration is a quit new service, and it doesn't provide a complete list of functions at the time of this writing. This means me need to call the REST interface of Azure App Configuration instead.

## <a name="resources"></a>Resources

- [Introduction to Azure App Configuration](https://www.svenmalvik.com/azure-appconfiguration/)
- [Events in Azure App Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/concept-app-configuration-event)
- [Introduction to Azure Event Grid](https://docs.microsoft.com/en-us/azure/event-grid/overview)
- [Update Azure API Management Named Value from Runbook](https://gist.github.com/svenmalvik/a3fec9487aa82948d46f45f87ae805dc)

