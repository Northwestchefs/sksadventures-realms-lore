const fs = require("fs-extra")
const path = require("path")
const AdmZip = require("adm-zip")

const zipDir = "imports/zips"
const outDir = "assets/images/npcs"

async function run() {

  const files = await fs.readdir(zipDir)

  for (const file of files) {

    if (!file.endsWith(".zip")) continue

    const zipPath = path.join(zipDir, file)
    const zip = new AdmZip(zipPath)

    const extractPath = path.join("temp", file.replace(".zip",""))

    await fs.ensureDir(extractPath)

    zip.extractAllTo(extractPath, true)

    const images = await fs.readdir(extractPath)

    for (const img of images) {

      const src = path.join(extractPath, img)
      const dest = path.join(outDir, img)

      await fs.move(src, dest, { overwrite: true })
    }

    console.log("Imported:", file)
  }

}

run()