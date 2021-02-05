---
layout: post
title: How Azure Key Vault is Different to App Configuration
tags: [Azure, Azure Key Vault, Azure App Configuration]
categories: [Azure]
comments: true
published: false
date: 2021-02-05 22:00:00
share-img: https://cdn.svenmalvik.com/images/azure-app-configuration-vs-key-vault.jpg
image: https://cdn.svenmalvik.com/images/azure-app-configuration-vs-key-vault.jpg
---

*xxx*

Azure App Configuration is a cloud-based managed service that helps developers and infrastructure team members to centralize and manage application configurations and feature flags. Using Azure App Configuration helps to separate application configuration from code.

One of the Twelve-Factor App principles states strict separation of config from code. With Azure App configuration this can be easily achieved.

In the modern world, applications often can run in different geographical locations, can be hosted on services like App Services, virtual machines, Serverless functions, Azure Container Instance, AKS, etc. Managing application configuration for all this type of service can be done in a centralized location using App configuration which means your operations and support team members need not go to N number of places to look for application configurations.

Additionally, you can set or access App configuration values from the Azure DevOps pipeline.

## Benefits of Azure App Configuration

Following are a few key benefits of Azure App Configuration
Centralized management for application configuration for all your applications.
Single Source of Truth
Avoids Duplication
Supports Feature Management provides UI for configuring it.
Flexible key representations and mappings - supports flat and hierarchal key management.
Dynamically change application settings without the need to redeploy or restart an application.
Tagging with labels - support categorizing keys using labels.
Point-in-time snapshots that can be replayed. App Configuration stores a complete timeline in key-value changes. Supports compare configuration values for different points in time 
Built-in support for Azure Managed Identity, which means web apps, Azure functions, etc applications can easily access the application configuration without specifying credentials in code.
Support popular framework including Java, .NET.
Integration with Azure DevOps pipelines.
Integration with Azure Key Vault.
Data encryption at rest or in transit.
A fully managed service from Azure that can be provisioned in minutes and need not worry about the underlying platform and SLA's.
When I initially looked at the App configuration service one question that came into mind how it's different compared to the Azure Key Vault service.

## App Configuration vs Key Vault

App Configuration doesn't replace Key Vault. Key Vault is used to store secrets (sensitive data), certificates, etc. With Key Vault you will get options for rotating passwords, certificates. App configuration is used to hold application configuration which is insensitive. App configuration is one store for application configurations for multiple applications. App configuration is well suited in a scenario like dynamically changing application settings because the application can pick changes without a restart. App configuration complements Feature Management functionality by providing feature managed user interface. App Configuration can be integrated with Azure Key Vault.

## Useful Links

https://docs.microsoft.com/en-gb/azure/azure-app-configuration/overview