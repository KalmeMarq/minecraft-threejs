import { screenBg, scaleW, scaleH, setScreen } from ".."
import Button from "./Button"
import GuiScreen from "./GuiScreen"

export default class SettingsScreen extends GuiScreen {
  public prevScreen: GuiScreen

  public constructor(prevScreen: GuiScreen) {
    super()
    this.prevScreen = prevScreen
  }

  public init(): void {
    this.container.addChild(screenBg)

    this.addButton(new Button(scaleW / 2 - 100, scaleH / 4 + 120, 200, 20, 'Done', () => {
      setScreen(this.prevScreen)
    }))
  }
}