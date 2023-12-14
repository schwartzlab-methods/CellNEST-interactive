import {
  data,
  nodeCount,
  graph3D,
  setGraph3D,
  graphdata,
  setGraphdata,
  element3D,
} from "../globalvars.js";

export function load3D(filter) {
  if (filter != "NULL") {
    let newData = jQuery.extend(true, {}, graphdata);
    let nodeSet = new Set();
    if (filter.indexOf("-") > -1) {
      for (let i = 0; i < newData.links.length; i++) {
        if (newData.links[i]["ligand-receptor"] != filter) {
          newData.links.splice(i, 1);
          i--;
        } else {
          nodeSet.add(newData.links[i]["source"]["id"]);
          nodeSet.add(newData.links[i]["target"]["id"]);
        }
      }
      for (let i = 0; i < newData.nodes.length; i++) {
        if (!nodeSet.has(newData.nodes[i]["id"])) {
          newData.nodes[i]["color"] = "#D3D3D3";
        }
      }
    } else {
      for (let i = 0; i < newData.links.length; i++) {
        if (
          newData.links[i]["ligand"] != filter &&
          newData.links[i]["receptor"] != filter
        ) {
          newData.links.splice(i, 1);
          i--;
        } else {
          nodeSet.add(newData.links[i]["source"]["id"]);
          nodeSet.add(newData.links[i]["target"]["id"]);
        }
      }
      for (let i = 0; i < newData.nodes.length; i++) {
        if (!nodeSet.has(newData.nodes[i]["id"])) {
          newData.nodes[i]["color"] = "#D3D3D3";
        }
      }
    }
    graph3D.graphData(newData).linkColor((d) => {
      return d.source.color;
    });
  } else {
    let map = new Map();
    for (let i in data.links) {
      map.set(data.links[i].label, Math.random() * Math.PI * 2);
    }
    let graph = ForceGraph3D()(element3D)
      .nodeThreeObject(
        ({ shape, color }) =>
          new THREE.Mesh(
            [
              new THREE.SphereGeometry(8),
              new THREE.BoxGeometry(16, 16, 16),
              new THREE.CylinderGeometry(8, 8, 16),
            ][shape == "circle" ? 0 : shape == "box" ? 1 : 2],
            new THREE.MeshLambertMaterial({
              color: color,
            })
          )
      )
      .graphData(JSON.parse(JSON.stringify(data)))
      .width(($(window).width() * 11) / 12)
      .height(($(window).height() * 11) / 12)
      .backgroundColor("#F5F5DC")
      .nodeLabel("id")
      .linkOpacity(1)
      .linkLabel("value")
      .linkColor((d) => {
        return data.nodes[d.source].color;
      })
      .linkDirectionalArrowLength((d) => {
        return (d.value / nodeCount) * 50;
      })
      .linkCurvature(1)
      .linkCurveRotation((d) => {
        //console.log(d.label);
        return map.get(d.label);
      })
      .linkDirectionalArrowRelPos(1)
      .linkWidth((d) => {
        return (d.value / nodeCount) * 15;
      });
    setGraph3D(graph);
    setGraphdata(graph.graphData());
  }
}