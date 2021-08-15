import * as THREE from 'three'
import Block from './world/Block'
import BlockAtlas from './BlockAtlas'
import BlockItem from './world/BlockItem'
import Blocks from './world/Blocks'
import Helpers from './util/Helpers'
import InteractionResult from './util/InteractionResult'
import Items from './world/Items'
import ItemStack from './world/ItemStack'
import PointerLockControls from './util/PointerControlsLock'
import SoundPlayer from './sound/SoundPlayer'
import { IModel, IFinalModel, ISoundDefinitions } from './util/types'
import VoxelWorld from './world/VoxelWorld'
import * as PIXI from 'pixi.js'
import { Graphics } from 'pixi.js'
import Button from './gui/Button'
import Slot from './gui/Slot'
import GuiScreen from './gui/GuiScreen'
import IngameMenuScreen from './gui/IngameMenuScreen'
import LoadingScreen from './gui/LoadingScreen'
import IngameGui from './gui/IngameGui'

export let blocksModelsNew = new Map<number, IFinalModel>()

export let scene: THREE.Scene
export let world: VoxelWorld
export let renderer: THREE.WebGLRenderer
export let camera: THREE.Camera

let xPos = 0
let yPos = 0

window.addEventListener('mousemove', (e) => {
  xPos = e.clientX / 3
  yPos = e.clientY / 3
})

const color = 0xffffff;
const intensity = 0.9;
const light = new THREE.HemisphereLight(color, 1, intensity);

export const pixiRenderer = PIXI.autoDetectRenderer({ width: window.innerWidth, height: window.innerHeight, backgroundAlpha: 0.0 })
export const pixiRoot = new PIXI.Container()
export const pixiloader = new PIXI.Loader()

let texture: any
export let stats: { placed: { [key: string]: { item: BlockItem, count: number } }, broken: { [key: string]: { item: BlockItem, count: number } } } = {
  placed: {

  },
  broken: {

  }
} 

export function createText(text: string, color?: number) {
  let t = new PIXI.Text(text, {
    fontFamily: 'MC',
    fontSize: 40,
    fill: color ?? 'white',
    dropShadow: true,
    letterSpacing: 2,
    dropShadowAngle: Math.PI/4,
    strokeThickness: 0,
    dropShadowDistance: 9,
    dropShadowColor: 0x333333
  })
  t.scale.set(0.2, 0.2)
  return t
}

export let scaleW = window.innerWidth / 3
export let scaleH = window.innerHeight / 3

export let soundPlayer: SoundPlayer 

export let blockSelected = 1
export let inventory = new Array<null | ItemStack>(9).fill(null)
inventory[0] = new ItemStack(Items.BEDROCK, 64)
inventory[1] = new ItemStack(Items.OAK_PLANKS, 64)
inventory[2] = new ItemStack(Items.STONE, 64)
inventory[3] = new ItemStack(Items.DIRT, 64)
inventory[4] = new ItemStack(Items.OAK_PLANKS_SLAB, 64)
inventory[5] = new ItemStack(Items.RED_WOOL, 64)
inventory[6] = new ItemStack(Items.SAND, 64)
console.log('inv', inventory)

let flatWorldBlocks = [1, 3, 3, 3, 64]

function genChunk(xP: number, zP: number) {
  const startX = xP * world.chunkSize;
  const startZ = zP * world.chunkSize;

  for(let y = 0; y < flatWorldBlocks.length; ++y) {
    for (let z = startZ; z < startZ + world.chunkSize; ++z) {
      for (let x = startX; x < startX + world.chunkSize; ++x) {
        world.setVoxel(x, y, z, flatWorldBlocks[y]);
      }
    }
  }

  updateChunkGeometry(xP, zP)
}

