export default class EventbriteApiController {
  config = {};
  token = "";

  constructor(config: any) {
    this.config = config;
  }

  //   async initAccessKey() {
  //     const accessUrl = `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${this.config.apiKey}&redirect_uri=http://localhost:3000/api/eventbrite/auth`;

  //     console.log(accessUrl);

  //     try {
  //       const response = await fetch(accessUrl, {
  //         method: "POST",
  //       });

  //       if (!response.ok) {
  //         console.log(response);
  //         throw new Error(`Response status: ${response.status}`);
  //       }

  //       console.log(response);

  //       return response;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  async getEventById(id: any) {
    const url = `https://www.eventbriteapi.com/v3/events/${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.config.privateToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();

      return {
        ...data,
      };
    } catch (err) {
      console.log(err);
    }
  }
}
