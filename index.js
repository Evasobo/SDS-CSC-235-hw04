const svg = d3.select("#chart"),
      margin = { top: 20, right: 30, bottom: 90, left: 90 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

const g = svg
  .attr("viewBox", `0 0 800 400`)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const tooltip = d3.select("#tooltip");

let showUncertainty = true;

d3.csv("february_weather.csv").then(data => {

  // 🔹 Parse data
  data.forEach(d => {
    d.date = new Date(d.date_time);
    d.temp = +d.temperature_c;
    d.min = d.temp - 2;
    d.max = d.temp + 2;
  });

  // 🔹 Get unique cities
  const cities = [...new Set(data.map(d => d.location))];

  const select = d3.select("#city-select");

  select.selectAll("option")
    .data(cities)
    .enter()
    .append("option")
    .text(d => d);

  let currentCity = cities[0];

  // 🔹 Scales
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // 🔹 Line generator
  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.temp));

  // 🔹 Area generator
  const area = d3.area()
    .x(d => x(d.date))
    .y0(d => y(d.min))
    .y1(d => y(d.max));

  // 🔹 Axes
  const xAxis = g.append("g")
    .attr("transform", `translate(0,${height})`);

  const yAxis = g.append("g");

  // X-axis label
  g.append("text")
    .attr("x", width / 2)
    .attr("y", height + 60)
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text("Date");

  // Y-axis label
  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -60)
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text("Temperature (°C)");

  // 🔹 Paths
  const areaPath = g.append("path")
    .attr("fill", "lightblue")
    .attr("opacity", 0.4);

  const linePath = g.append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2);

  // 🔹 Hover overlay
  const overlay = g.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("pointer-events", "all");

  function update(city) {

    const filtered = Array.from(
      d3.group(
        data.filter(d => d.location === city),
        d => d.date.toDateString()
      ),
      ([key, values]) => {
        const avgTemp = d3.mean(values, d => d.temp);
        return {
          date: new Date(key),
          temp: avgTemp,
          min: avgTemp - 2,
          max: avgTemp + 2,
          location: city
        };
      }
    ).sort((a, b) => a.date - b.date);

    x.domain(d3.extent(filtered, d => d.date));
    y.domain([
      d3.min(filtered, d => d.min),
      d3.max(filtered, d => d.max)
    ]);

    xAxis.call(
      d3.axisBottom(x)
        .ticks(6)
        .tickFormat(d3.timeFormat("%b %d"))
    );

    yAxis.call(d3.axisLeft(y));

    linePath
      .datum(filtered)
      .attr("d", line);

    if (showUncertainty) {
      areaPath
        .datum(filtered)
        .attr("d", area)
        .style("display", "block");
    } else {
      areaPath.style("display", "none");
    }

    // 🔥 Tooltip hover
    overlay
      .on("mousemove", function(event) {
        const [mx] = d3.pointer(event);
        const date = x.invert(mx);

        const bisect = d3.bisector(d => d.date).left;
        const i = bisect(filtered, date);
        const d = filtered[i];

        if (!d) return;

        tooltip
          .style("opacity", 1)
          .html(`
            <strong>${d.location}</strong><br>
            Temp: ${d.temp.toFixed(1)}°C<br>
            Range: ${d.min.toFixed(1)}–${d.max.toFixed(1)}°C
          `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
  }

  // 🔹 Initial render
  update(currentCity);

  // 🔹 Dropdown
  select.on("change", function() {
    currentCity = this.value;
    update(currentCity);
  });

  // 🔹 Toggle
  d3.select("#toggle-btn").on("click", () => {
    showUncertainty = !showUncertainty;

    d3.select("#toggle-btn")
      .text(showUncertainty ? "Hide Uncertainty" : "Show Uncertainty");

    update(currentCity);
  });

});