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
