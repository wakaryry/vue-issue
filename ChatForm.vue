<template>
    <div>
        <div>
            <b-form-input v-model="text" type="text" placeholder="Enter message."></b-form-input>
            <div>
                <b-badge pill variant="success">{{text.length}}/30</b-badge>
            </div>
            <button v-on:click="validateInput" class="btn btn-primary">Send Message</button>
        </div>
        <div v-if="isEmptyText">
            <b-alert variant="danger" show>
                Please enter a message.
            </b-alert>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChatForm",
        props: ['save', 'isEmptyText'],
        data: function () {
            return {
                text: ""
            }
        },
        methods: {
            validateInput: function () {
                this.save(this.text);
                if (!this.isEmptyText) {
                    this.text = "";
                }
            }
        }
    }
</script>

<style scoped>
    .form-control {
        border-radius: 0;
    }
    .btn {
        border-radius: 0;
        margin-top: 10px;
    }
</style>