/**
 * 封装本地存储操作模块
 */

/**
 * 存储数据
 */
export const setItem = (key, value) => {
  console.log(value);
  console.log(typeof value );
  //函数体
  if (typeof value == "object") {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};


/**
 * 获取数据
 */
export const getItem = (key) => {
  //函数体
  let data = window.localStorage.getItem(key);
  console.log(data);
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

/**
 * 删除数据
 */
export const removeItem = (key) => {
  //函数体
  window.localStorage.removeItem(key);
};
