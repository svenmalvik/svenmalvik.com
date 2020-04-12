---
layout: post
title: Azure API Management with ARM
subtitle: Deployment Option &#35;4
tags: [Azure, Azure API Management, ARM, GitHub]
---

*Deploying an ARM template (Azure Resource Management)-template from GitHub is the simplest way of provisioning an instance of API Management, BUT - there are a couple of things we need to be aware of.*

## Deploy Azure API Management with ARM from GitHub

The Microsoft Azure API Management Product Team has provided some ARM templates with a nice button that let us with a click load some settings into Azure. What's missing are some parameters like email address, name and SKU that we have to set manually. We want to automate this of course, and we'll do that in a minute. First, we'll look at how this manual process works.

![Azure API Management Templates](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-arm-0.png)*Azure API Management Templates*

Let's *Deploy to Azure*, and see what happens.

![Create Azure API Management in the portal](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-arm-1.png)*Create Azure API Management in the portal*

Since we have used a public available ARM template, we need to set some parameters. An interesting observation is that the default SKU is Developer. We know that from previous deployments. But if we want to change it to Consumption, we'll see that it's not available. This template is from 2017 where Consumption was not available. What I've done now is to fork the repo and made some changes in the ARM template.

![azuredeploy.json](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-arm-2.png)*azuredeploy.json*

I've not only added two SKUs, but I've also added `0` to skuCount as an allowed value. `0` is the value we have to set for Consumption. Deploying from my fork [svenmalvik/azure-quickstart-templates/101-azure-api-management-create](https://github.com/svenmalvik/azure-quickstart-templates/tree/master/101-azure-api-management-create) will make it possible to choose Consumption as well. I've set *Consumption* as default. To fully automated the deployment of the ARM template, we need to set some more default values like email and name.

## Deploy Azure API Management with ARM from a local machine

Instead of clicking a nice blue button on GitHub, I was wondering if I just can apply the ARM template with default values and without any interactions. The code below deploys the remote ARM template that doesn't need our attention.

```powershell
# Create resource group
New-AzResourceGroup -Name "apim-with-arm-rg" -Location "West Europe"

# Deploy remote ARM template
New-AzResourceGroupDeployment -ResourceGroupName "apim-with-arm-rg" -TemplateUri https://raw.githubusercontent.com/svenmalvik/azure-quickstart-templates/master/101-azure-api-management-create/azuredeploy.json
```

![Deploy Azure API Management with remote ARM template](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-arm-3.png)*Deploy Azure API Management with remote ARM template*

## Conclusion

Working with ARM templates is a bit more work that we've seen in a previous post where we deployed API Management with the Azure PowerShell module. The advantage with ARM is its completeness. There are certain configurations like setting a custom domain that we can't do with PowerShell today and where ARM fits perfectly.
