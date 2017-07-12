#!/usr/bin/env node
/**
*  @license
*  Copyright 2017 Brigham Young University
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*  http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.
**/
'use strict'

const version = require('./package.json').version

console.log('Swagger Patcher version ' + version)

const args = process.argv.slice(2)

if (args.length < 2) {
  console.log(`Usage: ${process.argv0} swagger_file patch_file`)
  process.exit(1)
}

const [swaggerFile, patchFile] = args
const patchFiles = require('./bin/patchFiles')
patchFiles(swaggerFile, patchFile)
