/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87 
 */
import * as THREE from 'three'

export default class PointerLockControls extends THREE.EventDispatcher {
  private static changeEvent = { type: 'change' }
	private static lockEvent = { type: 'lock' }
	private static unlockEvent = { type: 'unlock' }
  private static PI_2 = Math.PI / 2

  private camera: THREE.Camera
  private domElement: HTMLElement
	private euler
  private vec = new THREE.Vector3()
  public isLocked = false

  public constructor(camera: THREE.Camera, domElement: HTMLElement) {
    super()

    this.domElement = document.body;
    this.camera = camera
    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
    this.connect()
  }

  private onMouseMove(e: MouseEvent): void {
		if(this.isLocked === false) return
    
		this.euler.setFromQuaternion( this.camera.quaternion )
		this.euler.y -= (e.movementX || 0) * 0.002
		this.euler.x -= (e.movementY || 0) * 0.002

		this.euler.x = Math.max( - PointerLockControls.PI_2, Math.min(PointerLockControls.PI_2, this.euler.x))
		this.camera.quaternion.setFromEuler(this.euler)
		this.dispatchEvent(PointerLockControls.changeEvent)
	}

  private onPointerlockChange(): void {
		if(document.pointerLockElement === this.domElement) {
			this.dispatchEvent(PointerLockControls.lockEvent)
			this.isLocked = true
		} else {
			this.dispatchEvent( PointerLockControls.unlockEvent)
			this.isLocked = false
		}
	}

  private onPointerlockError(): void {
		console.error('THREE.PointerLockControls: Unable to use Pointer Lock API')
	}

  private connect(): void {
		document.addEventListener('mousemove', (e) => this.onMouseMove(e), false );
		document.addEventListener('pointerlockchange', () => this.onPointerlockChange(), false );
		document.addEventListener('pointerlockerror', () => this.onPointerlockError(), false );
	}

	private disconnect(): void {
		document.removeEventListener('mousemove', (e) => this.onMouseMove(e), false );
		document.removeEventListener('pointerlockchange', () => this.onPointerlockChange(), false );
		document.removeEventListener('pointerlockerror', () => this.onPointerlockError(), false );
	}

	public dispose(): void {
		this.disconnect()
	}

	public getObject(): THREE.Camera {
		return this.camera
	}

	getDirection = (() => {
		let direction = new THREE.Vector3(0, 0, -1)
		return () => {
			return this.vec.copy(direction).applyQuaternion(this.camera.quaternion)
		}
	})();

	public moveForward(distance: number): void {
		// move forward parallel to the xz-plane
		// assumes camera.up is y-up

		this.vec.setFromMatrixColumn(this.camera.matrix, 0)
		this.vec.crossVectors(this.camera.up, this.vec)
		this.camera.position.addScaledVector(this.vec, distance)
	}

	public moveRight(distance: number): void {
		this.vec.setFromMatrixColumn(this.camera.matrix, 0)
		this.camera.position.addScaledVector(this.vec, distance)
	}

	public lock(): void {
		this.domElement.requestPointerLock()
	}

	public unlock(): void {
		document.exitPointerLock()
	}
}