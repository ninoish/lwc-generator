# lwc-generator
LWC Generator is a tool to generate Lightning Web Component (LWC) template for Salesforce Lightning Platform.
Configure your lwc component settings with inputs and clicks, then press "Download" button to get lwc out of the box component files.

# [Important!] NOW AVAILABLE with VSCode
LWC Generator project has been moved to [__LWC Builder__](https://github.com/developerforce/lwc-builder) project. It enables you to configure new LWC on VSCode in the same way as LWC Generator. Download the [VSIX file](https://github.com/developerforce/lwc-builder/tree/main/generated-assets) and install it in your VSCode via Command Palette `Extension: Install VSIX ...` . 
This repo is no longer maintained. Please use LWC Builder.

## What can LWC Generator do?
- Basic LWC Settings
- Targets
- FormFactor (Mobile / Desktop)
- Files templates (js, js-meta.xml, html, css, svg, jest test) of your choice
- Target Properties
- Target sObjects for RecordPage
- Preview Contents
- Download LWC as zip

![Entire app](resources/screenshot.png)

## How to start?

Start simple by running `yarn watch` (or `npm run watch`, if you set up the project with `npm`). This will start the project with a local development server.

The source files are located in the [`src`](./src) folder. All web components are within the [`src/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components.

This tool is built with [LWC](https://lwc.dev).
Find more information about the framework on its [GitHub](https://github.com/muenzpraeger/create-lwc-app).

# Contributing
Anyone is welcome to contribute.

# Disclaimer
This tool is intended for experienced developers with LWC dev.
It doesn't ensure code integrity. Please confirm the code before you deploy.

# License
The code is available under the [MIT license](https://github.com/ninoish/lwc-generator/blob/main/LICENSE).
