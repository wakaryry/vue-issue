var removeMessage = Vue.component('removeMessage', {
    template: '#remove-message',
    props: ['removeMessageFunction']
});


var messageItem = Vue.component('messageItem', {
    template: '#message-item',
    props: ['message']
});

var messagesList = Vue.component('messages', {
    template: '#messages-list',
    props: ['chat', 'removeMessage'],
    methods: {
        getRelativeTime: function (timeStamp) {
            var now = new Date();
            var secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
            if (secondsPast < 60) {
                var seconds = parseInt(secondsPast.toString());
                return seconds.toString() + 'seconds ago.';
            }
            if (secondsPast < 3600) {
                var minus = parseInt((secondsPast / 60).toString());
                return minus.toString() + 'minutes ago.';
            }
            if (secondsPast <= 86400) {
                var hours = parseInt((secondsPast / 3600).toString());
                return hours.toString() + 'hours ago.';
            }
        }
    }
});

var chatForm = Vue.component('chatForm', {
    template: '#chat-form',
    props: ['save', 'total-messages'],
    data: function () {
        return {
            message: "",
            hasErrors: false
        }
    },
    methods: {
        empty: function () {
            if (this.message) {
                this.message = "";
                this.hasErrors = false;
            }
            else {
                this.hasErrors = true;
            }
        }
    }
});

var ChatApp = new Vue({
    el: '#root',
    data: {
        appName: "Welcome to chat app.",
        messages: [
            {text: 'How are you?', time: new Date()},
            {text: "I'm fine. Thank you. And you?", time: new Date()},
            {text: 'Fine', time: new Date()},
        ]
    },
    methods: {
        save: function (message) {
            if (message) {
                this.messages.push({text: message, time: new Date()});
            }
        },
        removeMessage: function (index) {
            this.messages.splice(index, 1);
        }
    }
});
