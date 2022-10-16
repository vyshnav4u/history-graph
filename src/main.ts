import { Graph } from "./graph";

const container = document.getElementById('root') as HTMLElement;
const data = [
  { order: '1', title: 'title1', position: "left-col" },  
  { order: '2', title: 'title2', position: "right-col" },
  { order: '3', title: 'title1', position: "left-col" },
  { order: '4', title: 'title1', position: "right-col" },
];

const graph = new Graph(container, data);