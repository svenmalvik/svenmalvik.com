---
layout: post
title:  Immutable Infrastructure with Azure API Management
subtitle: How To Backup and Restore
tags: [Azure, Azure API Management, Immutable Infrastructure]
comment: false
---

*As infrastructure gets more complex, more parts will eventually break. This is even more true as we make frequently changes. Sometimes we upgrade the infrastructure, and other times we just shuffle things around to fulfill new requirements. One question is how we can test these changes. The safest but probably most expensive choice is by provisioning an entirely new infrastructure. We won't make changes to the existing one, but instead apply changes to a new one and test before putting it into production. This post will show how we can provision Azure API Management and copy all data from a running instance over to another instance, and make sure that everything in regards to Azure API Management works as before.*

---

[![Backup and Restore in Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-backup-restore.jpg "Backup and Restore in Azure API Management")](https://www.youtube.com/watch?v=AtIuwD23Mhw)*Watch this post on YouTube: Backup and Restore in Azure API Management*

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
$storageAccount = New-AzStorageAccount -ResourceGroupName "apim-rg" -Name "apimsvenmalviksa" -SkuName Standard_LRS -Location "West Europe"

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

> **NOTE:** Be careful with hostnames in Named Values. In case you are preparing an entire new cluster, you might need to change them.

## Conclusion

Taking a backup and restore takes time. I have experienced everything between 30 minutes to 2 hours where the backup is much faster than the restore. When we take a backup, the instance of Azure API Management gets in a state where we can't apply changes. The same is true for restore. It means for us that we have to run backup and restore while nobody is working and deploy changes. It's fine in production because developers will only apply changes during daytime when they can get help from colleagues in case they deploy a bug. The test environment is different because developers deploy changes also at night to this environment. In case they deploy a bug, it won't hurt so much and the developer who introduced the bug normally doesn't need to hurry to fix it like in a production environment. Whenever we take a backup and restore it - during the day or at night, we communicate a freeze-time, so every developer knows that Azure API Management won't be available for some time. To be very honest, this is very painful to us, and it's the reason one must consider to treat Azure API Management as a shared resource that doesn't need to be re-created just because you decided to emphasize immutable infrastructure.
