// Define the global variables.
// The symmetry variable will define how many reflective sections the canvas
// is split into.
let symmetry = 6;

// The angle button will calculate the angle at which each section is rotated.
let angle = 360 / symmetry;

// Define a variable to hold the canvas element
let cnv;

function setup() {
  describe(
    `Dark grey canvas that reflects the lines drawn within it in ${symmetry} sections, using colorful strokes.`
  );
  cnv = createCanvas(710, 400);
  // Place the canvas inside a div with ID "canvas-container" for centering
  cnv.parent('canvas-container');
  angleMode(DEGREES);
  colorMode(HSB); // Use hue-saturation-brightness for colorful lines
  background(0);
  strokeWeight(3);
}

function draw() {
    // Move the 0,0 coordinates of the canvas to the center, instead of in
    // the top left corner.
  translate(width / 2, height / 2);

  // If the cursor is within the limits of the canvas...
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // Translate the current position and the previous position of the
    // cursor to the new coordinates set with the translate() function above.
    let lineStartX = mouseX - width / 2;
    let lineStartY = mouseY - height / 2;
    let lineEndX = pmouseX - width / 2;
    let lineEndY = pmouseY - height / 2;

    if (mouseIsPressed === true) {
      // Pick a color based on mouse position
      let hue = (mouseX + mouseY) % 360;
      stroke(hue, 90, 90); // HSB values

      // For every reflective section the canvas is split into, draw the cursor's
      // coordinates while pressed...
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        line(lineStartX, lineStartY, lineEndX, lineEndY);

        // ... and reflect the line within the symmetry sections as well.
        push();
        scale(1, -1);
        line(lineStartX, lineStartY, lineEndX, lineEndY);
        pop();
      }
    }
  }
}
