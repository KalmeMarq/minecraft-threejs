import { scaleW, scaleH, screenBg, setScreen, stats, createText } from ".."
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

    let title = createText('Stats')
    title.position.set(scaleW / 2 - title.width / 2, 20)
    this.container.addChild(title)
    
    let placedTxt = createText('Placed')
    placedTxt.position.set(scaleW / 2 - 110, 35)
    this.container.addChild(placedTxt)

    let destroyedTxt = createText('Destroyed')
    destroyedTxt.position.set(scaleW / 2 + 110, 35)
    destroyedTxt.anchor.set(1, 0)
    this.container.addChild(destroyedTxt)

    Object.values(stats.placed).forEach((placed, i) => {
      let txt = createText(placed.item.block.name, 0xaaaaaa)
      let count = createText(placed.count.toString(), 0xaaaaaa)

      count.anchor.set(1, 0)
      txt.position.x = scaleW / 2 - 110
      count.position.x = scaleW / 2 - 10

      txt.position.y = 55 + (i * 20)
      count.position.y = 55 + (i * 20)
      this.container.addChild(txt, count)
    })

    Object.values(stats.broken).forEach((placed, i) => {
      let txt = createText(placed.item.block.name, 0xaaaaaa)
      let count = createText(placed.count.toString(), 0xaaaaaa)

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