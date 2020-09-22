---
layout: page
title: Understanding Professional Websites
subtitle: Workshop for Entrepreneurs
---

*A professional website for an entrepreneur can be expensive. At the same time a professional website can be cheap, even for free. Why is that so? Why don’t you necessarily need specialized knowledge in programming or design to create an awesome website for your company?*

**[Register now](https://forms.microsoft.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAQFTWSZUMElIVTdBN0NaWkdVUFBQM0MyVU5RVEFOSC4u)**

## Date and time
- Module 1: 05.11.2020, 9am - 12am CEST (Amsterdam/Berlin/Oslo)
- Module 2: 12.11.2020, 9am - 12am CEST (Amsterdam/Berlin/Oslo)
- Module 3: 19.11.2020, 9am - 12am CEST (Amsterdam/Berlin/Oslo)
- Module 4: 26.11.2020, 9am - 12am CEST (Amsterdam/Berlin/Oslo)
- Module 5: 03.12.2020, 9am - 12am CEST (Amsterdam/Berlin/Oslo)

**Price: 500€**

A professional website for an entrepreneur can be expensive. At the same time a professional website can be cheap, even for free. Why is that so? Why don’t you necessarily need specialized knowledge in programming or design to create an awesome website for your company?

This workshop is about how you can take 100% ownership of your professional website. Next time you talk to a web agency, you will tell them how they will build your website to a price that you know is fair and can agree on. Having this knowledge can save you many thousands of euros or dollars.

In this workshop you will learn why some web agencies offer very expensive professional websites while others are a lot cheaper, still costly, and what you can do to get the price down to a price that you know is fair. I will also show you how you can build your own professional website, for free. This might be important when you don’t have many customers yet and can’t do this investment.

We will talk about concepts, web agencies, and today’s technologies, how they work and what you can do to master them. This workshop is for entrepreneurs that don’t know much about websites yet but really want to master this topic.

I have split this workshop into 5 modules á 3 hours over a course of 10 weeks. 15 hours where we will learn everything that I think is important for an entrepreneur to start a professional website, and where you can ask any question.

## Module 1 (How web agencies operate): 
- Overview
- Understanding Content Management Systems like WordPress
- Elements of a modern website (comments, analytics, payments, …)
- Wordpress.com / Wordpress.org / Self-Hosting

## Module 2 (Understanding the basics of a professional website):
- Introduction to HTML, JavaScript, CSS
- Programming Concepts
- Performance and Security

## Module 3 (Understanding how developers build a professional website from scratch):
- Building a rich website with NodeJS in Microsoft Azure

## Module 4 (We build two simple but professional and powerful websites):
- Azure Static Website
- GitHub Pages

## Module 5 (What it takes to keep a website alive):
- Design
- Responsiveness 
- Content / Cookie Consent
- SEO
- Maintenance
- Wrap up

**[Register now](https://forms.microsoft.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAQFTWSZUMElIVTdBN0NaWkdVUFBQM0MyVU5RVEFOSC4u)**

## About the instructor
Sven Malvik is a Developer, Software Engineer, Software Architect, and Engineering Manager with 15 years of experience in building, maintaining and operating small, medium, and large websites and software systems.
He works currently as a Microsoft Azure Cloud Expert at Vipps, Norwegians number one payment service. Sven has talked at large conferences like Microsoft Build, JavaZone, NDC and many more. He has also hold many workshops for companies and at Meetups about various software technologies.

If you have questions regarding this workshop, or just want to connect, send a message to [Sven Malvik](https://www.linkedin.com/in/svenmalvik)

**[Register now](https://forms.microsoft.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAQFTWSZUMElIVTdBN0NaWkdVUFBQM0MyVU5RVEFOSC4u)**

<div class="btn-action">
    <div><a id="order1" class="link-action">Reserve Seat</a></div>
    <div id="error-message1"></div>
</div>

<script>
    var PUBLISHABLE_KEY = "pk_live_51GzhkJBdwAYDhgLkVSdDCucmD1dWeeQqQGElrYeLcPztDoj1JSNdGMbVcpzmiqnsDzEeyneqcMyfjJPNbQQCvMlx00veKZZaoh";
    var DOMAIN = window.location.origin;
    var PRICE_ID = "price_1GzolQBdwAYDhgLkcfn24Okr";
    var stripe = Stripe(PUBLISHABLE_KEY);

    for (i = 1; i <= 1; i++) {
        var handleResult = function(result) {
        if (result.error) {
            var displayError = document.getElementById("error-message" + i);
            displayError.textContent = result.error.message;
        }
        };
        var order = document.getElementById("order" + i);
        order.addEventListener("click", function() {
        stripe
            .redirectToCheckout({
            mode: 'payment',
            lineItems: [{ price: PRICE_ID, quantity: 1 }],
            successUrl:
                DOMAIN + "/success.html?session_id={CHECKOUT_SESSION_ID}",
            cancelUrl: DOMAIN + "/canceled.html"
            })
            .then(handleResult);
        });
    }
    </script>