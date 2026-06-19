const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../components/DataLifecycleHero.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Revert all closing braces
content = content.replace(/  \);\n\}\);/g, '  );\n};');

// Revert opening braces
const stages = ['CSVStage', 'ETLStage', 'WarehouseStage', 'MLStage', 'DashboardStage', 'GrowthStage'];
stages.forEach(stage => {
  const regex = new RegExp(`const ${stage} = React\\.memo\\(\\(\\) => \\{`, 'g');
  content = content.replace(regex, `const ${stage} = () => {`);
});

// Now properly memoize
stages.forEach(stage => {
  // Find opening
  content = content.replace(`const ${stage} = () => {`, `const ${stage} = React.memo(() => {`);
});

// For each stage, we need to find the correct closing brace.
// Since stages are defined sequentially and end with "};", we can find "const ETLStage" and look for the "};" before it to close "CSVStage".
// But an easier and less error-prone way is to use a strict regex replace that matches the entire function block if possible, 
// OR since it's just 6 stages, we can just replace the specific end-of-stage comments!
content = content.replace(/  \);\n\};\n\n\/\/ STAGE 2/g, '  );\n});\n\n// STAGE 2');
content = content.replace(/  \);\n\};\n\n\/\/ STAGE 3/g, '  );\n});\n\n// STAGE 3');
content = content.replace(/  \);\n\};\n\n\/\/ STAGE 4/g, '  );\n});\n\n// STAGE 4');
content = content.replace(/  \);\n\};\n\n\/\/ STAGE 5/g, '  );\n});\n\n// STAGE 5');
content = content.replace(/  \);\n\};\n\n\/\/ STAGE 6/g, '  );\n});\n\n// STAGE 6');
content = content.replace(/  \);\n\};\n\n\/\/ --/g, '  );\n});\n\n// --'); // For GrowthStage

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Fixed syntax and properly memoized!');
