<template>
    <span>
        {{text}}
        {{date}}
    </span>
</template>

<script>
    export default {
        name: "MessageText",
        props: ['text', 'date']
    }
</script>

<style scoped>

</style>