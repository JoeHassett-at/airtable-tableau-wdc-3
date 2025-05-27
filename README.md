# Airtable to Tableau Web Data Connector (WDC 3.0)

This repository contains a working example of a **Tableau Web Data Connector (WDC) 3.0** that allows you to pull data from an **Airtable** table into **Tableau** using the Tableau Connector SDK.

It is intended as a **starting point** and should be **modified to match your specific Airtable schema and use case**.

---

## 🚀 Features

- Connects to Airtable using the Airtable REST API
- Supports pagination for large datasets
- Structured to comply with Tableau WDC 3.0 (TACO format)
- Simple Fetcher pattern using the Tableau SDK

---

## ⚙️ Setup Instructions

1. **Clone the repo**

    ```bash
    git clone git@github.com:JoeHassett-at/airtable-tableau-wdc-3.git
    cd airtable-tableau-wdc-3
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Build the connector**

    ```bash
    taco build
    ```

4. **Package the connector**

    ```bash
    taco pack
    ```

    This creates the `.taco` file used by Tableau Desktop or Server.

---

## 🧪 Testing Locally in Tableau

To test in **Tableau Desktop**, add the .taco file to your Connectors folders for "My Tableau Repository". Launch it with the following flag to bypass signature verification:

```bash
/Applications/Tableau\ Desktop\ 2024.2.app/Contents/MacOS/Tableau --DDisableVerifyConnectorPluginSignature=true
```

Then open Tableau and load your connector through the **Connect > To a Server > Web Data Connector** flow.
