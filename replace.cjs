const fs = require('fs');

let content = fs.readFileSync('App.tsx', 'utf8');

// Replace pink and rose with blue
content = content.replace(/pink-50\b/g, 'blue-50');
content = content.replace(/pink-100\b/g, 'blue-100');
content = content.replace(/pink-200\b/g, 'blue-200');
content = content.replace(/pink-300\b/g, 'blue-300');
content = content.replace(/pink-400\b/g, 'blue-400');
content = content.replace(/pink-500\b/g, 'blue-600');
content = content.replace(/pink-600\b/g, 'blue-600');
content = content.replace(/pink-700\b/g, 'blue-700');
content = content.replace(/pink-800\b/g, 'blue-800');
content = content.replace(/pink-900\b/g, 'blue-900');

content = content.replace(/rose-50\b/g, 'blue-50');
content = content.replace(/rose-100\b/g, 'blue-100');
content = content.replace(/rose-200\b/g, 'blue-200');
content = content.replace(/rose-300\b/g, 'blue-300');
content = content.replace(/rose-400\b/g, 'blue-500');
content = content.replace(/rose-500\b/g, 'blue-600');

// Replace custom reds with blue
content = content.replace(/#cc0000/g, '#2563EB'); // blue-600
content = content.replace(/#a30000/g, '#1D4ED8'); // blue-700

// Replace slate-900 with blue-900 for titles
content = content.replace(/text-slate-900/g, 'text-blue-900');

fs.writeFileSync('App.tsx', content);
console.log('Colors replaced successfully!');
