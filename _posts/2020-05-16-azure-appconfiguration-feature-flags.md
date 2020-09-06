---
layout: post
title:  Azure App Configuration Introduction - Part2
subtitle: Using feature flags in Spring Boot - with Video
tags: [Azure, Azure App Configuration, Spring Boot]
comments: false
published: false
share-img: https://cdn.svenmalvik.com/images/azure-app-configuration-icon.png
image: https://cdn.svenmalvik.com/images/azure-app-configuration-icon.png
featured-image: https://cdn.svenmalvik.com/images/azure-app-configuration-icon.png
---

*Sometimes we would like to test a new feature of an application. Or we would like to disable code junks because they are not fully implemented. Feature toggling, or feature flags make this possible. This post will discuss how I build a spaceship from scratch with Spring Boot and the support of Azure App Configuration to enable and disable features of my spaceship.*

---

[![Azure App Configuration Introduction](https://cdn.svenmalvik.com/images/azure-app-configuration-yt.jpg "Azure App Configuration Introduction")](https://youtu.be/hbCWI9PSsAQ)*Watch this post on YouTube: Azure App Configuration Introduction*

## Agenda

* Few words to trunk based development and why we may consider feature flags
* How Azure App Configuration Service stores feature flags
* We build a spaceship with Spring Boot using feature flags

## Few words on trunk based development

Trunk based development simply means to work as closely on the master branch as possible avoiding long-living feature branches. We will still have feature branches, but they will be merged as quickly as possible directly to the master branch. Trunk based development prefers many minor changes over few larger changes. The question then is, how can we add new features that are not fully implemented yet when we need to merge often. The answer is with feature flags. More information on trunk based development can be found at [https://trunkbaseddevelopment.com](https://trunkbaseddevelopment.com).

## How Azure App Configuration Service stores feature flags

We will soon build a spaceship with Spring Boot. As spaceships tend to be quit complex systems, we won't be able to finish the whole product in this post. In fact, we are just getting started for now, and will hide new features behind a feature flag that we will name `beta`.

As in part one, we are going to work inside Azure Cloud Shell with Bash. Make sure you are in the right subscription and that you have access to your instance of Azure App Configuration.

```bash
# Make sure you are in the correct subscription
az account show

# Eventually switch the current subscription
az account set --subscription "YOUR-SUBSCRIPTION"

# Check if your spaceship config-store is still there
az appconfig show --name "spaceship-appc" --resource-group "svenmalvik-rg"
```

When everything looks fine, we can deploy our `beta` flag that we will need later to hide new features of our spaceship. 

> **NOTE:** The `appconfig feature` command is still in preview. Azure App Configuration is in GA.

```bash
# Creates a new feature flag without asking us for confirmation (--yes)
az appconfig feature set --name "spaceship-appc" --feature "beta" --yes
```

Azure App Configuration stores feature flags as `json` objects the same way as ordinary configurations.

![Running instance of Azure App Configuration Service](https://cdn.svenmalvik.com/images/azure-appconfiguration-feature-flags-0.png)*Running instance of Azure App Configuration Service*

The feature flag is disabled by default, and we have to explicitly enable it. We'll do this later once we have our spaceship in place including a feature that we want to try out.

```json
{
    "id": "beta",
    "description": null,
    "enabled": false,
    "conditions": {
        "client_filters": []
    }
}
```

## We build a spaceship with Spring Boot using feature flags

I started by following the instructions on [Create a Spring Boot app](https://docs.microsoft.com/en-us/azure/azure-app-configuration/quickstart-feature-flag-spring-boot#create-a-spring-boot-app). The problem was that some instructions were wrong, and used libraries old. So I created pull requests that were quickly merged by Microsoft into the master branch of the Azure Documentation. As a side note, that was super fun and super rewarding. Anyway, I simplified the example, updated the libraries, and put it on GitHub - [spaceship-azure-app-config-demo](https://github.com/svenmalvik/spaceship-azure-app-config-demo).

Before we start the spaceship, we need to set the `connection-string` of the App Configuration instance as an environment variable. I have a Mac, so I set it as shown below.

```bash
# I showed how to get the connection-string in the previous post
export APP_CONFIGURATION_CONNECTION_STRING="Endpoint=https://spaceship-appc.azconfig.io;Id=UCUX-l9-s0:3mLEfWlVSlM29Y6SAecu;Secret=QTbtHe75woUi+UerdNVvJWB+E5XQZ9kdrm9xYIcwaVI="
```

Before we discuss how feature flags are implemented into the spaceship, we will look at the behavior by starting it.

```bash
# Maven 3.x and Java 8 required
mvn clean install && mvn spring-boot:run
```

`localhost:8080` is now showing us a sneak peak of the future.

![Spring Boot Web App with Azure App Configuration feature flag #1](https://cdn.svenmalvik.com/images/azure-appconfiguration-feature-flags-1.png)*Spring Boot Web App with Azure App Configuration feature flag #1*

Now, we are enabling the `beta`-feature, and then looking even further into the future.

```bash
# Enabling the feature flag
az appconfig feature enable --name "spaceship-appc" --feature "beta" --yes
```

![Spring Boot Web App with Azure App Configuration feature flag #2](https://cdn.svenmalvik.com/images/azure-appconfiguration-feature-flags-2.png)*Spring Boot Web App with Azure App Configuration feature flag #2*

It's [one line that makes this happen](https://github.com/svenmalvik/spaceship-azure-app-config-demo/blob/master/src/main/java/com/svenmalvik/spaceship/HelloController.java#L24) `featureManager.isEnabledAsync()`.

```java
@GetMapping(value = {"", "/", "/welcome"})
public String mainWithParam(Model model) {
    // We prefix our flag with featureManagement.
    model.addAttribute("Beta", featureManager.isEnabledAsync("featureManagement.beta").block());
    return "welcome";
}
```

Responsible for this simplistic code is the [microsoft/spring-cloud-azure](https://github.com/microsoft/spring-cloud-azure/tree/master/spring-cloud-azure-feature-management-web)-java library that I defined in `pom.xml`.

## Conclusion

We have discussed the main point of feature flags in Azure App Configuration Service. We didn't talk about filters. Feature filters let us enable a feature for only a subset of users. This is great for canary-testing/AB-testing.
