import fs from 'fs';
let content = fs.readFileSync('App.tsx', 'utf8');
content = content.replace(/green-/g, 'orange-')
                 .replace(/emerald-/g, 'amber-')
                 .replace(/teal-/g, 'orange-')
                 .replace(/#6BBA75/g, '#F97316')
                 .replace(/#3A8B50/g, '#EA580C')
                 .replace(/#75C680/g, '#FB923C')
                 .replace(/#429D5B/g, '#C2410C')
                 .replace(/rgba\(34,197,94/g, 'rgba(249,115,22'); // orange-500 rgb
fs.writeFileSync('App.tsx', content);
