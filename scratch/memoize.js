const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../components/DataLifecycleHero.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace standard component declarations with React.memo
const stages = ['CSVStage', 'ETLStage', 'WarehouseStage', 'MLStage', 'DashboardStage', 'GrowthStage'];

stages.forEach(stage => {
  const regex = new RegExp(`const ${stage} = \\(\\) => \\{`, 'g');
  content = content.replace(regex, `const ${stage} = React.memo(() => {`);
});

// Now we need to find the closing brace for each of these stages and replace it with `});`
// This is tricky with regex, so we'll do a simple token counting approach or just replace the specific end lines.
// Let's use a simpler approach: we know these components end with `  );\n};` or similar.
// Since we only want to replace the closing `};` of these specific components, we can just replace all `};` that are followed by `// STAGE` or `// ----`
content = content.replace(/  \);\n\};/g, '  );\n});');

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Memoization applied to ' + targetFile);
