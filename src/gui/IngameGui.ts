import { pixiloader, scaleW, scaleH, blockSelected, inventory } from ".."
import * as PIXI from 'pixi.js'
import Helpers from "../util/Helpers"

export default class IngameGui {
  public container: PIXI.Container
  public hotbarTxr: PIXI.Texture
  public slotSldTxr: PIXI.Texture
  public selectedSprite: PIXI.Sprite
  private inv: PIXI.Container
  private itemSelected: PIXI.Text
  private cursor: PIXI.Sprite

  public constructor() {
    this.container = new PIXI.Container()

    this.hotbarTxr = new PIXI.Texture(pixiloader.resources['widgets'].texture!.baseTexture, new PIXI.Rectangle(0, 0, 182, 22))
    this.slotSldTxr = new PIXI.Texture(pixiloader.resources['widgets'].texture!.baseTexture, new PIXI.Rectangle(0, 22, 24, 22))

    let hotbar = new PIXI.Sprite(this.hotbarTxr)
    hotbar.position.x = scaleW / 2 - 91
    hotbar.position.y = scaleH - 22
    this.container.addChild(hotbar)

    this.selectedSprite = new PIXI.Sprite(this.slotSldTxr)
    this.selectedSprite.position.y = scaleH - 23
    this.selectedSprite.position.x = scaleW / 2 - 91 + (blockSelected * 20) - 21

    this.inv = new PIXI.Container()
    inventory.forEach((slot, i) => {
      if(slot !== null) {
        let icon = new PIXI.Sprite(pixiloader.resources[slot.item.icon].texture)
        icon.position.x = scaleW / 2 - 91 + (i * 20) + 3
        icon.position.y = scaleH - 19

        let msg = Helpers.createText(slot.count.toString())
        msg.position.x = scaleW / 2 - 91 + (i * 20) + 21
        msg.position.y = scaleH - 11
        msg.anchor.set(1, 0)
        this.inv.addChild(icon)
        this.inv.addChild(msg)
      }
    })

    this.container.addChild(this.inv)

    this.container.addChild(this.selectedSprite)

    this.itemSelected = Helpers.createText(inventory[blockSelected - 1]?.item.block.name ?? '')
    this.itemSelected.position.x = scaleW / 2 - this.itemSelected.width / 2
    this.itemSelected.position.y = scaleH - 40
    this.container.addChild(this.itemSelected)

    this.cursor = new PIXI.Sprite(new PIXI.Texture(pixiloader.resources['icons'].texture!.baseTexture, new PIXI.Rectangle(3, 3, 9, 9)))
    this.cursor.position.set(scaleW / 2 - this.cursor.width / 2, scaleH / 2 - this.cursor.height / 2)
    this.container.addChild(this.cursor)
  }

  public updateUI(): void {
  }

  public updateInventory(): void {
    this.inv.removeChildren()
    this.selectedSprite.position.x = scaleW / 2 - 91 + (blockSelected * 20) - 21
    
    inventory.forEach((slot, i) => {
      if(slot !== null) {
        let icon = new PIXI.Sprite(pixiloader.resources[slot.item.icon].texture)
        icon.position.x = scaleW / 2 - 91 + (i * 20) + 3
        icon.position.y = scaleH - 19

        let msg = Helpers.createText(slot.count.toString())
        msg.position.x = scaleW / 2 - 91 + (i * 20) + 21
        msg.position.y = scaleH - 11
        msg.anchor.set(1, 0)
        this.inv.addChild(icon)
        this.inv.addChild(msg)
      }
    })

    this.itemSelected.text = inventory[blockSelected - 1]?.item.block.name ?? ''
    this.itemSelected.position.x = scaleW / 2 - this.itemSelected.width / 2
  }
}