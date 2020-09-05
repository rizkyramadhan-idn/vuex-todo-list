<template>
  <div>
    <form v-on:submit.prevent="submitForm">
      <div class="form-group">
        <input
          v-model="todoTitle"
          type="text"
          class="form-control"
          id="todoTitle"
          placeholder="Masukkan kegiatan hari ini"
        />
      </div>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";

import { mapActions } from "vuex";

export default {
  data() {
    return {
      todoTitle: "",
      isFormSubmitted: false,
    };
  },
  methods: {
    ...mapActions(["addNewTodo"]),

    // Fungsi untuk meng-submit form. Tampilkan alert jika tidak valid, selain itu tambah todo.
    // Valid atau tidak dihitung dari isFormValid yang ada pada computed.

    submitForm() {
      if (!this.isFormValid) {
        Swal.fire("Warning", "Input tidak boleh kosong!", "warning");
      } else {
        this.addNewTodo({ todoTitle: this.todoTitle });
        this.isFormSubmitted = true;
      }
    },
  },
  computed: {
    // Selalu mengecek apakah yang diinputkan oleh user sudah valid atau belum.
    // Valid artinya tidak boleh kosong.

    isFormValid() {
      if (this.todoTitle.trim().length === 0) {
        return false;
      }

      return true;
    },
  },
  watch: {
    // Jika form sudah di-submit, maka kembalikan nilai-nilai pada data menjadi seperti semula.

    isFormSubmitted() {
      if (this.isFormSubmitted) {
        this.todoTitle = "";
        this.isFormSubmitted = false;
      }
    },
  },
};
</script>
