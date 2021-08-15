import BlockItem from "./BlockItem"

export default class ItemStack {
  item: BlockItem
  count: number

  public constructor(item: BlockItem, count: number) {
    this.item = item
    this.count = count
  }
}