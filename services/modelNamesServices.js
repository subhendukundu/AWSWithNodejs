import xml2js from 'xml2js';

import { getAllModels } from '../shared/getAllModels';

/**
  * @description Function that returns all model names based on query from a SOAP Web Service client
  * @param {Object - make } - Query params for the API call.
  * @returns {Object} - If successful, returns an object containing all model names.
  * @example import the function as import { modelNames } from 'modelNames'; then use as a promise modelNames(args);
*/


exports.modelNamesServices = (query) => {
  return new Promise((resolve) => {
    getAllModels(query).then(body => {
      const parser = new xml2js.Parser({ explicitArray: false, trim: true });
      parser.parseString(body, (err, result) => {
        const vehicleData = result ['soapenv:Envelope']['soapenv:Body'];
        const { modelData } = vehicleData.SoapResponse.modelList;
        const modelNames = modelData.map(item => item.modelName);
        const uniqueModelNames = [...new Set(modelNames)];
        resolve(uniqueModelNames);
      });
    });
  });
};
