<template>
    <div>
        <h1>Chat List</h1>
        <b-list-group>
            <b-list-group-item v-for="m,index in chats" :key="index">
                <message-text :text="m.text"></message-text>
                <a class="close" v-on:click="removeMsg(index)">x</a>
            </b-list-group-item>
            <div v-if="chats.length==0">
                <div class="alert alert-info">
                    No Messages
                </div>
            </div>
            <div v-else class="total">
                <p><strong>Total Messages:<span><b-badge>{{chats.length}}</b-badge></span></strong></p>
            </div>
        </b-list-group>
    </div>
</template>

<script>
    import MessageText from "./MessageText";
    export default {
        name: "ChatList",
        props: ['chats'],
        components: {MessageText},
        methods: {
            removeMsg: function (index) {
                this.chats.splice(index, 1);
            }
        }
    }
</script>

<style>
    .close {
        position: absolute;
        top: 8px;
        right: 10px;
    }
    .total {
        text-align: right;
    }
    p {
        color: #777;
    }
</style>
