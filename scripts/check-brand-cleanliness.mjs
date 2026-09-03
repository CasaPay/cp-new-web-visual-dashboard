import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([".git", ".next", "node_modules"]);
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".toml",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);
const blockedTerms = [
  ["wo", "lt"].join(""),
  ["deli", "very"].join(""),
  ["fo", "od"].join(""),
];
const findings = [];

function scan(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

    const absolutePath = join(directory, entry.name);
    const projectPath = relative(root, absolutePath);
    const lowerPath = projectPath.toLowerCase();

    for (const term of blockedTerms) {
      if (lowerPath.includes(term)) findings.push(`${projectPath}: path contains blocked legacy term`);
    }

    if (entry.isDirectory()) {
      scan(absolutePath);
      continue;
    }

    if (!statSync(absolutePath).isFile() || !textExtensions.has(extname(entry.name).toLowerCase())) continue;

    const contents = readFileSync(absolutePath, "utf8").toLowerCase();
    for (const term of blockedTerms) {
      if (contents.includes(term)) findings.push(`${projectPath}: content contains blocked legacy term`);
    }
  }
}

scan(root);

if (findings.length > 0) {
  console.error(findings.join("\n"));
  process.exit(1);
}

console.log("Brand cleanliness check passed.");
