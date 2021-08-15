import { resetWorld, scaleH, scaleW, screenBg, setScreen } from ".."
import Button from "./Button"
import GuiScreen from "./GuiScreen"
import SettingsScreen from "./SettingsScreen"
import StatsScreen from "./StatsScreen"

export default class IngameMenuScreen extends GuiScreen {
  public constructor() {
    super()
  }

  public init(): void {
    this.container.addChild(screenBg)

    this.addButton(new Button(scaleW / 2 - 100, scaleH / 4, 200, 20, 'Return to game', () => {
      setScreen(null)
    }))

    this.addButton(new Button(scaleW / 2 - 100, scaleH / 4 + 24, 200, 20, 'Statistics', () => {
      setScreen(new StatsScreen(this))
    }))

    this.addButton(new Button(scaleW / 2 - 100, scaleH / 4 + 48, 200, 20, 'Options...', () => {
      setScreen(new SettingsScreen(this))
    }))

    this.addButton(new Button(scaleW / 2 - 100, scaleH / 4 + 72, 200, 20, 'Reset', () => {
      resetWorld()
    }))
  }
}
