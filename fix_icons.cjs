const fs = require('fs');
let content = fs.readFileSync('src/routes/about.tsx', 'utf-8');
content = content.replace('  ArrowRight,\n} from "lucide-react";', '  ArrowRight,\n  Star,\n  Zap,\n} from "lucide-react";');
fs.writeFileSync('src/routes/about.tsx', content);
