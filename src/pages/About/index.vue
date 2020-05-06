<style lang="less">
    .wrapper {
        text-align: center;
        span {
            color: crimson;
            font-size: 18px;
        }
    }
</style>
<template>
    <div class="wrapper">
        <span>
            {{text}}
        </span>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                text: 'About'        
            }
        },
    }
</script>