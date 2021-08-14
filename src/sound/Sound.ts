import SoundPlayer from "./SoundPlayer"

export default class Sound {
  private sounds: AudioBuffer[]
  public location: string

  public constructor(location: string) {
    this.location = location
    this.sounds = []
  }

  public async create(soundPlayer: SoundPlayer): Promise<void> {
    let sd = soundPlayer.soundDefs[this.location]
    if(Array.isArray(sd.sounds)) {
      for(let i = 0; i < sd.sounds.length; i++) {
        await soundPlayer.fetch(sd.sounds[i]).then(snd => {
          this.sounds.push(snd)
        })
      }
    }
  }
  
  public getRandomSound(): AudioBuffer | null {
    if(this.sounds.length === 0) {
      return null
    }
    let i = Math.round(Math.random() * (this.sounds.length - 1))
    
    return this.sounds[i]
  }
}