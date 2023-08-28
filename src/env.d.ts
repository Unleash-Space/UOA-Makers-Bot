declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      TOKEN: string;
      GUILD_ID: string;
      EVENTS_CHANNEL_ID: string;
      EVENTBRITE_ORG_ID: string;
      EVENTBRITE_TOKEN: string;
    }
  }
}

export {};
