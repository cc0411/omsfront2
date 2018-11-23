<template>
    <div class="businessunitdialog">
        <el-dialog
                :title="dialog.title"
                :visible.sync="dialog.show"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false"
        >
            <div class="form">
                <el-form ref="businessunitform" :model="FormData" :rules="rules" label-width="80px">

                    <el-form-item label="类目" prop="businessunit_type">
                        <el-select v-model="FormData.businessunit_type" placeholder="请选择类目">
                            <el-option v-for="item in BUSINESSUNIT__TYPE" :key="item.key" :label="item.name"
                                       :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="父业务线" prop="parent_unit">
                        <el-select v-model="FormData.parent_unit" placeholder="请选择业务线">
                            <el-option v-for="item in TableData" :key="item.name" :value="item.name"
                                       :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务线名" prop="name">
                        <el-input v-model="FormData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="业务线描述" prop="desc">
                        <el-input type="textarea" rows="5" v-model="FormData.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <p class="error-text" v-show="error">{{error}}</p>
                        <el-button type="primary" @click="onSubmit('businessunitform')">提交</el-button>
                        <el-button @click="dialog.show=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {addBusinessUnit, updateBusinessUnit} from '@/api/sys/hosts'

    export default {
        name: 'BusinessUnitdialog',
        props: {
            dialog: Object,
            FormData: Object,
            rowdata: Object,
            TableData: Array,
        },
        data() {
            return {
                BUSINESSUNIT__TYPE: [
                    {key: 1, name: '一级业务线'},
                    {key: 2, name: '二级业务线'},
                    {key: 3, name: '三级业务线'},
                ],
                error: false,
                rules: {
                    name: [
                        {required: true, message: '业务线不可以为空', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            onSubmit(Formname) {
                var that = this
                this.$refs[Formname].validate((valid) => {
                    if (valid) {
                        const option = this.dialog.option == "add" ? addBusinessUnit(this.FormData) : updateBusinessUnit(this.rowdata.id, this.FormData);
                        option.then(res => {
                            this.$message.success('添加更新成功');
                            this.dialog.show = false;
                            this.$emit('updatebusinessunits')
                        }).catch(function (error) {
                            const err = error.response.data;
                            if ("non_field_errors" in err) {
                                that.error = err.non_field_errors[0];
                            }
                            if ("name" in err) {
                                that.error = err.name[0];
                            }
                        })
                    }
                    else {
                        this.$message.error('失败了！');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .error-text {
        color: #fa8341;
    }
</style>