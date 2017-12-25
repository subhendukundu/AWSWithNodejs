import { divisionServices } from './services/divisionServices';
exports.handler = (event, context) => {
  divisionServices(event).then(body => context.succeed(body)).catch(e => context.fail(e));
};
