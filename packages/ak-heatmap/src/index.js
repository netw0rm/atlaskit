/* eslint-disable */
import 'style!./host.less';
import { vdom, define, prop } from 'skatejs';
import * as events from './internal/events';
import * as d3 from 'd3'; // eslint-disable-line no-unused-vars
import CalHeatMap from 'cal-heatmap/src/cal-heatmap.js';
import Button from 'ak-button';
import ButtonGroup from 'ak-button-group';
import { enumeration } from 'akutil-common';

const LEGEND_POSITION = {
  attribute: 'legendVerticalPosition',
  values: ['top', 'center', 'bottom'],
  missingDefault: 'bottom',
  invalidDefault: 'bottom',
};

const shadowStyles = `/* Cal-HeatMap CSS */
.cal-heatmap-container {
	display: block;
}
.cal-heatmap-container .graph
{
	font-family: "Lucida Grande", Lucida, Verdana, sans-serif;
}
.cal-heatmap-container .graph-label
{
	fill: #999;
	font-size: 10px
}
.cal-heatmap-container .graph, .cal-heatmap-container .graph-legend rect {
	shape-rendering: crispedges
}
.cal-heatmap-container .graph-rect
{
	fill: #ededed
}
.cal-heatmap-container .graph-subdomain-group rect:hover
{
	stroke: #000;
	stroke-width: 1px
}
.cal-heatmap-container .subdomain-text {
	font-size: 8px;
	fill: #999;
	pointer-events: none
}
.cal-heatmap-container .hover_cursor:hover {
	cursor: pointer
}
.cal-heatmap-container .qi {
	background-color: #999;
	fill: #999
}
/*
Remove comment to apply this style to date with value equal to 0
.q0
{
	background-color: #fff;
	fill: #fff;
	stroke: #ededed
}
*/
.cal-heatmap-container .q1
{
	background-color: #dae289;
	fill: #dae289
}
.cal-heatmap-container .q2
{
	background-color: #cedb9c;
	fill: #9cc069
}
.cal-heatmap-container .q3
{
	background-color: #b5cf6b;
	fill: #669d45
}
.cal-heatmap-container .q4
{
	background-color: #637939;
	fill: #637939
}
.cal-heatmap-container .q5
{
	background-color: #3b6427;
	fill: #3b6427
}
.cal-heatmap-container rect.highlight
{
	stroke:#444;
	stroke-width:1
}
.cal-heatmap-container text.highlight
{
	fill: #444
}
.cal-heatmap-container rect.highlight-now
{
	stroke: red
}
.cal-heatmap-container text.highlight-now
{
	fill: red;
	font-weight: 800
}
.cal-heatmap-container .domain-background {
	fill: none;
	shape-rendering: crispedges
}
.ch-tooltip {
	padding: 10px;
	background: #222;
	color: #bbb;
	font-size: 12px;
	line-height: 1.4;
	width: 140px;
	position: absolute;
	z-index: 99999;
	text-align: center;
	border-radius: 2px;
	box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
	display: none;
	box-sizing: border-box;
}
.ch-tooltip::after{
	position: absolute;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;
	content: "";
	padding: 0;
	display: block;
	bottom: -6px;
	left: 50%;
	margin-left: -6px;
    border-width: 6px 6px 0;
    border-top-color: #222;
}
`;

function cleanTheObject(obj) {
  const res = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      res[key] = obj[key];
    }
  });
  return res;
}

function setHovers(node, elem) {
  node.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'rect') {
      elem._tooltip.target = e.target;
      elem._tooltip.open = true;
    } else {
      elem._tooltip.open = false;
    }
  });
}

function evaluate(obj, expression) {
  const res = new Function('$$', 'return ' + expression)(obj);
  return res;
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Heatmap
 * @example @js import Heatmap from 'ak-heatmap';
 * const component = new Heatmap();
 */
/* eslint-disable */
export default define('ak-heatmap', {
  render(elem) {
    return (
      <div>
        <style>{shadowStyles}</style>
        <div
          ref={(el) => (elem._heatMapContainer = el)}
        ></div>
        {elem.hasButtons ?
          <div style={{margin: '8px 0 0 -2px'}}>
            <ButtonGroup>
              <Button ref={(el) => (elem._heatMapPrev = el)}>prev</Button>
              <Button ref={(el) => (elem._heatMapNext = el)}>next</Button>
            </ButtonGroup>
          </div> :
          null}
      </div>
    );
  },
  rendered(elem) {
    if (!elem._heatMapContainer || !elem.domain) return;

    const cal = new CalHeatMap();
    let options = {
      itemSelector: elem._heatMapContainer,
      previousSelector: elem._heatMapPrev,
      nextSelector: elem._heatMapNext,
      data: elem.data,
      domain: elem.domain,
      subDomain: elem.subDomain,
      range: elem.range,
      cellSize: elem.cellSize,
      cellPadding: elem.cellPadding,
      cellRadius: elem.cellRadius,
      domainGutter: elem.domainGutter,
      verticalOrientation: elem.verticalOrientation,
      colLimit: elem.colLimit,
      rowLimit: elem.rowLimit,
      tooltip: elem.tooltip,
      label: elem.label,
      minDate: elem.minDate,
      maxDate: elem.maxDate,
      legend: elem.legend,
      displayLegend: elem.displayLegend,
      legendCellSize: elem.legendCellSize,
      legendCellPadding: elem.legendCellPadding,
      legendVerticalPosition: elem.legendVerticalPosition,
      start: elem.start,
      legendColors: {
        min: "#23A9FA",
        max: "#1251AE"
      }
    };

    options = cleanTheObject(options);

    if (typeof elem.data === 'string' || elem.dataLocal) {
      options.afterLoadData = (data) => {
        let stats = {};
        let full = {};
        for (var d in data) {
          stats[data[d].time] = elem.expression? evaluate(data[d], elem.expression) : data[d].count
        }
        return stats;
      };
    }

    cal.init(options);

    elem._cal = cal;
  },
  props: {
    hasButtons: prop.boolean({
      attribute: true,
    }),
    domain: prop.string({
      attribute: true,
    }),
    subDomain: prop.string({
      attribute: true,
    }),
    range: prop.number({
      attribute: true,
    }),
    cellSize: prop.number({
      attribute: true,
    }),
    cellPadding: prop.number({
      attribute: true,
    }),
    cellRadius: prop.number({
      attribute: true,
    }),
    domainGutter: prop.number({
      attribute: true,
    }),
    verticalOrientation: prop.boolean({
      attribute: true,
    }),
    colLimit: prop.number({
      attribute: true,
    }),
    rowLimit: prop.number({
      attribute: true,
    }),
    tooltip: prop.boolean({
      attribute: true,
    }),
    data: {},
    label: {},
    minDate: {
      attribute: true,
    },
    maxDate: {
      attribute: true,
    },
    legend: {
      default: [2, 3, 4, 5],
    },
    displayLegend: prop.boolean({
      attribute: true,
    }),
    legendCellSize: prop.number({
      attribute: true,
    }),
    legendCellPadding: prop.number({
      attribute: true,
    }),
    legendVerticalPosition: enumeration(LEGEND_POSITION)({
      attribute: true,
    }),
    start: {
      attribute: true,
    },
    expression: {
      attribute: true,
    },
  },
});

export { events };
