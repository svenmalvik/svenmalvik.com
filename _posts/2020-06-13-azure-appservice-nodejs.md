---
layout: post
title: Azure App Service with NodeJS and App Configuration
subtitle: How to automate provisioning with Azure App Configuration integration 
tags: [Azure, Azure App Configuration, NodeJS, ARM, Azure App Service]
categories: [Web]
comment: true
---

*A Web App in Azure contains several resources that need to be provisioned. We need an App Service Plan where we define the underlying compute power, an App Service that runs the application, and we need the application itself which might need a database. In this post I will use Azure App Configuration service where I store configurations that I want my NodeJS application to publish as pure Json.*

We can provision the App Service Plan and App Service from the portal, and then setup deployment of a GitHub repository for the NodeJS application. But I wanted it to be 100% automated without setting up anything, so I decided to try ARM templates.

## The ARM template explained
An ARM templates contains of 4 sections, `parameters`, `variables`, `resources`, and `outputs`. We will focus on only two of them. `parameters` and `resources`.

{% include articleAd.html %}

In [parameters](https://gist.github.com/svenmalvik/98c3527facb548ceb0670b4de0908d29#file-appservice-json-L4-L20) I defined a `name` for the site, a `connectionString` for the App Configuration Service, a `repositoryUrl` of the NodeJS application, and a `branchName` of the application that I want to deploy.

In the `resources` section, I defined 4 resources. an [App Service Plan](https://gist.github.com/svenmalvik/98c3527facb548ceb0670b4de0908d29#file-appservice-json-L24) that has the type `Microsoft.Web/serverfarms`, an [App Service](https://gist.github.com/svenmalvik/98c3527facb548ceb0670b4de0908d29#file-appservice-json-L52) with type `Microsoft.Web/sites`, a [configuration](https://gist.github.com/svenmalvik/98c3527facb548ceb0670b4de0908d29#file-appservice-json-L120) for the App Service with type `Microsoft.Web/sites/config`, and the [hostname binding](https://gist.github.com/svenmalvik/98c3527facb548ceb0670b4de0908d29#file-appservice-json-L185) so we can reach the web app with type `Microsoft.Web/sites/hostNameBindings`.

### App Service Plan
You get one free App Service Plan with [SKU B1](https://gist.github.com/svenmalvik/98c3527facb548ceb0670b4de0908d29#file-appservice-json-L32-L38) for one month and subscription, at least for now. If you automate the provisioning of the entire setup as described in this post, you could trigger it with an Azure Runbook if you want.

### App Service
The App Service depends on the App Service Plan. In ARM we can define this [dependency that has to exist with](https://gist.github.com/svenmalvik/98c3527facb548ceb0670b4de0908d29#file-appservice-json-L57-L59) `dependOn`. This example is a simplification and http only. You shouldn't run this in production.

[This App Service section also describes 2 resources](https://gist.github.com/svenmalvik/98c3527facb548ceb0670b4de0908d29#file-appservice-json-L88-L118), `sourcecontrols` where I defined the GitHub repository, and `config` where I store the connectionString for Azure App Configuration. Since I chose type `Custom` for my connectionString, I can access the value from my NodeJS application with the prefix key `CUSTOMCONNSTR_`. The fully key would be `CUSTOMCONNSTR_AppConfigConnString`. The connectionString is stored as an environment variable that my NodeJS application can access with `process.env.CUSTOMCONNSTR_AppConfigConnString`.

{% include articleAd.html %}

### App Service Configuration and hostname binding
In these resource, we configure our App Service. I exported these resources directly from the portal and made a few changes like the `scmType` which is in my case GitHub.

## NodeJS Application
The NodeJS application is in a separate GitHib repository that uses the [azure/app-configuration module](https://www.npmjs.com/package/@azure/app-configuration). Every commit to the branch that you defined when deploying the ARM template will deploy a new version and restart the application.

## Conclusion
This ARM template will deploy App Service Plan, App Service, and deploy the NodeJS application.

```Bash
az deployment group create --name "YOUR_WEBAPP" --resource-group "YOUR_RG" --template-file PATH_TO_YOUR_ARM_TEMPLATE
```