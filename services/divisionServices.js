import { pgClient } from '../shared/pgClient';

/**
  * @description Function that returns the division id based on the division/brand name passed
  * @param {Object - division } - Pass the brand/division value for the page
  * @returns {Object} - Numeric id for division
  * @example import as import { division } from 'division'; then use as a promise division(args);
*/
exports.divisionServices = (query) => {
  const client = pgClient();
  const { division } = query;
  const division_id = `Select id from chrysler.divisions where division='${division}'`; // eslint-disable-line
  return new Promise((resolve) => {
    client.query(division_id)
      .then(
        response => resolve(response.rows)
      )
      .catch(e => resolve(e.stack));
  });
};
