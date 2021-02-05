---
layout: post
title: How Azure Key Vault is Different to Azure App Configuration
tags: [Azure, Azure Key Vault, Azure App Configuration]
categories: [Azure]
comments: true
published: true
date: 2021-02-05 22:00:00
share-img: https://cdn.svenmalvik.com/images/azure-app-configuration-vs-key-vault.jpg
image: https://cdn.svenmalvik.com/images/azure-app-configuration-vs-key-vault.jpg
---

*We store certificates and sensitive data as secrets in Azure Key Vault. I know that many store their application configuration there as well - just because it's easy and close to the secrets. This post discusses why you should use Azure App Configuration for your non-sensitive configurations instead.*

{% include articleAd.html %}

First things first - Azure App Configuration and Azure Key Vault are complementary services that should be used side by side. Azure App Configuration stores insensitive data like key-value pairs but also references secrets in Azure Key Vault. An entry in App Configuration that references such a secret stores the URI of a Key Vault value rather than the value itself.

An App Configuration client provider that comes as an SDK for your application retrieves the Key Vault value reference of an entry, just as it does for any other keys stored in App Configuration. The client provider recognizes the keys as Key Vault references based on the content-type that every App Configuration entry gets. The client provider then asks the Key Vault to retrieve their secrets. Azure App Configuration and Azure Key Vault don't communicate with each other and means that an application is still responsible for authenticating to both App Configuration and Key Vault.

{% include articleAd.html %}

## Benefits of Azure App Configuration over Key Vault for Insensitive Data

Below is a list of features I came up with that distinguishes Azure App Configuration from Azure Key Vault. Compared to Azure Key Vault - App Configuration ...

- avoids Duplication
- supports feature flags
- supports flat and hierarchal key management
- categorizing keys using labels
- does point-in-time snapshots that can be replayed
- stores a complete timeline in key-value changes
- supports compare configuration values for different points in time
- integrates with Azure DevOps
- does data encryption at rest or in transit

## Useful Links

- [Azure App Configuration Introduction](https://www.svenmalvik.com/azure-appconfiguration/)
- [Tutorial: Use Key Vault references in a Java Spring app](https://docs.microsoft.com/en-us/azure/azure-app-configuration/use-key-vault-references-spring-boot?WT.mc_id=AZ-MVP-5004080)