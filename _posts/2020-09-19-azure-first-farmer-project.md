---
layout: post
title: My Farmer Project
subtitle: Introduction to Farmer
tags: [Azure, Farmer, ARM]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/farmer.png
image: https://cdn.svenmalvik.com/images/farmer-4x4.jpg
featured-image: https://cdn.svenmalvik.com/images/farmer-4x4.jpg
---

*As many companies move their services to the cloud, the way we interact with the cloud, the tooling, becomes more important. In Azure we are used to deploy with the Azure CLI, REST API, or with ARM. Then came Terraform which abstracted away a lot of the complexity that comes with ARM. A very new member of the Infrastructure asd Code (IaC) family is [Farmer](https://compositionalit.github.io/farmer/). This blog post the first one of a series of Farmer blog post where I will show how to install it and get started. I also will talk briefly about Azure DevOps integration.*

## Basics

Farmer needs [.NET Core 3.1 or higher](https://dotnet.microsoft.com/download/dotnet-core) in order to work. I tried at first to use the Azure Cloud Shell, but I wasn't able to execute my program with `dotnet run` at the end because the version was lower 3.1. You will also need to have Azure CLI installed on your machine so that Farmer can perform deployments for you.

Before we start, I like to make sure that I'm logged into the right Azure tenant and the right subscription. I don't want to make the mistake of deploying to production. I test this with `az account show`.

To get started I executed the following statements:

```bash
mkdir farmer-demo1; cd farmer-demo1
dotnet new -i Farmer.Template
dotnet new Farmer
dotnet run
```

This will create a basic Farmer application that writes an ARM template to `output.json`.

```fsharp
open Farmer
open Farmer.Builders
open Farmer.Deploy
open System

let deployment = arm {
    location Location.WestEurope
}

printf "Generating ARM template..."
deployment |> Writer.quickWrite "output"
printfn "all done! Template written to output.json"
```

The created ARM template `output.json` is empty. We haven't specified anything yet.

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "outputs": {},
  "parameters": {},
  "resources": []
}
```

## Adding DevOps

I will now re-create the Farmer application with `--ci devops`. This will add an `azure-pipeline.yml`-file for Azure DevOps to the project. I need to specify an `--azureSubscription` which in this case is the name of my service connection.

```bash
dotnet new Farmer --location WestEurope --ci devops --azureSubscription farmer-rg-sc --force
export RESOURCE_GROUP_NAME=farmer-rg
dotnet run
```

The `Program.fs`-file has been overwritten with `--force`.

```fsharp
open Farmer
open Farmer.Builders
open System

let deployment = arm {
    // Our location we set previously
    location Location.WestEurope
}

module Config =
    // getEnv is only needed inside this module
    let private getEnv name =
        match Environment.GetEnvironmentVariable name with
        | null -> None
        | name -> Some name
    // Read rg from env or set default value
    let resourceGroupName =
        getEnv "RESOURCE_GROUP_NAME" |> Option.defaultValue "farmer-ci-deploy"

// Execute andf deploy
let response =
    deployment
    |> Deploy.tryExecute Config.resourceGroupName Deploy.NoParameters
    |> function
    | Ok outputs -> sprintf "Success! Outputs: %A" outputs
    | Error error -> sprintf "Rejected! %A" error

printfn "Deployment finished with result: %s" response
```

When we executed the application with `dotnet run` a resource group `farmer-rg` was created. The ARM template was written to `.farmer/farmer-deploy.json`. We also got a new file `azure-pipelines.yml` that we can use to create a CI pipeline in Azure DevOps.

```yml
trigger:
- master

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: AzureCLI@2
  displayName: 'Deploy ARM template'
  inputs:
    azureSubscription: 'farmer-rg-sc'
    scriptType: 'bash'
    scriptLocation: 'inlineScript'
    inlineScript: 'dotnet run'
```

Before running the Azure DevOps pipeline I need to add a service connection `farmer-rg-sc` with `Contributer`-role to my subscription.

## Deploying Something Not Useful

To see how simple it is -at least it's what Farmer is telling the world- I added an Azure Maps resource to my Farmer application. The change in the code is as follows.

```fsharp
// In F#, the code (demoMaps) needs to be declared above the code referencing it.
let demoMaps = maps {
    name "demo_maps"
    sku Maps.S0
}

let deployment = arm {
    location Location.WestEurope
    // Adding the newe resource
    add_resource demoMaps
}
```

The corresponding ARM template will get one additional resource `Microsoft.Maps`. Comparing only this limited F# application `Program.fs` with the printed ARM template `farmer-deploy.json`, we see that the F# application has 34 lines while the ARM template has 17.

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "outputs": {},
  "parameters": {},
  "resources": [
    {
      "apiVersion": "2018-05-01",
      "location": "global",
      "name": "demo_maps",
      "sku": {
        "name": "S0"
      },
      "type": "Microsoft.Maps/accounts"
    }
  ]
}
```

Once committed to GitHub and connected to a new Azure DevOps pipeline, it gets automatically triggered and the new resource deployed to Azure.

![Azure DevOps Pipeline Output for Farmer Application](https://cdn.svenmalvik.com/images/azure-farmer-1.png)*Azure DevOps Pipeline Output for Farmer Application*
![Azure Maps Created by Farmer](https://cdn.svenmalvik.com/images/azure-farmer-0.png)*Azure Maps Created by Farmer*

## Next Steps

Farmer was created to avoid the limitations ARM templates have such as verbose JSON, difficult-to-maintain stringly-typed code, and documentation that is behind. In the upcoming post, I will try to deploy a more advanced scenario and see how it goes, and how it feels to work with Farmer.