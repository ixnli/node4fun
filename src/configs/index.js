'use strict';
const nconf = require('nconf');
const path = require('path');
const fs = require('fs');

nconf.argv()
    .env()
    .defaults({
        'NODE_ENV': 'development'
    });

const NODE_ENV = nconf.get('NODE_ENV');

nconf.file(path.join(__dirname, `../appSettings.json`));

const environmentalSettingsPath = path.join(__dirname, `../appSettings.${NODE_ENV}.json`);

if (fs.existsSync(environmentalSettingsPath))
    nconf.file(environmentalSettingsPath);

module.exports = nconf;