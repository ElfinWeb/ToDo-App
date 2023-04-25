<template>
  <base-card>
    <the-input
      @submit-text="submitGoal"
      :editingGoal="editingGoal"
      @edit-goal="editGoalTitle"
    ></the-input>
    <div class="controls">
      <div class="filters">
        <base-filter
          v-for="filter in filters"
          :filter="filter"
          :key="filter"
          :class="filter === currentFilter ? 'active' : ''"
          @click="setFilter"
        ></base-filter>
      </div>
      <button class="clear-btn active" @click="clearAll" ref="clearBtn">
        Clear All
      </button>
    </div>
    <ul class="task-box" v-if="goals"><base-list
          v-for="goal in selectedGoals"
          :key="goal.id"
          :title="goal.title"
          :id="goal.id"
          :isDone="goal.isDone"
          @edit-goal="editGoal"
          @delete-goal="deleteGoal"
          @check-goal="checkGoal"
        ></base-list>
    </ul>
  </base-card>
</template>

<script>
import TheInput from "./components/TheInput.vue";
export default {
  name: "App",
  components: {
    TheInput,
  },
  data() {
    return {
      goals: [],
      editingGoal: null,
      filters: ["All", "Completed", "Pending"],
      currentFilter: "All",
      selectedGoals: [],
    };
  },
  watch: {
    currentFilter(newFilter) {
      if (newFilter === "Completed") {
        this.selectedGoals = this.goals.filter((goal) => goal.isDone);
      } else if (newFilter === "Pending") {
        this.selectedGoals = this.goals.filter((goal) => !goal.isDone);
      } else {
        this.selectedGoals = this.goals;
      }
    },
  },
  methods: {
    submitGoal(text) {
      const newGoal = {
        id: new Date().toISOString(),
        title: text,
        isDone: false,
      };
      this.goals.push(newGoal);
    },
    editGoal(id) {
      const goal = this.goals.find((goal) => goal.id === id);
      this.editingGoal = goal;
    },
    deleteGoal(id) {
      const index = this.goals.findIndex((goal) => goal.id === id);
      this.goals.splice(index, 1);
    },
    editGoalTitle(goal) {
      const index = this.goals.findIndex((sGoal) => sGoal.id === goal.id);
      this.goals.splice(index, 1, goal);
    },
    checkGoal(val) {
      const goal = this.goals.find((goal) => goal.id === val.id);
      goal.isDone = val.isDone;
      const index = this.goals.findIndex((sGoal) => sGoal.id === goal.id);
      this.goals.splice(index, 1, goal);
    },
    setFilter(e) {
      this.currentFilter = e.target.textContent;
    },
    clearAll() {
      const length = this.goals.length;
      this.goals.splice(0, length);
    },
  },
  created() {
    this.selectedGoals = this.goals;
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #d4145a, #fbb03b);
}

::selection {
  color: #fff;
  background: #3c87ff;
}

.controls,
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.controls {
  padding: 18px 25px;
  border-bottom: 1px solid #ccc;
}

.filters span {
  margin: 0 8px;
  font-size: 17px;
  color: #444444;
  cursor: pointer;
}

.filters span:first-child {
  margin-left: 0;
}

.filters span.active {
  color: #3c87ff;
}

.controls .clear-btn {
  border: none;
  opacity: 0.6;
  outline: none;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  padding: 7px 13px;
  border-radius: 4px;
  letter-spacing: 0.3px;
  pointer-events: none;
  transition: transform 0.25s ease;
  background: linear-gradient(135deg, #fbb03b 0%, #d4145a 100%);
}

.clear-btn.active {
  opacity: 0.9;
  pointer-events: auto;
}

.clear-btn:active {
  transform: scale(0.93);
}

.task-box {
  margin-top: 20px;
  margin-right: 5px;
  padding: 0 20px 10px 25px;
}

.task-box.overflow {
  overflow-y: auto;
  max-height: 300px;
}

.task-box::-webkit-scrollbar {
  width: 5px;
}

.task-box::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 25px;
}

.task-box::-webkit-scrollbar-thumb {
  background: #e6e6e6;
  border-radius: 25px;
}

.task-box .task {
  list-style: none;
  font-size: 17px;
  margin-bottom: 18px;
  padding-bottom: 16px;
  align-items: flex-start;
  border-bottom: 1px solid #ccc;
}

.task-box .task:last-child {
  margin-bottom: 0;
  border-bottom: 0;
  padding-bottom: 0;
}

.task-box .task label {
  display: flex;
  align-items: flex-start;
}
.task-box .settings {
  position: relative;
}

.task-box .task:last-child .task-menu {
  bottom: 0;
  transform-origin: bottom right;
}

.task-box .task:first-child .task-menu {
  bottom: -65px;
  transform-origin: top right;
}

@media (max-width: 400px) {
  body {
    padding: 0 10px;
  }

  .wrapper {
    padding: 20px 0;
  }

  .filters span {
    margin: 0 5px;
  }

  .task-input {
    padding: 0 20px;
  }

  .controls {
    padding: 18px 20px;
  }

  .task-box {
    margin-top: 20px;
    margin-right: 5px;
    padding: 0 15px 10px 20px;
  }

  .task label input {
    margin-top: 4px;
  }
}
</style>
