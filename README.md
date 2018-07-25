## Basic
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
