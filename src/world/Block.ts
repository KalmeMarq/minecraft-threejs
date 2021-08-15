import SoundType from "../sound/SoundType"

export default class Block {
  public name: string
  public id: number
  public sound: SoundType

  public constructor(id: number, name: string, sound: SoundType) {
    this.id = id
    this.name = name
    this.sound = sound
  }
}