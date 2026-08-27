import { mkdir, writeFile, stat } from "node:fs/promises"
import { resolve } from "node:path"

const images: Record<string, string> = {
  "icehouse-tomato.jpg": "https://images.unsplash.com/photo-1546470427-e26264be0b0d?auto=format&fit=crop&w=1200&h=1600&q=80",
  "brickyard-paste.jpg": "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=1200&h=1600&q=80",
  "widows-pepper.jpg": "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=1200&h=1600&q=80",
  "black-river-cucumber.jpg": "https://images.unsplash.com/photo-1449300079323-02e209d3d7a5?auto=format&fit=crop&w=1200&h=1600&q=80",
  "lantern-squash.jpg": "https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=1200&h=1600&q=80",
  "esopus-melon.jpg": "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?auto=format&fit=crop&w=1200&h=1600&q=80",
  "crows-beak-bean.jpg": "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&w=1200&h=1600&q=80",
  "pastors-pea.jpg": "https://images.unsplash.com/photo-1597362925123-77861d3abf7a?auto=format&fit=crop&w=1200&h=1600&q=80",
  "mile-marker-kale.jpg": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&h=1600&q=80",
  "shoreline-lettuce.jpg": "https://images.unsplash.com/photo-1622205313162-be1d5712a53c?auto=format&fit=crop&w=1200&h=1600&q=80",
  "hollow-stem-chard.jpg": "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=1200&h=1600&q=80",
  "cutting-celery.jpg": "https://images.unsplash.com/photo-1583663848850-46af132dc08e?auto=format&fit=crop&w=1200&h=1600&q=80",
  "tivoli-carrot.jpg": "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=1200&h=1600&q=80",
  "river-road-beet.jpg": "https://images.unsplash.com/photo-1593105544559-ecb03bf76b66?auto=format&fit=crop&w=1200&h=1600&q=80",
  "fast-freight-radish.jpg": "https://images.unsplash.com/photo-1587411768638-ec71f8e303b0?auto=format&fit=crop&w=1200&h=1600&q=80",
  "stone-fence-onion.jpg": "https://images.unsplash.com/photo-1508747703725-01999d0b1874?auto=format&fit=crop&w=1200&h=1600&q=80",
  "nine-mile-flint.jpg": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&h=1600&q=80",
}

async function run() {
  const dir = resolve(process.cwd(), "public/varieties")
  await mkdir(dir, { recursive: true })
  for (const [name, url] of Object.entries(images)) {
    const response = await fetch(url, { redirect: "follow" })
    if (!response.ok) {
      console.error(`FAIL ${name} ${response.status}`)
      continue
    }
    const buffer = Buffer.from(await response.arrayBuffer())
    const path = resolve(dir, name)
    await writeFile(path, buffer)
    const info = await stat(path)
    console.log(`${name} ${info.size} bytes`)
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
