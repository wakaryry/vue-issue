## Basic `basic.html`
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue JS Hello World</title>
</head>
<body>

    <div id="root">

        <form v-on:submit.prevent="submitHandle">
            <button>Submit</button>
        </form>
        <h1 v-show="show">{{message}}</h1>
        <h2 v-if="show">V-IF-SHOW-MESSAGE</h2>
        <h2 v-else>V-ELSE-NO-MESSAGE</h2>

        <input v-model="message">

        <li v-for="i in 6">
            {{ i }} * 4 = {{i * 4}}
        </li>
        <li v-for="name, index in names">
            <h3>{{index}}: Hello, {{name.name}}</h3>
        </li>
        <img v-bind:src="imageSrc">
        <img :src="imageSrc">

        <hello></hello>
        <why-beauty name="MaMa" :say-hi="sayHello"></why-beauty>
        <bb-call name="PaPa"></bb-call>
        <bb-call v-for="name, index in names" :name="name.name" :key="index"></bb-call>

    </div>

    <template id="bb-call">
        <div>
            <h2>My name is {{name}} call! BB!</h2>
            <button v-on:click="alert">Please Click</button>
        </div>
    </template>

</body>
<script src="https://unpkg.com/vue"></script>
<script>
    // we must register component before init a vue.
    // and we must use component in a vue element block.
    Vue.component("hello", {
        template: "<div>How are you</div>",
    });

    Vue.component("whyBeauty", {
        template: `
            <div>
                <h2>Hi, {{name}}. Do you know why you are so beautiful?</h2>
                <button v-on:click="alert">Click Me</button>
                <button v-on:click="sayHi">Click to say Hi</button>
            </div>
        `,
        props: ["name", "sayHi"],
        methods: {
            alert: function() {
                alert(1);
            }
        }
    });

    Vue.component('bb-call', {
        template: '#bb-call',
        props: ["name"],
        methods: {
            alert: function () {
                alert(2);
            }
        }
    });

    var App = new Vue({
        el: '#root',
        data: {
            message: 'Hi',
            show: true,
            names: [
                {name: 'MYP'},
                {name: 'Kitty'},
                {name: 'MeiMei'},
            ],
            imageSrc: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1831223413,2859721695&fm=173&app=25&f=JPEG?w=218&h=146&s=CB9043871A5A4BD45105B6B503004005'
        },
        methods: {
            submitHandle: function () {
                alert(1);
            },
            sayHello: function () {
                alert("Hi.");
            }
        }
    });
</script>
</html>

```

## Step: `index.html` and `app.js`
### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue Hello World</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <style type="text/css">
        body {
            margin: 20px;
        }
    </style>
</head>
<body>

    <div id="root">
        <div>
            <h1>{{appName}}</h1>
            <messages :remove-message="removeMessage" :chat="messages"></messages>
            <chat-form :total-messages="messages.length" :save="save"></chat-form>
        </div>
    </div>

    <template id="messages-list">
        <div>
            <ul class="list-group">
                <li class="list-group-item" v-for="m, index in chat">
                    <message-item :message="m"></message-item>
                    <remove-message :remove-message-function="removeMessage"></remove-message>
                    <span style="position: relative; left: 50px;" class="pull-right">
                        Date: {{getRelativeTime(m.time)}}
                    </span>
                </li>
                <div v-if=" chat.length <= 0 ">
                    <div class="alert alert-info">
                        <p>
                            No Messages.
                        </p>
                    </div>
                </div>
            </ul>
        </div>
    </template>

    <template id="remove-message">
    <span>
        <a v-on:click="removeMessageFunction()" class="close">X</a>
    </span>
    </template>

    <template id="message-item">
        <span>{{message.text}}</span>
    </template>

    <template id="chat-form">
        <div>
            <form v-on:submit.prevent="save(message), empty()">
                <label>Your massage</label>
                <input v-model="message" type="text" class="form-control">
                <div v-if="hasErrors" class="alert alert-danger">
                    <p>
                        Please enter a message.
                    </p>
                </div>
                <button class="btn btn-info">Send</button>
                <span class="pull-right badge badge-info">
                {{totalMessages}}
            </span>
            </form>
        </div>
    </template>

    <script src="https://unpkg.com/vue"></script>
    <script src="app.js"></script>

</body>
</html>
```

### app.js
```js
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

```
