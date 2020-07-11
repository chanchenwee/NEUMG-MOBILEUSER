<template>
    <header class="wrap">
        <i class="iconfont icon-left" @click="goBack"></i>
        <span>{{mTitle}}</span>
    </header>
</template>

<script>
    export default {
        components: {},
        props: {
            mTitle: {
                type: String,
                default: ''
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';

    header {
        position: relative;
        width: 100%;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        padding: 0 20px;
        font-size: 20px;
        @include boxSizing;
        .iconfont {
            position: absolute;
            left: 20px;
            top: 0;
            font-size: 20px;
            font-weight: bold;
        }
    }
</style>
