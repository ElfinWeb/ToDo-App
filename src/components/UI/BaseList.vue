<template>
  <li class="task">
    <label :for="id">
      <input type="checkbox" :ref="id" v-model="isChecked" />
      <p :class="{ checked: isChecked }">{{ title }}</p>
    </label>
    <div class="settings">
      <i class="uil uil-ellipsis-h" @click="showMenu"></i>
      <ul class="task-menu">
        <li @click="editGoal"><i class="uil uil-pen"></i>Edit</li>
        <li @click="deleteGoal"><i class="uil uil-trash"></i>Delete</li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false,
    };
  },
  watch: {
    isChecked(val) {
      this.$emit("check-goal", { id: this.id, isDone: val });
    },
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    showMenu(e) {
      e.target.nextElementSibling.classList.toggle("show");
    },
    editGoal(e) {
      this.$emit("edit-goal", this.id);
      e.target.parentElement.classList.remove("show");
    },
    deleteGoal(e) {
      this.$emit("delete-goal", this.id);
      e.target.parentElement.classList.remove("show");
    },
  },
  created() {
    this.isChecked = this.isDone;
  }
};
</script>
