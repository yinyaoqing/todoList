
var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todos: [],
        visibility: 'all',
        cacheTodo: {},
        cacheTitle: '',
        actLength: '',
    },
    methods: {
        addTodo: function () {
            var value = this.newTodo.trim();
            var timestamp = Math.floor(Date.now());
            if (!value) {
                alert('請輸入代辦事項！')
                return;
            }
            this.todos.push({
                id: timestamp,
                title: value,
                completed: false,
            });
            localStorage.setItem('listData', JSON.stringify(this.todos));
            this.newTodo = '';
        },
        removeTodo: function (todo) {
            var newIndex = '';
            this.todos.forEach(function (item, key) {
                if (todo.id == item.id) {
                    newIndex = key
                }
            })
            this.todos.splice(newIndex, 1);
            localStorage.setItem('listData', JSON.stringify(this.todos));
        },
        editTodo: function (item) {
            this.cacheTodo = item;
            this.cacheTitle = item.title;
        },
        cancelEdit: function () {
            this.cacheTodo = {};
        },
        doneEdit: function (item) {
            item.title = this.cacheTitle;
            this.cacheTitle = '';
            this.cacheTodo = {};
        },
        removeAll: function () {
            this.todos = [];
            localStorage.setItem('listData', JSON.stringify(this.todos));
        },
    },
    computed: {
        filteredTodo: function () {
            this.todos = JSON.parse(localStorage.getItem('listData')) || [];
            if (this.visibility == 'all') {
                return this.todos;
            } else if (this.visibility == 'act') {
                var actTodo = [];
                this.todos.forEach(function (item) {
                    if (!item.completed) {
                        actTodo.push(item);
                    }
                })
                return actTodo;
            }
            else if (this.visibility == 'done') {
                var doneTodo = [];
                this.todos.forEach(function (item) {
                    if (item.completed) {
                        doneTodo.push(item);
                    }
                })
                return doneTodo;
            }
        },
        actTodo: function () {
            var actTodo = [];
            this.todos.forEach(function (item) {
                if (!item.completed) {
                    actTodo.push(item);
                }
            })
            return actTodo.length;
        }
    },
    updated(){
        localStorage.setItem('listData', JSON.stringify(this.todos));
    }
});

  