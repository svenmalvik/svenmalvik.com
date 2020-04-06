---
layout: post
title: Azure API Management with Terraform
subtitle: Deployment Option &#35;5
tags: [Azure, API Management, Terraform]
---

*Terraform is a popular tool for managing infrastructure resources. I counted about 120 supported providers. Azure is one of them. In this episode we will provision Azure API Management with Terraform.*

After [downloading and installing Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html), we will create a folder with a configuration file telling that we use Azure as our provider, and telling it what we want to deploy. We do this either in [HashiCorp Configuration Language (HCL)](https://github.com/hashicorp/hcl) which ends with `.tf`, or as Json. We will use the HCL language as it's easier to read, and because we get more documentation and examples we might use. Take a look at this terraform-file for creating a resource group and deploying API Management.

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

We notice that the SKU we deploy is one unit of Developer, not Consumption. The latest version of Terraform doesn't support this yet, and probably many other configurations either. In this case, we could create a pull request and add Consumption in this section in the [Terraform project](https://github.com/terraform-providers/terraform-provider-azurerm/blob/d1ddff03ce3371ee3beeca5c548cf409437841a4/vendor/github.com/Azure/azure-sdk-for-go/services/apimanagement/mgmt/2018-01-01/apimanagement/models.go#L480-L489).

```go
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

![terraform plan](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-terraform-0.png)

We see lots of `+` prior to configurations which means Terraform will add these features, not change. Terraform is great when we would like to know what will change before we will change anything.

Finally, we need to apply the plan with `terraform apply` to make any changes in Azure.

![terraform apply](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-terraform-1.png)

We have now deployed a new instance of API Management to our Azure subscription.

![new instance of API Management](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-terraform-2.png)

There is one more important information we need to know about, the Terraform state file. When Terraform created our resource group and deployed an APIM instance, it also wrote data into a state file which we can see with `terraform show`.

![terraform show](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-terraform-3.png)

Terraform must store state about your managed infrastructure and configuration. This state is used by Terraform to map real world resources to your configuration, keep track of metadata, and to improve performance for large infrastructures. The state file is used for performance improvements, dependency management and syncing between teams.

## Conclusion
One big advantage of Terraform is better performance because it can store the current state of your resources. In a team of many developers that maintains a large infrastructure and where all work within the same terraform project and the same state-file(s), Terraform doesn’t need to request the values from the provider- it already has all data it needs. Another great thing with Terraform is simple declarative language where we describe what we want instead of imperatively coding how we deploy. The one drawback I can see in relation to Azure API Management is missing features like the Consumption plan.

Whatever tool we use to manage cloud, the tool will always be a bit behind of what's possible in the cloud. In case of Terraform, we can "just" create a pull request and add missing features.
