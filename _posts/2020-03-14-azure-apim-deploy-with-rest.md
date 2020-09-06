---
layout: post
title: Azure API Management with REST
subtitle: Deployment Option &#35;2
tags: [Azure, Azure API Management, REST]
comments: false
published: true
share-img: https://cdn.svenmalvik.com/images/zure-apim-gw-diagram.pn
image: https://cdn.svenmalvik.com/images/azure-apim-logo.jpg
featured-image: https://cdn.svenmalvik.com/images/azure-apim-logo.jpg
---

*Today, we will provision Azure API Management by using Postman as an API client, sending plain web requests to Azure. We already provisioned an APIM instance in the last post from within the Azure Portal. This is the fastest way of getting an instance up and running to try out APIM. But if you want to put an instance into production, we should be able to automate this process. Provisioning with REST can be one step in that direction.*

## Create a Service Principal with the Azure CLI
Whenever we send a request to Azure, we need to set an Authorization token in the header. We get this token by creating a Service Principal.

Let's first login. We use the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest) for that.

The Json response gives us two information that we need. Id which is our subscriptionId and the tenantId.

The Json response gives us two information that we need. Id which is our subscriptionId and the tenantId.

![az login](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-rest-0.png)*az login*

Then, we create the service principal and give it a name.

![Create service principal](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-rest-1.png)*Create service principal*

We got now also the password of the service principal that we'll need for retrieving the access token.

## 2 Different Ways of Retrieving an Access Token
We will need Postman, so great if you can [download and install Postman](https://www.getpostman.com/) first. Otherwise, cURL works just fine of course. It's just less work because I will share a pre-made collection of requests with you.

When you have installed Postman, you can simply [load a collection of requests into Postman](https://app.getpostman.com/run-collection/41b9fa3b957c297f283d#?env%5BAzure%20REST%5D=W3siZW5hYmxlZCI6dHJ1ZSwia2V5IjoidGVuYW50SWQiLCJ2YWx1ZSI6IiIsInR5cGUiOiJ0ZXh0In0seyJlbmFibGVkIjp0cnVlLCJrZXkiOiJjbGllbnRJZCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6ImNsaWVudFNlY3JldCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifSx7ImVuYWJsZWQiOnRydWUsImtleSI6InJlc291cmNlIiwidmFsdWUiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tLyIsInR5cGUiOiJ0ZXh0In0seyJlbmFibGVkIjp0cnVlLCJrZXkiOiJzdWJzY3JpcHRpb25JZCIsInZhbHVlIjoiIiwidHlwZSI6InRleHQifV0=). You should now see this in Postman.

![Postman Collection](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-rest-2.png)*Postman Collection*

Click on the Settings icon of the "Azure REST"-collection in the top-right corner for setting the parameters like `TenantId`, `ClientId` (AppId), `ClientSecret` (Password) and `SubscriptionId`.

![Postman Environment Variables](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-rest-3.png)*Postman Environment Variables*

We can now send the first request for retrieving an access token.

![Azure Access Token in Postman](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-rest-4.png)*Azure Access Token in Postman*

There we are. Actually, there is a **simpler way of retrieving an access token** through the Azure CLI directly. This works fine in case you just want to try out some API endpoints.

![az account get-access-token](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-rest-5.png)*az account get-access-token*

It's now time to create an instance of API Management.

## Create an instance of API Management with Postman

Create a new request inside the Azure REST collection in Postman by copying the [example request from the API Management documentation](https://docs.microsoft.com/en-us/rest/api/apimanagement/2019-01-01/apimanagementservice/createorupdate#apimanagementcreateservice). Create a PUT request with the following url. Remember to replace the values.

`https://management.azure.com/subscriptions/YOUR_SUBSCRIPTIONID/resourceGroups/YOUR_RESOURCEGROUP/providers/Microsoft.ApiManagement/service/YOUR_APIM_INSTANCE_NAME?api-version=2019-01-01`

Then, add an Authorization header with the following bearer token `Bearer {{bearerToken}}`

The bearer token gets picked up by Postman when we retrieve the access token. Take a look at the "Test" pane of this request. You could also paste in the access token directly of course.

Last, put this json payload inside the body:

```json
{
  "properties": {
    "publisherEmail": "YOUR_EMAIL",
    "publisherName": "YOUR_NAME"
  },
  "sku": {
    "name": "Consumption",
    "capacity": 0
  },
  "location": "West Europe",
  "tags": {
    "Owner": "YOUR_NAME"
  }
}
```

Let's now send the request.

![Postman send request](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-rest-6.png)*Postman send request*

That was a success and we can see the result in the portal.

![Created Azure API Management instance from Postman](https://cdn.svenmalvik.com/images/azure-apim-deploy-with-rest-7.png)*Created Azure API Management instance from Postman*

## Conclusion
Provisioning an instance of API Management with REST is a pretty straightforward process. The only complicated task was to create a service principal (spn). This spn is not configured yet, and we should do this, but it's content for another post.