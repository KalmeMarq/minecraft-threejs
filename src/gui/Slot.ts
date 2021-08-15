import * as PIXI from 'pixi.js'
import { pixiloader } from '..'
import BlockItem from '../world/BlockItem'

export default class Slot {
  public container: PIXI.Container
  public x: number
  public y: number
  public width: number
  public height: number
  public onPress: (button: Slot) => void
  private hovBg: PIXI.Graphics

  public constructor(x: number, y: number, width: number, height: number, item: BlockItem, onPress: (button: Slot) => void) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.onPress = onPress

    this.container = new PIXI.Container()
    this.container.x = this.x
    this.container.y = this.y

    this.hovBg = new PIXI.Graphics()
    this.hovBg.beginFill(0xffffff, 0.4)
    this.hovBg.drawRect(0, 0, 16, 16)
    this.hovBg.endFill()
    this.hovBg.visible = false

    let bg = new PIXI.Sprite(new PIXI.Texture(pixiloader.resources['stats_icons'].texture!.baseTexture, new PIXI.Rectangle(0, 0, 18, 18)))
    let icon = new PIXI.Sprite(pixiloader.resources[item.icon].texture)
    this.container.addChild(bg)
    icon.position.set(1, 1)
    this.hovBg.position.set(1, 1)
    this.container.addChild(icon)
    this.container.addChild(this.hovBg)
  }

  public updateUI(mouseX: number, mouseY: number): void {
    if(this.isHover(mouseX, mouseY)) {
      this.hovBg.visible = true
    } else {
      this.hovBg.visible = false
    }
  }

  public mouseClicked(mouseX: number, mouseY: number): void {
    if(this.isClicked(mouseX, mouseY)) {
      this.onPress(this)
    }
  }

  public isHover(mouseX: number, mouseY: number): boolean {
    return (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height)
  }

  public isClicked(xm: number, ym: number): boolean {
    return xm >= this.x && xm <= this.x + this.width && ym >= this.y && ym <= this.y + this.height
  }
}