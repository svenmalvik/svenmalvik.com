---
layout: post
title: Logging from Azure API Management
subtitle: Sending logs to Azure Event Hub
tags: [Azure, Azure API Management, Azure Event Hub, Azure Application Insights, PowerShell]
---

## Agenda

- Connecting to Azure Cloud Shell
- Create Resource Group
- Create Azure API Management
- Add API
- Create EventHub namespace
- Create EventHub
- Add Azure API Management EventHub logger
- Add logging to a policy
- Install Azure Event Hub Plugin in VSCode

```powershell
# Create Resource Group
New-AzResourceGroup -Name "apim101-rg" -Location "West Europe"

# Create Azure API Management
New-AzApiManagement -ResourceGroupName "apim101-rg" -Name "svenmalvik-apim" -Sku "Developer" -Location "West Europe" -Organization "svenmalvik.com" -AdminEmail "sven@malvik.de"

# Create Azure API Management Context
$apimCtx = New-AzApiManagementContext -ResourceGroupName "apim101-rg" -ServiceName "svenmalvik-apim"

# Add API <Set subscription required to $false in the portal for simplicity>
Import-AzApiManagementApi -Context $apimCtx -SpecificationFormat "Swagger" -SpecificationUrl "https://conferenceapi.azurewebsites.net?format=json" -Path "conf" -ApiId "confapi"

# Create EventHub namespace
New-AzEventHubNamespace -ResourceGroupName "apim101-rg" -Name "svenmalvik-eh-ns" -Location "West Europe" -SkuName "Basic" -SkuCapacity 1

# Add Access to EventHub namespace
New-AzEventHubAuthorizationRule -ResourceGroupName "apim101-rg" -NamespaceName "svenmalvik-eh-ns" -AuthorizationRuleName "svenmalvik-eh-auth-rule" -Rights @("Listen", "Send")

$ehConnection = (Get-AzEventHubKey -ResourceGroupName "apim101-rg" -NamespaceName "svenmalvik-eh-ns" -AuthorizationRuleName "svenmalvik-eh-auth-rule").PrimaryConnectionString

# Create EventHub
New-AzEventHub -ResourceGroupName "apim101-rg" -NamespaceName "svenmalvik-eh-ns" -Name "svenmalvik-eh"

# Create Azure API Management EventHub logger
New-AzApiManagementLogger -Context $apimCtx -LoggerId "svenmalvik-logger" -Name "svenmalvik-logger" -ConnectionString "$ehConnection;EntityPath=svenmalvik-eh"
```

[Policy](https://docs.microsoft.com/en-us/azure/api-management/api-management-advanced-policies#log-to-eventhub)
```xml
<!-- Create API policy and add EventHub logger to API -->
<log-to-eventhub logger-id ='svenmalvik-logger'>
    @( string.Join(",", DateTime.UtcNow, context.Deployment.ServiceName, context.RequestId, context.Request.IpAddress, context.Operation.Name) )
</log-to-eventhub>
```
