---
layout: post
title: Deploying Azure API Management with Terraform
tags: [Azure, Terraform]
---

After downloading and installing Terraform, we will create a folder with a configuration file telling that we use Azure as our provider, and telling it what we want to deploy. We do this either in HashiCorp Configuration Language (HCL) which ends with .tf, or as Json. We will use the HCL language as it's easier to read, and because we get more documentation and examples we might use. Take a look at this terraform-file for creating a resource group and deploying API Management.

```terraform
provider "azurerm" {
    subscription_id = "YOUR_SUBSCRIPTION_ID"
    tenant_id       = "YOUR_TENANT_ID"
}

resource "azurerm_resource_group" "rg" {
    name     = "test-rg"
    location = "westeurope"
}

resource "azurerm_api_management" "rg" {
    name                = "test-apim"
    location            = "${azurerm_resource_group.rg.location}"
    resource_group_name = "${azurerm_resource_group.rg.name}"
    publisher_name      = "YOUR NAME"
    publisher_email     = "YOUR_EMAIL"
    sku_name            = "Developer_1"
}
```
