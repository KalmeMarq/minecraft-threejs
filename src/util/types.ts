import BlockItem from "../world/BlockItem"

export interface ISoundDefinition {
  sounds: string[] | {
    name: string,
    volume: number
  }
  subtitle: string
}

export interface ISoundDefinitions {
  [key: string]: ISoundDefinition 
}

export interface IModelFace {
  uv: [number, number, number, number]
  texture: string
  tint?: boolean
  cullface: boolean
}

export interface IModel {
  parent?: string,
  textures: { [key: string]: string }
  elements: {
    from: [number, number, number],
    to: [number, number, number],
    faces: {
      down: IModelFace
      up: IModelFace
      north: IModelFace
      south: IModelFace
      west: IModelFace
      east: IModelFace
    }
  }[]
}

export interface IFinalModelFace {
  uv: [number, number, number, number]
  pos: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number],
  ]
  tint?: boolean
  dir: [number, number, number],
  cullface: boolean
}

export interface IFinalModel {
  elements: {
    from: [number, number, number],
    to: [number, number, number],
    faces: {
      down: IFinalModelFace
      up: IFinalModelFace
      north: IFinalModelFace
      south: IFinalModelFace
      west: IFinalModelFace
      east: IFinalModelFace
    }
  }[]
}

export interface IChunkGeoData {
  positions: number[]
  normals: number[]
  uvs: number[]
  colors: number[]
  indices: number[]
}
export type IChunk = Uint8Array
export type IChunks = Map<string, IChunk>

export interface IStats  {
  placed: {
    [key: string]: { item: BlockItem, count: number }
  },
  broken: {
    [key: string]: { item: BlockItem, count: number }
  }
}