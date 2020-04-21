---
layout: post
title:  Immutable Infrastructure with Azure API Management
subtitle: How To Backup and Restore
tags: [Azure, Azure API Management, Immutable Infrastructure]
comment: false
---

*As infrastructure gets more complex, more parts will eventually break. This is even more true as we make frequently changes. Sometimes we upgrade the infrastructure, and other times we just shuffle things around to fulfill new requirements. One question is how we can test these changes. The safest but probably most expensive choice is by provisioning an entirely new infrastructure. We won't make changes to an existing one, but instead applying changes to a new one and test it before putting this new infrastructure into production. This post will show how we can provision Azure API Management and copy all data from a running instance over to a the new instance, and make sure that everything in regards to Azure API Management works as before.*

---

## Create Source and Target Instances of Azure API Management

Before we start taking a backup, we will [deploy two instances of Azure API Management](azure-apim-deploy-with-powershell) (`apim-src` and `apim-dest`), one we will take the backup from, and one we will restore the backup to. We put both instances in the same resource group so we can easily delete everything later.

```powershell
# Create resource group for all resources
New-AzResourceGroup -Name "apim-rg" -Location "West Europe"

# Create source Azure API Management
New-AzApiManagement -ResourceGroupName "apim-rg" -Name "apim-src" -Location "West Europe" -Organization "svenmalvik.com" -AdminEmail "sven@malvik.de"

# Create target Azure API Management
New-AzApiManagement -ResourceGroupName "apim-rg" -Name "apim-dest" -Location "West Europe" -Organization "svenmalvik.com" -AdminEmail "sven@malvik.de"
```

## Storage for the Backup

When taking a backup from Azure API Management, we need to provide a storage container where the backup will be stored.

```powershell
# Create storage account for backups
$storageAccount = New-AzStorageAccount -ResourceGroupName "apim-rg" -Name "apim-sa" -SkuName Standard_LRS -Location "West Europe"

# Create container for backups
New-AzStorageContainer -Name "apim-backups" -Context $storageAccount.Context -Permission blob
```

## Backup and Restore with PowerShell

We can now run the backup command. We take two backups. One for the source instance of Azure API Management, and one for the target instance. The reason I'm doing this is because I tend to mix parameters easily. Instead of taking a backup from the source, I eventually take a backup from the target and restore it to the source. If this happens and I overwrote the source, I would still have the backup that I can restore if I have to.

```powershell
# Take backup from source
Backup-AzApiManagement -ResourceGroupName "apim-rg" -Name "apim-src" -StorageContext $storageAccount.Context -TargetContainerName "apim-backups" -TargetBlobName "apim-src-backup"

# Take backup from target
Backup-AzApiManagement -ResourceGroupName "apim-rg" -Name "apim-dest" -StorageContext $storageAccount.Context -TargetContainerName "apim-backups" -TargetBlobName "apim-dest-backup"
```

In the final step, we just restore the backup.
```powershell
# Restore backup
Restore-AzApiManagement -ResourceGroupName "apim-rg" -Name "apim-dest" -StorageContext $storageAccount.Context -SourceContainerName "apim-backups" -SourceBlobName "apim-src-backup"
```

Azure API Management is now restored in a different instance. Depending on your infrastructure, you might need to make some adjustments.

> **_NOTE:_**  *Be careful with hostnames in Named Values. In case you are preparing an entire new cluster, you might need to change them.*

- Don't hard-code in policies
- NamedValues
- Application Insights

## Logic Apps

## Conclusion
