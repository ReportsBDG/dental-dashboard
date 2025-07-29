const fs = require('fs');
const path = require('path');

// Function to clean merge conflicts from a file
function cleanMergeConflicts(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file has merge conflicts
    if (content.includes('<<<<<<< HEAD')) {
      console.log(`Cleaning conflicts in: ${filePath}`);
      
      // Remove merge conflict markers and keep the HEAD version
      content = content.replace(/<<<<<<< HEAD\n([\s\S]*?)\n=======\n[\s\S]*?\n>>>>>>> [^\n]*\n?/g, '$1');
      
      // Write the cleaned content back
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error cleaning ${filePath}:`, error.message);
  }
}

// Function to recursively process directories
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .git
      if (item !== 'node_modules' && item !== '.git' && item !== '.next') {
        processDirectory(fullPath);
      }
    } else if (stat.isFile()) {
      // Process files that might have conflicts
      const ext = path.extname(item);
      if (['.js', '.ts', '.tsx', '.jsx', '.json', '.md', '.css', '.txt'].includes(ext)) {
        cleanMergeConflicts(fullPath);
      }
    }
  }
}

// Start cleaning from current directory
console.log('🧹 Starting to clean merge conflicts...');
processDirectory('.');
console.log('✅ Finished cleaning merge conflicts!'); 