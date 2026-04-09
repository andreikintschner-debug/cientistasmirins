import fs from 'fs';
let content = fs.readFileSync('App.tsx', 'utf8');
content = content.replace(/orange-/g, 'pink-')
                 .replace(/amber-/g, 'rose-')
                 .replace(/#F97316/gi, '#EC4899')
                 .replace(/#EA580C/gi, '#DB2777')
                 .replace(/#FB923C/gi, '#F472B6')
                 .replace(/#C2410C/gi, '#BE185D')
                 .replace(/rgba\(249,115,22/g, 'rgba(236,72,153'); // pink-500 rgb
fs.writeFileSync('App.tsx', content);
