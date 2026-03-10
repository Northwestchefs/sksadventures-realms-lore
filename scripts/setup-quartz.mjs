#!/usr/bin/env node

import { existsSync } from "node:fs"
import { spawnSync } from "node:child_process"
import { resolve } from "node:path"

const quartzDir = resolve(process.cwd(), "quartz")
const quartzGitDir = resolve(quartzDir, ".git")

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, { stdio: "inherit", ...options })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

if (!existsSync(quartzGitDir)) {
  console.log("Quartz source missing. Cloning official Quartz repository into ./quartz/")
  run("git", ["clone", "--depth", "1", "https://github.com/jackyzha0/quartz.git", quartzDir])
} else {
  console.log("Quartz source already present at ./quartz/. Skipping clone.")
}

console.log("Installing Quartz dependencies in ./quartz/")
run("npm", ["install"], { cwd: quartzDir })

console.log("Quartz setup complete.")
