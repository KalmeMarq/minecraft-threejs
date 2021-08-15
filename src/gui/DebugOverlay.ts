import { Container, Graphics } from "pixi.js";
import { blocks, camera, controls, fps, light, world } from "..";
import Helpers from "../util/Helpers";

export default class DebugOverlay {
  public container: Container
  public info: string[]

  public constructor() {
    this.container = new Container()
    this.info = [
      'Press F3 to Open/Close',
      'Press Q to remove one ofthe item',
      'Press Ctrl + Q to remove an item',
      'Press R to go back to spawn',
      'Hold F to show inventory',
      'Use the mouse wheel to change selected item'
    ]

    setInterval(() => {
      if(this.container.visible) {
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

        if(world.lookingBlock !== null) {
          additTexts.push('')
          additTexts.push(`Looking at block: ${world.lookingBlock[0]}, ${world.lookingBlock[1]}, ${world.lookingBlock[2]}`)
          additTexts.push(`Targeted Block: ${blocks[world.lookingBlock[3] - 1]} (${world.lookingBlock[3]})`)
        }

          this.setTexts(additTexts)
        }
    }, 500)
  }

  public setTexts(texts: string[]) {
    this.container.removeChildren()
    ;([...this.info, ...texts] as string[]).forEach((t, i) => {
      let tt = new Container()
  
      let txt = Helpers.createText(t)
      tt.addChild(txt)
  
      let dbgBg = new Graphics()
      dbgBg.beginFill(0x999999, 0.30)
      dbgBg.drawRect(0, 0, tt.width, tt.height)
      dbgBg.endFill()
  
      if(t !== '') tt.addChildAt(dbgBg, 0)
      tt.position.x = 1 
      tt.position.y = tt.height * i + 1
      txt.position.x = 1
      txt.position.y = 1
  
      this.container.addChild(tt)
    })
  }
}