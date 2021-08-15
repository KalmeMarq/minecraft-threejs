import BlockAtlas from "../BlockAtlas"
import { IFinalModel, IModel } from "./types"

export default class Helpers {
  static clamp(value: number, minValue: number, maxValue: number): number {
    return Math.max(minValue, Math.min(maxValue, value))
  }
  
  static calcUVs(u0: number, v0: number, u1: number, v1: number, baseW: number, baseH: number) {
    function innerBlit(var6: number, var7: number, var8: number, var9: number, var10: number, var11: number) {
      return [(var8 + 0.0) / var10, (var8 + var6) / var10, 1 - (var9 + 0.0) / var11, 1 - (var9 + var7) / var11]
    }
  
    return innerBlit(u1, v1, u0, v0, baseH, baseW)
  }

  static addParent(orModel: any, model: any, allBlocks: Map<string, IModel>) {
    if(orModel.parent) {
      let parent = allBlocks.get(orModel.parent)
      Helpers.addParent(parent, model, allBlocks)
      if(parent!.textures) model.textures = { ...model.textures, ...parent!.textures } 
      if(parent!.elements) {
        model.elements = parent!.elements
      }
    }
  }

  static generateFinalModelV2(name: string, blockAtlas: BlockAtlas, allBlocks: Map<string, IModel>) {
    let modelb = allBlocks.get(name)
    let model: IModel = {
      textures: {},
      elements: []
    }
    if(modelb === undefined) return

    Helpers.addParent(modelb, model, allBlocks)

    if(modelb.textures) model.textures = { ...modelb.textures }
    if(modelb.elements) {
      model.elements = modelb.elements
    }

    let obj: IFinalModel = {
      elements: []
    }

    model.elements.forEach(element => {
      let newEl: any = {
        from: element.from,
        to: element.to,
        faces: {}
      }
      Object.entries(element.faces).forEach(([type, value]) => {
        let tex = value.texture
        if(tex.startsWith('#')) {
          tex = model!.textures[tex.slice(1, tex.length)]
        }

        newEl.faces[type] = {
          uv: [],
          pos: [],
          // uvs: [],
          tint: value.tint ?? false,
          dir: [0, 0, 0],
          cullface: value.cullface ?? false
        }

        let t = blockAtlas.blocksUVInfo.get(tex)
        if(!t) throw new Error(tex + ' not found')

        if(value.uv) {
       
          newEl.faces[type].uv = [
            value.uv[0] + t[0],
            value.uv[1] + t[1],
            value.uv[2],
            value.uv[3]
          ]
        } else {
          newEl.faces[type].uv = [
            0 + t[0],
            0 + t[1],
            16,
            16
          ]
        }

        let PF = element.from.map(f => f / 16)
        let PT = element.to.map(f => f / 16)

        let uv = newEl.faces[type].uv

        switch(type) {
          case 'south':
            newEl.faces[type].uv = Helpers.calcUVs(uv[0], uv[1], uv[2], Math.min(uv[3], element.to[1]), BlockAtlas.atlasWidth, BlockAtlas.atlasHeight)
            break;
          case 'north':
            newEl.faces[type].uv = Helpers.calcUVs(uv[0], uv[1], uv[2], Math.min(uv[3], element.to[1]), BlockAtlas.atlasWidth, BlockAtlas.atlasHeight)
            break;
          case 'east':
            newEl.faces[type].uv = Helpers.calcUVs(uv[0], uv[1], uv[2], Math.min(uv[3], element.to[1]), BlockAtlas.atlasWidth, BlockAtlas.atlasHeight)
            break;
          case 'west':
            newEl.faces[type].uv = Helpers.calcUVs(uv[0], uv[1], uv[2], Math.min(uv[3], element.to[1]), BlockAtlas.atlasWidth, BlockAtlas.atlasHeight)
            break;
          default:
            newEl.faces[type].uv = Helpers.calcUVs(uv[0], uv[1], uv[2], uv[3], BlockAtlas.atlasWidth, BlockAtlas.atlasHeight)
            break;
        }

        switch(type) {
          case 'west':
            newEl.faces[type].dir = [1, 0, 0]
            newEl.faces[type].pos = [
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ],
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ],
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ],
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ]
            ]
            break;
          case 'east':
            newEl.faces[type].dir = [-1, 0, 0]
            newEl.faces[type].pos = [
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ],
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ],
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ],
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ]
            ]
            break;
          case 'north':
            newEl.faces[type].dir = [0, 0, 1]
            newEl.faces[type].pos = [
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ],
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ],
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ],
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ]
            ]
            break;
          case 'south':
            newEl.faces[type].dir = [0, 0, -1]
            newEl.faces[type].pos = [
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ],
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ],
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ],
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ]
            ]
            break;
          case 'down':
            newEl.faces[type].dir = [0, -1, 0]
            newEl.faces[type].pos = [
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ],
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ],
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ],
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(0, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ]
            ]
            break;
          case 'up':
            newEl.faces[type].dir = [0, 1, 0]
            newEl.faces[type].pos = [
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ],
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(1, PF[2], PT[2]) ],
              [ Helpers.clamp(0, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ],
              [ Helpers.clamp(1, PF[0], PT[0]), Helpers.clamp(1, PF[1], PT[1]), Helpers.clamp(0, PF[2], PT[2]) ]
            ]
            break;
          default:
            throw new Error("This face doesn't exist bro")
        }

        
        
      })
      
      obj.elements.push(newEl)
    })
    
    return obj
  }
  
}