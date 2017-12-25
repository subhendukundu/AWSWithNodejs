import { makeServices } from './services/makeServices';
exports.handler = (event, context) => {
  makeServices(event).then(body => context.succeed(body)).catch(e => context.fail(e));
};
