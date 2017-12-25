import rp from 'request-promise';
import xml2js from 'xml2js';

/**
  * @description Function that returns all model service schedule based on query from a SOAP Web Service client
  * @param {Object - modelCode, make } - Query params for the API call.
  * @returns {Object} - If successful, returns an object containing all model service schedule.
  * @example import the function as import { modelServiceSchedule } from 'modelServiceSchedule'; then use as a promise modelServiceSchedule(args);
*/

exports.modelServiceScheduleServices = (query) => {
  const { modelCode, make } = query;
  const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:get="http://www.nidasu.com/soap/getmodelserviceschedulev06">
                  <soapenv:Header/>
                  <soapenv:Body>
                    <get:InputParams>
                        <!--Optional:-->
                        <get:dealerCode>DIGITALDIALOGUE</get:dealerCode>
                        <get:emailAddress>datasupply@digitaldialogue.com.au</get:emailAddress>
                        <get:password>$@DigiDia8fca</get:password>
                        <get:make>${make}</get:make>
                        <!--Optional:-->
                        <get:modelCodeDealer></get:modelCodeDealer>
                        <!--Optional:-->
                        <get:modelCodeManuf>L${modelCode}</get:modelCodeManuf>
                        <!--Optional:-->
                        <get:scheduleServiceCode></get:scheduleServiceCode>
                        <!--Optional:-->
                        <get:modelFirstProductionNumber></get:modelFirstProductionNumber>
                        <!--Optional:-->
                        <get:modelLastProductionNumber></get:modelLastProductionNumber>
                        <!--Optional:-->
                        <get:modelEngineExtraData></get:modelEngineExtraData>
                    </get:InputParams>
                  </soapenv:Body>
                </soapenv:Envelope>`;

  const options = {
    url: 'https://fcaat.com.au/fca/services/GetModelServiceScheduleV06?wsdl',
    method: 'POST',
    body: xml,
    headers: {
      'Content-Type': 'text/xml;charset=utf-8',
      'Accept-Encoding': 'gzip,deflate',
      'Content-Length': xml.length,
      'SOAPAction': 'GetModelServiceSchedule'
    }
  };
  return new Promise((resolve) => {
    rp(options).then(body => {
      const parser = new xml2js.Parser({ explicitArray: false, trim: true });
      parser.parseString(body, (err, result) => {
        const vehicleData = result ['soapenv:Envelope']['soapenv:Body'];
        const { scheduledService } = vehicleData.SoapResponse;
        resolve(scheduledService);
      });
    });
  });
};
