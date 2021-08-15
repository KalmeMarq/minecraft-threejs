import { Graphics } from "pixi.js";
import { createText, scaleH, scaleW } from "..";
import GuiScreen from "./GuiScreen";

export default class LoadingScreen extends GuiScreen {
  public init(): void {
    let bg = new Graphics()
    bg.beginFill(0x000000)
    bg.drawRect(0, 0, scaleW, scaleH)
    bg.endFill() 

    let dots = '...'
    let txt = createText('Loading Assets' + dots)
    txt.position.set(scaleW / 2 - txt.width / 2, scaleH / 2 - txt.height)

    this.container.addChild(bg)
    this.container.addChild(txt)
  }
}