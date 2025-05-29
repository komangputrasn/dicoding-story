// Icon generator using Canvas API
const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, "icons");

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Create a gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, "#667eea");
  gradient.addColorStop(1, "#764ba2");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Add a circle overlay
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.3, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fill();

  // Add text "DS" for Dicoding Story
  ctx.fillStyle = "white";
  ctx.font = `bold ${size * 0.3}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("DS", size / 2, size / 2);

  // Save the icon
  const fileName = `icon-${size}x${size}.png`;
  const filePath = path.join(iconsDir, fileName);
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(filePath, buffer);

  console.log(`Created ${fileName}`);
}

// Generate all icon sizes
console.log("Generating PNG icons...");
sizes.forEach(createIcon);
console.log("All icons generated successfully!");
