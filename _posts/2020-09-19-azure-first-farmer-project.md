---
layout: post
title: First Farmer Project
subtitle: Introduction to Farmer
tags: [Azure, Farmer, ARM]
comments: true
published: false
share-img: https://cdn.svenmalvik.com/images/
image: https://cdn.svenmalvik.com/images/
featured-image: https://cdn.svenmalvik.com/images/
---

Farmer needs [.NET Core 3.1 or higher](https://dotnet.microsoft.com/download/dotnet-core)
You must have the Azure CLI installed on your machine in order for Farmer to perform deployments for you.

FarmerApp.fsproj
```xml
<TargetFramework>netcoreapp3.1</TargetFramework>
```

```bash
mkdir farmer-demo1; cd farmer-demo1
dotnet new -i Farmer.Template
dotnet new Farmer
dotnet run
```

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "outputs": {},
  "parameters": {},
  "resources": []
}
```

```bash
dotnet new Farmer --location WestEurope --azureSubscription Pay-As-You-Go --force
export RESOURCE_GROUP_NAME=farmer-rg
dotnet run
```

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
