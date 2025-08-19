import * as VIAM from "./viam-sdk.js";
import Cookies from "./js-cookie.js";

let apiKeyId = "";
let apiKeySecret = "";
let host = "";
let machineId = "";

async function main() {
  const opts = {
    serviceHost: "https://app.viam.com",
    credentials: {
      type: "api-key",
      payload: apiKeySecret,
      authEntity: apiKeyId,
    },
  };

  const client = await VIAM.createViamClient(opts);
  const machine = await client.appClient.getRobot(machineId);
  
  console.log("Connected to machine:", machine);
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Viam PTZ App initialized");
  console.log("VIAM SDK loaded:", VIAM);
  console.log("Cookies library loaded:", Cookies);
  
  // Extract the machine identifier from the URL
  let machineCookieKey = window.location.pathname.split("/")[2];
  
  // Check if cookie exists
  const cookieData = Cookies.get(machineCookieKey);
  if (cookieData) {
    ({
      apiKey: { id: apiKeyId, key: apiKeySecret },
      machineId: machineId,
      hostname: host,
    } = JSON.parse(cookieData));

    main().catch((error) => {
      console.error("encountered an error:", error);
    });
  } else {
    console.log("No machine cookie found for key:", machineCookieKey);
  }
});