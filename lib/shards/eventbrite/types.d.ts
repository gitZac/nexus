export interface Config {
  apiKey?: string;
  clientSecret?: string;
  privateToken?: string;
  publicToken?: string;
}

export interface Organization {
  id: string;
}

export interface EventSingle {
  name: Object;
}