function updateChunkGeometry(x: number, z: number) {
  const cellId = world.computeChunkId(x, z);
  let mesh = world.chunkIdToMesh[cellId];
  const geometry = mesh ? mesh.geometry : new THREE.BufferGeometry();
  
  const {positions, normals, uvs, indices, colors} = world.generateGeometryDataForChunk(x, z);
  const positionNumComponents = 3;
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
  const normalNumComponents = 3;
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
  const colorNumComponents = 3;
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
  const uvNumComponents = 2;
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();

  if (!mesh) {
    mesh = new THREE.Mesh(geometry, world.material);
    mesh.name = cellId;
    world.chunkIdToMesh[cellId] = mesh;
    scene.add(mesh);
    // mesh.position.set(x * world.chunkSize, 0, z * world.chunkSize);
  }
} 

let gui: IngameGui | null = null
let screen: GuiScreen | null = null
export function setScreen(scrn: null | GuiScreen) {
  if(screen) {
    pixiRoot.removeChild(screen.container)
  }

  screen = scrn
  if(screen) {
    screen.init()
    pixiRoot.addChild(screen.container)
  }
}

export let screenBg = new PIXI.Graphics()
screenBg.beginFill(0x000000, 0.70)
screenBg.drawRect(0, 0, scaleW, scaleH)
screenBg.endFill()


export function resetWorld() {
  scene.remove(light)

  Object.values(world.chunkIdToMesh).forEach((lv: any) => {
    scene.remove(lv)
  })

  scene.add(light)
  world.clear()
  world = new VoxelWorld({
    chunkHeight: 128,
    chunkSize: 16,
    texture: texture
  })

  genChunk(0, 0)
  genChunk(-1, 0)
  genChunk(0, -1)
  genChunk(-1, -1)

  camera.position.x = 0
  camera.position.y = 7
  camera.position.z = 14
}

