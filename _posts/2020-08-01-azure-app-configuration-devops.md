---
layout: post
title: Using App Configuration in Azure DevOps
subtitle: I tried the new extension in a release pipeline
tags: [Azure, Azure App Configuration, Azure DevOps]
comments: false
published: true
share-img: https://cdn.svenmalvik.com/images/azure-app-configuration-logo.png
image: https://cdn.svenmalvik.com/images/azure-app-configuration-icon.png
#featured-image: https://cdn.svenmalvik.com/images/azure-app-configuration-icon.png
#header-img: https://cdn.svenmalvik.com/images/azure-app-configuration-logo.png
---

*Application deployments dependent often on environment specific data like the name of a resource group, location or flags for certain use cases. Azure DevOps has the concept of variables which is a list of key/value pairs stored together with the release pipeline. This blog post shows how to use key/value pairs in an Azure DevOps Release Pipeline that are stored in Azure App Configuration.*

## Prerequisites

- [DevOps Extension Azure App Configuration](https://marketplace.visualstudio.com/items?itemName=AzureAppConfiguration.azure-app-configuration-task)
- Service Connection with **Service Principle** for Azure DevOps with role `App Configuration Data Reader`

## Azure DevOps with Variables

Traditionally, we have set environment specific values in Azure DevOps under variables as shown in the image below. These key/value pairs are then accessible as environment variables on the agent machine. This works technically of course fine. What I think is challenging is the fact that we don't treat these configurations the same way as other configurations. In a Java application we store configurations in `.properties` files, in NodeJS Web Apps we store them in `config.js` files - all together with the application code that is under version control.

![Setting a variable as key/value pair in Azure DevOps](https://cdn.svenmalvik.com/images/azure-devops-variables-pane.png)*Setting a variable as key/value pair in Azure DevOps*

I'm adding the `Command Line Script` task and print the environment variable `myKey`.
![Printing environment variable $myKey](https://cdn.svenmalvik.com/images/azure-devops-print-variable-in-bash-task.png)*Printing environment variable $myKey*

Here's the result - `myValue`.
![Printed value from Azure DevOps Variables](https://cdn.svenmalvik.com/images/azure-devops-printed-value.png)*Printed value from Azure DevOps Variables*

With this approach, we have the challenge of maintaining these variables in a developer-friendly way as they are not stored together with the.

## Reading a Key/Value Pair in a Release Pipeline from Azure App Configuration

Instead of using variables in Azure DevOps, we can also store our application configuration inn Azure App Configuration. Instead of storing only pipeline related configurations, we would store all application configurations there. Azure App Configuration can easily synchronize with a GitHub repository. That means that all configuration is also under version control. More about this in a later post.

Let's nnow create a configuration entry with the key `test` and the value `value`.
![Creating a configuration entry <test> in Azure App Configuration](https://cdn.svenmalvik.com/images/azure-devops-app-configuration-add-key-value.png)*Creating a key `test` with value `value` in Azure App Configuration*

Now we choose the Azure DevOps task `Azure App Configuration` from the marketplace. This task is for downloading/reading from App Configuration.
![Azure App Configuration task in Azure DevOps](https://cdn.svenmalvik.com/images/azure-devops-add-app-config-task.png)*Azure App Configuration task in Azure DevOps*

When we configure the Azure App Configuration task, we need to provide a service connection to our Azure App Configuration service, the name, and a value for the key. The key can also include a wildcard, and would result in one or many configurations that would be set as environment variables on the agent machine. In this example I will be specific and choose the key `test` that we know we added to Azure App Configuration.
![Configuring Azure App Configuration task in Azure DevOps](https://cdn.svenmalvik.com/images/azure-devops--app-configuration.png)*Configuring Azure App Configuration task in Azure DevOps*

Now we a the task `Command Line Script` and print the key/environment variable `$TEST`.
![Printing environment variable from Azure App Configuration](https://cdn.svenmalvik.com/images/azure-devops-read-env-for-app-configuration.png)*Printing environment variable from Azure App Configuration*

What we get might be an error. At least I got an error. The error is saying that we don't have enough access rights to read from App Configuration. The service principle that is used by the service connection for Azure DevOps needs the role `App Configuration Data Reader`.
![Missing role of service principle for Azure App Configuration](https://cdn.svenmalvik.com/images/azure-devops-app-config-task-access-error.png)*Missing role of service principle for Azure App Configuration*

After I have added the missing role everything worked, and the value `value` is printed.
![Printed environment variable from Azure App Configuration](https://cdn.svenmalvik.com/images/azure-devops-app-configuration-printed-value.png)*Printed environment variable from Azure App Configuration*

## Referencing Secrets from Azure Key Vault

Azure DevOps Variables support secrets, and so does App Configuration. In App Configuration we can reference secrets. The secret value gets resolved by the Azure DevOps task, and is accessible within other tasks the same way as secrets in Azure DevOps Variables.

## Next steps

I talked in the beginning about configurations that are close to the application code. What we normally would do to deploy configurations to App Configuration is to synchronize with the repository in GitHub. More about this in a later post.
