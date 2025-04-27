import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID || "ACcd3af0a207a3126feab61826cca8c863" ;
const authToken = process.env.TWILIO_AUTH_TOKEN || "da69e6f70342e662c45d1a12e397a42c";
const client = twilio(accountSid, authToken);

async function createService() {
  const service = await client.verify.v2.services.create({
    friendlyName: "My First Verify Service",
  });

  console.log(service.sid);
}

async function createVerification() {
  const verification = await client.verify.v2
    .services("VAaa5b8531ccc285ca0f00262048437268")
    .verifications.create({
      channel: "sms",
      to: "+918433646811",
    });

  console.log(verification.status);
}

async function createVerificationCheck(otp) {
  const verificationCheck = await client.verify.v2
    .services("VAaa5b8531ccc285ca0f00262048437268")
    .verificationChecks.create({
      code: otp,
      to: "+918433646811",
    });

  return verificationCheck.status;
  
}

export {
  createVerificationCheck,          
  createVerification
}