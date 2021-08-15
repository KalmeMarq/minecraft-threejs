import { scaleW, scaleH, screenBg, setScreen, stats } from ".."
import Helpers from "../util/Helpers"
import Button from "./Button"
import GuiScreen from "./GuiScreen"

export default class StatsScreen extends GuiScreen {
  public prevScreen: GuiScreen

  public constructor(prevScreen: GuiScreen) {
    super()
    this.prevScreen = prevScreen
  }

  public init(): void {
    this.container.addChild(screenBg)

    let title = Helpers.createText('Stats')
    title.position.set(scaleW / 2 - title.width / 2, 20)
    this.container.addChild(title)
    
    let placedTxt = Helpers.createText('Placed')
    placedTxt.position.set(scaleW / 2 - 110, 35)
    this.container.addChild(placedTxt)

    let destroyedTxt = Helpers.createText('Destroyed')
    destroyedTxt.position.set(scaleW / 2 + 110, 35)
    destroyedTxt.anchor.set(1, 0)
    this.container.addChild(destroyedTxt)

    Object.values(stats.placed).forEach((placed, i) => {
      let txt = Helpers.createText(placed.item.block.name, 0xaaaaaa)
      let count = Helpers.createText(placed.count.toString(), 0xaaaaaa)

      count.anchor.set(1, 0)
      txt.position.x = scaleW / 2 - 110
      count.position.x = scaleW / 2 - 10

      txt.position.y = 55 + (i * 20)
      count.position.y = 55 + (i * 20)
      this.container.addChild(txt, count)
    })

    Object.values(stats.broken).forEach((placed, i) => {
      let txt = Helpers.createText(placed.item.block.name, 0xaaaaaa)
      let count = Helpers.createText(placed.count.toString(), 0xaaaaaa)

      count.anchor.set(1, 0)
      txt.position.x = scaleW / 2 + 10
      count.position.x = scaleW / 2 + 110

      txt.position.y = 55 + (i * 20)
      count.position.y = 55 + (i * 20)
      this.container.addChild(txt, count)
    })

    this.addButton(new Button(scaleW / 2 - 100, scaleH / 4 + 120, 200, 20, 'Done', () => {
      setScreen(this.prevScreen)
    }))
  }
}