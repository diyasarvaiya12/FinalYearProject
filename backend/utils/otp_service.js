import twilio from "twilio";

const authToken = "da8a47755552550546d268539c178111";
const accountSid = "ACcd3af0a207a3126feab61826cca8c863" ;
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