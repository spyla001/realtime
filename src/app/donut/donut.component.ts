import {Component, OnInit, Input, ViewChild, ElementRef, OnChanges} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit, OnChanges {
  @ViewChild('chart', {static: true}) private chartContainer: ElementRef;
  @Input() data: any;


  ngOnChanges(): void {

    if (!this.data) {
      return;
    }

    this.createChart();
  }

  constructor() {
  }

  ngOnInit() {
  }

  createChart() {
    d3.select('svg').remove();
    const element = this.chartContainer.nativeElement;
    const data = this.data;
    console.log(element.offsetWidth);
    console.log(element.offsetWidth);

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const cent = { x: (element.offsetWidth * .3), y: (element.offsetHeight/ 2)};

    const graph = svg.append('g')
        .attr('transform', `translate(${cent.x},${cent.y})`);


    const pie = d3.pie()
        .sort(null)
        .value((d: any) => d.orders);



    const arc = d3.arc()
        .outerRadius(element.offsetHeight / 2)
        .innerRadius(element.offsetHeight / 4);

    console.log((pie(data)));

    const legend = svg.append('g')
        .attr('transform', `translate(${element.offsetWidth * 0.75},0)`)
        .attr('height', 100)
        .attr('width', 100)
        .attr('fontsize', '5px')




    const update = (d) => {
        const domain = d.map(dom => dom.name);

        color.domain(domain);

        const chart = graph.selectAll('g')
          .data(pie(data))
          .enter()
          .append('g')
          .attr('class', 'slice');



        chart.exit().remove();


        const arcTweenEnter = (d) => {
          const i = d3.interpolate(d.endAngle, d.startAngle);
          return (t) => {
            d.startAngle = i(t);
            return arc(d).toString();
          };
        };

        chart.append('path')
          .attr('d', (datum: any) => arc(datum))
          .attr('class', 'arc')
          .attr('stroke', '#fff')
          .attr('stroke-width', 3)
          .attr('fill', (datum: any, index) => color(datum.data.name))
          .transition().duration(750)
          .attrTween('d', arcTweenEnter);

        chart.append('text')
          .attr(
            'transform',
            (d: any) => {
              d.innerRadius = 0;
              d.outerRadius = 0;
              const c  = arc.centroid(d);
              return 'translate(' + c[0] + ',' + c[1] + ')';
            })
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .style('font-size', '10px')
          .style('text-decoration', 'bold')
          .text((d: any) => d.data.orders);

        const legends = legend.selectAll('rect')
          .data(data);
        console.log(legends);
        legends.enter()
          .append('rect')
          .attr('fill', (d: any) => color(d.name))
          .attr('height', 10)
          .attr('width', 10)
          .attr('y', (d, i) => i * 20);
        const legendText = legend.selectAll('text')
          .data(data);
        // @ts-ignore
        legendText.enter()
          .append('text')
          .attr('transform', `translate(12,10)`)
          .attr('fill', (d: any) => color(d.name))
          .text((d: any) => d.name)
          .attr('y', (d, i) => i * 20);

      };
    update(data);
    const handleMouseOver = (d, i, n) => {
        const element = d3.select(d3.event.target);
        console.log(element);
        element.style('opacity', 0.5);
      };

    const handleMouseOut = (d, i, n) => {
        const element = d3.select(d3.event.target);
        console.log(element);
        element.style('opacity', 1);
      };

    graph.selectAll('path')
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);
  }

  onResize(event: Event) {
    this.createChart();
  }


}
