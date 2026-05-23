import { RandomConvexOptions } from "./RandomConvex";

export const confetti = new RandomConvexOptions({
    number: 75,
    minSize: 5,
    maxSize: 10,
    randomRotate: true,
    symmetry: false,
    perfectCircle: false,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0
})

export const snow = new RandomConvexOptions({
    minSize: 6,
    maxSize: 8,
    polygonCorners: 20,
    fillColor: '#ffffff',
    randomColor: false,
    shadowBlur: 2,
    shadowColor: '#ffffff',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
})

export const radar = new RandomConvexOptions({
    number: 15,
    polygonCorners: 3,
    minSize: 15,
    maxSize: 15,
    fillTransparent: true,
    borderColor: '#ff0000',
    borderWidth: 1,
    shadowBlur: 2,
    shadowColor: '#ff0000',
    shadowOffsetX: 0,
    shadowOffsetY: 0
})

export const rubberband = new RandomConvexOptions({
    number: 30,
    randomRotate: true,
    polygonCorners: 30,
    fillTransparent: true,
    borderColor: '#aa8800',
    borderWidth: 4,
    perfectCircle: false,
    shadowOffsetX: 3,
    shadowOffsetY: 3
})
