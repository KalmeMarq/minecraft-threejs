import * as THREE from 'three'
import { renderer, camera, world, stats } from ".."
import Block from "./Block"
import InteractionResult from "../util/InteractionResult"
import SoundPlayer from "../sound/SoundPlayer"

export default class BlockItem {
  block: Block
  icon: string

  public constructor(block: Block, icon: string) {
    this.block = block
    this.icon = icon
  }

  public use(soundPlayer: SoundPlayer): InteractionResult {
    return this.place(soundPlayer)
  }

  public place(soundPlayer: SoundPlayer): InteractionResult {
    const pos = world.getCanvasRelativePosition()
    const x = (pos.x / renderer.domElement.width) *  2 - 1;
    const y = (pos.y / renderer.domElement.height) * -2 + 1;

    const start = new THREE.Vector3();
    const end = new THREE.Vector3();
    start.setFromMatrixPosition(camera.matrixWorld);
    end.set(x, y, 1).unproject(camera);

    const intersection = world.intersectRay(start, end);
    
    if (intersection) {
      const voxelId = 1;
      
      let pos = intersection.position.map((v, ndx) => {
        return v + intersection.normal[ndx] * (voxelId > 0 ? 0.5 : -0.5);
      });
      let pos1 = intersection.position.map((v, ndx) => {
        return v + intersection.normal[ndx] * (0 > 0 ? 0.5 : -0.5);
      });

      let pX = Math.ceil(pos[0]) - 0.5
      let pY = Math.ceil(pos[1]) - 0.5
      let pZ = Math.ceil(pos[2]) - 0.5
      let pX1 = Math.ceil(pos1[0]) - 0.5
      let pY1 = Math.ceil(pos1[1]) - 0.5
      let pZ1 = Math.ceil(pos1[2]) - 0.5
      
      let cX = Math.ceil(camera.position.x) - 0.5
      let cY = Math.ceil(camera.position.y) - 0.5
      let cZ = Math.ceil(camera.position.z) - 0.5


      if((cX === pX && cY === pY && cZ === pZ) || cX === pX1 && cY === pY1 && cZ === pZ1) {
        return InteractionResult.FAIL
      }
      
      world.setVoxel(pos[0], pos[1], pos[2], this.block.id)
      world.updateVoxelGeometry(pos[0], pos[1], pos[2]);
      world.selection()
      soundPlayer.playSound(this.block.sound.soundPlace)


      if(!stats.placed[this.block.name]) {
        stats.placed[this.block.name] = {
          item: this,
          count: 1
        }
      } else {
        stats.placed[this.block.name].count += 1
      }

      return InteractionResult.SUCCESS
    } else {
      return InteractionResult.FAIL
    }
  }
}