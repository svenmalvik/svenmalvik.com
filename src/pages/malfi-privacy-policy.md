---
title: "Malfi Privacy Policy"
layout: "page.njk"
permalink: "/malfi-privacy-policy.html"
eleventyExcludeFromCollections: true
---

## Malfi Privacy Policy

**Last Updated: January 1, 2026**

### Introduction

This Privacy Policy explains how Malfi handles your information. We are committed to protecting your privacy and being transparent about our data practices.

**Key Point:** Malfi is designed with privacy first. Your financial data is stored locally on your device with encryption. If you enable iCloud sync, your data is stored in your private iCloud account—we do not operate servers and have no access to your data.

### Information We Collect

#### Information You Provide

- **Portfolio Data:** Stocks, cryptocurrencies, and bank account balances you enter
- **Mortgage Information:** Loan amounts, interest rates, and terms you input
- **Currency Preferences:** Your preferred currencies for display

#### Information We Do NOT Collect

- We do not collect your name, email, or personal identifiers
- We do not have access to your actual bank accounts or brokerage accounts
- We do not collect your location data
- We do not track you across other apps or websites

### How Your Data Is Stored

#### Local Storage

All your financial data is stored locally on your device:

- **Encryption:** Your data is encrypted using SQLCipher (AES-256 encryption)
- **Secure Key Storage:** Encryption keys are stored in the iOS Keychain
- **Your Control:** Deleting the App removes all your data from the device

#### iCloud Sync

Malfi uses Apple's CloudKit to sync your financial data across your devices. When iCloud is enabled:

- **What we sync:** Your accounts, mortgages, stock holdings, and cryptocurrency holdings are synced to your private iCloud account.
- **Where it's stored:** Your data is stored in Apple's iCloud infrastructure, protected by your Apple ID. We do not operate our own servers and have no access to your synced data.
- **Sharing:** If you choose to share your portfolio with a partner, they receive read-only access through iCloud's secure sharing feature. You can revoke access at any time.
- **Your control:** You can disable iCloud sync in your device's Settings → [Your Name] → iCloud → Malfi. Disabling sync keeps your data local to each device.
- **Local encryption:** Before syncing, your data is stored locally in an encrypted database. The encryption key never leaves your device and is not synced to iCloud.

For more information about how Apple protects your iCloud data, see [Apple's iCloud security overview](https://support.apple.com/en-us/102651).

#### We Cannot Access Your Data

Because your financial information is stored only on your device (and optionally in your private iCloud account) with encryption keys we don't possess, we have no ability to view, access, or recover your data.

### Third-Party Services

The App connects to third-party services to retrieve market data:

**Coinbase**
- Purpose: Cryptocurrency prices and fiat exchange rates
- Data sent: Asset symbols (e.g., "BTC", "ETH") and currency codes (e.g., "NOK", "EUR", "USD")

**Stooq**
- Purpose: Stock quotes
- Data sent: Ticker symbols (e.g., "AAPL.US", "TSLA.US")

**Important:** These services receive only the symbols/tickers needed to fetch prices. Your portfolio quantities, account balances, and personal financial details are never transmitted.

#### Third-Party Privacy Policies

We encourage you to review the privacy policies of these services:
- Coinbase: https://www.coinbase.com/legal/privacy
- Stooq: https://stooq.com/

### Data Retention

- **Local Data:** Remains on your device until you delete the App or clear App data
- **Cached Market Data:** Automatically expires (crypto: 5 minutes, stocks: 15 minutes, exchange rates: 1 hour)
- **No Server Retention:** We do not store your data on any servers

### Your Rights and Choices

You have full control over your data:

- **Access:** View all your data directly in the App
- **Deletion:** Delete any or all data within the App, or uninstall to remove everything
- **Opt-Out:** Disable analytics in device settings

#### For European Users (GDPR)

If you are in the European Economic Area, you have additional rights including data portability and the right to lodge a complaint with a supervisory authority.

#### For California Users (CCPA)

We do not sell your personal information. California residents may request information about our data practices.

### Data Security

We implement strong security measures:

- **Encryption at Rest:** All local data encrypted with AES-256 via SQLCipher
- **Secure Key Management:** iOS Keychain protects encryption keys
- **Memory Protection:** Sensitive data cleared from memory after use
- **No Server Transmission:** Your financial data is never sent to our servers
- **HTTPS:** All API communications use encrypted connections

### Children's Privacy

Malfi is not intended for children under 13 years of age. We do not knowingly collect information from children. If you believe a child has provided us with information, please contact us.

### International Users

The App may connect to servers located in various countries to retrieve market data. By using the App, you consent to the transfer of query data (asset symbols only) to these servers.

### Changes to This Policy

We may update this Privacy Policy periodically. We will notify you of significant changes by updating the "Last Updated" date above.

Continued use of the App after changes constitutes acceptance of the updated policy.

### App Store Privacy Details

As required by Apple, here is a summary of our data practices:

**Data Not Collected:**
- Contact Info, Health & Fitness, Financial Info, Location, Contacts, User Content, Browsing History, Search History, Identifiers, Purchases, Sensitive Info

**Data Not Linked to You:**
- None

### Contact Us

If you have questions about this Privacy Policy or our data practices, contact us at:

**Email:** sven@malvik.de
