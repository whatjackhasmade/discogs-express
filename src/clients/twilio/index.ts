const accountSid: string | undefined = process.env.TWILIO_SID;
const authToken: string | undefined = process.env.TWILIO_AUTH;

import * as twilio from "twilio";
import * as TwilioClient from "twilio/lib/rest/Twilio";
const client: TwilioClient = twilio.default(accountSid, authToken);

export { client as twilio };
