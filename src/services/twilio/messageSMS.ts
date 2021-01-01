const environment: string | undefined = process.env.NODE_ENV;
const envFrom: string | undefined = process.env.TWILIO_FROM;
const envTo: string | undefined = process.env.TWILIO_TO;

import { logger } from "track";
import { twilio } from "track";

const isProduction: boolean = environment === "production";

export const messageSMS = async (body: string): Promise<void> => {
  const from = envFrom ? envFrom : "";
  const to = envTo ? envTo : "";

  try {
    if (isProduction) console.log("Skipping SMS message as in development or staging");

    if (isProduction) {
      const textArgs = { body, from, to };
      const message = await twilio.messages.create(textArgs);

      body = message.body;
    }

    logger.info(body);
  } catch (error) {
    logger.error(error.message);
  }
};

export default messageSMS;
