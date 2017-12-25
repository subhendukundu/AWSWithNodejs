import { nearServices } from './services/nearServices';
exports.handler = (event, context) => {
  nearServices(event).then(body => context.succeed(body)).catch(e => context.fail(e));
};
