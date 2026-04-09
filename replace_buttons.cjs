const fs = require('fs');

let content = fs.readFileSync('App.tsx', 'utf8');

// Replace specific button classes
content = content.replace(/from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-600/g, 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700');
content = content.replace(/bg-\[\#2563EB\] hover:bg-\[\#1D4ED8\]/g, 'bg-green-600 hover:bg-green-700');
content = content.replace(/bg-blue-600 hover:bg-blue-700/g, 'bg-green-600 hover:bg-green-700');
content = content.replace(/shadow-blue-100/g, 'shadow-green-100');

// Basic plan button
content = content.replace(/bg-slate-800 hover:bg-slate-900/g, 'bg-green-600 hover:bg-green-700');

// Guarantee button
content = content.replace(/from-slate-900 to-slate-800 hover:from-black hover:to-slate-900/g, 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800');

fs.writeFileSync('App.tsx', content);
console.log('Buttons replaced successfully!');
