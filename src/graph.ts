import * as d3 from 'd3';

export class Graph {
  private container: HTMLElement;
  private data;
  constructor(container:HTMLElement, data) {
    this.container = container;
    this.data = data;
    this.render();
  }

  private render() {
    const containerWidth = this.container.clientWidth;
    let svgHeight = 0;
    const svgSettings = {
      width: containerWidth,
    }
    const rectProp = {
      width: 120,
      height: 40,
      gap: 20,
    };

    
    let yPos = 0;

    const svg = d3
      .select(this.container)
      .append('svg')
      .attr('width', svgSettings.width)

    const rect = svg
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('height', rectProp.height)
      .attr('width', rectProp.width)
      .attr('fill', 'red')
      .attr('y', () => {
        yPos += rectProp.height + rectProp.gap;
        return yPos;
      });

    svgHeight += yPos+ rectProp.height + rectProp.gap;
    svg.attr("height", svgHeight);
  }
}
