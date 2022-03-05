const LOCAL_KEY = "todomvc";
const initData = [{ taskId: "1", title: "抽烟", complete: false }, { taskId: "2", title: "喝酒", complete: false }, { taskId: "3", title: "烫头", complete: false }]
let isInit = true;
/**
 * 生成一个任务的唯一编号，时间戳+4位随机数
 */
export const generateId = () => Date.now() + Math.random().toString(16).substr(2, 4);


/**
 * 获取目前所有的任务
 */
export const fetch = () => {
  const result = localStorage.getItem(LOCAL_KEY);
  if (!result && isInit) {
    isInit = false;
    return initData
  } else {
    return JSON.parse(result);
  }
}

/**
 * 保存所有任务
 * @param {*} todos 任务列表
 */
export const save = (todos) => localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));


/**
 * 筛选任务
 * @param {*} todos 任务列表
 * @param {*} visibility 筛选规则
 */
export const filter = (todos, visibility = 'all') => {
  switch (visibility) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter(item => !item.complete);
    case 'completed':
      return todos.filter(item => item.complete);
  }
}