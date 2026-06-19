const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') {
        if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
          filelist.push(dirFile);
        }
      } else {
        throw err;
      }
    }
  });
  return filelist;
};

const componentsDir = path.join(__dirname, 'components');
const files = walkSync(componentsDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace text-slate-500 with text-slate-400 for better contrast on dark BGs
  content = content.replace(/text-slate-500/g, 'text-slate-400');
  
  // Replace text-slate-600 with text-slate-300 or text-slate-400
  // Note: some light BG components like WhatWeDo might use slate-600 intentionally for readability.
  // We'll target the dark bg components explicitly for 600 replacements if needed, but 400 is generally safer.
  content = content.replace(/text-slate-600/g, 'text-slate-400');

  // Fix button aria-labels
  content = content.replace(/<button([^>]*)onClick=\{\(\) => setMobileMenuOpen\(\!mobileMenuOpen\)\}([^>]*)>/g, '<button aria-label="Toggle Navigation Menu"$1onClick={() => setMobileMenuOpen(!mobileMenuOpen)}$2>');
  content = content.replace(/<button([^>]*)onClick=\{\(\) => setIsAutoPlaying\(\!isAutoPlaying\)\}([^>]*)>/g, '<button aria-label="Toggle Animation Playback"$1onClick={() => setIsAutoPlaying(!isAutoPlaying)}$2>');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
