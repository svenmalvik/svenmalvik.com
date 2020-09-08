---
layout: post
title: Cookie Consent on my Azure Blog
subtitle: How I added cookie consent to my Jekyll site
tags: [Jekyll, Cookie Consent]
comments: true
published: true
share-img: https://cdn.svenmalvik.com/images/jekyl-logo.png
image: https://cdn.svenmalvik.com/images/jekyl-logo.png
featured-image: https://cdn.svenmalvik.com/images/jekyl-logo.png
---

*Today, I was asked how I added cookie consent to my Azure Blog. I need it to add a Facebook comment plugin, and Google Analytics. Instead of helping this one person, I thought I may help others as well with this short post.*

## Download the cookie consent code

Download this file [cookie-consent.html](https://raw.githubusercontent.com/jhvanderschee/jekyllcodex/gh-pages/_includes/cookie-consent.html) to the folder `_include`.

## Placing the code for cookie consent

Add the line of code at the end of your `<body>` section
```html
<body>
    ...
    {% include cookie-consent.html %}
</body>
```

## Fix the downloaded code

The code for the cookie-consent requires two files, `ga.js` and `chatbutton.js`. Otherwise the build will fail. What I did was removing the code section entirely from `cookie-consent.html`.

```html
    if(readCookie('cookie-notice-dismissed')=='true') {
        
    }
```

## Add privacy page

The cookie-consent has a button `More info` that points to a privacy page. I add an empty `/privacy.html`-file to the root folder, and then added content that I got from [PrivacyPolicyGenerator.com](https://www.privacypolicygenerator.info/). You might also want to add the privacy page to the menu which can be done in the `_config.yaml`-file.
