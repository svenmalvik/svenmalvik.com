---
layout: post
title: Azure API Management with ARM
subtitle: Deployment Option &#35;6
tags: [Azure, ARM]
---

*Deploying an ARM template (Azure Resource Management)-template from GitHub is the simplest way of provisioning an instance of API Management, BUT - there are a couple of things we need to be aware of.*

The Microsoft Azure API Management Product Team has provided some ARM templates with a nice button that let us with a click load some settings into Azure. What's missing are some parameters like email address, name and SKU that we have to set manually. We want to automate this of course, and we'll do that in a minute. First, we'll look at how this manual process works.

![Azure API Management Templates](https://media-exp1.licdn.com/dms/image/C4E12AQE3qrEv-Vno9w/article-inline_image-shrink_1500_2232/0?e=1591833600&v=beta&t=R7U0W9JMfI5PuCJuD4AsNxEtG2sI-6xI3NJq-Fl5Vb4)

Let's "Deploy to Azure", and see what happens.

![Create Azure API Management in the portal](https://media-exp1.licdn.com/dms/image/C4E12AQFEO93FOqcQEw/article-inline_image-shrink_1500_2232/0?e=1591833600&v=beta&t=E2q0HFP-SszekKoOcFH6xKJsEZyWxQXFuqSXNxsZTvI)

Since we have used a public available ARM template, we need to set some parameters. An interesting observation is that the default Sku is Developer. We know that from previous deployments. But if we want to change it to Consumption, we'll see that it's not available. This template is from 2017 where Consumption was not available. What I've done now is to fork the repo and made some changes in the ARM template.

![azuredeploy.json](https://media-exp1.licdn.com/dms/image/C4E12AQECue_7BNvZxA/article-inline_image-shrink_1500_2232/0?e=1591833600&v=beta&t=bGKWfBT98A5eUN8xYhogXi6aKSUuSamn83He2f0EHYo)

I've not only added two SKUs, but I've also added "0" to skuCount as an allowed value. "0" is the value we have to set for Consumption. Deploying from my fork *svenmalvik/azure-quickstart-templates/101-azure-api-management-create* will make it possible to choose Consumption as well. But this approach can't get fully automated since we need to set some parameters when we deploy. Deploying fully automated with ARM means that we need to make some more changes in the ARM template that will allow us to deploy from command-line with all necessary parameters.

We have now provisioned from a public available ARM template. To deploy a local template, we must first load our template into a storage account.

## Conclusion
Working with ARM templates is a bit more work that we've seen in a previous post where we deployed API Management with the Azure PowerShell module. The advantage with ARM is its completeness. There are certain configurations like setting a custom domain that we can't do with PowerShell today and where ARM fits perfectly.
