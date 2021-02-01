---
layout: post
title: Using Azure API Management APIs with Docker 
subtitle: How to move APIs closer to the services with a self-hosted gateway
tags: [Azure, Azure API Management]
categories: [Azure API Management]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/azure-apim-gw-diagram.png
image: https://cdn.svenmalvik.com/images/azure-apim-gw-diagram.png
---

*We use Azure API Management in some cases for calling external services from Azure Kubernetes Service (AKS). Azure API Management acts in this case as a link between an internal service running on AKS and an external service running at a third-party. The third-party knows who we are, and has whitelisted our outgoing IP address which is the egress IP from Azure API Management. The problem is when redeploying Azure API Management. As we emphasize immutable infrastructure, this may happen at some point. Redeploying Azure API Management results then in a different IP address that the third-party has to whitelist again. This may take time and effort. Fortunately, Azure API Management has the concept of self-hosted gateways. This post will show how to use a self-hosted gateway with Docker.*

## Self-hosted API Gateway without Round-Trip
The diagram below shows that instead of making the round-trip from a service running outside of Azure to Azure API Management and then to a backend service, we can go the direct route with a self-hosted API gateway.

![Azure API Management Gateway diagram](https://cdn.svenmalvik.com/images/azure-apim-gw-diagram.png)*Azure API Management Gateway diagram*

{% include articleAd.html %}

## Deploying a self-hosted API gateway in Docker

I added two APIs to an Azure API Management instance that are public available without a subscription-key. Both APIs are hosted in the US. The Azure API Management instance is deployed in West Europe (Amsterdam).

![Adding APIs to Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-gw-adding-apis.png)*Adding APIs to Azure API Management*

We can simply test the endpoint in any browser. I send a request from my local machine in Norway to an Azure API Management instance that is running in West Europe (Amsterdam) which then forwards the request to a service in the US. This is a long journey with an unnecessary stop in the Netherlands. Let's see how we can communicate directly with a self-hosted gateway.

![Round-Trip of a request](https://cdn.svenmalvik.com/images/azure-apim-worldmap2.png)*Round-Trip of a request*

The service in the US has whitelisted all IPs. It's a public available service. In case it would only have whitelisted our IP address of this Azure API Management instance, we were in no trouble either. Would we then redeploy, and get a new instance, we would also get a new IP address that the service in the US would need to whitelist again.

![Testing an API against Azure API Management](https://cdn.svenmalvik.com/images/azure-apim-gw-test-api.png)*Testing an API against Azure API Management*

Here's how we create a self-hosted gateway in the Azure Portal. We add only the APIs that we want to move outside Azure API Management.

![Creating an API Gateway](https://cdn.svenmalvik.com/images/azure-apim-gw-creating-gateway.png)*Creating an API Gateway*

What we get is a Docker image and a file with some key-value pairs that we can download.

![API Gateway configuration](https://cdn.svenmalvik.com/images/azure-apim-gw-gateway-download-env.png)*API Gateway configuration*

We put the downloaded file at a location from where we will run Docker.

![Running the API Gateway in Docker](https://cdn.svenmalvik.com/images/azure-apim-gw-gateway-docker.png)*Running the API Gateway in Docker*

The container started successfully on port 80.

![The API Gateway is running on port 80](https://cdn.svenmalvik.com/images/azure-apim-gw-gateway-docker-ps.png)*The API Gateway is running on port 80*

We can finally test the same API from localhost. The IP address that the service in the US would need to whitelist is the one from my local machine. That means that I can redeploy my Azure API Management instance as often as I want without notifying third-parties about a change in IP address.

![Testing an API against the local API Gateway](https://cdn.svenmalvik.com/images/azure-apim-gw-test-gateway.png)*Testing an API against the local API Gateway*

## Changing an API in the Portal

{% include articleAd.html %}

The self-hosted gateway needs still to talk to Azure API Management to send metrics. Also, when we make a change in the API, we don't need to create a new Docker image. All changes are communicated to the self-hosted gateway directly and take Immediately effect.

## Summary

A self-hosted gateway puts APIs closer to the services calling these APIs. It also makes working in an environment that emphasizes immutable Infrastructure, because we don't depend on the egress IP address of Azure API Management. On the flip-side, using a self-hosted gateway will increase the complexity of a system.

## Resource

- [Microsoft: Self-hosted gateway overview](https://docs.microsoft.com/en-us/azure/api-management/self-hosted-gateway-overview)
