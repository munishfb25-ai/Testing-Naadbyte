const fs = require('fs');
let content = fs.readFileSync('src/routes/music.index.tsx', 'utf-8');
content = content.replace('  if (!activeHeroSong) return null;\n', '');
content = content.replace('  const isHeroPlaying =', '  if (!activeHeroSong) return null;\n\n  const isHeroPlaying =');
fs.writeFileSync('src/routes/music.index.tsx', content);
