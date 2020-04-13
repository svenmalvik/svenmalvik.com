---
layout: post
title: How To Backup and Restore Azure API Management
subtitle: Canary deployment in a multi-cluster environment
tags: [Azure, Azure API Management, Canary Deployment]
comment: false
---
```powershell
# Create storage for backups


# ...
$storageKey = (Get-AzStorageAccountKey `
                -ResourceGroupName "apim--rg" `
                -StorageAccountName "apim-sa")[0].Value

# ...
$storageContext = New-AzStorageContext `
                    -StorageAccountName "apim-sa" `
                    -StorageAccountKey $storageKey
```

```powershell
# Subscription of the source apim service
Set-AzContext -SubscriptionId "<SOURCE_APIM_SUBSCRIPTION_ID>"

# Start backup
Backup-AzApiManagement  -ResourceGroupName "apim-rg" `
                        -Name "apim-srv" `
                        -StorageContext $storageContext `
                        -TargetContainerName "apim-backups" `
                        -TargetBlobName "apim-backup-1"
```
