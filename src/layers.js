import { addGridToSvg, gridCellSize, gridLineThickness } from './grid';
import { svgElement, createSvgElement, boardOffsetX, boardOffsetY, boardWidth, boardHeight, boardSvgWidth, boardSvgHeight } from './svg';
import { colors, shadowOpacity } from './colors';

const addAnimalShadowLayer = () => {
  const animalShadowLayer = createSvgElement('g');
  animalShadowLayer.setAttribute('opacity', shadowOpacity);
  animalShadowLayer.setAttribute('transform', 'translate(.3,.3)');
  svgElement.appendChild(animalShadowLayer);
  return animalShadowLayer;
};

const addAnimalLayer = () => {
  const animalLayer = createSvgElement('g');
  animalLayer.setAttribute('stroke-linecap', 'round');
  svgElement.appendChild(animalLayer);
  return animalLayer;
};

const addFenceShadowLayer = () => {
  const fenceShadowLayer = createSvgElement('g');
  fenceShadowLayer.setAttribute('stroke-linecap', 'round');
  fenceShadowLayer.setAttribute('fill', 'none');
  fenceShadowLayer.setAttribute('stroke', colors.black);
  fenceShadowLayer.setAttribute('opacity', shadowOpacity);
  fenceShadowLayer.setAttribute('transform', 'translate(.5,.5)');
  svgElement.appendChild(fenceShadowLayer);
  return fenceShadowLayer;
};

const addGridBlockLayer = () => {
  const gridBlockLayer = createSvgElement('g');
  gridBlockLayer.setAttribute('fill', 'none');
  svgElement.appendChild(gridBlockLayer);
  return gridBlockLayer;
};

const addFenceLayer = () => {
  const fenceLayer = createSvgElement('g');
  fenceLayer.setAttribute('stroke-linecap', 'round');
  fenceLayer.setAttribute('fill', 'none');
  svgElement.appendChild(fenceLayer);
  return fenceLayer;
};

const addBaseLayer = () => {
  const baseLayer = createSvgElement('g');
  baseLayer.id = 'baseLayer';
  baseLayer.setAttribute('fill', colors.base);
  svgElement.appendChild(baseLayer);
  return baseLayer;
}

const addPathShadowLayer = () => {
  const pathShadowLayer = createSvgElement('g');
  pathShadowLayer.setAttribute('stroke-linecap', 'round');
  pathShadowLayer.setAttribute('fill', 'none');
  pathShadowLayer.setAttribute('stroke', colors.base);
  pathShadowLayer.setAttribute('stroke-width', 3);
  svgElement.appendChild(pathShadowLayer);
  return pathShadowLayer;
};

const addPathLayer = () => {
  const pathLayer = createSvgElement('g');
  pathLayer.setAttribute('stroke-linecap', 'round');
  pathLayer.setAttribute('fill', 'none');
  pathLayer.setAttribute('stroke', colors.path);
  pathLayer.setAttribute('stroke-width', 3);
  svgElement.appendChild(pathLayer);
  return pathLayer;
};

const addPersonLayer = () => {
  const personLayer = createSvgElement('g');
  personLayer.setAttribute('stroke-linecap', 'round');
  personLayer.setAttribute('fill', 'none');
  svgElement.appendChild(personLayer);
  return personLayer;
}

const addYurtAndPersonShadowLayer = () => {
  const shadowLayer = createSvgElement('g');
  shadowLayer.setAttribute('stroke-linecap', 'round');
  shadowLayer.setAttribute('fill', 'none');
  shadowLayer.setAttribute('stroke', colors.black);
  shadowLayer.setAttribute('opacity', 0.2);
  svgElement.appendChild(shadowLayer);
  return shadowLayer;
};

const addYurtLayer = () => {
  const yurtLayer = createSvgElement('g');
  yurtLayer.setAttribute('stroke-linecap', 'round');
  yurtLayer.setAttribute('fill', colors.yurt);
  svgElement.appendChild(yurtLayer);
  return yurtLayer;
};

const addYurtDecorationLayer = (color) => {
  const yurtDecorationLayer = createSvgElement('g');
  yurtDecorationLayer.setAttribute('fill', 'none');
  yurtDecorationLayer.setAttribute('stroke', color);
  svgElement.appendChild(yurtDecorationLayer);
  return yurtDecorationLayer;
};

const addPinLayer = () => {
  const pinLayer = createSvgElement('g');
  pinLayer.setAttribute('stroke-linecap', 'round');
  svgElement.appendChild(pinLayer);
  return pinLayer;
}

const addGridPointerLayer = () => {
  const gridPointerLayer = createSvgElement('rect');
  gridPointerLayer.setAttribute('width', `${boardSvgWidth + gridLineThickness}px`);
  gridPointerLayer.setAttribute('height', `${boardSvgHeight + gridLineThickness}px`);
  gridPointerLayer.setAttribute('transform', `translate(${boardOffsetX * gridCellSize - gridLineThickness} ${boardOffsetY * gridCellSize - gridLineThickness})`);
  gridPointerLayer.setAttribute('fill', 'none');
  gridPointerLayer.setAttribute('stroke-width', 0);
  gridPointerLayer.style.cursor = 'cell';
  gridPointerLayer.style.pointerEvents = 'all';
  svgElement.appendChild(gridPointerLayer);
  return gridPointerLayer;
}

// Order is important here, because it determines stacking in the SVG
export const layers = {
  grid: addGridToSvg(),
  gridBlock: addGridBlockLayer(),
  base: addBaseLayer(),
  pathShadows: addPathShadowLayer(),
  paths: addPathLayer(),
  animalShadows: addAnimalShadowLayer(),
  yurtAndPersonShadows: addYurtAndPersonShadowLayer(),
  animals: addAnimalLayer(),
  personLayer: addPersonLayer(),
  fenceShadows: addFenceShadowLayer(),
  fences: addFenceLayer(),
  yurts: addYurtLayer(),
  yurtDecorationLayers: {
    'ox': addYurtDecorationLayer(colors.ox),
    'goat': addYurtDecorationLayer(colors.goat),
  },
  pinLayer: addPinLayer(),
  gridPointerLayer: addGridPointerLayer(),
};

export const { yurtDecorationLayers } = layers;
export const animalLayer = layers.animals;
export const animalShadowLayer = layers.animalShadows;
export const baseLayer = layers.base;
export const fenceLayer = layers.fences;
export const fenceShadowLayer = layers.fenceShadows;
export const gridBlockLayer = layers.gridBlock;
export const pathLayer = layers.paths;
export const pathShadowLayer = layers.pathShadows;
export const personLayer = layers.personLayer;
export const pinLayer = layers.pinLayer;
export const gridPointerLayer = layers.gridPointerLayer;
export const yurtLayer = layers.yurts;
export const yurtAndPersonShadowLayer = layers.yurtAndPersonShadows;
