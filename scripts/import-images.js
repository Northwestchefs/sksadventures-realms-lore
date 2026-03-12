const fs = require("fs-extra")
const path = require("path")
const AdmZip = require("adm-zip")

const zipDir = "imports/zips"
const baseOutput = "assets/images/npcs"

function parseMetadata(filename) {

  const name = filename.toLowerCase()

  let race = "unknown"
  let gender = "unknown"
  let role = "npc"

  const races = ["elf","human","dwarf","orc","tiefling","gnome","halfling","dragonborn"]
  const genders = ["male","female"]
  const roles = ["tavern","merchant","guard","wizard","fighter","rogue","cleric","druid"]

  races.forEach(r => { if (name.includes(r)) race = r })
  genders.forEach(g => { if (name.includes(g)) gender = g })
  roles.forEach(c => { if (name.includes(c)) role = c })

  return { race, gender, role }
}

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

      const meta = parseMetadata(img)

      const destFolder = path.join(
        baseOutput,
        meta.race,
        meta.gender,
        meta.role
      )

      await fs.ensureDir(destFolder)

      const src = path.join(extractPath, img)
      const dest = path.join(destFolder, img)

      await fs.move(src, dest, { overwrite: true })

      console.log(`Moved ${img} → ${destFolder}`)
    }

    console.log("Finished importing:", file)
  }

}

run()