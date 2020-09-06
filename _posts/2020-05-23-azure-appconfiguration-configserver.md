---
layout: post
title: Azure App Configuration Introduction - Part3
subtitle: Replacing Spring Cloud Config Server
tags: [Azure, Spring, Azure App Configuration, Spring Cloud Config Server]
comments: false
published: true
share-img: https://cdn.svenmalvik.com/images/azure-app-configuration-icon.png
image: https://cdn.svenmalvik.com/images/azure-app-configuration-icon.png
featured-image: https://cdn.svenmalvik.com/images/azure-app-configuration-icon.png
---

*After playing around with Azure App Configuration Service and how to read a configuration entry with REST, and then using feature flags in a Spring Boot application, I got hooked I must admit. I wanted to know if it's possible to replace the Spring Cloud Config Server with Azure App Configuration without changing the client services. This post will explain every step I took to build a first version of an Azure Spring Boot Config Server.*

Starting point of this project was my previous post where I created a basic Spring Boot web application with feature flags. The `pom.xml` stayed pretty much the same. What's different is everything else. Here's an illustration about what I wanted to achieve. Instead of configuring a client service with `-Dspring.cloud.config.uri=<old_SPRING_CLOUD_CONFIG_SERVER>`, I wanted to replace just the address: `-Dspring.cloud.config.uri=<new_AZURE_CONFIG_SERVER>`.

## Motivation

The challenge with Spring Cloud Config Server is its dependency to a Git repository which tend to have either no SLA, or an SLA of three nines which would allow for 8h 45m 56s downtime in a year. We experienced lots of problems related to the Java Config Repo which prevented our Spring Cloud Config Server to start which further prevented our services to start. In case of an incident a pretty awful situation.

![Replacing Spring Cloud Config Server with Azure App Configuration](https://cdn.svenmalvik.com/images/azure-appconfiguration-configserver-0.png)*Replacing Spring Cloud Config Server with Azure App Configuration*

## Spring Cloud Config Server - Simplified

The interesting part is how Spring Cloud Config Server serves configurations, and what endpoints it has. To find out, I took a look at what requests the clients send to the config server: `http://<old_SPRING_CLOUD_CONFIG_SERVER>/<CONTEXT_PATH>/<APPLICATION>/<PROFILE>/<LABEL>/FILE`.

- `Application` represents the folder within the Java Configuration Repo.
- `Profile` is the the profile the service - Config Server or Client Service - was started with.
- `Label` is a Git-Hash, tag or branch.
- `File` is the filename with the extension that you'd like to retrieve.

All these information must somehow be captured in an Azure App Configuration instance, normally. In my case, the profile is the same as the label, so I ignored this information for now.

## Configuration

The new Azure Config Server can connect to one or many Azure App Configuration instances. Each team or application can have its own instance, cross service configurations could be in a dedicated Azure App Configuration instance. I will configure just one instance as I want to import all configurations of all of our Java Spring Services and all cross service configurations at once. his project is a proof of concept after all.

```properties
spring.cloud.azure.appconfiguration.stores[0].connection-string= ${APP_CONFIGURATION_CONNECTION_STRING}
spring.cloud.azure.appconfiguration.stores[0].label=test
spring.cloud.azure.appconfiguration.cache-expiration=1s
```

Configurations in Azure App Configuration can be labeled with i.e. the name of the environment `dev`, `test` or `production`, or anything else. The new Azure Config Server will first run in the `test` environment. I set `cache-expiration` to one second to see changes faster, default is 30 seconds. I really don't want to wait so long while testing and playing around.

## Model

The name of the one and only model is `ConfigApiProperties`. It has two members:

```java
// Configurations from Azure App Configuration
private Map<String, String> config;

// The filename that was requested
private String file;
```

I ignored `profile` and `label` for now as I would start a new instance of the new Azure Config Server for every environment anyway. This makes sense where you have dedicated clusters for each and every environment.

## Controller

The controller defines the endpoint(s) the Azure Config Server needs to listen to. As I said previously, this is a first version, a proof of concept if you will. It accepts all profiles at the moment. All configurations will be labeled with `test` but should ideally be set automatically from the bootstrap configuration `spring.cloud.azure.appconfiguration.stores[0].label`, something for later to implement - focusing on the core first.

```java
@GetMapping(value = { "/{application}/*/test/{file}" }, produces = MediaType.TEXT_PLAIN_VALUE)
public String getMessage(@PathVariable String application, @PathVariable String file) {
    // The core of the code you would put here will
    // convert the HashMap ConfigApiProperties.config
    // into one String with new lines so that the
    // returning String looks like a real properties file.
}
```

## Configuration Prefix in Azure App Configuration

Azure App Configuration let us define entries with different prefixes and labels. As I will import all configurations of all applications that have each many files defined. It probably is bad practice to even consider putting it all into one instance. I do it anyway. I will use the prefix to distinguish applications and files: `/application/config.<APPLICATION>.<FILE>.`. The default deliminator is a dot `.`.

- `/application/` is the prefix that `spring-cloud-azure-appconfiguration-config-web` will prefix by default. This can't be changed unless you patch the class.
- `config` is the member of the `ConfigApiProperties`-model.
- `<APPLICATION>` is the foldername of the requesting service within the Java Configuration Repo.
- `<FILE>` is the filename being requested.

## Next Steps

The complete code - that I can't share for now - has some flaws and performance issues if I can say that. I mean the Spring Cloud Config Server checks out an entire repository which can take minutes. The new Azure Config Service will read all configurations and filter then what's get returned to the requesting service. Also is profile information missing at the moment.
If you would like to get some more details about the code, please drop me a message.
