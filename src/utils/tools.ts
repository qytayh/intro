// 工具函数
const delayDefault = 500;

// 防抖
export const debounce = (delay = delayDefault) => {
  return function(target: any, key: any, descriptor:PropertyDescriptor) {
    const oldValue = descriptor.value;
    let timer: any = null;
    descriptor.value = function() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        oldValue.apply(this, arguments);
      }, delay);
    };
    return descriptor;
  };
};


// 节流
export const throttle = (delay = delayDefault) => {
  return function(target: any, key: any, descriptor: PropertyDescriptor) {
    let timer: any = null;
    const oldFunction = descriptor.value;
    descriptor.value = function() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          oldFunction.apply(this, arguments);
        }, delay);
      }
    };
    return descriptor;
  };
};

