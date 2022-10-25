# KB Beneficiary Status Update

## Introduction

KB beneficiary status update's script is node script with typescript support, aim for update beneficairies status of **dreams/agyw** or **OVC intervantion** based on service provisons for a specificia period of time. Theses status including **active**, **in-active** and **missed services**.

## Pre-requiestes for the script

Below are pre-requiested for the script to be able to clone and run the script successfully. Typescript mostly for building source code into **_js bundled_** codes for running the script.

```
- GIT
- Node v12+
- npm v6+
- typescript v4+
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
        |--app-process.ts
        |- beneficiary-data.ts
        |--index.ts
    |-- configs
        |-- app-config.example.ts
        |-- index.ts
    |-- contants
        |-- beneficiary-status-constants.ts
        |-- index.ts
    |-- models
        |-- app-config-model.ts
        |-- beneficiary-status-config-model.ts
        |-- dhis2-tracked-entity-instance.ts
        |-- index.ts
    |-- utils
        |-- app-utils.ts
        |-- beneficiary-data-util.ts
        |-- dhis2-program-util.ts
        |-- dhis2-tracked-entity-instance.ts
        |-- excel-utils.ts
        |-- file-utils.ts
        |-- http-utils.ts
        |-- index.ts
        |-- logs-utils.ts
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

To set up access creadntial create the file **app-config.ts** on **_`src/configs`_** with below contents

```
import { AppConfigModel } from '../models';

export const appConfig: AppConfigModel = {
  username: 'dhis_username',
  password: 'dhis_password',
  baseUrl: 'dhis_base_url'
};

```

## Operation of script
