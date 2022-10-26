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
|   |-- app
|   |   |--app-process.ts
|   |   |- beneficiary-data.ts
|   |   |--index.ts
|   |-- configs
|   |   |-- app-config.example.ts
|   |   |-- index.ts
|   |-- constants
|   |   |-- beneficiary-status-constants.ts
|   |   |-- index.ts
|   |-- models
|   |   |-- app-config-model.ts
|   |   |-- beneficiary-status-config-model.ts
|   |   |-- dhis2-tracked-entity-instance.ts
|   |   |-- index.ts
|   |-- utils
|   |   |-- app-utils.ts
|   |   |-- beneficiary-data-util.ts
|   |   |-- dhis2-program-util.ts
|   |   |-- dhis2-tracked-entity-instance.ts
|   |   |-- excel-utils.ts
|   |   |-- file-utils.ts
|   |   |-- http-utils.ts
|   |   |-- index.ts
|   |   |-- logs-utils.ts
|   |--index.ts
|-- .gitigonre
|-- .prittierrc
|-- LICENSE
|-- package-lock.json
|-- package.json
|-- README.md
|-- run-script.sh
|-- tsconfig.json
```

Based on above source code structure, folder or sub folder below is descriptions and contents under each

- **dist**: This is auto-generate folder contained compiled js bundled file from all ts files in `src` directory
- **node_modules**: This is autogenrate folder for all installed packages for supporting script to run. It generated on installation of all dependences of the scripts
- **resources**: This is autogenrate by the script, it contains generated logs files for the scripts as it run though put the process of updating beneficiary's status.
- **src**: This main srouce code directory, and the `index.ts` is the main entry file for the script. It contains below sub directories below:-
  - **app**: Contains all main process of the app including app process as well as manipulation process for beneficiary data.
  - **configs**: This is for configurations of the script including access to dhis2 instance where script will be using for updating beneficiary status.
  - **constants**: Contains all constants/references for beneficiary status updates including program metadata references used, status and duration limit for changes of beneficiary status.
  - **models**: Contains models/interfaces of script metadata including _app configs_, _dhis2 tracked entity instance_ and _beneficiary status configuration_.
  - **utils**: Contains utils functions or classes necessary for running the all process during deduction and updation for beneficairy status. It includes _app utils_, _beneficiary data utils_, _dhis2 program and tracked entity instance utils_, _excel utils_, _file utils_, _http utils_ as well as _logs utils_

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

After installation run below command to install neccessary packages for the script

```
npm install
```

## Operation of script
