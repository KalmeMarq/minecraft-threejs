import { createText, pixiloader, soundPlayer } from ".."
import * as PIXI from 'pixi.js'
import SoundType from "../sound/SoundType"

export default class Button {
  public container: PIXI.Container
  public x: number
  public y: number
  public width: number
  public height: number
  public text: string
  public onPress: (button: Button) => void
  private btnDflt: PIXI.Texture
  private btnHov: PIXI.Texture
  private btnLkd: PIXI.Texture
  public active: boolean

  public constructor(x: number, y: number, width: number, height: number, text: string, onPress: (button: Button) => void) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.onPress = onPress
    this.text = text

    this.container = new PIXI.Container()
    this.container.x = this.x
    this.container.y = this.y

    this.btnDflt = new PIXI.Texture(pixiloader.resources['widgets'].texture!.baseTexture, new PIXI.Rectangle(0, 66, 200, 20))
    this.btnHov = new PIXI.Texture(pixiloader.resources['widgets'].texture!.baseTexture, new PIXI.Rectangle(0, 86, 200, 20))
    this.btnLkd = new PIXI.Texture(pixiloader.resources['widgets'].texture!.baseTexture, new PIXI.Rectangle(0, 46, 200, 20))

    let bg = new PIXI.Sprite(this.btnDflt)
    bg.name = 'bg'
    this.container.addChild(bg)

    let msg = createText(this.text)
    msg.position.x = this.width / 2
    msg.position.y = this.height / 2 + 1
    msg.anchor.set(0.5, 0.5)
  
    this.container.addChild(msg)
    this.active = true
  }

  public updateUI(mouseX: number, mouseY: number): void {
    if(!this.active) {
      (this.container.getChildByName('bg')  as PIXI.Sprite).texture = this.btnLkd
    } else if(this.isHover(mouseX, mouseY)) {
      (this.container.getChildByName('bg')  as PIXI.Sprite).texture = this.btnHov
    } else {
      (this.container.getChildByName('bg') as PIXI.Sprite).texture = this.btnDflt
    }
  }

  public mouseClicked(mouseX: number, mouseY: number): void {
    if(this.isClicked(mouseX, mouseY) && this.active) {
      this.onPress(this)
      soundPlayer.playSound(SoundType.UICLICK.soundBreak)
    }
  }

  public isHover(mouseX: number, mouseY: number): boolean {
    return (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height)
  }

  public isClicked(xm: number, ym: number): boolean {
    return xm >= this.x && xm <= this.x + this.width && ym >= this.y && ym <= this.y + this.height
  }
}