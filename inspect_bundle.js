import fs from 'fs';

const filePath = './.next/server/app/mother/dashboard/page.js';
const content = fs.readFileSync(filePath, 'utf-8');

// Let's find the start of '80486:' and print the next 500 characters
const index = content.indexOf('80486:');
if (index !== -1) {
  console.log("Found 80486 at index:", index);
  console.log("Code snippet:\n", content.slice(index, index + 500));
} else {
  console.log("80486: not found!");
}
