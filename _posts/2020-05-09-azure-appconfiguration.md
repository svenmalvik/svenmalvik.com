---
layout: post
title:  Getting Started with Azure App Configuration
subtitle: Accessing application configurations with REST
tags: [Azure, Azure App Configuration, Azure Key Vault]
comment: false
---

*We build this great application that we configure exactly the way it fits into our environments, and then we realize that changing a configuration isn't as easy as we'd like to. This post introduces Azure App Configuration Service, a service that manages non-secret configurations. This first part of a serie discusses how to setup the service and how to use the REST interface for retrieving data.*

---

## Agenda

* We will provision Azure App Configuration with Azure CLI
* Test to get a config-entry with Postman
* Discuss other features
* Dive into Feature Flags with Spring Boot

## Deploy Azure App Configuration with Azure CLI

We will deploy an instance of Azure App Configuration Service from Azure Cloud Shell with Azure CLI. To do so we select `Bash` as shown below.

![Azure Cloud Shell for Bash](https://cdn.svenmalvik.com/images/azure-appconfiguration-0.png)*Azure Cloud Shell for Bash*

Before we start, we have to make sure that we are in the correct subscription.

```Bash
# Make sure you are in the correct subscription
az account show

# Eventually switch the current subscription
az account set --subscription "YOUR-SUBSCRIPTION"
```

We can now deploy a new instance of Azure App Configuration Service. 

> [Complete list of all Azure CLI commands for Azure App Configuration](https://docs.microsoft.com/en-us/cli/azure/appconfig?view=azure-cli-latest)

```Bash
# We'll put our resources into a new resource group.
az group create --name "svenmalvik-rg" --location westeurope

# You can have one Free instance per subscription
az appconfig create --name "spaceship-appc" --location westeurope --resource-group "svenmalvik-rg" --sku free
```

The name of your instance must be globally unique, since it will get a public endpoint: `https://svenmalvik-appc.azconfig.io`.

![Running instance of Azure App Configuration Service](https://cdn.svenmalvik.com/images/azure-appconfiguration-4.png)*Running instance of Azure App Configuration Service*

## Read a key-value from Azure App Configuration with Postman

Common practice to organize keys is into a hierarchical namespace by using a character delimiter, such as `/` or `:` that is based on component services, deployment regions. We could store the hostName of our Azure Container Registries (ACRs) with this key `docker:acr:hostName`. To distinguish two ACRs, one for test and one for production, we can label each configuration in unicode.

Before we can read anything, we need to set at least one configuration. We'll do this also with Azure CLI in its most simplistic way.

```Bash
# Deploy a key-value pair
az appconfig kv set --name "spaceship-appc" --key "target" --value "space"
```

Let's check it out in the portal.

![Key-Value pair in the portal of Azure App Configuration Service](https://cdn.svenmalvik.com/images/azure-appconfiguration-5.png)*Key-Value pair in the portal of Azure App Configuration Service*

The [REST interface for retrieving a key-value pair from Azure App Configuration](https://github.com/Azure/AppConfiguration/blob/master/docs/REST/kv.md) is well described. In short, we are going to create a `GET` request to this address: `https://spaceship-appc.azconfig.io/kv/target`. Before we can send anything, we need to get a credential identifier and the secret that we will *hide* in a request header. All your configuration data stored in App Configuration is encrypted at rest and in transit.

```Bash
# It lists 4 entries (Primary/Secondary & Read-Only/Write)
az appconfig credential list --resource-group svenmalvik-rg --name spaceship-appc
```

We pick primary *readOnly* credential. We need the `id` and the `value`. Below is an example that I created previously. It won't work for you as it won't exist anymore.

```json
...
{
    "connectionString": "Endpoint=https://spaceship-appc.azconfig.io;Id=UCUX-l9-s0:3mLEfWlVSlM29Y6SAecu;Secret=QTbtHe75woUi+UerdNVvJWB+E5XQZ9kdrm9xYIcwaVI=",
    "id": "UCUX-l9-s0:3mLEfWlVSlM29Y6SAecu",
    "lastModified": "2020-05-08T10:00:51+00:00",
    "name": "Primary Read Only",
    "readOnly": true,
    "value": "QTbtHe75woUi+UerdNVvJWB+E5XQZ9kdrm9xYIcwaVI="
},
...
```

Open Postman and create a new `GET` request with your `endpoint`. I told that the `id` and `value` will be *hidden* in a header. To do so, we copy the code below into the `Pre-request Script` and replace my `credential` with your `id`, and my `secret` with your `value`.

[![Pre-request Script in Postman](https://cdn.svenmalvik.com/images/azure-appconfiguration-6.png "Pre-request Script in Postman")](https://gist.github.com/svenmalvik/1fafc314ce589d4ce6145bc08f29ec0e)*https://gist.github.com/svenmalvik/1fafc314ce589d4ce6145bc08f29ec0e*

## Conclusion

Azure App Configuration complements Azure Key Vault by managing its configuration easier. A good example is comparing two settings across multiple environments as in the example below where we store the hostName of our Azure Container Registry for test and production.

![Comparing configurations in Azure App Configuration](https://cdn.svenmalvik.com/images/azure-appconfiguration-7.png)*Comparing configurations in Azure App Configuration*

Another great feature of Azure App Configuration is feature flags. Feature flags are stored almost the same way as ordinary configurations. I'm going to dive into using feature flags in Spring Boot next week.
