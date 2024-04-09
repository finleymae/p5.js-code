let capture;
let previousFrame;
let threshold = 300; // Adjust this threshold to control sensitivity

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  previousFrame = createImage(capture.width, capture.height, RGB);
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  // Load current frame
  capture.loadPixels();
  previousFrame.loadPixels();

  // Compare current frame with previous frame
  for (let i = 0; i < capture.pixels.length; i += 4) {
    let currentR = capture.pixels[i];
    let currentG = capture.pixels[i + 1];
    let currentB = capture.pixels[i + 2];
    let previousR = previousFrame.pixels[i];
    let previousG = previousFrame.pixels[i + 1];
    let previousB = previousFrame.pixels[i + 2];

    // Calculate the difference in RGB values
    let diff = dist(currentR, currentG, currentB, previousR, previousG, previousB);

    // If the difference exceeds the threshold, mark it as movement
    if (diff > threshold) {
      // Get the position of the pixel
      let x = (i / 4) % capture.width;
      let y = floor((i / 4) / capture.width);

      // Draw a multicoloured box around the detected movement
      stroke(255, 0, 0);
      strokeWeight(2);
      noFill();
      rect(x - 100, y - 100, 100, 100); // Adjust the size of the box as needed
    }
  }

  // Update the previous frame
  previousFrame.copy(capture, 0, 0, capture.width, capture.height, 0, 0, capture.width, capture.height);
}

