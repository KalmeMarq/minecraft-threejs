import { ISoundDefinitions } from "../types"
import Sound from "./Sound"
import SoundType from "./SoundType"

export default class SoundPlayer {
  public soundDefs: ISoundDefinitions
  public context
  public gainNode
  private soundBuffers: Map<string, AudioBuffer>
  private sounds: Map<string, Sound>

  public constructor(soundDefs: ISoundDefinitions) {
    this.soundDefs = soundDefs
    this.context = new AudioContext()
    this.gainNode = this.context.createGain()
    this.gainNode.connect(this.context.destination)
    this.soundBuffers = new Map()
    this.sounds = new Map()
  }

  /** @deprecated */
  public play(sound: SoundType): void {
    if(this.sounds.has(sound.location)) {
      let source = this.context.createBufferSource()
      source.buffer = this.soundBuffers.get(sound.location) as AudioBuffer   
      source.connect(this.gainNode)
      this.gainNode.gain.value = sound.volume
      source.start(0);

      source.onended = () => {
        source.disconnect()
        source.stop()
      }
    } else {
      this.fetchAndPlay(sound)
    }
  }

  public async playSound(sound: Sound): Promise<void> {
    if(this.sounds.has(sound.location)) {
      let source = this.context.createBufferSource()
      source.buffer = this.sounds.get(sound.location)!.getRandomSound() as AudioBuffer   
      source.connect(this.gainNode)
      this.gainNode.gain.value = 0.2
      source.start(0);

      source.onended = () => {
        source.disconnect()
        source.stop()
      }
    } else {
      let snd = sound
      await snd.create(this)
      this.sounds.set(sound.location, snd)
      this.playSound(sound)
    }
  }

  public async fetchAndPlay(sound: SoundType): Promise<void> {
    const res = await fetch('assets/' + sound.location + '1.ogg')
    const data = await res.arrayBuffer()
    
    this.soundBuffers.set(sound.location, await this.context.decodeAudioData(data))
    this.play(sound)
  }

  public async fetch(sound: string): Promise<AudioBuffer> {
    const res = await fetch('assets/sounds/' + sound + '.ogg')
    const data = await res.arrayBuffer()
    return await this.context.decodeAudioData(data)
  }
}
