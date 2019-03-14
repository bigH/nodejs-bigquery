/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START bigquery_load_from_file]
async function loadLocalFile(datasetId, tableId, filename) {
  // Imports the Google Cloud client library
  const {BigQuery} = require('@google-cloud/bigquery');

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const filename = "/path/to/file.csv";
  // const datasetId = "my_dataset";
  // const tableId = "my_table";

  // Create a client
  const bigquery = new BigQuery();

  // Load data from a local file into the table
  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(filename);

  console.log(`Job ${job.id} completed.`);

  // Check the job's status for errors
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
}
// [END bigquery_load_from_file]

loadLocalFile(...process.argv.slice(2)).catch(console.error);