;(async() => {
  let imgs: string[] = await (await fetch('assets/textures.json')).json()

  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
  PIXI.settings.RESOLUTION = window.devicePixelRatio
  PIXI.settings.ROUND_PIXELS = false;


  pixiRoot.scale.set(3, 3)

  await new Promise<void>((resolve, reject) => {
    let loads = imgs.map(img => {
      return {
        name: 'assets/textures/block/' + img + '.png',
        url: 'assets/textures/block/' + img + '.png'
      }
    })
    pixiloader.add([...loads,
      { name: 'widgets', url: 'assets/textures/gui/widgets.png' },
      { name: 'stats_icons', url: 'assets/textures/gui/container/stats_icons.png' },
    {
      name: 'icons', url: 'assets/textures/gui/icons.png'
    }]).load(() => {
      resolve()
    })
  })

 


  let debugOverlay = new PIXI.Container()
  let infos = [
    'Press F3 to Open/Close',
    'Press Q to remove one ofthe item',
    'Press Ctrl + Q to remove an item',
    'Press R to go back to spawn',
    'Hold F to show inventory',
    'Use the mouse wheel to change selected item'
  ]
  let debugTexts = [
    ...infos
  ]
  function addDebugTexts() {
    debugOverlay.removeChildren()
    debugTexts.forEach((t, i) => {
      let tt = new PIXI.Container()
  
      let txt = createText(t)
      tt.addChild(txt)
  
      let dbgBg = new PIXI.Graphics()
      dbgBg.beginFill(0x999999, 0.30)
      dbgBg.drawRect(0, 0, tt.width, tt.height)
      dbgBg.endFill()
  
      if(t !== '') tt.addChildAt(dbgBg, 0)
      tt.position.x = 1 
      tt.position.y = tt.height * i + 1
      txt.position.x = 1
      txt.position.y = 1
  
      debugOverlay.addChild(tt)
    })
  }
  addDebugTexts()

  class InventoryScreen extends GuiScreen {
    public prevScreen: GuiScreen | null

    public constructor(prevScreen: GuiScreen | null) {
      super()
      this.prevScreen = prevScreen
    }

    public init(): void {
      let bg = new Graphics()
      bg.beginFill(0xff0000, 0.5)
      let items = Object.values(Items)
      let w = 18 * 9
      let h = 18 * Math.floor(items.length / 9)
      bg.drawRect(scaleW - w, 0, w, h)
      bg.endFill()

      this.container.addChild(bg)

      items.forEach((el: BlockItem, i) => {
        if(el !== null && el !== undefined) {
          // let item = new PIXI.Container()
          // let icon = new PIXI.Sprite(pixiloader.resources[el.icon].texture)

          // item.addChild(icon)
          // item.position.set(, 0
          //   + 
          // )

          this.addButton(new Slot(scaleW - w + ((i % 9) * 18), (Math.floor(i / 9) * 18), 18, 18, el, () => {
            inventory[blockSelected - 1] = new ItemStack(el, 64)
            updateUIInv()
          }))

          // this.container.addChild(item)
        }
      })
    }
  }

  function updateUI() {
    if(gui) {
      gui.updateUI()
    }
    
    if(screen) {
      screen.updateUI(xPos, yPos)
    }
  }

  window.addEventListener('mousedown', (e) => {
    xPos = e.clientX / 3
    yPos = e.clientY / 3

    if(screen) {
      screen.mouseClicked(xPos, yPos)
    }
  })



  pixiRoot.addChild(debugOverlay)
  gui = new IngameGui()
  // if(gui) pixiRoot.addChild(gui.container)
  setScreen(new IngameMenuScreen())
  // setScreen(new LoadingScreen())

  let sinvUI = false
  window.addEventListener('keydown', (e) => {
    if(!sinvUI && e.key === 'f') {
      sinvUI = true
      controls.unlock()
      setScreen(new InventoryScreen(null))
    }
  })

  window.addEventListener('keyup', (e) => {
    if(sinvUI && e.key === 'f') {
      sinvUI = false
      setScreen(null)
    }
  })

  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !screen) {
      setScreen(new IngameMenuScreen())
    } else if(e.key === 'Escape') {
      setScreen(null)
    }

  /*   if(e.key === 'e') {
      setScreen(new InventoryScreen(null))
      controls.unlock()
    } */
  })

  let soundDefinitions: ISoundDefinitions = await (await fetch('assets/sounds.json')).json()
  soundPlayer = new SoundPlayer(soundDefinitions)


  let blockAtlasNew = new BlockAtlas(imgs.sort((a: any, b: any) => (a - b) ? -1 : 1))
  const finalBlockAtlas = (await blockAtlasNew.create()).toDataURL()

  {
    let title = document.createElement('p')
    title.innerText = 'Block Atlas'
    let img = new Image()
    img.src = finalBlockAtlas
    document.body.appendChild(title)
    document.body.appendChild(img)
  }

  /* Generate model */
 
  let blocksModelsRaw = new Map<string, IModel>()
  let modelsFile = await (await fetch('assets/models.json')).json()
  let templateModels = modelsFile.template_models
  let blocks: string[] = modelsFile.models

  /* Get block atlas */
  const loader = new THREE.TextureLoader();
  texture = loader.load(finalBlockAtlas)

  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  /* Generate all block models */
  let l = document.getElementById('loading') as HTMLDivElement
  await new Promise<void>(async (resolve, reject) => {
    console.log('-----------------');
    
    for(let i = 0; i < blocks.length + templateModels.length; i++) {
      let model = [...blocks, ...templateModels][i]
      const res = await fetch('assets/models/block/' + model + '.json')
      const data = await res.json()
      blocksModelsRaw.set('models/block/' + model, data as IModel)
    }

    for(let i = 0; i < blocks.length; i++) {
      let b = Helpers.generateFinalModelV2('models/block/' + blocks[i], blockAtlasNew, blocksModelsRaw)
      if(b) blocksModelsNew.set(i + 1, b)
      l.appendChild(document.createTextNode(('block model: ' + blocks[i] + ' (' + (Math.round(i * 100 / blocks.length)) + '%)\n')))
      l.appendChild(document.createElement('br'))
      l.scroll(0, l.scrollHeight)
    }

    l.appendChild(document.createTextNode(('block models: finished')));
    l.appendChild(document.createElement('br'))
    l.scroll(0, l.scrollHeight)
    resolve()
  })

  /* Block selection */
  // let selectInput = document.getElementById('blocks_sel') as HTMLSelectElement
