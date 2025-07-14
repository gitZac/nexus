import EventbriteApiController from "~/lib/shards/eventbrite/EventbriteApiController";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const params = getQuery(event);

  const config = {
    apiKey: runtimeConfig.EVENTBRITE_API_KEY,
    clientSecret: runtimeConfig.EVENTBRITE_CLIENT_SECRET,
    privateToken: runtimeConfig.EVENTBRITE_PRIVATE_TOKEN,
    publicToken: runtimeConfig.EVENTBRITE_PUBLIC_TOKEN,
  };

  const eventId = params.eid;

  const eb = new EventbriteApiController(config);

  const eventData = await eb.getEventById(eventId);

  return { ...eventData };
});
