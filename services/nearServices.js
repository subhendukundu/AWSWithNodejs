import { pgClient } from '../shared/pgClient';

/**
  * @description Function that returns all dealer details based on query
  * @param {Object - postcode, division, department } - Query params for the API call.
  * @returns {Object} - If successful, returns an object containing all dealers details.
  * @example import the function as import { near } from 'near'; then use as a promise near(args);
*/

exports.nearServices = (query) => {
  return new Promise((resolve) => {
    const client = pgClient();
    const { postcode, division, department } = query;
    const queryForPmaPostCodes = `select * from chrysler.pmas inner join chrysler.dealers on chrysler.pmas.dealer_id=chrysler.dealers.id where chrysler.dealers.hidden in (false, ${null}) and chrysler.dealers.archived in (false, ${null}) and chrysler.dealers.classification=0 and chrysler.dealers.division_id=${division} and chrysler.dealers.post_code='${postcode}'`;
    client.query(queryForPmaPostCodes)
      .then(response => {
        const dealers = response.rows[0];
        const { dealer_id } = dealers;
        const queryDealerData = {
          name: 'fetch-dealer-data',
          text: 'select * from chrysler.dealer_locations where dealer_id=$1 AND department=$2',
          values: [dealer_id, `${department}`] // eslint-disable-line
        };
        client.query(queryDealerData).then(arg => {
          const dealerDetails = arg.rows[0];
          dealerDetails.dealer = dealers;
          resolve(dealerDetails);
        }).catch(e => resolve(e.stack));  // eslint-disable-line
      })
    .catch(e => resolve(e.stack));  // eslint-disable-line
  });
};
