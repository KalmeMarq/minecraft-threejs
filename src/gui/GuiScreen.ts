import Button from "./Button"
import Slot from "./Slot"
import * as PIXI from 'pixi.js'

export default abstract class GuiScreen {
  public container: PIXI.Container
  public btns: (Button | Slot)[]

  public constructor() {
    this.container = new PIXI.Container()
    this.btns = []
  }

  public init(): void {
  }

  public addButton(btn: Button | Slot): void {
    this.btns.push(btn)
    this.container.addChild(btn.container)
  }

  public updateUI(mouseX: number, mouseY: number): void {
    this.btns.forEach(b => {
      b.updateUI(mouseX, mouseY)
    })
  }

  public mouseClicked(mouseX: number, mouseY: number): void {
    this.btns.forEach(b => {
      b.mouseClicked(mouseX, mouseY)
    })
  }
}