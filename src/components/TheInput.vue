<template>
  <div class="task-input">
    <img src="../assets/bars-icon.svg" alt="icon" />
    <input
      type="text"
      placeholder="Add a new task"
      v-model="textInput"
      @keyup.enter="submitText"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      goalEdit: null,
      textInput: "",
      editingGoalId: null,
      isDone: null,
    };
  },
  props: ["editingGoal"],
  watch: {
    editingGoal(newVal) {
      if (newVal) {
        this.goalEdit = newVal;
        this.textInput = this.goalEdit.title;
        this.editingGoalId = this.goalEdit.id;
        this.isDone = this.goalEdit.isDone;
      } else {
        this.textInput = "";
        this.editingGoalId = null;
        this.goalEdit = null;
      }
    },
  },
  methods: {
    submitText() {
      if (this.goalEdit) {
        this.$emit("edit-goal", {
          id: this.editingGoalId,
          title: this.textInput,
          isDone: this.isDone,
        });
      } else {
        this.$emit("submit-text", this.textInput);
      }
      this.textInput = "";
      this.editingGoalId = null;
      this.goalEdit = null;
    },
  },
};
</script>

<style scoped>
.task-input {
  height: 52px;
  padding: 0 25px;
  position: relative;
}

.task-input img {
  top: 50%;
  position: absolute;
  transform: translate(17px, -50%);
}

.task-input input {
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 18px;
  border-radius: 5px;
  padding: 0 20px 0 53px;
  border: 1px solid #999;
}

.task-input input:focus,
.task-input input.active {
  padding-left: 52px;
  border: 2px solid #3c87ff;
}

.task-input input::placeholder {
  color: #bfbfbf;
}
</style>
