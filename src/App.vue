<template>
  <div id="app" class="m-4">
    <div class="row">
      <div class="col-sm-12 col-md-10 col-lg-8 mx-auto">
        <div class="container">
          <div class="card">
            <div class="card-header">
              <span class="font-weight-bold">Todo List</span>
              <span>Total Todo: {{ getTodoListLength }}</span>
            </div>

            <div class="card-body">
              <TodoForm />
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TodoForm from "@/components/TodoForm.vue";
import TodoList from "@/components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoForm,
    TodoList,
  },
  computed: {
    ...mapGetters(["getTodoListLength"]),
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  justify-items: center;
}
</style>
