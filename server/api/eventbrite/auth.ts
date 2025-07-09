export default defineEventHandler(async (event) => {
  const params = getQuery(event);
  const authCode = params?.code;
  return {
    auth: "ok",
    ...params,
    authCode,
  };
});
