---
layout: post
title: Azure Naming Convention Best Practices
subtitle: 
tags: [Azure, Tagging]
categories: [Azure]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/azure-naming-conventions.jpg
image: https://cdn.svenmalvik.com/images/azure-naming-conventions.jpg
---

*Structure helps us to be in control. That is very true also in Azure. Especially in larger organizations where many cloud engineers create, remove, update and delete (CRUD) resources all the time. One tool that supports us to keep control is Naming Standards from the time we create a resource because Azure prevents us from changing resource names. It's these three elements I want to discuss further, `Keep it Simple, Stupid - KISS`, `Prefix and Postfix` and `Azure Policies`.*

{% include articleAd.html %}

## Keep it Simple, Stupid - KISS

Simplicity helps us to structure knowledge, ideas and thoughts better. When it comes to naming, I think short names supports this idea. Instead of having descriptive and somehow long names, I suggest short resource names. There might also be technical justifications. A Windows VM name has a maximum character limit of 15. Keeping it short and simple allows us to re-use the same logic regardless of resource type, location or service.

## Use Prefix and Postfix

Use prefix or suffix to add clarity to resource names. I'm a fan of having at least the following elements as part of a resource name: `environment`, `resource type` and `workload`. As infrastructure as code is nowadays a common approach to manage resources, naming conventions are easy to implement. [Get more details about how naming conventions can look like](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming?WT.mc_id=AZ-MVP-5004080).

## Policy

Azure Policies can help to ensure new Azure resources follow your naming conventions. Create policies that are scoped to resource types that will deny a deployment of a resource if a naming convention isn't compliant to your policies. Here's an example of a policy for VMs:

```json
{
     "properties": {
         "displayName": "VM naming convention",
         "description": "Naming convention for VMs.",
         "mode": "All",
         "policyRule": {
             "if": {
                 "allOf": [
                     {
                         "field": "type",
                         "match": "Microsoft.Compute/virtualMachines"
                     },
                     {
                         "not": {
                             "field": "name",
                             "match": "az-???-##-vm" // ? for letters and # for numbers.
                         }
                     }
                 ]
             },
             "then": {
                 "effect": "deny"
             }
         }
     }
 }
```

More about [Azure Policy](https://docs.microsoft.com/en-us/azure/governance/policy/samples/allow-multiple-name-patterns?WT.mc_id=AZ-MVP-5004080)

{% include articleAd.html %}

The above policy checks the `Name` if it matches the format `az-???-##-vm`, otherwise it will deny. The match pattern is defined using [standard Azure Policy conditions](https://docs.microsoft.com/en-us/azure/governance/policy/concepts/definition-structure#conditions?WT.mc_id=AZ-MVP-5004080).

## Next steps

We use naming conventions to make life easier for us. The thing is that we can't put all important information into a name. That's where tagging can help. Adding metadata to resources will reduce the complexity of names and can be viewed complimentary to a naming convention. Tagging conventions can also be set as Azure Policy.
