import Sound from "./Sound"

export default class SoundType {
  public static NETHERRACK: SoundType
  public static GRASS: SoundType
  public static WOOD: SoundType
  public static STONE: SoundType
  public static WOOL: SoundType
  public static SAND: SoundType
  public static UICLICK: SoundType

  public volume: number
  public location: string
  public soundBreak: Sound
  public soundPlace: Sound
  private constructor(volume: number, location: string, soundBreak: Sound, soundPlace: Sound) {
    this.volume = volume
    this.location = location
    this.soundBreak = soundBreak
    this.soundPlace = soundPlace
  }

  private static _init = (() => {
    SoundType.NETHERRACK = new SoundType(0.2, 'block.netherrack.break', new Sound('block.netherrack.break'), new Sound('block.netherrack.place'))
    SoundType.GRASS = new SoundType(0.2, 'block.grass.break', new Sound('block.grass.break'), new Sound('block.grass.place'))
    SoundType.WOOD = new SoundType(0.2, 'block.wood.break', new Sound('block.wood.break'), new Sound('block.wood.place'))
    SoundType.STONE = new SoundType(0.2, 'block.stone.break', new Sound('block.stone.break'), new Sound('block.stone.place'))
    SoundType.WOOL = new SoundType(0.2, 'block.wool.break', new Sound('block.wool.break'), new Sound('block.wool.place'))
    SoundType.SAND = new SoundType(0.2, 'ui.button.click', new Sound('block.sand.break'), new Sound('block.sand.place'))
    SoundType.UICLICK = new SoundType(0.2, 'ui.button.click', new Sound('ui.button.click'), new Sound('ui.button.click'))
  })()
}