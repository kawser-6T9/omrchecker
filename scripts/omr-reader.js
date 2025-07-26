// omr-reader.js // এই স্ক্রিপ্টটি Canvas ব্যবহার করে OMR image detect করবে

async function detectOMRFromImage(imageElement, callback) { const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');

// Resize for consistency canvas.width = 800; canvas.height = 1000; ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

// Convert image to grayscale const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); const data = imageData.data;

for (let i = 0; i < data.length; i += 4) { const avg = (data[i] + data[i+1] + data[i+2]) / 3; data[i] = data[i+1] = data[i+2] = avg < 128 ? 0 : 255; // binary threshold } ctx.putImageData(imageData, 0, 0);

// Define rows and columns for options const bubbleRows = 25; // 25 MCQ const bubbleCols = 4;  // ক, খ, গ, ঘ const bubbleWidth = 30; const bubbleHeight = 30; const gapX = 60; const gapY = 35; const startX = 100; const startY = 150;

let result = [];

for (let i = 0; i < bubbleRows; i++) { let detected = ''; let darkCount = [];

for (let j = 0; j < bubbleCols; j++) {
  const x = startX + j * gapX;
  const y = startY + i * gapY;
  const bubbleData = ctx.getImageData(x, y, bubbleWidth, bubbleHeight);

  let darkPixels = 0;
  for (let k = 0; k < bubbleData.data.length; k += 4) {
    if (bubbleData.data[k] < 128) darkPixels++; // black pixel count
  }
  darkCount.push(darkPixels);
}

const maxDark = Math.max(...darkCount);
const selected = darkCount.filter(d => d > maxDark * 0.75);

if (selected.length === 1) {
  const index = darkCount.indexOf(maxDark);
  result.push(['ক','খ','গ','ঘ'][index]);
} else {
  result.push('❌'); // ambiguous or blank
}

}

callback(result); }

// এই function ব্যবহার করার সময়: // <input type="file" onchange="handleOMRUpload(event)"> function handleOMRUpload(event) { const file = event.target.files[0]; if (!file) return;

const reader = new FileReader(); reader.onload = function(e) { const img = new Image(); img.onload = function() { detectOMRFromImage(img, (answers) => { document.getElementById('userAnswers').value = answers.join(', '); }); }; img.src = e.target.result; }; reader.readAsDataURL(file); }

