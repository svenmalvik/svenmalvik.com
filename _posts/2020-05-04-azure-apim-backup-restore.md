---
layout: post
title: How To Backup and Restore Azure API Management
subtitle: Canary deployment in a multi-cluster environment
tags: [Azure, Azure API Management, Canary Deployment]
comment: false
---

We [deploy two instances of Azure API Management](azure-apim-deploy-with-powershell) (`apim-src-srv` and `apim-dest-srv`) to the same resource group `apim-rg`.

```powershell
# Resource group for all resources
New-AzResourceGroup -Name "apim-rg" -Location "West Europe"

# Source Azure API Management
New-AzApiManagement -ResourceGroupName "apim-rg" -Name "apim-src-srv" -Location "West Europe" -Organization "svenmalvik.com" -AdminEmail "sven@malvik.de"

# Target Azure API Management
New-AzApiManagement -ResourceGroupName "apim-rg" -Name "apim-dest-srv" -Location "West Europe" -Organization "svenmalvik.com" -AdminEmail "sven@malvik.de"
```

**We add stuff to source apim**

```powershell
# Create storage account for backups
$storageAccount = New-AzStorageAccount -ResourceGroupName "apim-rg" -Name "apim-sa" -SkuName Standard_LRS -Location "West Europe"

# Create container for backups
New-AzStorageContainer -Name "apim-backups" -Context $storageAccount.Context -Permission blob
```

```powershell
# Backup
Backup-AzApiManagement -ResourceGroupName "apim-rg" -Name "apim-src-srv" -StorageContext $storageAccount.Context -TargetContainerName "apim-backups" -TargetBlobName "apim-backup-1"
```

```powershell
# Restore
Restore-AzApiManagement -ResourceGroupName "apim-rg" -Name "apim-dest-srv" -StorageContext $storageAccount.Context -SourceContainerName "apim-backups" -SourceBlobName "apim-backup-1"
```

## Restoring to different cluster NamedValues, Application Insights

## Repository
