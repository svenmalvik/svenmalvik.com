---
layout: post
title: 8 Actions to Cut Infrastructure Costs in 2021
subtitle: Ideas to Deliver Cost Efficiencies for Future Growth
tags: [Azure, Costs]
categories: [Compliancy]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/reduce-it-costs.jpg
image: https://cdn.svenmalvik.com/images/reduce-it-costs.jpg
---
*8 Actions to Cut Infrastructure Costs in 2021 is the result of a research I did. I wanted to know more about the impact of the pandemic for IT organizations. What I found were discussions and ideas about the opportunities rather than the negative impacts. This post is a collection of actions and ideas that I have divided into 3 areas, reduce costs, optimize spending and increase value.*

## Reduce Costs

An obvious opportunity is to focus on reducing the costs and to look at the spending. To do so, we need to know what we have and find out why. Then we can start o do something and action.

### Take Inventory

{% include articleAd.html %}

I know from the past and my experience working in large organizations that it's not always obvious what tools and services are in place across all departments. Neither is it always clear to everyone why a tool or service was bought in the first place and if it still fulfills the same requirements and serves the purpose it was intended to. Having a list of it and its owners is a great start before asking questions about the "Why".

### Identify Tools

Knowing what tools and services you use in your organization is a first step in reducing costs. To give you an example when we once identified our tools and services within the CI/CD area. We saw that we used many different CI/CD tools across the entire organization, Azure DevOps, GitHub Actions, Jenkins and Atlassian Bamboo. Being aware of this will already give you some value because you'll be able to have conversations about the "Why". It might be obvious to those people working with the tools, but for the rest, the "Why" is probably unclear. Why is team A using Jenkins while team B uses Bamboo and team C uses Azure DevOps? What's the history behind and does it make sense to migrate to one common solution with the goal to reduce costs like maintaining i.e. Jenkins or paying Atlassian.

### Examine Coverage

The second step in taking inventory is to examine the tools and to check if there is some overlapping. In the previous example about CI/CD tools it's obvious that all 4 tools serve the same purpose. You need to examine how those features that aren't covered by other tools can be overcome in case you decide to go for only One of CI/CD tool. The same is true for other areas as well like Monitoring tooling. Do you use Splunk, Kibana and Azure Log Analytics? Why? What are the reasons for that?

### Check Contracts

{% include articleAd.html %}

It's not always the case that departments work tightly together and sign contracts in cooperation. Often they do this on their own and operate independently. The downside is that different departments may sign similar contracts and pay twice the amount of what they actual need to. Knowing what you have and then combining vendor contracts from different departments is another way of reducing costs.

In some cases you can consider to extend the length of a contract and reduce costs as well. In case of Microsoft Azure the developers themselves can take action and reserve instances of virtual machines for Azure Kubernetes Service (AKS) or reserve some capacity for Azure Cosmos DB for some time. This may save you up to 72% or more.

### Think Open Source

Open source technology also reduces costs, at least it will save you the initial costs that you have when signing licenses. There are other advantages as well as disadvantages depending on the project. Open source technology can be a good choice if you have the right people that know the technology well. Otherwise your savings can get very costly over time hiring consultants supporting you.

Compared to open source, there are also open standards that are, typically, specifications. They may be formal descriptions of software or interfaces sometimes also reference implementations. Open standards do not just deliver savings, but they may help to improve the quality and efficiency. Open standards tries to ensure value-driven services and to maximize the cost efficiency of a solution.

### Adopt Cloud Native

The cloud is not a mirror of your old datacenter. The cloud wants to support you. A lift and shift of your old VMs doesn't support you. The idea of the cloud is to manage infrastructure, and to take care of updates, security, and so much more. Adapting cloud native means to fully embrace the cloud and to give away some control so you have time to focus on your core business. Instead of running your services on a Kubernetes cluster that you maintain on your VMs, why not letting Azure take care of it by using Azure Kubernetes Service. That doesn't mean you don't have to do anything. Some cloud services will still need some attention of you. It always depends on the service and to what degree you want to give away control.

{% include articleAd.html %}

## Optimize Spending

Once you know your inventory, it can be a good idea to ry to get he most out of it by automating repetitive tasks and learning from the data you get.

### Automate

The research and advisory company Gartner says that 53% invest today in automation for cost optimization. The reason for that is simple. Automation means doing repeatable tasks once. Automation means improved security. It means you got code that others can review and improve. Automation is a catalyst that drives consistent quality and business agility to deliver faster value, improve efficiency and optimize costs.

### Embrace AIOps

AIOps means artificial intelligence for IT operations. AIOps enhances IT operations such as monitoring and automation with insight that you can use to scale and adapt your infrastructure and operations and to reduce costs. Read about [advancing Azure service quality with artificial intelligence: AIOps](https://azure.microsoft.com/en-us/blog/advancing-azure-service-quality-with-artificial-intelligence-aiops/?WT.mc_id=AZ-MVP-5004080).

## Increase Value

Working smarter by focusing on the core business is another aspect to examine.

### Consider Outsourcing

You should spend most of your time within your domain where you are the expert. Nobody else can do your work as good as you anyway. Outsourcing can make sense for work where you are not the expert and that doesn't define the purpose of your organization. It can also be a way to pay only for what you need in case you operate with a smaller budget.
Furthermore, outsourcing may be good for creating new business relationships that can lead to something great in the future.

### Align business goals and engineering work

Service Level Objectives (SLOs) provide a common language between business and engineers to set aligned goals. You can think of an SLO as an SLA without contractual consequences. It expresses the service level of infrastructure and operations you need to achieve for keeping our customers happy. SLOs allow you to measure customer satisfaction, which impacts your business. The question then is which metrics to use as service-level indicators (SLIs) track user experience. A good start is to create an overview of user journeys and order them by business impact. Use a small number of alerts grounded in customer pain—i.e., violation of SLOs. This lets you focus alerts on scenarios where you can confidently assert that customers are experiencing, or will soon experience, significant pain.

## Useful links

- [Advancing Azure service quality with artificial intelligence: AIOps](https://azure.microsoft.com/en-us/blog/advancing-azure-service-quality-with-artificial-intelligence-aiops/?WT.mc_id=AZ-MVP-5004080)
- [What are Azure Reservations?](https://docs.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations?WT.mc_id=AZ-MVP-5004080)