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
  const resources = await machine.resourceNames();
  console.log(resources);
  
  // Show resource selection form
  showResourceSelectionForm(machine, resources);
}

function showResourceSelectionForm(machine, resources) {
  // Create form container
  const formContainer = document.createElement('div');
  formContainer.style.padding = '20px';

  const title = document.createElement('h3');
  title.textContent = 'Select Resources';
  formContainer.appendChild(title);

  // Filter resources
  const cameras = resources.filter(r => r.type === 'component' && r.subtype === 'camera');
  const generics = resources.filter(r => r.type === 'component' && r.subtype === 'generic');

  // Camera dropdown
  const cameraLabel = document.createElement('label');
  cameraLabel.textContent = 'Camera: ';
  formContainer.appendChild(cameraLabel);

  const cameraSelect = document.createElement('select');
  cameras.forEach(camera => {
    const option = document.createElement('option');
    option.value = camera.name;
    option.textContent = camera.name;
    cameraSelect.appendChild(option);
  });
  formContainer.appendChild(cameraSelect);
  formContainer.appendChild(document.createElement('br'));
  formContainer.appendChild(document.createElement('br'));

  // PTZ dropdown
  const ptzLabel = document.createElement('label');
  ptzLabel.textContent = 'PTZ: ';
  formContainer.appendChild(ptzLabel);

  const ptzSelect = document.createElement('select');
  generics.forEach(generic => {
    const option = document.createElement('option');
    option.value = generic.name;
    option.textContent = generic.name;
    ptzSelect.appendChild(option);
  });
  formContainer.appendChild(ptzSelect);
  formContainer.appendChild(document.createElement('br'));
  formContainer.appendChild(document.createElement('br'));

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Start';

  submitButton.addEventListener('click', () => {
    const selectedCamera = cameraSelect.value;
    const selectedPtz = ptzSelect.value;

    if (!selectedCamera || !selectedPtz) {
      alert('Please select both a camera and PTZ controller');
      return;
    }

    // Remove form and start PTZ app
    document.body.removeChild(formContainer);
    startPtzApp(machine, selectedCamera, selectedPtz);
  });

  formContainer.appendChild(submitButton);
  document.body.appendChild(formContainer);
}

async function startPtzApp(machine, cameraName, ptzName) {
  try {
    const flirClient = new VIAM.CameraClient(machine, cameraName);
    console.log("Camera client created:", flirClient);

    const ptzClient = new VIAM.GenericComponentClient(machine, ptzName);
    
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
    
    // PTZ command implementations
    async function onPtzPress(direction) {
      console.log(`PTZ ${direction} pressed - starting movement`);
      try {
        let command;
        switch(direction) {
          case 'up':
            command = VIAM.Struct.fromJson({
              "command": "continuous-move",
              "pan_speed": 0.0,
              "tilt_speed": 0.5,
              "zoom_speed": 0.0
            });
            break;
          case 'down':
            command = VIAM.Struct.fromJson({
              "command": "continuous-move", 
              "pan_speed": 0.0,
              "tilt_speed": -0.5,
              "zoom_speed": 0.0
            });
            break;
          case 'left':
            command = VIAM.Struct.fromJson({
              "command": "continuous-move",
              "pan_speed": -0.5,
              "tilt_speed": 0.0,
              "zoom_speed": 0.0
            });
            break;
          case 'right':
            command = VIAM.Struct.fromJson({
              "command": "continuous-move",
              "pan_speed": 0.5,
              "tilt_speed": 0.0,
              "zoom_speed": 0.0
            });
            break;
        }
        
        console.log(`Sending ${direction} command:`, command);
        const result = await ptzClient.doCommand(command);
        console.log(`PTZ ${direction} command sent:`, result);
        
      } catch (error) {
        console.error(`Error sending PTZ ${direction} command:`, error);
      }
    }
    
    async function onPtzRelease(direction) {
      console.log(`PTZ ${direction} released - stopping movement`);
      try {
        const stopCommand = VIAM.Struct.fromJson({
          "command": "stop",
          "pan_tilt": true,
          "zoom": true
        });
        
        console.log("Sending stop command as Struct:", stopCommand);
        
        const result = await ptzClient.doCommand(stopCommand);
        console.log(`PTZ stop command sent:`, result);
        
      } catch (error) {
        console.error(`Error sending PTZ stop command:`, error);
      }
    }
    
    // Zoom command implementations
    async function onZoomPress(direction) {
      console.log(`Zoom ${direction} pressed - starting zoom`);
      try {
        let command;
        switch(direction) {
          case 'in':
            command = VIAM.Struct.fromJson({
              "command": "continuous-move",
              "pan_speed": 0.0,
              "tilt_speed": 0.0,
              "zoom_speed": 0.5
            });
            break;
          case 'out':
            command = VIAM.Struct.fromJson({
              "command": "continuous-move",
              "pan_speed": 0.0,
              "tilt_speed": 0.0,
              "zoom_speed": -0.5
            });
            break;
        }
        
        console.log(`Sending zoom ${direction} command:`, command);
        const result = await ptzClient.doCommand(command);
        console.log(`Zoom ${direction} command sent:`, result);
        
      } catch (error) {
        console.error(`Error sending zoom ${direction} command:`, error);
      }
    }
    
    async function onZoomRelease(direction) {
      console.log(`Zoom ${direction} released - stopping zoom`);
      try {
        const stopCommand = VIAM.Struct.fromJson({
          "command": "stop",
          "pan_tilt": true,
          "zoom": true
        });
        
        console.log("Sending zoom stop command as Struct:", stopCommand);
        
        const result = await ptzClient.doCommand(stopCommand);
        console.log(`Zoom stop command sent:`, result);
        
      } catch (error) {
        console.error(`Error sending zoom stop command:`, error);
      }
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
    
    // Create zoom buttons
    function createZoomButton(direction, position, symbol) {
      const button = document.createElement('button');
      button.innerHTML = symbol;
      button.style.position = 'absolute';
      button.style.background = 'rgba(0, 0, 0, 0.7)';
      button.style.color = 'white';
      button.style.border = '2px solid rgba(255, 255, 255, 0.8)';
      button.style.borderRadius = '50%';
      button.style.width = '50px';
      button.style.height = '50px';
      button.style.fontSize = '20px';
      button.style.cursor = 'pointer';
      button.style.pointerEvents = 'auto';
      button.style.userSelect = 'none';
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
      button.style.fontWeight = 'bold';
      
      // Position the button
      Object.assign(button.style, position);
      
      // Add press/release event handlers
      button.addEventListener('mousedown', () => onZoomPress(direction));
      button.addEventListener('mouseup', () => onZoomRelease(direction));
      button.addEventListener('mouseleave', () => onZoomRelease(direction));
      
      // Touch events for mobile
      button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        onZoomPress(direction);
      });
      button.addEventListener('touchend', (e) => {
        e.preventDefault();
        onZoomRelease(direction);
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
    
    // Create and position zoom buttons in lower-right corner
    const zoomInButton = createZoomButton('in', {
      bottom: '80px',
      right: '20px'
    }, '+');
    
    const zoomOutButton = createZoomButton('out', {
      bottom: '20px',
      right: '20px'
    }, '−');
    
    // Add buttons to overlay
    controlsOverlay.appendChild(upButton);
    controlsOverlay.appendChild(downButton);
    controlsOverlay.appendChild(leftButton);
    controlsOverlay.appendChild(rightButton);
    controlsOverlay.appendChild(zoomInButton);
    controlsOverlay.appendChild(zoomOutButton);
    
    let currentBlobUrl = null;
    
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
