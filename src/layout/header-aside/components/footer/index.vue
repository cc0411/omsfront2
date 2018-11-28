<template>
    <div class="footer">
        <div>
            <strong>Copyright</strong> {{msg}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'oms运维管理系统@2017-2018',

            }
        },
    }

</script>

<style scoped>
    .footer {
        background: none repeat scroll 0 0 ;
        border-top: 1px solid #e7eaec;
        bottom: 0;
        left: 0;
        padding: 10px 20px;
        position: absolute;
        right: 0;
        width: 96%;
    }
</style>