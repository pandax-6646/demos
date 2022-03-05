<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoTitle"
          @keydown.enter="addTodoHandle"
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="isCheckedAll" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list" :class="{isScroll: filterTodoListRef.length >= 6}">
          <li
            class="todo"
            :class="{completed: item.complete, editing: item === editTodoRef}"
            v-for="(item, index) in filterTodoListRef"
            :key="item.taskId"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.complete" />
              <label @dblclick="openEdit(index)">{{item.title}}</label>
              <button class="destroy" @click="delTodoHandle(item)"></button>
            </div>
            <input
              class="edit"
              type="text"
              @keydown.enter="submitTodoHandle(item, index)"
              @blur="submitTodoHandle(item, index)"
              @keydown.escape="withdrawTodoHandle(index)"
              v-model="item.title"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-if="todoListRef.length">
        <span class="todo-count">
          <strong>{{ remainingRef }}</strong>
          <span>item{{ remainingRef == 1 ? '' : 's'}} left</span>
        </span>
        <ul class="filters" v-if="todoListRef.length">
          <li v-for="(item, index) in btns" :key="index">
            <a
              :href="`#/${item}`"
              :class="{selected: item === visibilityRef}"
            >{{item.slice(0,1).toUpperCase() + item.slice(1)}}</a>
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show="completedRef"
          @click="delCompletedHandle"
        >Clear completed</button>
      </footer>
    </section>
  </div>
</template>

<script>
import { fetch, save, generateId, filter } from './utils/todoStorage'
import { ref, watchEffect, onMounted, onUnmounted, computed } from 'vue'
export default {
  setup() {
    /**
     * 获取任务列表
     */
    const todoListRef = ref(fetch())
    watchEffect(() => {
      save(todoListRef.value)
    })

    /**
     * 添加任务
     */
    const newTodoTitle = ref('')
    const addTodoHandle = () => {
      newTodoTitle.value &&
        todoListRef.value.unshift({
          taskId: generateId(),
          title: newTodoTitle.value.trim(),
          complete: false
        })
      newTodoTitle.value = ''
    }

    /**
     * 筛选相关
     */
    const btns = ['all', 'active', 'completed']
    const visibilityRef = ref('all')

    const getHashHandel = () => {
      const hashStr = location.hash.replace(/#\/?/, '')
      if (btns.includes(hashStr)) {
        visibilityRef.value = hashStr
      } else {
        location.hash = ''
        visibilityRef.value = 'all'
      }
    }

    onMounted(() => window.addEventListener('hashchange', getHashHandel))
    onUnmounted(() => window.addEventListener('hashchange', getHashHandel))

    const filterTodoListRef = computed(() =>
      filter(todoListRef.value, visibilityRef.value)
    )
    const remainingRef = computed(
      () => filter(todoListRef.value, 'active').length
    )
    const completedRef = computed(
      () => filter(todoListRef.value, 'completed').length
    )

    /**
     * 修改任务
     */
    let editTodoRef = ref(null)
    let originTitle = ''
    const openEdit = (index) => {
      console.log(index)
      originTitle = filterTodoListRef.value[index].title
      editTodoRef.value = filterTodoListRef.value[index]
    }
    const submitTodoHandle = (todo, index) => {
      editTodoRef.value = null
      const title = todo.title.trim()
      if (todo.title.trim()) {
        todo.title = title
      } else {
        filterTodoListRef.value.splice(index, 1)
      }
    }
    const withdrawTodoHandle = (index) => {
      submitTodoHandle()
      filterTodoListRef.value[index].title = originTitle
    }

    /**
     * 全选按钮
     */
    let isCheckedAll = computed({
      get() {
        return (
          filterTodoListRef.value.filter((item) => !item.complete).length == 0
        )
      },
      set(checked) {
        filterTodoListRef.value.forEach((item) => (item.complete = checked))
      }
    })

    /**
     * 删除任务
     */
    const delTodoHandle = (todo) => {
      todoListRef.value.splice(todoListRef.value.indexOf(todo), 1)
    }
    const delCompletedHandle = () => {
      todoListRef.value
        .filter((item) => item.complete)
        .forEach((item) => delTodoHandle(item))
    }

    /**
     *
     *
     *
     *
     */
    return {
      todoListRef,
      newTodoTitle,
      addTodoHandle,
      visibilityRef,
      btns,
      filterTodoListRef,
      remainingRef,
      completedRef,
      editTodoRef,
      openEdit,
      submitTodoHandle,
      withdrawTodoHandle,
      isCheckedAll,
      delTodoHandle,
      delCompletedHandle
    }
  }
}
</script>
