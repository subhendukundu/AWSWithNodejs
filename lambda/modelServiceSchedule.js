import { modelServiceScheduleServices } from './services/modelServiceScheduleServices';
exports.handler = (event, context) => {
  modelServiceScheduleServices(event).then(body => context.succeed(body)).catch(e => context.fail(e));
};
