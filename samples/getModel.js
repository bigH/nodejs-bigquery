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

function main(datasetId, modelId) {
  // [START bigquery_get_model]
  // Import the Google Cloud client library
  const {BigQuery} = require('@google-cloud/bigquery');

  async function getModel() {
    // Retrieves model named "my_existing_model" in "my_dataset".

    /**
     * TODO(developer): Uncomment the following lines before running the sample
     */
    // const datasetId = "my_dataset";
    // const modelId = "my_existing_model";

    // Create a client
    const bigqueryClient = new BigQuery();

    const dataset = bigqueryClient.dataset(datasetId);
    const [model] = await dataset.model(modelId).get();

    console.log('Model:');
    console.log(model.metadata.modelReference);
  }
  getModel();
  // [END bigquery_get_model]
}
main(...process.argv.slice(2));
