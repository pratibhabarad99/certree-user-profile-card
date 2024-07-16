<template>
    <v-card class="post-card">
        <slot></slot>
    </v-card>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style scoped>
    .post-card {
        margin-top: 16px;
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background-color: #ffffff;
    }
</style>
