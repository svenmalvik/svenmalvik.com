---
layout: post
title: Parameters in Farmer - IaC with Azure
subtitle: My Learning Journey with Farmer - &#35;2
tags: [Azure, Farmer, ARM]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/farmer.png
image: https://cdn.svenmalvik.com/images/farmer-4x4.jpg
featured-image: https://cdn.svenmalvik.com/images/farmer-4x4.jpg
---

*This is part 2 of my learning adventure of Farmer for Azure resource deployments. This time, I wanted to look at parameters, variables, outputs and expressions.*

## Passing Outputs to another Resource

I created a Web App with a dependency to a storage account. As shown below, the storage key kan simply be passed to the web application.

```fsharp
let sa = storageAccount {
    name "demo-sma75-sa"
}

let webAppConfig = webApp {
    name "demo-webapp"
    setting "storageKey" sa.Key
}
```

The generated ARM template shows us the storage key.

```json
"appSettings": [
    {
        "name": "storageKey",
        "value": "[concat('DefaultEndpointsProtocol=https;AccountName=demosma75sa;AccountKey=', listKeys('demosma75sa', '2017-10-01').keys[0].value)]"
    },
```

Farmer knows that the Web Application needs to be deployed before the storage account, so we don't need to explicitly declare this. However, you can specify this explicitly with `depends_on`.

```fsharp
let webAppConfig = webApp {
    name "demo-webapp"
    setting "storageKey" sa.Key
    depends_on [ sa ]
}
```

`depends_on [ sa ]` gave me this error message.

```
/Users/sma/git/farmer-demo1/Program.fs(12,5): error FS0041: No overloads match for method 'DependsOn'.Known types of arguments: WebAppConfig * StorageAccountConfig listAvailable overloads: - member WebAppBuilder.DependsOn : state:WebAppConfig * builder:CoreTypes.IBuilder -> WebAppConfig // Argument 'builder' doesn't match - member WebAppBuilder.DependsOn : state:WebAppConfig * resource:CoreTypes.IArmResource -> WebAppConfig // Argument 'resource' doesn't match - member WebAppBuilder.DependsOn : state:WebAppConfig * resourceName:CoreTypes.ResourceName -> WebAppConfig // Argument 'resourceName' doesn't match [/Users/sma/git/farmer-demo1/FarmerApp.fsproj]
```

I do not know F# yet, so this error might be obvious for others, but I have an idea how to solve this (part of a later post). For me it was just painful because my example is directly from the documentation.

Anyway, the storage key was successfully set under Application Settings.

![App Service setting with storage key](https://cdn.svenmalvik.com/images/azure-farmer-3.png)*App Service setting with storage key*

Looking at the [API for Web App](https://compositionalit.github.io/farmer/api-overview/resources/web-app/) we see all the configurations we can and have to set if we want to understand what happens and gets created. I.e. can we set `app_insights_off` to avoid creating an instance for us.

![Created Azure resources with Farmer for default WebApp](https://cdn.svenmalvik.com/images/azure-farmer-2.png)*Created Azure resources with Farmer for default WebApp*

## No Support for Variables and Parameters

Farmer doesn't support ARM variables or parameters. The reasons for that are:

- Codebase gets more complex
- API surface area gets more complex
- Expressions capabilities inside ARM templates like concat inside a variable that depends on another variable - hard to do without increasing the complexity

The Farmer developers recommend to put Farmer as part of a build script to generate ARM templates, rather than committing into source control.

- Simplifies the code base
- Instead of using the error prone and limited expression capabilities of ARM templates, you can use a proper programming language for conditional logic for creating the ARM template
- Deployments e.g. inside the Azure Portal are much easier to read because there are no placeholders or variables but just values

Here's the code for entire application

```fsharp
open Farmer
open Farmer.Builders
open System

let createWebApp theLocation =

    let sa = storageAccount {
        name "demo-sma-sa"
    }

    let webapp = webApp {
        name "demo-sma75-webapp"
        app_insights_off
        setting "storageKey" sa.Key
    }

    arm {
        // Our location we set previously
        location theLocation
        add_resource sa
        add_resource webapp
    }

createWebApp Location.WestEurope
|> Deploy.execute "farmer-rg" Deploy.NoParameters
```

## Next Steps

This example was pretty basic, but it might show that we can pass parameters as input values and all created resources get the location set with the actual value rather then a reference. What interests me next is how I can deploy Azure App Configuration or Azure API Management with Farmer. Those resources are not part of Farmer yet.
