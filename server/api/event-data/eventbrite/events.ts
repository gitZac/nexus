import EventbriteApiController from "~/lib/shards/eventbrite/EventBriteApiController";
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const config = {
    apiKey: runtimeConfig.eventbriteApiKey,
    clientSecret: runtimeConfig.eventbriteClientSecret,
    privateToken: runtimeConfig.eventbritePrivateToken,
    publicToken: runtimeConfig.eventbritePublicToken,
  };

  const eb = new EventbriteApiController(config);
  const eventData = await eb.getEventsByOrganizerId();
  return { ...eventData };
});
