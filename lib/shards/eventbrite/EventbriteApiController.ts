export default class EventbriteApiController {
  config = {};
  apiBase = `https://www.eventbriteapi.com/v3`;
  organization = {};

  constructor(config: any) {
    this.config = config;
  }

  async getEventById(id: any) {
    const url = `${this.apiBase}/events/${id}`;

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

  async getEventsByOrganizerId() {
    await this._getOrganizerInfo();
    const url = `${this.apiBase}/organizations/${this.organization.id}/events`;

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

      const { events } = await response.json();

      return {
        events,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async _getOrganizerInfo() {
    const url = `${this.apiBase}/users/me/organizations/`;

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

      const { organizations } = await response.json();

      //Note: This assumes that the private key is tethered to an account linked to a single organization.
      this.organization = organizations[0];
    } catch (err) {
      console.log(err);
    }
  }
}
