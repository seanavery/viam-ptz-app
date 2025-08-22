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
    
    // Create container for image and controls
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.display = 'inline-block';
    container.style.maxWidth = '100%';
    document.body.appendChild(container);
    
    // Create image element
    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    container.appendChild(img);
    
    // Create PTZ controls overlay
    const controlsOverlay = document.createElement('div');
    controlsOverlay.style.position = 'absolute';
    controlsOverlay.style.top = '0';
    controlsOverlay.style.left = '0';
    controlsOverlay.style.width = '100%';
    controlsOverlay.style.height = '100%';
    controlsOverlay.style.pointerEvents = 'none'; // Allow clicks to pass through except on buttons
    container.appendChild(controlsOverlay);
    
    // PTZ command stubs
    async function onPtzPress(direction) {
      console.log(`PTZ ${direction} pressed - starting movement`);
      // TODO: Send PTZ command to start movement in direction
    }
    
    async function onPtzRelease(direction) {
      console.log(`PTZ ${direction} released - stopping movement`);
      // TODO: Send PTZ command to stop movement
    }
    
    // Create arrow buttons
    function createArrowButton(direction, position) {
      const button = document.createElement('button');
      button.innerHTML = getArrowSymbol(direction);
      button.style.position = 'absolute';
      button.style.background = 'rgba(0, 0, 0, 0.7)';
      button.style.color = 'white';
      button.style.border = '2px solid rgba(255, 255, 255, 0.8)';
      button.style.borderRadius = '50%';
      button.style.width = '60px';
      button.style.height = '60px';
      button.style.fontSize = '24px';
      button.style.cursor = 'pointer';
      button.style.pointerEvents = 'auto';
      button.style.userSelect = 'none';
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
      
      // Position the button
      Object.assign(button.style, position);
      
      // Add press/release event handlers
      button.addEventListener('mousedown', () => onPtzPress(direction));
      button.addEventListener('mouseup', () => onPtzRelease(direction));
      button.addEventListener('mouseleave', () => onPtzRelease(direction)); // Stop if mouse leaves button???
      
      // Touch events for mobile
      button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        onPtzPress(direction);
      });
      button.addEventListener('touchend', (e) => {
        e.preventDefault();
        onPtzRelease(direction);
      });
      
      // Hover effects
      button.addEventListener('mouseenter', () => {
        button.style.background = 'rgba(0, 0, 0, 0.9)';
        button.style.borderColor = 'rgba(255, 255, 255, 1)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.background = 'rgba(0, 0, 0, 0.7)';
        button.style.borderColor = 'rgba(255, 255, 255, 0.8)';
      });
      
      return button;
    }
    
    function getArrowSymbol(direction) {
      const symbols = {
        up: '▲',
        down: '▼', 
        left: '◀',
        right: '▶'
      };
      return symbols[direction];
    }
    
    // Create and position arrow buttons
    const upButton = createArrowButton('up', {
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)'
    });
    
    const downButton = createArrowButton('down', {
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)'
    });
    
    const leftButton = createArrowButton('left', {
      top: '50%',
      left: '20px',
      transform: 'translateY(-50%)'
    });
    
    const rightButton = createArrowButton('right', {
      top: '50%',
      right: '20px',
      transform: 'translateY(-50%)'
    });
    
    // Add buttons to overlay
    controlsOverlay.appendChild(upButton);
    controlsOverlay.appendChild(downButton);
    controlsOverlay.appendChild(leftButton);
    controlsOverlay.appendChild(rightButton);
    
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