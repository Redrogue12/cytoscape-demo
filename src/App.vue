<template>
  <div
    id="app"
    class="flex"
  >
    <div
      class="canvas-container"
    >
      <cytoscape
        ref="cyRef"
        :config="config"
        v-on:mousedown="clickCanvas"
        v-on:cxttapstart="rightClickNode"
      >
        <cy-element
          v-for="def in elements"
          :key="`${def.data.id}`"
          :definition="def"
          v-on:mousedown="clickNode($event, def.data.id)"
        />
      </cytoscape>
    </div>
    <div class="sidebar">
      <h4>vue-cytoscape</h4>
      <p>node selected: {{ nodeSelected }}</p>
      <button
        class="button"
        :style="createMode ? 'background-color: green' : 'background-color: red'"
        @click="createMode = !createMode"
      >
        Create Mode
      </button>
      <button
        class="button action"
        @click="selectNodeType('action-a')"
      >
        action a
      </button>
      <button
        class="button action"
        @click="selectNodeType('action-b')"
      >
        action b
      </button>
      <button
        class="button action"
        @click="selectNodeType('action-c')"
      >
        action c
      </button>
      <button
        class="button condition"
        @click="selectNodeType('condition-x')"
      >
        condition x
      </button>
      <button
        class="button condition"
        @click="selectNodeType('condition-y')"
      >
        condition y
      </button>
    </div>

  </div>
</template>

<script>
import config from "./example-config";
import actions from "./actions-map";

const elements = [...config.elements];
delete config.elements;

export default {
  data() {
    return {
      actions,
      config,
      elements,
      last: 3,
      nodeSelected: null,
      createMode: false,
      nodeType: null,
    };
  },
  methods: {
    clickCanvas(event) {
      if (!this.createMode) return;
      if (event.target === this.$refs.cyRef.instance && this.nodeType) {
        this.last++
        this.createNode(this.last.toString(), event.position)

        if (this.nodeSelected) {
          this.connectNodes(this.nodeSelected, this.last)
        }
      }
    },
    clickNode(node) {
      if (!this.createMode) return;
      if (!this.nodeSelected) {
        this.nodeSelected = node.target._private.data.id;
      } else {
        this.connectNodes(this.nodeSelected, node.target._private.data.id)
      }
    },
    rightClickNode(event) {
      if (!this.createMode) return;
      if (!event.target.data.label) this.nodeSelected = null;
      const id = event.target._private.data.id;
      const index = this.elements.findIndex((el) => el.data.id === id);
      if (index >= 0) this.elements.splice(index, 1);
    },
    createNode(id, position) {
      const {label, color} = this.nodeType
      this.elements.push({
        data: {
          id,
          action: {
            label,
            color,
          }
        },
        position: { x: position.x, y: position.y },
        group: "nodes"
      });
      this.nodeType = null;
    },
    connectNodes(a, b) {
      if (a === b) {
        this.nodeSelected = null;
        return
      }
      this.elements.push({
        data: { id: `${a}-${b}`, source: `${a}`, target: b },
        group: "edges"
      })
      this.nodeSelected = null;
    },
    selectNodeType(type) {
      this.nodeType = this.actions[type];
    }
  }
};
</script>

<style>
.flex {
  display: flex;
}
.canvas-container {
  width: 80%;
}
.sidebar {
  width: 20%;
  display: flex;
  flex-direction: column;
}
.button {
  width: 100px;
  color: white;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 12px;
}
.action {
  background-color: blue;
}
.condition {
  background-color: orange;
}
</style>