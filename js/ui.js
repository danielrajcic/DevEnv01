function dropdown() {
    return {
        open: false,
        show() {
            this.open = true;
        },

        hide() {
            this.open = false;
        }
    }
}

function counter() {
    return {
    count: 0,

        reset() {
            this.count = 0;
        },

        increment() {
            this.count++;
        },

        decrement() {
            this.count--;
        }
    }
}

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
});
