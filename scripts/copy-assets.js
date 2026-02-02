const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const assetsSrc = path.join(root, "assets");
const publicDir = path.join(root, "public");
const publicAssets = path.join(publicDir, "assets");

if (!fs.existsSync(assetsSrc)) process.exit(0);

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, name);
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(assetsSrc, publicAssets);

// Copy CNAME and .nojekyll if not already in public
["CNAME", ".nojekyll"].forEach((file) => {
  const rootFile = path.join(root, file);
  const publicFile = path.join(publicDir, file);
  if (fs.existsSync(rootFile) && !fs.existsSync(publicFile)) {
    fs.copyFileSync(rootFile, publicFile);
  }
});

// Copy Google verification if present
const googleVerification = path.join(root, "googlec155f574991bb7d4.html");
if (fs.existsSync(googleVerification)) {
  fs.copyFileSync(
    googleVerification,
    path.join(publicDir, "googlec155f574991bb7d4.html"),
  );
}

console.log("Assets copied to public/");
