import EventbriteApiController from "~/lib/shards/eventbrite/EventBriteApiController";

export default defineEventHandler(async (event) => {
  const config = {
    apiKey: process.env.EVENTBRITE_API_KEY,
    clientSecret: process.env.EVENTBRITE_CLIENT_SECRET,
    privateToken: process.env.EVENTBRITE_PRIVATE_TOKEN,
    publicToken: process.env.EVENTBRITE_PUBLIC_TOKEN,
  };

  const eb = new EventbriteApiController(config);
  const eventData = await eb.getEventsByOrganizerId();
  return { ...eventData };
});
