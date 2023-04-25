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
  },
};
</script>

<style scoped>
.task label input {
  margin-top: 7px;
  accent-color: #3c87ff;
}

.task label p {
  user-select: none;
  margin-left: 12px;
  word-wrap: break-word;
}

.task label p.checked {
  text-decoration: line-through;
}
.settings :where(i, li) {
  cursor: pointer;
}

.settings .task-menu {
  z-index: 10;
  right: -5px;
  bottom: -65px;
  padding: 5px 0;
  background: #fff;
  position: absolute;
  border-radius: 4px;
  transform: scale(0);
  transform-origin: top right;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.task-menu.show {
  transform: scale(1);
}

.task-menu li {
  height: 25px;
  font-size: 16px;
  margin-bottom: 2px;
  padding: 17px 15px;
  cursor: pointer;
  justify-content: flex-start;
}

.task-menu li:last-child {
  margin-bottom: 0;
}

.settings li:hover {
  background: #f5f5f5;
}

.settings li i {
  padding-right: 8px;
}
</style>
