---
layout: post
title: Cookie Consent on my Azure Blog
subtitle: How I added cookie consent to my Jekyll site
tags: [Jekyll, Cookie Consent]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/jekyll-logo.png
image: https://cdn.svenmalvik.com/images/jekyll-logo.png
featured-image: https://cdn.svenmalvik.com/images/jekyll-logo.png
---

*Today, I was asked how I integrated the cookie consent on my Azure Blog that is based on [Jekyll](https://jekyllrb.com/). Jekyll transforms plain text into a static websites or blogs. I needed to add cookie consent to my Azure Blog because I wanted to add a Facebook comment plugin together with Google Analytics. Instead of helping this one person, I thought I may help others as well with this short post.*

## Download the cookie consent code

Download the file [cookie-consent.html](https://raw.githubusercontent.com/jhvanderschee/jekyllcodex/gh-pages/_includes/cookie-consent.html) and move it into the `_include`-folder of your Jekyll project.

## Placing the code for cookie consent

Add the line of code at the end of your `<body>` section

![Include cookie-consent.html](https://cdn.svenmalvik.com/images/jekyll-cookie-consent-1.png)*Include cookie-consent.html*

## Fix the downloaded code

The code for the cookie-consent requires two files, `ga.js` and `chatbutton.js`. Otherwise the build will fail. What I did was removing the code section entirely from `cookie-consent.html`.

![Remove code for cookie found](https://cdn.svenmalvik.com/images/jekyll-cookie-consent-2.png)*Remove code for cookie found*

## Add privacy page

The cookie-consent has a button `More info` that points to a privacy page. I add an empty `/privacy.html`-file to the root folder, and then added content that I got from [PrivacyPolicyGenerator.com](https://www.privacypolicygenerator.info/). You might also want to add the privacy page to the menu which can be done in the `_config.yaml`-file.
