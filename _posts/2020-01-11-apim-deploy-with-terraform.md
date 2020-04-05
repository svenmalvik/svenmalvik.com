---
layout: post
title: Azure API Management with Terraform
subtitle: Deployment Option Number 7
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

We notice that the SKU we deploy is one unit of Developer, not Consumption. The latest version of Terraform doesn't support this yet, and probably many other configurations either. In this case, we could create a pull request and add Consumption in this section of the open source project on GitHub.

```Golang
const (
	// SkuTypeBasic Basic SKU of Api Management.
	SkuTypeBasic SkuType = "Basic"
	// SkuTypeDeveloper Developer SKU of Api Management.
	SkuTypeDeveloper SkuType = "Developer"
	// SkuTypePremium Premium SKU of Api Management.
	SkuTypePremium SkuType = "Premium"
	// SkuTypeStandard Standard SKU of Api Management.
	SkuTypeStandard SkuType = "Standard"
)
```
When first starting to use Terraform, you need to run `terraform init` to tell Terraform to scan the code, figure out what providers you’re using, and download the code for them. Then we run `terraform plan` to create an execution plan. Besides syntax check, the execution plan specifies what actions Terraform will take to achieve the desired state defined in the configuration, and the order in which the actions occur.
