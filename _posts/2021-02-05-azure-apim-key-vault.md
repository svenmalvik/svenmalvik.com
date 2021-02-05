---
layout: post
title: How to Reference Key Vault Secrets in Azure API Management
tags: [Azure, Azure API Management]
categories: [Azure API Management]
comments: true
published: true
date: 2021-02-05 18:00:00
share-img: https://cdn.svenmalvik.com/images/azure-apim-kv-secrets.jpg
image: https://cdn.svenmalvik.com/images/azure-apim-kv-secrets.jpg
---

*In an enterprise, an Azure API Management instance is often shared by many teams and many developers. The developers may all have access to all secrets stored in named values for using in policies for JWT token validation or because for sending passwords in authentication headers. It's therefore best practice to store secrets in Azure Key Vault and not in named values. Azure API Management can then use its Managed Service Identity to access the secrets from this Azure Key Vault by referencing secrets. This post will show how to set a secret as the value in a response header.*

{% include articleAd.html %}

## Enable Managed Identity in APIM

In Azure, an AD identity can be assigned to a managed resource such as a Azure Function, App Service and also an instance of Azure API Management. A Resource with an identity has the capabilities to work with other resources that leverage Azure AD for authentication. We can easily enable a managed system identity (MSI) in APIM.

![Enable managed system identity in Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-kv-secrets-6.jpg)*Enable managed system identity in Azure API Management*

{% include articleAd.html %}

## Key Vault

To demonstrate how to access a secret from APIM, let's first create a secret `mysecret` with a value `secretaccesscode`.

![Create secret in Azure Key Vault](https://cdn.svenmalvik.com/images/azure-apim-kv-secrets-1.jpg)*Create secret in Azure Key Vault*

Just to show you the value of the secret, here it's visible.

![Show secret value in Azure Key Vault](https://cdn.svenmalvik.com/images/azure-apim-kv-secrets-2.jpg)*Show secret value in Azure Key Vault*

We need now to tell our Key Vault that our apim instance has permission to `Get` `mysecret`. We do this by adding a new access policy as shown below.

![Add access policy in Azure Key Vault](https://cdn.svenmalvik.com/images/azure-apim-kv-secrets-3.jpg)*Add access policy in Azure Key Vault*

{% include articleAd.html %}

Set the secret permission to `Get` and select the identity of your Azure API Management instance.

![Configure access policy in Azure Key Vault](https://cdn.svenmalvik.com/images/azure-apim-kv-secrets-4.jpg)*Configure access policy in Azure Key Vault*

Now we can see that we set up a new access policy. **Remember to save :)**.

![Save access policy in Azure Key Vault](https://cdn.svenmalvik.com/images/azure-apim-kv-secrets-5.jpg)*Save access policy in Azure Key Vault*

{% include articleAd.html %}

## Referencing a Key Vault Key in Azure API Management

Add a new named value in your APIM instance and select the type `Key Vault`. A new pane opens where you can select the key vault and secret you want to reference. In my case it's `mysecret`.

![Reference secret in apim named values](https://cdn.svenmalvik.com/images/azure-apim-kv-secrets-7.jpg)*Reference secret in apim named values*

If everything went well you will see a green Success icon.

![Referenced secret in apim named values](https://cdn.svenmalvik.com/images/azure-apim-kv-secrets-8.jpg)*Referenced secret in apim named values*

Let's now select a random API operation and open the policy so we can add a response header.

![Edit API policy](https://cdn.svenmalvik.com/images/azure-apim-kv-secrets-9.jpg)*Edit API policy*

I add a basic header with the named value that I called `secret-from-kv`.

![Add customer header with secret value to API policy](https://cdn.svenmalvik.com/images/azure-apim-kv-secrets-11.jpg)*Add customer header with secret value to API policy*

{% include articleAd.html %}

Finally, we test this endpoint and can see the value in the response.

![Retrieve customer header with secret value from API](https://cdn.svenmalvik.com/images/azure-apim-kv-secrets-10.jpg)*Retrieve customer header with secret value from API*

> Developers that have access to this instance may be able to debug a policy, hence retrieve the secret.

## Conclusion

Referencing secrets from Azure Key Vaults in Named Values was introduced December 2020. That means that we don't need to follow tutorials from many blog posts that were written before.

{% include articleAd.html %}

## Useful Links

[Use named values in Azure API Management policies - Key vault secrets](https://docs.microsoft.com/en-us/azure/api-management/api-management-howto-properties#key-vault-secrets?WT.mc_id=AZ-MVP-5004080)
