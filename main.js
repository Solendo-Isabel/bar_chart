
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => response.json())
  .then(data => {
    createBarChart(data.data);
  })
  .catch(error => console.error('Erro ao obter os dados da API:', error));

function createBarChart(data) {
    const svgWidth = 1000;
    const svgHeight = 600;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

   
const svg = d3.select("body")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight)
.attr("class","svg")
.style("background-color", "white");


const chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);


const xScale = d3.scaleBand()
.domain(data.map(d => d[0])) 
.range([0, width])
.padding(0.1);

const yScale = d3.scaleLinear()
.domain([0, d3.max(data, d => d[1])]) 
.range([height, 0]);

chartGroup.selectAll(".bar")
.data(data)
.enter().append("rect")
.attr("class", "bar")
.attr("x", d => xScale(d[0])) 
.attr("y", d => yScale(d[1])) 
.attr("width", xScale.bandwidth())
.attr("height", d => height - yScale(d[1])) 
.attr("fill","blue")


chartGroup.append("g")
.attr("class", "x-axis")
.attr("transform", `translate(0,${height})`)
.call(d3.axisBottom(xScale));

chartGroup.append("g")
.attr("class", "y-axis")
.call(d3.axisLeft(yScale));

}
