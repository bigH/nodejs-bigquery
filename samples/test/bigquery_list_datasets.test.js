/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {BigQuery} = require('@google-cloud/bigquery');
const {assert} = require('chai');
const execa = require('execa');
const uuid = require('uuid');

const cmd = 'node bigquery_list_dataset.js';
const exec = async cmd => (await execa.shell(cmd)).stdout;
const REGION_TAG = 'bigquery_list_datasets';
const PROJECT_ID = process.env.GCLOUD_PROJECT;
const DATASET_ID = `gcloud_tests_${uuid.v4()}`.replace(/-/gi, '_');
const bigquery = new BigQuery();

describe(`BigQuery List Datasets`, () => {
  let PROJECT_ID;
  before(async () => {
    PROJECT_ID = await bigquery.getProjectId();
    await exec(`node bigquery_create_dataset.js ${PROJECT_ID} ${DATASET_ID}`);
  });
  after(async () => {
    await bigquery
      .dataset(DATASET_ID)
      .delete({force: true})
      .catch(console.warn);
  });

  it(`should list datasets`, async () => {
    const output = await exec(`node ${REGION_TAG}.js ${PROJECT_ID}`);
    assert.match(output, /Datasets:/);
    assert.match(output, new RegExp(DATASET_ID));
  });
});
