import { Graph } from "./graph";

const container = document.getElementById('root') as HTMLElement;
const data = [
  { id: '1', title: 'title1' },  
  { id: '2', title: 'title2' },
  { id: '3', title: 'title1' },
  { id: '4', title: 'title1' },
];

const graph = new Graph(container, data);