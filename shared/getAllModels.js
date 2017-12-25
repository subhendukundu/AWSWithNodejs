import rp from 'request-promise';

import { Config } from '../configs';

/**
  * @description A function that returns all models from the SOAP Web Service client with promise
  * @param {Object} - Query params from the API call.
  * @returns {xml} - If successful, returns an xml containing all the Object details.
  * @example app.get('/allModel', (req, res) => { getAllModels(req).then(data => console.log(data))};
      will return an xml containing all the Object details
*/
exports.getAllModels = (query) => {
  const { make } = query;
  const { xmlgetallmodel, wsdlUrl, dealerCode, emailAddress, password } = Config.getallmodelData;
  const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:get=${xmlgetallmodel}>
                    <soapenv:Header/>
                    <soapenv:Body>
                    <get:InputParams>
                        <!--Optional:-->
                        <get:dealerCode>${dealerCode}</get:dealerCode>
                        <get:emailAddress>${emailAddress}</get:emailAddress>
                        <get:password>${password}</get:password>
                        <get:make>${make}</get:make>
                    </get:InputParams>
                    </soapenv:Body>
                </soapenv:Envelope>`;
  const options = {
    url: wsdlUrl,
    method: 'POST',
    body: xml,
    headers: {
      'Content-Type': 'text/xml;charset=utf-8',
      'Accept-Encoding': 'gzip,deflate',
      'Content-Length': xml.length,
      'SOAPAction': 'GetAllModels'
    }
  };

  return rp(options);
};
