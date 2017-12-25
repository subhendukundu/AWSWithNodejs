import xml2js from 'xml2js';
import snakeCaseKeys from 'snakecase-keys';

import { getAllModels } from '../shared/getAllModels';

/**
  * @description Function that returns all model details based on query from a SOAP Web Service client
  * @param {Object - make, model } - Query params for the API call.
  * @returns {Object} - If successful, returns an object containing all model details.
  * @example import the function as import { model } from 'model'; then use as a promise model(args);
*/

exports.modelServices = (query) => {
  const { model } = query;
  return new Promise((resolve) => {
    getAllModels(query).then(body => {
      const parser = new xml2js.Parser({ explicitArray: false, trim: true });
      parser.parseString(body, (err, result) => {
        const vehicleData = result ['soapenv:Envelope']['soapenv:Body'];
        const { modelData } = vehicleData.SoapResponse.modelList;
        const modelDetails = modelData.filter(item => item.modelName === model.toString());
        const modelDetailsToReturn = [];
        const modelDetailsInSnakeCase = snakeCaseKeys(modelDetails);
        Object.keys(modelDetailsInSnakeCase).map((item) => {
          modelDetailsToReturn.push(modelDetailsInSnakeCase[item]);
        });

        resolve(modelDetailsToReturn);
      });
    });
  });
};
