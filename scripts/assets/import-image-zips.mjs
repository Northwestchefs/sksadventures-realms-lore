#!/usr/bin/env node
import fs from "node:fs/promises"
import path from "node:path"
import { spawn } from "node:child_process"

const repoRoot = process.cwd()
const stagingDir = path.resolve(repoRoot, "imports", "zips")
const outputBaseDir = path.resolve(repoRoot, "assets", "images")
const allowedTargets = new Set(["npcs", "monsters", "locations", "items", "factions", "misc"])

const runUnzipList = (zipPath) =>
  new Promise((resolve, reject) => {
    const child = spawn("unzip", ["-Z", "-1", zipPath], { stdio: ["ignore", "pipe", "pipe"] })
    let stdout = ""
    let stderr = ""

    child.stdout.on("data", (chunk) => {
      stdout += chunk
    })

    child.stderr.on("data", (chunk) => {
      stderr += chunk
    })

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Failed to inspect zip ${zipPath}: ${stderr.trim()}`))
        return
      }
      const entries = stdout
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
      resolve(entries)
    })
  })

const runUnzipExtract = (zipPath, destDir) =>
  new Promise((resolve, reject) => {
    const child = spawn("unzip", ["-o", zipPath, "-d", destDir], {
      stdio: ["ignore", "pipe", "pipe"],
    })
    let stderr = ""

    child.stdout.on("data", () => {})

    child.stderr.on("data", (chunk) => {
      stderr += chunk
    })

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Failed to extract zip ${zipPath}: ${stderr.trim()}`))
        return
      }
      resolve()
    })
  })

const isUnsafePath = (entry) => {
  const normalized = entry.replaceAll("\\", "/")
  if (normalized.startsWith("/") || normalized.includes("../")) {
    return true
  }

  const segments = normalized.split("/").filter(Boolean)
  return segments.some((segment) => segment === "." || segment === "..")
}

const validateZipContents = (entries, zipName) => {
  if (entries.length === 0) {
    throw new Error(`${zipName}: zip is empty`)
  }

  const fileEntries = entries.filter((entry) => !entry.endsWith("/"))
  if (fileEntries.length === 0) {
    throw new Error(`${zipName}: zip has no files`)
  }

  for (const entry of entries) {
    if (isUnsafePath(entry)) {
      throw new Error(`${zipName}: unsafe path detected (${entry})`)
    }
  }

  const roots = new Set(
    fileEntries
      .map((entry) => entry.replaceAll("\\", "/").split("/").filter(Boolean)[0])
      .filter(Boolean),
  )

  const invalidRoots = [...roots].filter((root) => !allowedTargets.has(root))
  if (invalidRoots.length > 0) {
    throw new Error(
      `${zipName}: invalid top-level folder(s): ${invalidRoots.join(", ")}. Use one of: ${[
        ...allowedTargets,
      ].join(", ")}`,
    )
  }
}

const ensureUnzipAvailable = async () => {
  try {
    await new Promise((resolve, reject) => {
      const child = spawn("unzip", ["-v"], { stdio: ["ignore", "ignore", "ignore"] })
      child.on("close", (code) => {
        if (code !== 0) {
          reject(new Error("unzip command not available"))
          return
        }
        resolve()
      })
      child.on("error", reject)
    })
  } catch (error) {
    throw new Error("The `unzip` command is required. Please install it and retry.")
  }
}

const collectZips = async () => {
  try {
    const entries = await fs.readdir(stagingDir, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".zip"))
      .map((entry) => path.join(stagingDir, entry.name))
      .sort((a, b) => a.localeCompare(b))
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return []
    }
    throw error
  }
}

const main = async () => {
  await ensureUnzipAvailable()

  const zipFiles = await collectZips()
  if (zipFiles.length === 0) {
    console.log(`No zip files found in ${path.relative(repoRoot, stagingDir)}/`)
    return
  }

  await fs.mkdir(outputBaseDir, { recursive: true })

  let importedCount = 0

  for (const zipPath of zipFiles) {
    const zipName = path.basename(zipPath)
    const entries = await runUnzipList(zipPath)
    validateZipContents(entries, zipName)

    await runUnzipExtract(zipPath, outputBaseDir)
    importedCount += 1
    console.log(`Imported ${zipName} into assets/images/`)
  }

  console.log(`Imported ${importedCount} zip file(s).`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
