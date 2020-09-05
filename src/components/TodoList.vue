<template>
  <div>
    <div v-if="!getTodoListLength" class="alert alert-primary" role="alert">Todo list is empty.</div>

    <ul v-else class="list-group">
      <li
        v-for="(todo, index) in getTodoList"
        :key="index"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ todo.todoTitle }}
        <div>
          <span
            v-b-modal.modal-prevent-closing
            v-on:click="setCurrentIndexTodo(index, todo.todoTitle)"
            class="icon-todo icon-todo-left"
          >
            <b-icon icon="pencil" variant="primary"></b-icon>
          </span>

          <span v-on:click="removeTodo(index)" class="icon-todo">
            <b-icon icon="trash" variant="danger"></b-icon>
          </span>
        </div>
      </li>
    </ul>

    <b-modal
      v-on:show="resetModal"
      v-on:hidden="resetModal"
      v-on:ok="handleOk"
      id="modal-prevent-closing"
      ref="modal"
      title="Edit Todo"
    >
      <form ref="form" @submit.stop.prevent="handleModalSubmit">
        <b-form-group :state="nameState" invalid-feedback="Todo is required">
          <b-form-input
            id="edit-form-todo-input"
            v-model="currentEditedTodoTitle"
            :state="nameState"
            placeholder="Masukkan kegiatan hari ini"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Swal from "sweetalert2";

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      nameState: null,
      currentEditedIndexTodo: null,
      currentEditedTodoTitle: null,
    };
  },
  methods: {
    // Mendapatkan semua action dari store.

    ...mapActions(["removeTodoByIndex", "editTodoByIndex"]),

    // Fungsi untuk menghapus todo dan menampilkan alert success.

    removeTodo(todoIndex) {
      this.removeTodoByIndex(todoIndex);

      Swal.fire({
        icon: "success",
        title: "Todo berhasil dihapus!",
        showConfirmButton: false,
      });
    },

    // Fungsi untuk mengset atau memilih index todo yang sedang diedit.

    setCurrentIndexTodo(currentEditedIndexTodo, currentEditedTodoTitle) {
      this.currentEditedIndexTodo = currentEditedIndexTodo;
      this.currentEditedTodoTitle = currentEditedTodoTitle;
    },

    // Mengecek apakah form yang ada pada modal edit todo sudah valid atau belum.

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },

    // Fungsi yang akan berjalan pada saat form sudah valid dan ok.

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleModalSubmit();
    },

    // Fungsi untuk mengembalikan form edit todo seperti semula.

    resetModal() {
      this.nameState = null;
    },

    // Fungsi yang akan berjalan ketika form edit todo di-submit.

    handleModalSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }

      // Mengedit todo berdasarkan index

      this.editTodoByIndex({
        index: this.currentEditedIndexTodo,
        todoTitle: this.currentEditedTodoTitle,
      });

      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
  computed: {
    // Mendapatkan semua getters yang ada di store.

    ...mapGetters(["getTodoList", "getTodoListLength"]),
  },
};
</script>

<style scoped>
.icon-todo:hover {
  cursor: pointer;
}

.icon-todo-left {
  margin-right: 0.5rem;
}

.list-group-item:hover {
  border: 1px solid #6c757d;
  cursor: pointer;
}
</style>
