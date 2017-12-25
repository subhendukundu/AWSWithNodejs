import { modelServices } from './services/modelServices';
exports.handler = (event, context) => {
  modelServices(event).then(body => context.succeed(body)).catch(e => context.fail(e));
};
