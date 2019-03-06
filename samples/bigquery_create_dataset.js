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

// [START bigquery_create_dataset]
async function bigquery_create_dataset(
  PROJECT_ID = 'YOUR_PROJECT_ID',
  DATASET_ID = 'YOUR_DATASET_ID'
) {
  // Imports the Google Cloud client library
  const {BigQuery} = require('@google-cloud/bigquery');

  // Creates a client
  const bigquery = new BigQuery({PROJECT_ID});

  // Creates a new dataset
  await bigquery
    .createDataset(DATASET_ID)
    .then(response => {
      console.log(`Dataset ${response[0].id} created.`);
    })
    .catch(error => {
      console.log(error.errors[0].message);
    });
}
// [END bigquery_create_dataset]

bigquery_create_dataset(...process.argv.slice(2));
