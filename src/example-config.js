const config = {
  elements: [
    {
      data: { 
        id: "1",
        action: {
          label: "condition x",
          color: "orange",
        },
      },
      position: { x: 589, y: 182 },
      group: "nodes"
    },
    {
      data: { 
        id: "2",
        action: {
          label: "action b",
          color: "blue",
        },
      },
      position: { x: 689, y: 282 },
      group: "nodes"
    },
    {
      data: { 
        id: "3",
        action: {
          label: "action a",
          color: "blue",
        },
      },
      position: { x: 489, y: 282 },
      group: "nodes"
    },
    {
      data: {id: "1-2", source: "1", target: "2" },
      group: "edges"
    },
    {
      data: {id: "1-3", source: "1", target: "3" },
      group: "edges"
    },
  ],
  style: [
    {
      selector: "node",
      style: { "background-color": "data(action.color)", label: "data(action.label)" }
    },
    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle"
      }
    }
  ],
  layout: { name: "grid", rows: 1 }
};

export default config;
