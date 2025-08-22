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
    
    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    document.body.appendChild(img);
    
    let currentBlobUrl = null;
    
    // Function to update the image
    async function updateImage() {
      try {
        console.log("Getting new frame from camera...");
        const frameData = await flirClient.renderFrame();
        
        // Clean up previous blob URL to prevent memory leaks
        if (currentBlobUrl) {
          URL.revokeObjectURL(currentBlobUrl);
        }
        
        // Create new blob URL and update image
        currentBlobUrl = URL.createObjectURL(frameData);
        img.src = currentBlobUrl;
        
      } catch (error) {
        console.error("Error updating image:", error);
      }
    }
    
    console.log("Starting continuous image updates...");
    // Fill first image immediately
    updateImage();
    
    // Update image every second
    const intervalId = setInterval(updateImage, 1000);
    
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