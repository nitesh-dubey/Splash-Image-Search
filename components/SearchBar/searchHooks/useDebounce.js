const useDebounce = (fun, delay = 500) => {
    let timer;
    return function(...args) {
        const context = this;
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fun.apply(this, args);
        }, delay);
    }
}

export default useDebounce;