const authUserFlow = require('../authUserFlow.js');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const sinon = require('sinon');
const {assert} = require('chai');
const {BigQuery} = require('@google-cloud/bigquery');
const uuid = require('uuid');


const generateUuid = () => `gcloud-tests-${uuid.v4()}`.replace(/-/gi, '_');
const datasetId = generateUuid();
const tableId = generateUuid();
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
let projectId;
let credentials;

const bigquery = new BigQuery();

describe('authUserFlow()', function() {
    
    before(async () => {
      await bigquery.createDataset(datasetId);
      const [tableData] = await bigquery.dataset(datasetId).createTable(tableId);
      projectId = tableData.metadata.tableReference.projectId;
      credentials = {
          keyFilename: keyPath,
          projectId: projectId,
      };    
      sinon.stub(authUserFlow, 'authFlow').returns(credentials);
    });
    after(async () => {
      await bigquery
        .dataset(datasetId)
        .delete({force: true})
        .catch(console.warn);
    });
    
    it('should run a query', async function() {
      const output = authUserFlow.query(projectId)
      assert.match(output, /Rows:/);
      assert.match(output, /name/);
    })
})