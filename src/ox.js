import { radToDeg } from 'kontra';
import { Animal } from './animal';
import { createSvgElement } from './svg';
import { animalLayer, animalShadowLayer } from './layers';
import { gridSize } from './grid';

export class Ox extends Animal {
  constructor(properties) {
    super({
      ...properties,
      width: 1.5,
      height: 2.5,
      roundness: 0.6,
    });
  }

  addToSvg() {
    const ox = createSvgElement('rect');
    const x = this.parent.x * gridSize + this.x - this.width / 2;
    const y = this.parent.y * gridSize + this.y - this.height / 2;
    ox.setAttribute('transform', `translate(${x},${y}) rotate(${radToDeg(this.rotation)})`);
    ox.setAttribute('fill', '#b75');
    ox.setAttribute('width', this.width);
    ox.setAttribute('height', this.height);
    ox.setAttribute('rx', this.roundness);
    ox.style.transformOrigin = 'center';
    ox.style.transformBox = 'fill-box';
    ox.style.transform = `
      translate(${x}px, ${y}px)
      rotate(${radToDeg(this.rotation)}deg)
      scale(0)
    `;
    ox.style.transition = 'all 1s';
    animalLayer.appendChild(ox);

    const shadow = createSvgElement('rect');
    shadow.setAttribute('fill', '#0002');
    shadow.setAttribute('width', this.width);
    shadow.setAttribute('height', this.height);
    shadow.setAttribute('rx', this.roundness);
    shadow.style.transformOrigin = 'center';
    shadow.style.transformBox = 'fill-box';
    shadow.style.transform = `
      translate(${x}px, ${y}px)
      rotate(${radToDeg(this.rotation)}deg)
      scale(0)
    `;
    shadow.style.transition = 'all 1s';
    animalShadowLayer.appendChild(shadow);

    setTimeout(() => {
      ox.style.transform = `
        translate(${x}px, ${y}px)
        rotate(${radToDeg(this.rotation)}deg)
        scale(1)
      `;
      shadow.style.transform = `
        translate(${x}px, ${y}px)
        rotate(${radToDeg(this.rotation)}deg)
        scale(1)
      `;
    }, 100);
  }
}
