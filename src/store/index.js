import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [{ todoTitle: "Ini contoh todo" }],
  },
  getters: {
    // Return sebuah todo list.

    getTodoList: (state) => {
      return state.todoList;
    },

    // Return panjang dari todo list.

    getTodoListLength: (state) => {
      return state.todoList.length;
    },
  },
  mutations: {
    // Sebuah mutation untuk menambahkan sebuah todo baru pada todo list.

    addNewTodo: (state, payload) => {
      return state.todoList.push(payload);
    },

    // Sebuah mutation untuk menghapus sebuah todo berdasarkan id.

    removeTodoByIndex: (state, payload) => {
      state.todoList.splice(payload, 1);
    },

    // Mutation untuk mengubah todo berdasarkan index.
    // Contoh payload: { index: 0, todoTitle: "Ini adalah todo" }
    // Contoh saat di-edit: todoList[0] = { todoTitle: "Ini adalah todo 2" }

    editTodoByIndex: (state, payload) => {
      state.todoList[payload.index] = { todoTitle: payload.todoTitle };
    },
  },
  actions: {
    // Commit sebuah mutation dengan nama 'addNewTodo'.

    addNewTodo: (context, payload) => {
      return context.commit("addNewTodo", payload);
    },

    // Melakukan commit terhadap sebuah mutation dengan nama removeTodoByIndex.

    removeTodoByIndex: (context, payload) => {
      return context.commit("removeTodoByIndex", payload);
    },

    // Melakukan commit terhadap sebuah mutation dengan nama editTodoByIndex.

    editTodoByIndex: (context, payload) => {
      return context.commit("editTodoByIndex", payload);
    },
  },
  modules: {},
});
