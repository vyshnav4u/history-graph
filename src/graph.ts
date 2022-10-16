import * as d3 from 'd3';
import { svg } from 'd3';
import { GraphData } from './types/GraphTypes';

export class Graph {
  private container: HTMLElement;
  private data: GraphData[];
  private containerWidth: number;
  private svgHeight: number;
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  constructor(container: HTMLElement, data: GraphData[]) {
    this.container = container;
    this.data = data;
    this.svgHeight = 0;
    this.render();
  }

  private render() {
    if (!this.data.length) return;
    this.containerWidth = this.container.clientWidth;
    const svgSettings = {
      width: this.containerWidth,
    };

    let yPos = 0;

    this.svg = d3
      .select(this.container)
      .append('svg')
      .attr('width', svgSettings.width);

    this.drawStartPoint();

    const xScale = d3
      .scaleBand()
      .domain(['left-col', 'right-col'])
      .range([0, this.containerWidth])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    const boxWidth = xScale.bandwidth();
    const boxContainer = this.svg.append('g');
    const boxProp = {
      yPositon: 120,
      gap: 20,
    }
    const boxHeightRatio = 2;
    const boxes = boxContainer
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('width', boxWidth)
      .attr('height', boxWidth / boxHeightRatio)
      .attr('x', (d) => {
        const pos = xScale(d.position);
        return pos ? pos : 'empty';
      })
      .attr("y", (d, index)=>{
        const currentPos = boxProp.yPositon;
        boxProp.yPositon = currentPos + boxProp.gap + (boxWidth / boxHeightRatio) ;
        return currentPos;
      });
      this.svgHeight = boxProp.yPositon + boxProp.gap;
      this.svg.attr("height", this.svgHeight)
  }

  drawStartPoint() {
    const posX = this.containerWidth / 2;
    const startPoint = this.svg
      .append('circle')
      .attr('r', 4)
      .attr('cx', posX)
      .attr('cy', 10)
      .attr('fill', 'red');
    const startPointOutLine = this.svg
      .append('circle')
      .attr('r', 6)
      .attr('cx', posX)
      .attr('cy', 10)
      .attr('fill', 'transparent')
      .attr('stroke', 'red');
  }
}
