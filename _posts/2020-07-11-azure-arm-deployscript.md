---
layout: post
title: Running Scripts from ARM Templates
subtitle: 
tags: [Azure, ARM]
comment: false
---

*Why would we want t execute code within an ARM template? Sometimes we need some value in an ARM template that we don't want to copy and paste around, like secrets. Evgeny Borzenin describes in one of his blog posts [how to create a password in ARM, and then create a database with this password](https://borzenin.com/use-scripts-in-arm-templates/). This post will show how we can use the deploymentScript in ARM in its purest form.*

Let's list key vaults in a subscription. The most simple way is using the Azure CLI with `az keyvault list`. I will show how to use the deploymentScript in ARM to achieve the same, but 100 times more complicated. This post shall just shows what's possible with this new feature. It's still in preview, so it might disappear later, or come in a different form.

## We set the scene

```bash
# Set the subscription you will perform on
az account set -s "YOUR_SUBSCRIPTION "

# Create identity to be able to execute code in deployment script
az identity create -g "sma-rg" -n "myUserAssignedIdentity"

# Read the principleId for the next step
principalId=$(az identity show -g sma-rg -n myUserAssignedIdentity --query principalId)

# Assign contributor role on the identity you just created
az role assignment create --assignee-object-id $principalId --role Contributor

# Read the id of your identity. Yu will set this in the ARM template
YOUR_IDENTITY=$(az identity show -g sma-rg -n myUserAssignedIdentity --query id)
```

## The ARM template

In this ARM template we do not provision anything. This ARM template shows the deploymentScripts in its pure form. We use Azure CLI to list all Azure Key Vaults in our subscription.

```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
    },
    "variables": {},
    "resources": [
        {
            "type": "Microsoft.Resources/deploymentScripts",
            "apiVersion": "2019-10-01-preview",
            "name": "myscript",
            "location": "[resourceGroup().location]",
            "kind": "AzureCLI",
            "identity": {
                "type": "UserAssigned",
                "userAssignedIdentities": {
                    "YOUR_IDENTITY": {
                    }
                }
            },
            "properties": {
                "azCliVersion": "2.0.80",
                "timeout": "PT30M",
                "cleanupPreference": "OnSuccess",
                "retentionInterval": "P1D",
                "scriptContent": "result=$(az keyvault list); echo $result | jq -c '{Result: map({id: .id})}' > $AZ_SCRIPTS_OUTPUT_PATH"
            }
        }
    ],
    "outputs": {
        "result": {
            "value": "[reference('myscript').outputs]",
            "type": "object"
        }
    }
}
```

## Execution

```bash
# We execute the ARM template and format the output as json
az deployment group create --name "deployscript-test" --resource-group "deployscript-test-rg" --template-file PATH_TO_ARM_FILE | jq .properties.outputs.result.value.Result
```

```json
[
  {
    "id": "/subscriptions/bfsjkdbfjkdsfbkjsdbkdsf/resourceGroups/some-rg/providers/Microsoft.KeyVault/vaults/some-kv",
    "resourceGroup": "some-rg"
  },
  {
    "id": "/subscriptions/bfsjkdbfjkdsfbkjsdbkdsf/resourceGroups/some-rg/providers/Microsoft.KeyVault/vaults/some-other-kv",
    "resourceGroup": "some-rg"
  }
]
```

## Conclusion

I executed inline code, but we can also execute a remote script. Instead of `scriptContent`, we would choose `primaryScriptURI`.
