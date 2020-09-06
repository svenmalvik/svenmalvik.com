---
layout: post
title: Sync Azure App Configuration with GitHub Actions
subtitle: Combining the old and the new way of configuration management
tags: [Azure, Azure App Configuration, GitHub Actions, DevOps]
comments: false
published: true
share-img: https://cdn.svenmalvik.com/images/azure-app-configuration-icon.png
image: https://cdn.svenmalvik.com/images/azure-app-configuration-icon.png
featured-image: https://cdn.svenmalvik.com/images/azure-app-configuration-icon.png
---

*One questions we might ask us when we move our properties files from an application to Azure App Configuration is how we can do this without introducing extra complexity when updating our configurations suddenly in a different way. GitHub Actions has an action that synchronizes properties files with Azure App Configuration automatically. It means that we can keep updating our configurations as before, in properties files that are under version control. This blog post is a preparation for my talk on Azure App Configuration and demonstrates this behavior i action.*

For this demonstration I chose a Spring Boot application that I used earlier for demonstration purposes. You will find the repository on GitHub ([spaceship-azure-app-config-demo application](https://github.com/svenmalvik/spaceship-azure-app-config-demo)).

![Demo Application](https://cdn.svenmalvik.com/images/azure-app-configuration-github-actions-sync1.png)*Demo Application*

The repository doesn't have a properties file yet, so I will add one and set som random key/value pairs.

![Adding properties file to repository](https://cdn.svenmalvik.com/images/azure-app-configuration-github-actions-sync2.png)*Adding properties file to repository*

Next is the GitHub workflow that we will set up. There are lots of predefined workflows to choose from. We are going to set it up ourselves.  

![Starting GitHub Actions Workflow](https://cdn.svenmalvik.com/images/azure-app-configuration-github-actions-sync3.png)*Starting GitHub Actions Workflow*

We are now in the editor with a workflow file. The file you see at first has lots of printings. I removed everything, and replaced the content with what you see below. I checkout the master branch, set a path for the files I just added, and configured then the GitHub Action `Azure App Configuration Sync`. This action supports the formats `json`, `yaml`, and `properties`. As most Java applications use properties files, I went with this format as well. You find a [full list of input parameters for Azure App Configuration Sync on GitHub](https://github.com/Azure/AppConfiguration-Sync/blob/master/action.yml).

We also need a connection string for the Azure App Configuration Service that we want to use. You can read [how to create an instance of Azure App Configuration](https://www.svenmalvik.com/azure-appconfiguration/) in my previous blog post. I copied the connection string from my running instance I already had in place and set it directly in the workflow file - NEVER DO THAT. Instead, set it as a GitHub secret. I just didn't want to over-complicate this demonstration.

![GitHub Actions Workflow file for Azure App Configuration sync](https://cdn.svenmalvik.com/images/azure-app-configuration-github-actions-sync4.png)*GitHub Actions Workflow file for Azure App Configuration sync*

To test the workflow I have to trigger it with a commit. I added a new line and made some adjustments in the properties file that I then committed.

![Adding entries in properties file to repository](https://cdn.svenmalvik.com/images/azure-app-configuration-github-actions-sync5.png)*Adding entries in properties file to repository*

Here's the logging data from the workflow. Everything looks good.

![Running GitHub Actions Workflow](https://cdn.svenmalvik.com/images/azure-app-configuration-github-actions-sync6.png)*Running GitHub Actions Workflow*

Finally checking the configuration data in my Azure App Configuration Service, and voilá, all three configuration entries have been copied over.

![Configurations in Azure App Configuration](https://cdn.svenmalvik.com/images/azure-app-configuration-github-actions-sync7.png)*Configurations in Azure App Configuration*

## Next

The [GitHub Action Azure App Configuration Sync](https://github.com/marketplace/actions/azure-app-configuration-sync) gives us a convenient way of moving properties to Azure App Configuration while still keeping the way we update our configurations. We have some legacy Java applications that use properties files, and we wanted to start using Azure App Configurations. With this action, we can keep all configurations close to the application. Now, what happens if I make a change in one configuration in Azure App Configuration? Let's say we change the title because it has a spelling error. We expect to have this reflected back in the properties. This is of course not possible with a GitHub Action. But it is possible with events in Azure App Configuration which I will cover in a next blog post.
