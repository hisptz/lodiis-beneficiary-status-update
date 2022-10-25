# KB Beneficiary Status Update

## Introduction

KB beneficiary status update's script is node script with typescript support, aim for update beneficairies status of **dreams/agyw** or **OVC intervantion** based on service provisons for a specificia period of time. Theses status including **active**, **in-active** and **missed services**.

## Pre-requiestes for the script

Below are pre-requiested for the script to be able to clone and run the script successfully. Typescript mostly for building source code into **_js bundled_** codes for running the script.

```
- Node 12+
- npm 6+
- typescript 4+
- git
```

## Get started with script

To get start up we need to clone or [download](https://github.com/hisptz/kb-beneficiary-status-update/archive/refs/heads/develop.zip) the source codes and having better under stand of source codes for set up prior development or run the script.

To clone the app, make sure you have installed the **GIT** command line and tun below command on the terminal

`git clone https://github.com/hisptz/kb-beneficiary-status-update.git`

### Source code structure for script

Once codes strcture of downloaded or cloned script has below structure

```
kb-beneficiary-status-update
|-- dist
|-- node_modules
|-- resources
|-- src
    |-- app
    |-- configs
    |-- contants
    |-- models
    |-- utils
    |--index.ts
|-- .gitigonre
|-- .prittierrc
|-- LICENSE
|-- package-lock.json
|-- package.json
|-- README.md
|-- run-script.sh
|-- tsconfig.json
```

### Setup & Configurations

Prior run the script need configurations of the script by set up acess credential to DHIS2 instance where the script will proxy to update beneficiaries.

To set up access creadntial create the file **\_app-config.ts** on **_`src/configs`_** with below contents

```
import { AppConfigModel } from '../models';

export const appConfig: AppConfigModel = {
  username: 'dhis_username',
  password: 'dhis_password',
  baseUrl: 'dhis_base_url'
};

```

## Operation of script
