import { modelNamesServices } from './services/modelNamesServices';
exports.handler = (event, context) => {
  modelNamesServices(event).then(body => context.succeed(body)).catch(e => context.fail(e));
};
