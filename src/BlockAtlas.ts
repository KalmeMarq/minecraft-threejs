export default class BlockAtlas {
  public static atlasWidth = 256
  public static atlasHeight = 256
  public images: string[]
  public sprites: HTMLImageElement[] = []
  public blocksUVInfo = new Map<string, [number, number]>()

  public constructor(images: string[]) {
    this.images = images
  }

  public async create(): Promise<HTMLCanvasElement> {
    let l = document.getElementById('loading') as HTMLDivElement
    await new Promise<void>(async (resolve, reject) => {
      for(let i = 0; i < this.images.length; i++) {
        await new Promise<void>((resolve, reject) => {
          let b = new Image()
          b.src = 'assets/textures/block/' + this.images[i] + '.png'
          b.onload =( ) => {
            this.sprites.push(b)
            resolve()
          }
          
          let t = document.createTextNode(('block atlas: ' + (this.images[i])  + ' (' + (Math.round(i * 100 / this.images.length)) + '%)'))
          l.appendChild(t)
          l.appendChild(document.createElement('br'))
          l.scroll(0, l.scrollHeight)
          
        })
      }
  
      resolve()
      l.appendChild(document.createTextNode('block atlas: finished\n'))
      l.appendChild(document.createElement('br'))
      l.scroll(0, l.scrollHeight)
      
    })

    const blockAtlas = document.createElement('canvas')
    const atlasCtx = blockAtlas.getContext('2d') as CanvasRenderingContext2D
    blockAtlas.width = BlockAtlas.atlasWidth
    blockAtlas.height = BlockAtlas.atlasHeight
  
    // atlasCtx.fillStyle = 'black'
    // atlasCtx.fillRect(0, 0, atlasW, atlasH)
  
    let r = 0
    for(let i = 0, j = 0; i < this.sprites.length; i++, j += 16) {
      r = Math.floor(j / BlockAtlas.atlasHeight) * 16
  
      atlasCtx.drawImage(this.sprites[i], j % BlockAtlas.atlasWidth, r)
      this.blocksUVInfo.set(this.images[i], [j % BlockAtlas.atlasWidth, r])
    }

    return blockAtlas
  }
}