import { IChunk, IChunkGeoData, IFinalModel } from "./types";
import * as THREE from 'three'
import { blocksModelsNew, camera, renderer, scene, world } from ".";

export default class VoxelWorld {
  public chunkHeight: number
  public chunkSize: number
  public chunkSliceSize: number
  public chunks: Map<string, IChunk>
  public box: any
  public lookingBlock: number[] | null = null
  public chunkIdToMesh: any = {};
  public material: any

  constructor(options: { texture: any, chunkHeight: number, chunkSize: number }) {
    this.chunkHeight = options.chunkHeight
    this.chunkSize = options.chunkSize
    this.chunkSliceSize = this.chunkSize * this.chunkSize
    this.chunks = new Map()

    this.material = new THREE.MeshLambertMaterial({
      map: options.texture,
      side: THREE.DoubleSide,
      alphaTest: 0.1,
      transparent: true
    });

    let boxGeo = new THREE.BoxGeometry(1.01, 1.01, 1.01)
    let edges = new THREE.EdgesGeometry(boxGeo);
    let materiall =  new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 9 })
    let lines = new THREE.LineSegments(edges, materiall);
    let box = lines
    box.visible = false
    this.box = box
    scene.add(box)
  }

  public computeChunkId(x: number, z: number): string {
    const chunkX = Math.floor(x / this.chunkSize)
    const chunkZ = Math.floor(z / this.chunkSize)
    return `${chunkX},${chunkZ}`
  }

  public computeVoxelOffset(x: number, y: number, z: number): number {
    const voxelX = THREE.MathUtils.euclideanModulo(x, this.chunkSize) | 0
    const voxelY = THREE.MathUtils.euclideanModulo(y, this.chunkHeight) | 0
    const voxelZ = THREE.MathUtils.euclideanModulo(z, this.chunkSize) | 0

    return voxelY * this.chunkSliceSize +
           voxelZ * this.chunkSize +
           voxelX
  }

  public getChunkForVoxel(x: number, z: number): any {
    let name = this.computeChunkId(x, z)
    let chunk = this.chunks.get(name)
    return chunk
  }

  public setVoxel(x: number, y: number, z: number, v: number): void {
    let chunk = this.getChunkForVoxel(x, z)
    if(!chunk) {
      chunk = this.addChunkForVoxel(x, z)
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z)
    chunk[voxelOffset] = v
  }

  public deleteVoxel(x: number, y: number, z: number): void {
    let chunk = this.getChunkForVoxel(x, z)
    if(!chunk) return

    const voxelOffset = this.computeVoxelOffset(x, y, z)
    chunk[voxelOffset] = 0
  }

  public addChunkForVoxel(x: number, z: number): any {
    const chunkId = this.computeChunkId(x, z)
    let chunk = this.chunks.get(chunkId)

    if(chunk === undefined) {
      chunk = new Uint8Array(this.chunkSize * this.chunkHeight * this.chunkSize)
      this.chunks.set(chunkId, chunk)
    }

    return chunk
  }

  public getVoxel(x: number, y: number, z: number): number {
    const chunk = this.getChunkForVoxel(x, z)
    if(!chunk) return 0

    const voxelOffset = this.computeVoxelOffset(x, y, z)
    return chunk[voxelOffset]
  }

  public generateGeometryDataForChunk(chunkX: number, cellZ: number): IChunkGeoData {
    const positions: number[] = []
    const normals: number[] = []
    const uvs: number[] = []
    const indices: number[] = []
    
    const startX = chunkX * this.chunkSize
    const startZ = cellZ * this.chunkSize
    
    for(let y = 0; y < this.chunkHeight; ++y) {
      const voxelY = y;
      
      for (let z = startZ; z < startZ + this.chunkSize; ++z) {
        const voxelZ = z;
        
        for (let x = startX; x < startX + this.chunkSize; ++x) {
          const voxelX = x;
          const voxel = this.getVoxel(voxelX, voxelY, voxelZ)
          
          if(voxel && voxel !== 0) {
            let model: IFinalModel | undefined = blocksModelsNew.get(voxel)
            if(model === undefined) throw new Error('Model from ' + voxel + ' is undefined')


            for(let i = 0; i < model.elements.length; i++) {
              let element = model.elements[i]

              Object.entries(element.faces).forEach(([type, { cullface, uv, pos, dir}]) => {
                
                const neighbor = this.getVoxel(voxelX + dir[0], voxelY + dir[1], voxelZ + dir[2])

                if(!(neighbor && cullface)) {
                  const ndx = positions.length / 3;

                  switch(type) {
                    case 'west':
                      positions.push(pos[0][0] + x, pos[0][1] + y, pos[0][2] + z); normals.push(...dir); uvs.push(uv[0], uv[2])
                      positions.push(pos[1][0] + x, pos[1][1] + y, pos[1][2] + z); normals.push(...dir); uvs.push(uv[0], uv[3])
                      positions.push(pos[2][0] + x, pos[2][1] + y, pos[2][2] + z); normals.push(...dir); uvs.push(uv[1], uv[2])
                      positions.push(pos[3][0] + x, pos[3][1] + y, pos[3][2] + z); normals.push(...dir); uvs.push(uv[1], uv[3])
                    case 'east':
                      positions.push(pos[0][0] + x, pos[0][1] + y, pos[0][2] + z); normals.push(...dir); uvs.push(uv[0], uv[2])
                      positions.push(pos[1][0] + x, pos[1][1] + y, pos[1][2] + z); normals.push(...dir); uvs.push(uv[0], uv[3])
                      positions.push(pos[2][0] + x, pos[2][1] + y, pos[2][2] + z); normals.push(...dir); uvs.push(uv[1], uv[2])
                      positions.push(pos[3][0] + x, pos[3][1] + y, pos[3][2] + z); normals.push(...dir); uvs.push(uv[1], uv[3])
                      break;
                    case 'north':
                      positions.push(pos[0][0] + x, pos[0][1] + y, pos[0][2] + z); normals.push(...dir); uvs.push(uv[0], uv[2])
                      positions.push(pos[1][0] + x, pos[1][1] + y, pos[1][2] + z); normals.push(...dir); uvs.push(uv[1], uv[2])
                      positions.push(pos[2][0] + x, pos[2][1] + y, pos[2][2] + z); normals.push(...dir); uvs.push(uv[0], uv[3])
                      positions.push(pos[3][0] + x, pos[3][1] + y, pos[3][2] + z); normals.push(...dir); uvs.push(uv[1], uv[3])
                      break;
                    case 'south':
                      positions.push(pos[0][0] + x, pos[0][1] + y, pos[0][2] + z); normals.push(...dir); uvs.push(uv[0], uv[3])
                      positions.push(pos[1][0] + x, pos[1][1] + y, pos[1][2] + z); normals.push(...dir); uvs.push(uv[1], uv[3])
                      positions.push(pos[2][0] + x, pos[2][1] + y, pos[2][2] + z); normals.push(...dir); uvs.push(uv[0], uv[2])
                      positions.push(pos[3][0] + x, pos[3][1] + y, pos[3][2] + z); normals.push(...dir); uvs.push(uv[1], uv[2])
                      break;
                    case 'down':
                      positions.push(pos[0][0] + x, pos[0][1] + y, pos[0][2] + z); normals.push(...dir); uvs.push(uv[1], uv[3])
                      positions.push(pos[1][0] + x, pos[1][1] + y, pos[1][2] + z); normals.push(...dir); uvs.push(uv[0], uv[3])
                      positions.push(pos[2][0] + x, pos[2][1] + y, pos[2][2] + z); normals.push(...dir); uvs.push(uv[1], uv[2])
                      positions.push(pos[3][0] + x, pos[3][1] + y, pos[3][2] + z); normals.push(...dir); uvs.push(uv[0], uv[2])
                      break;
                    case 'up':
                      positions.push(pos[0][0] + x, pos[0][1] + y, pos[0][2] + z); normals.push(...dir); uvs.push(uv[1], uv[2])
                      positions.push(pos[1][0] + x, pos[1][1] + y, pos[1][2] + z); normals.push(...dir); uvs.push(uv[0], uv[2])
                      positions.push(pos[2][0] + x, pos[2][1] + y, pos[2][2] + z); normals.push(...dir); uvs.push(uv[1], uv[3])
                      positions.push(pos[3][0] + x, pos[3][1] + y, pos[3][2] + z); normals.push(...dir); uvs.push(uv[0], uv[3])
                      break;
                    default:
                      throw new Error("This face doesn't exist bro")
                  }                  

                  indices.push(
                    ndx, ndx + 1, ndx + 2,
                    ndx + 2, ndx + 1, ndx + 3,
                  );
                }
              })
            }
          }
        }
      }
    }

    return {
      positions,
      normals,
      uvs,
      indices
    }
  }

  getCanvasRelativePosition(event?: any) {
    const rect = renderer.domElement.getBoundingClientRect();
    return {
      x: (window.innerWidth / 2 - rect.left) * renderer.domElement.width  / rect.width,
      y: (window.innerHeight / 2 - rect.top ) * renderer.domElement.height / rect.height,
    };
  }

  public selection(event?: any) {
    const pos = this.getCanvasRelativePosition(event)
    const x = (pos.x / renderer.domElement.width) *  2 - 1;
    const y = (pos.y / renderer.domElement.height) * -2 + 1;

    const start = new THREE.Vector3();
    const end = new THREE.Vector3();
    start.setFromMatrixPosition(camera.matrixWorld);
    end.set(x, y, 1).unproject(camera);

    const intersection = this.intersectRay(start, end);
    this.box.visible = false
    if(intersection) {
      let pos = intersection.position.map((v, ndx) => {
        return v + intersection.normal[ndx] * (-0.5)
      })

      this.box.visible = true
      this.box.position.x = Math.ceil(pos[0]) - 0.5
      this.box.position.y = Math.ceil(pos[1]) - 0.5
      this.box.position.z = Math.ceil(pos[2]) - 0.5
      this.lookingBlock = [this.box.position.x - 0.5, this.box.position.y - 0.5, this.box.position.z - 0.5, intersection.voxel]
    } else {
      this.lookingBlock = null
    }
  }

  updateChunkFromVoxelGeometry(x: number, y: number, z: number, m?: boolean) {
    const chunkX = Math.floor(x / world.chunkSize);
    const chunkZ = Math.floor(z / world.chunkSize);
    const chunkId = world.computeChunkId(x, z);
    console.log(chunkId);
    

    let mesh = this.chunkIdToMesh[chunkId];
    const geometry = mesh ? mesh.geometry : new THREE.BufferGeometry();

    const {positions, normals, uvs, indices} = world.generateGeometryDataForChunk(chunkX, chunkZ);
    const positionNumComponents = 3;
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
    const normalNumComponents = 3;
    geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
    const uvNumComponents = 2;
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));
    geometry.setIndex(indices);
    geometry.computeBoundingSphere();

    if (!mesh) {
      mesh = new THREE.Mesh(geometry, this.material);
      mesh.name = chunkId;
      this.chunkIdToMesh[chunkId] = mesh;
      scene.add(mesh);
      mesh.position.set(chunkX * world.chunkSize, 0, chunkZ * world.chunkSize);
    }
  }

  updateVoxelGeometry(x: number, y: number, z: number, m?: boolean) {
    const neighborOffsets = [
      [ 0,  0,  0],
      [-1,  0,  0],
      [ 1,  0,  0],
      [ 0, -1,  0],
      [ 0,  1,  0],
      [ 0,  0, -1],
      [ 0,  0,  1],
    ];
    const updatedCellIds: any = {};
    
    for (const offset of neighborOffsets) {
      const ox = x + offset[0];
      const oy = y + offset[1];
      const oz = z + offset[2];
      const cellId = world.computeChunkId(ox, oz);
      if (!updatedCellIds[cellId]) {
        updatedCellIds[cellId] = true;
        this.updateChunkFromVoxelGeometry(ox, oy, oz, m)
      }
    }
  }

  public intersectRay(start: { x: number, y: number, z: number }, end: { x: number, y: number, z: number }) {
    let dx = end.x - start.x
    let dy = end.y - start.y
    let dz = end.z - start.z
    const lenSq = dx * dx + dy * dy + dz * dz
    const len = Math.sqrt(lenSq)

    dx /= len
    dy /= len
    dz /= len

    let t = 0.0
    let ix = Math.floor(start.x)
    let iy = Math.floor(start.y)
    let iz = Math.floor(start.z)

    const stepX = (dx > 0) ? 1 : -1
    const stepY = (dy > 0) ? 1 : -1
    const stepZ = (dz > 0) ? 1 : -1

    const txDelta = Math.abs(1 / dx)
    const tyDelta = Math.abs(1 / dy)
    const tzDelta = Math.abs(1 / dz)

    const xDist = (stepX > 0) ? (ix + 1 - start.x) : (start.x - ix)
    const yDist = (stepY > 0) ? (iy + 1 - start.y) : (start.y - iy)
    const zDist = (stepZ > 0) ? (iz + 1 - start.z) : (start.z - iz)

    // location of nearest voxel boundary, in units of t
    let txMax = (txDelta < Infinity) ? txDelta * xDist : Infinity
    let tyMax = (tyDelta < Infinity) ? tyDelta * yDist : Infinity
    let tzMax = (tzDelta < Infinity) ? tzDelta * zDist : Infinity

    let steppedIndex = -1

    // main loop along raycast vector
    while (t <= len) {
      if(t > 5) break
      const voxel = this.getVoxel(ix, iy, iz)
      if (voxel) {
        return {
          position: [
            start.x + t * dx,
            start.y + t * dy,
            start.z + t * dz,
          ],
          normal: [
            steppedIndex === 0 ? -stepX : 0,
            steppedIndex === 1 ? -stepY : 0,
            steppedIndex === 2 ? -stepZ : 0,
          ],
          voxel,
        }
      }

      // advance t to next nearest voxel boundary
      if (txMax < tyMax) {
        if (txMax < tzMax) {
          ix += stepX
          t = txMax
          txMax += txDelta
          steppedIndex = 0
        } else {
          iz += stepZ
          t = tzMax
          tzMax += tzDelta
          steppedIndex = 2
        }
      } else {
        if (tyMax < tzMax) {
          iy += stepY
          t = tyMax
          tyMax += tyDelta
          steppedIndex = 1
        } else {
          iz += stepZ
          t = tzMax
          tzMax += tzDelta
          steppedIndex = 2
        }
      }
    }
    return null;
  }
}