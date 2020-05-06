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
                text: '这是我的第一个VUE项目'        
            }
        },
    }
</script>