import { pgClient } from '../shared/pgClient';

/**
  * @description Function that returns the vehicle make details
  * @param {Object - make_id, division } - Pass the brand/division and model make id
  * @returns {Object} - Returns the vehicle make details for the provided params
  * @example import the function as import { make } from 'make'; then use as a promise make(args);
*/

exports.makeServices = (query) => {
  const client = pgClient();
  const { make_id, division } = query;
  const divisionIdQuery = {
    name: 'fetch-division-id',
    text: 'Select id from chrysler.divisions where division=$1',
    values: [division]
  };
  return new Promise((resolve) => {
    client.query(divisionIdQuery).then(response => {
      const data = response.rows[0];
      const { division_id } = data;
      const make_query = `Select A.ID, A.model_name, A.created_at, A.updated_at, A.sort_order, A.trim_spec, A.transmission, A.engine_capacity, A.number_of_cylinders, A.tare_weight, A.fuel_consumption, A.is_electric, A.is_hybrid, A.gvr, A.sale_price, A.sales_start_date, A.sales_end_date, A.delivery_type, A.disclaimer_text, A.paint_cost from chrysler.model_configurations A INNER JOIN chrysler.models B ON A.model_ID=${division_id} AND B.make_id=${make_id} AND A.sale_price is not null`; // eslint-disable-line
      client.query(make_query).then(result => {
        const Vehicle_make_details = result.rows[0]; // eslint-disable-line
        resolve(Vehicle_make_details);
      }).catch(e => resolve(e.stack));
    }).catch(e => resolve(e.stack));
  });
};