/* 
  blocks.forEach((b, i) => {
    let op = document.createElement('option')
    op.innerText = b.replaceAll('_', ' ') + ' | ID(' + (i + 1) + ')'
    op.value = (i + 1).toString()
    selectInput.appendChild(op)
  }) */

 /*  selectInput.addEventListener('click', (e) => {
    e.stopPropagation()
  }) */

/*   selectInput.addEventListener('change', () => {
    blockSelected = selectInput.options.selectedIndex + 1
    updateUIInv()
  })
 */
  window.addEventListener('keyup', (e) => {
    if(e.key >= '1' && e.key <= '9') {
      blockSelected = Number(e.key)
      // selectInput.options.selectedIndex = blockSelected -1
      updateUIInv()
    }

    if(e.key === 'q' && e.ctrlKey) {
      inventory[blockSelected - 1] = null
      updateUIInv()
    } else if(e.key === 'q' && inventory[blockSelected - 1]) {
      inventory[blockSelected - 1]!.count -= 1
      if(inventory[blockSelected -1]!.count <= 0) {
      inventory[blockSelected - 1] = null
      }
      updateUIInv()
    }

    if(e.key === 'r') {
      camera.position.x = 0
      camera.position.y = 7
      camera.position.z = 14
    }
  })

  let sA = true
  window.addEventListener('keydown', (e) => {
    if(e.key === 'F3') {
      e.preventDefault()
      sA = !sA
      debugOverlay.visible = !debugOverlay.visible
    }
  })

  window.addEventListener('wheel', (e) => {
    e.preventDefault()
    blockSelected = (blockSelected + e.deltaY / 100) % 9
    if(blockSelected <= 0) blockSelected = 9
    // selectInput.options.selectedIndex = blockSelected -1
    updateUIInv()
  }, { passive: false })

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.autoClear = false;
  renderer.domElement.id = 'bruh'
  renderer.domElement.style.pointerEvents = 'none'
  document.body.prepend(renderer.domElement)

  /* Inv Test */

  
  // let invUI = document.getElementById('inventory') as HTMLDivElement

  // invUI.addEventListener('click', (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  // })



  // invUI.innerHTML = ''
  // Object.values(Items).forEach((el: BlockItem) => {
  //   if(el !== undefined) {
  //     let btn = document.createElement('button')
  //     let img = document.createElement('img')
  //     img.src = el.icon
  //     btn.addEventListener('click', (e) => {
  //       console.log('sss');
        
  //       inventory[blockSelected - 1] = new ItemStack(el, 64)
  //       updateUIInv()
  //     })
  //     btn.appendChild(img)
  //     invUI.appendChild(btn)
  //   }
  // })

  function updateUIInv() {
    if(gui) {
      gui.updateInventory()
    }
    // hotbarUI.innerHTML = ''

    // inventory.forEach((item, i) => {
    // /*   let el = document.createElement('li')
    //   if(item) {
    //     el.innerText = `Slot ${i + 1} ${item.count}x ${item.item.block.name}`
    //     let img = document.createElement('img')
    //     img.src = item.item.icon
    //     el.prepend(img)
    //   } else {
    //     el.innerText = `Slot ${i + 1} 0x empty`
    //   }

    //   if(blockSelected - 1 === i) {
    //     el.className = 'seld'
    //   }
      
    //   invUI.appendChild(el) */

    //   let el1 = document.createElement('div')
    //   el1.className = 'slot'

    //   if(item) {
    //     let span = document.createElement('span')
    //     span.innerText = `${item.count}`
    //     let img = document.createElement('img')
    //     img.src = item.item.icon
    //     el1.prepend(img)
    //     el1.prepend(span)
    //   } else {
        
    //   }

    //   if(blockSelected - 1 === i) {
    //     el1.classList.add('seld')
    //     if(item?.item) {
    //       if(selectedUI) selectedUI.innerText = item.item.block.name ?? ''
          
    //     } else {
    //       if(selectedUI) selectedUI.innerText = ''
    //     }

    //   }

    //   hotbarUI.appendChild(el1)
    // })
  }

  updateUIInv()

  l.style.display = 'none'
  /* World */
  scene = new THREE.Scene()
  scene.background = new THREE.Color('hsl(203, 92%, 75%)')
  scene.fog = new THREE.Fog(0xffffff, 10, 200)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.x = 0
  camera.position.y = 7
  camera.position.z = 14

  let controls = new PointerLockControls(camera, document.body)
  document.body.addEventListener("click", () => {
    if(screen === null) {
      controls.lock()
    }
  })

  let speed = 0.25
  let keys: {[key: string]: number} = {}

  window.addEventListener('keydown', (e) => {
    if(keys[e.key] === 1) {
      keys[e.key] = 2
      return 
    }
    keys[e.key] = 1
  })
  window.addEventListener('keyup', (e) => {
    if(keys[e.key] === 2) {
      keys[e.key] = 1
      setTimeout(() => {
        keys[e.key] = 0
      }, 20)
    }
    keys[e.key] = 0
  })


  light.position.set(16, 30, 16);
  scene.add(light);


  world = new VoxelWorld({
    texture: texture,
    chunkSize: 16,
    chunkHeight: 128
  });



  genChunk(0, 0)
  genChunk(-1, 0)
  genChunk(0, -1)
  genChunk(-1, -1)


  

  let lookingBlock: null | [number, number, number, number] = null


  var lastLoop = Date.now();
  let fps = 0


  setInterval(() => {
    if(sA) {
      let cx = camera.position.x.toFixed(3)
    let cy = camera.position.y.toFixed(3)
    let cz = camera.position.z.toFixed(3)

    let z = controls.getDirection().z
    let m = controls.getDirection().x
    let direction = ''
    if(m <= 0.65 && m >= -0.75) {
      if(z < 0) {
        direction = 'south'
      } else {
        direction = 'north'
      }
    } else {
      if(z < 0) {
        direction = 'west'
      } else {
        direction = 'east'
      }
    }

    let additTexts = [
      '',
      `FPS: ${Math.floor(fps)}`,
      `XYZ: ${(cx)}, ${(cy)}, ${(cz)}`,
      `Block: ${Math.floor(camera.position.x)}, ${Math.floor(camera.position.y)}, ${Math.floor(camera.position.z)}`,
      `Facing: ${direction}`,
      `Light: ${light.intensity * 15}`,
    ]

    debugTexts = [
      ...infos,
      ...additTexts
    ]

    if(world.lookingBlock !== null) {
      debugTexts.push('')
      debugTexts.push(`Looking at block: ${world.lookingBlock[0]}, ${world.lookingBlock[1]}, ${world.lookingBlock[2]}`)
      debugTexts.push(`Targeted Block: ${blocks[world.lookingBlock[3] - 1]} (${world.lookingBlock[3]})`)
    }

      addDebugTexts()
    }
  }, 500)

  let velFor = 0

  const scene2D = new THREE.Scene();
  const width = window.innerWidth
  const height = window.innerHeight
  const camera2D = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1 ,1000);
  camera2D.position.z = 10;


  const uiTexture = new THREE.Texture(pixiRenderer.view);
  const uiMaterial = new THREE.MeshBasicMaterial({
    map: uiTexture,
    transparent: true,
  });
  const uiGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 2);
  const uiMesh = new THREE.Mesh(uiGeometry, uiMaterial);
  scene2D.add(uiMesh);

  function loop() {
    updateUI()
    pixiRenderer.render(pixiRoot)
    uiTexture.needsUpdate = true

    if(keys[' '] === 1) {
      camera.position.y += speed
      world.selection()
    }

    if(keys['Shift'] === 1) {
      camera.position.y -= speed
      world.selection()
    }

    if((keys['w'] === 1) || (keys['w'] === 2) || velFor !== 0) {
      if(keys['w'] === 1) {
        controls.moveForward(speed)
      } else {
        if(velFor < 0) {
          velFor = 0
        }
        else if(velFor !== 0) velFor -= 0.008
        else velFor = speed
        controls.moveForward(velFor)
      }
      world.selection()
    }
    if(keys['s'] === 1) {
      controls.moveForward(-1 * speed)
      world.selection()
    }
    if(keys['a'] === 1) {
      controls.moveRight(-1 * speed)
      world.selection()
    }
    if(keys['d'] === 1) {
      controls.moveRight(speed)
      world.selection()

    }

    renderer.render(scene, camera)

    renderer.render(scene2D, camera2D)

      var thisLoop = Date.now();
      fps = 1000 / (thisLoop - lastLoop);
      lastLoop = thisLoop;



    requestAnimationFrame(loop)
  }
  loop()
 

  function removeVoxel(event: any) {
    const pos = world.getCanvasRelativePosition(event);
    const x = (pos.x / renderer.domElement.width) *  2 - 1;
    const y = (pos.y / renderer.domElement.height) * -2 + 1; 

    const start = new THREE.Vector3();
    const end = new THREE.Vector3();
    start.setFromMatrixPosition(camera.matrixWorld);
    end.set(x, y, 1).unproject(camera);

    const intersection = world.intersectRay(start, end);
    if (intersection) {
      const voxelId = 0
      let pos = intersection.position.map((v, ndx) => {
        return v + intersection.normal[ndx] * (voxelId > 0 ? 0.5 : -0.5);
      });
      
      world.deleteVoxel(pos[0], pos[1], pos[2])
      world.updateVoxelGeometry(pos[0], pos[1], pos[2], true)
      world.selection()
      let items = Object.values(Items)
      let blocks = Object.values(Blocks)

      let block: Block = blocks.slice(0, blocks.length - 1).find(b => {
        if(b.id) {
          return b.id === intersection.voxel
        } else {
          return -1
        }
      })

      let item: BlockItem = items.slice(0, blocks.length - 1).find((b: null | BlockItem) => {
        if(b) {
          return b.block.id === intersection.voxel
        } else {
          return -1
        }
      })

      soundPlayer.playSound(block.sound.soundPlace)

      if(!stats.broken[item.block.name]) {
        stats.broken[item.block.name] = {
          item: item,
          count: 1
        }
      } else {
        stats.broken[item.block.name].count += 1
      }
      
      let i = inventory.findIndex(n => {
        if(n instanceof ItemStack) {
          return n.item.block.id === block.id
        } else {
          return -1
        }
      })

      if(i >= 0) {
        if(inventory[i]) {
          inventory[i]!.count += 1 
          updateUIInv()
        }
        else {
          let j = inventory.findIndex(l => {
            return l === null
          })
          
          if(j >= 0)inventory[j] = new ItemStack(item, 1)
          updateUIInv()
        }
      }
    }
  }

  window.addEventListener('pointermove', (e) =>  world.selection(e))
  window.addEventListener('pointerup', (e) => {
    if(e.button === 2 && !screen) {
      let sel = blockSelected - 1
      let itemStack = inventory[sel]
      if(itemStack) {
        let wasUsed = itemStack.item.use(soundPlayer)
        
        if(wasUsed === InteractionResult.SUCCESS) {
          itemStack.count -= 1
          
          if(itemStack.count <= 0) {
            inventory[sel] = null
          }
          updateUIInv()
        }
      }
    }

    if(e.button === 0 && !screen) {
      removeVoxel(e)
    }
  }, {passive: false})

 
})()