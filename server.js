import path from 'path';
import express from 'express';

import { Config } from './configs';
import { nearServices } from './services/nearServices';
import { modelNamesServices } from './services/modelNamesServices';
import { modelServices } from './services/modelServices';
import { modelServiceScheduleServices } from './services/modelServiceScheduleServices';
import { divisionServices } from './services/divisionServices';
import { makeServices } from './services/makeServices';

const app = express();

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  /* Set to true if you need the website to include cookies in the requests sent
     to the API (e.g. in case you use sessions)
  */
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/**
  * @description API to load the index.html
  * @returns {html page} - If successful, returns an html page in the browser.
*/

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/**
  * @description API that returns all dealer details based on query
  * @param {Object - postcode, division, department } - Query params for the API call.
  * @returns {Object} - If successful, returns an object containing all dealers details.
  * @example GET request with postcode, division, department, on success it will return an object containing all dealers details
*/

app.get('/api/public/dealer_locations/near', (req, res) => {
  const { query } = req;
  nearServices(query).then(body => res.send(body)).catch(e => console.error(e)); // eslint-disable-line
}); // TO DO - Error handling needs to be done


/**
  * @description API that returns all model names based on query from a SOAP Web Service client
  * @param {Object - make } - Query params for the API call.
  * @returns {Object} - If successful, returns an object containing all model names.
  * @example GET request with make, on success it will return an object containing all model names
*/
app.get('/api/private/service_pricing_tool/model_names', (req, res) => {
  const { query } = req;
  modelNamesServices(query).then(body => res.send(body)).catch(e => console.error(e)); // eslint-disable-line
});

/**
  * @description API that returns all model details based on query from a SOAP Web Service client
  * @param {Object - make, model } - Query params for the API call.
  * @returns {Object} - If successful, returns an object containing all model details.
  * @example GET request with make and model, on success it will return an object containing all model details
*/
app.get('/api/private/service_pricing_tool/models', (req, res) => {
  const { query } = req;
  modelServices(query).then(body => res.send(body)).catch(e => console.error(e)); // eslint-disable-line
});

/**
  * @description API that returns all model service schedule based on query from a SOAP Web Service client
  * @param {Object - modelCode, make } - Query params for the API call.
  * @returns {Object} - If successful, returns an object containing all model service schedule.
  * @example GET request with modelCode and make, on success it will return an object containing all model service schedule.
*/

app.get('/api/private/service_pricing_tool/model_service_schedule', (req, res) => {
  const { query } = req;
  modelServiceScheduleServices(query).then(body => res.send(body)).catch(e => console.error(e)); // eslint-disable-line
});

/**
  * @description API that returns the division id based on the division/brand name passed
  * @param {Object - division } - Pass the brand/division value for the page
  * @returns {Object} - Numeric id for division
 */
app.get('/api/public/division', (req, res) => {
  const { query } = req;
  divisionServices(query).then(body => res.send(body)).catch(e => console.error(e)); // eslint-disable-line
});


/**
  * @description API that returns the vehicle make details
  * @param {Object - make_id, division } - Pass the brand/division and model make id
  * @returns {Object} - Returns the vehicle make details for the provided params
 */
app.get('/api/public/make', (req, res) => {
  const { query } = req;
  makeServices(query).then(body => res.send(body)).catch(e => console.error(e)); // eslint-disable-line
});

app.listen(Config.port, () => {
  console.log(`Running API server at localhost:${Config.port}`);  // eslint-disable-line
});
