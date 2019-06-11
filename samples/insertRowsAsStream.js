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

function main(
  datasetId,
  tableId,
  rows = [{name: 'Tom', age: 30}, {name: 'Jane', age: 32}]
) {
  // [START bigquery_table_insert_rows]
  // Import the Google Cloud client library
  const {BigQuery} = require('@google-cloud/bigquery');

  async function insertRowsAsStream() {
    // Inserts the JSON objects into my_dataset:my_table.

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const datasetId = 'my_dataset';
    // const tableId = 'my_table';
    // const rows = [{name: 'Tom', age: 30}, {name: 'Jane', age: 32}];

    // Create a client
    const bigqueryClient = new BigQuery();

    // Insert data into a table
    await bigqueryClient
      .dataset(datasetId)
      .table(tableId)
      .insert(rows);
    console.log(`Inserted ${rows.length} rows`);
  }
  insertRowsAsStream();
  // [END bigquery_table_insert_rows]
}
main(...process.argv.slice(2));
