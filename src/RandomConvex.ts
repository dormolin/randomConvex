import * as fabric from 'fabric';
import { randomInt } from './lib/randomInt';
import { randlist } from './lib/randlist';
import { constlist } from './lib/constlist';
import { stack } from './lib/stack';
import { randomColor } from './lib/randomColor';
import { parseColor } from './lib/parseColor';
import { offset } from './lib/offset';

/**
 * Drawing random convexes on Canvas.
 */
export class RandomConvex {
  canvas: fabric.Canvas

  constructor (canvasEl: HTMLCanvasElement) {
    this.canvas = new fabric.Canvas(canvasEl);
    this.canvas.backgroundColor = '#eee';
    this.canvas.on('object:moving', this._onObjectMoving);
    this.canvas.requestRenderAll();
  }

  _onObjectMoving = (options: fabric.BasicTransformEvent<fabric.TPointerEvent> & {
    target: fabric.FabricObject;
  }) => {
    if (options.target instanceof fabric.FabricObject) {
      this._restrictPosScale(options.target)
    }
  }

  generateConvex = (canvas: fabric.Canvas, options: RandomConvexOptions) => {
    const storeRenderSetting = canvas.renderOnAddRemove
    canvas.renderOnAddRemove = false
    for (let i = 0; i < options.number; i++) {
      const Width = randomInt(options.minSize, options.maxSize)
      const Height = options.perfectCircle ? Width: randomInt(options.minSize, options.maxSize)
      const nPoints = options.polygonCorners
      const points = this._createPolyPoints(nPoints, 0, 0, Width, Height, options.symmetry)
      const rect = new fabric.Polygon(points, {
        width: Width,
        height: Height,
        fill: options.fillTransparent ? 'transparent' : 
          (options.randomColor ? randomColor() : options.fillColor),
        minScaleLimit: 0.5,
        stroke: options.borderRandomColor ? randomColor() : options.borderColor,
        strokeWidth: options.borderWidth,
        strokeUniform: true,
        opacity: options.opacity / 100,
        originX: 'center',
        originY: 'center',
        left: randomInt(0, canvas.getWidth() - Width/ 2),
        top: randomInt(0, canvas.getHeight() - Height / 2),
        angle: options.randomRotate ? randomInt(0, 360) : 0,
        evented: options.editable,
        selectable: options.editable
      })
      rect.set("shadow", {
        blur: options.shadowBlur, color: options.shadowColorSameAsFill ? rect.fill : options.shadowColor,
        offsetX: options.shadowOffsetX, offsetY: options.shadowOffsetY,
        nonScaling: true
      })
      if ((!options.fillTransparent) && options.gradation) this._applyGradient(rect)
      this.canvas.add(rect)
    }
    canvas.renderOnAddRemove = storeRenderSetting
    canvas.requestRenderAll()
  }


  /// private members ///////////////////////////////////////////////////////////////

  _shiftColor = (refColor: string) => {
    const c = parseColor(refColor)
    return `rgb(${c.r + 64},${c.g + 64},${c.b + 64})`
  }

  _generateGradient = (refColor: string, _x2: number, _y2: number) => {
    return new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels', // or 'pixels'
      coords: { x1: 0, y1: 0, x2: _x2, y2: _y2 },
      colorStops:[
        { offset: 0, color: refColor },
        { offset: 1, color: this._shiftColor(refColor)}
      ]
    })  
  }

  _applyGradient = (rect: fabric.FabricObject) => {
    if (typeof rect.fill !== 'string') return;
    rect.set({fill: this._generateGradient(rect.fill, rect.width, rect.height)})
  }
  
  // normalize max to PI
  _normalizeRound = (array: number[]) => {
    const k = 2 * Math.PI / array.reduce((prev, current) => Math.max(prev, current))
    return array.map(x => x * k, 0)
  }
  
  /**
   * if random rotate, returns ranom number 0 - 2PI
   * If nPoints is odd number, first point should be top.
   * Otherwise, horizontal line should be top.
   */ 
  _firstAngleOffset = (nPoints: number, randomRotate = false) => {
    if (randomRotate) {
      return Math.random() * 2 * Math.PI
    } else {
      return nPoints % 2 === 0 ?  Math.PI / nPoints - (Math.PI / 2): Math.PI / (-2)
    }
  }
  
  // generate x, y point
  _generatePoint = (r1: number, r2: number, angle: number, cx: number, cy: number) => {
      return ({x: cx + r1 * Math.cos(angle), y: cy + r2 * Math.sin(angle)})
  }
  
  // points min max rotate in_circle regular color fill gradient opacity blur
  _createPolyPoints = (nPoints: number, cx: number, cy: number, r1: number, r2: number, regular: boolean) => {
      const lst = regular ? constlist(nPoints) : 
        offset(randlist(nPoints), 0.1)
      const angles = offset(this._normalizeRound(
        stack(lst)), this._firstAngleOffset(nPoints))
      angles.pop()
      return angles.map(a => this._generatePoint(r1, r2, a, cx, cy))
  }
  
  _storeGoodState = (object: fabric.FabricObject) => {
    object.lastGoodState = {
      left: object.left,
      top: object.top,
      scaleX: object.scaleX,
      scaleY: object.scaleY
    }
  }
  
  _restoreGoodState = (object: fabric.FabricObject) => {
    if (object.lastGoodState) {
      object.left = object.lastGoodState.left
      object.top = object.lastGoodState.top
      object.scaleX = object.lastGoodState.scaleX
      object.scaleY = object.lastGoodState.scaleY
    }
  }
  
  _isInCanvas = (object: fabric.FabricObject, canvas: fabric.Canvas) => {
    const halfW = object.width * object.scaleX / 2
    const halfH = object.height * object.scaleY / 2
    const cx = object.getCenterPoint().x
    const cy = object.getCenterPoint().y
    if (cx + halfW < 0) return false
    if (this.canvas.width < cx - halfW) return false
    if (cy + halfH < 0) return false
    if (this.canvas.height < cy - halfH) return false
    return true
  }
  
  _restrictPosScale = (object: fabric.FabricObject) => {
    if (!object || !object.canvas) return
    if (this._isInCanvas(object, object.canvas)) {
      this._storeGoodState(object)
    } else {
      this._restoreGoodState(object)
    }
  }
}


/**
 * parameters of RandomConvex.generate
 */
export class RandomConvexOptions {
    number: number = 100
    polygonCorners: number = 4
    editable = true
    minSize: number = 30
    maxSize = 50
    symmetry = true
    randomRotate = false
    perfectCircle = true
    fillColor = '#888888'
    fillTransparent = false
    opacity = 90
    randomColor = true
    gradation = true
    borderColor = '#000000'
    borderRandomColor = false
    borderWidth = 1
    shadowBlur = 5
    shadowColor = '#333333'
    shadowColorSameAsFill = false
    shadowOffsetX = 5
    shadowOffsetY = 5

    constructor (params?: Partial<RandomConvexOptions>) {
      if (params) {
        Object.assign(this, params)
      }
    }
}
