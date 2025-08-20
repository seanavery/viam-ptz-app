import * as VIAM from "./viam-sdk.js";
import Cookies from "./js-cookie.js";

let apiKeyId = "";
let apiKeySecret = "";
let host = "";
let machineId = "";

async function main() {
  console.log("Starting main function...");
  
  const robotOpts = {
    host: host,
    credentials: {
      type: "api-key",
      payload: apiKeySecret,
      authEntity: apiKeyId,
    },
    signalingAddress: 'https://app.viam.com:443',
  };
  
  console.log("Creating robot client with opts:", robotOpts);
  const machine = await VIAM.createRobotClient(robotOpts);
  console.log("Robot client created:", machine);
  
  console.log('Resources:');
  console.log(await machine.resourceNames());
  
  try {
    const flirClient = new VIAM.CameraClient(machine, 'FLIRSystems-M364C-TA0RFP6-url0');
    console.log("Camera client created:", flirClient);
    console.log("getting image from camera...");
    
    const frameData = await flirClient.renderFrame();
    console.log('FLIRSystems-M364C-TA0RFP6-url0 renderFrame return value:', frameData);
    console.log('frameData type:', typeof frameData);
    console.log('frameData constructor:', frameData?.constructor?.name);
    
    // Handle Blob data from renderFrame
    const img = document.createElement('img');
    const blobUrl = URL.createObjectURL(frameData);
    img.src = blobUrl;
    document.body.appendChild(img);
    console.log("Image displayed on page using renderFrame Blob.");
      
    // Clean up the blob URL after the image loads to free memory
    img.onload = () => {
      URL.revokeObjectURL(blobUrl);
    };
    
  } catch (error) {
    console.error("Camera client error:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Viam PTZ App initialized");
  console.log("VIAM SDK loaded:", VIAM);
  console.log("Available VIAM methods:", Object.keys(VIAM));
  console.log("Cookies library loaded:", Cookies);
  
  let machineCookieKey = window.location.pathname.split("/")[2];
  
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