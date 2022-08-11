#!/bin/bash
clear
npm run build-app
node --max_old_space_size=10000 dist/index.js
