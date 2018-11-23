<template>
    <div class="hostdialog">
        <el-dialog
                :title="dialog.title"
                :visible.sync="dialog.show"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false"
        >
            <div class="form">
                <el-form ref="hostform" :model="FormData" :rules="rules" label-width="80px">
                    <el-form-item label="主机名" prop="hostname">
                        <el-input v-model="FormData.hostname"></el-input>
                        <span class="error-text" v-if="hosterror">{{hosterror}}</span>
                    </el-form-item>
                    <el-form-item label="外网地址" prop="wip">
                        <el-input v-model="FormData.wip"></el-input>
                        <span class="error-text" v-if="wiperror">{{wiperror}}</span>
                    </el-form-item>
                    <el-form-item label="内网地址" prop="nip">
                        <el-input v-model="FormData.nip"></el-input>
                        <span class="error-text" v-if="niperror">{{niperror}}</span>
                    </el-form-item>
                    <el-form-item label="设备类型" prop="server_type">
                        <el-select v-model="FormData.server_type" placeholder="请选择设备类型">
                            <el-option v-for="item in ASSET_TYPE" :key="item.key" :label="item.name"
                                       :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="主机状态" prop="status">
                        <el-select v-model="FormData.status" placeholder="请选择主机状态">
                            <el-option v-for="item in ASSET_STATUS" :key="item.key" :label="item.name"
                                       :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="云主机ID" prop="instance_id">
                        <el-input v-model="FormData.instance_id"></el-input>
                    </el-form-item>
                    <el-form-item label="SN编号" prop="sn">
                        <el-input v-model="FormData.sn"></el-input>
                    </el-form-item>
                    <el-form-item label="CPU" prop="cpu_info">
                        <el-input v-model="FormData.cpu_info"></el-input>
                    </el-form-item>
                    <el-form-item label="内存" prop="memory">
                        <el-input v-model="FormData.memory"></el-input>
                    </el-form-item>
                    <el-form-item label="硬盘" prop="disk">
                        <el-input v-model="FormData.disk"></el-input>
                    </el-form-item>
                    <el-form-item label="系统" prop="os">
                        <el-input v-model="FormData.os"></el-input>
                    </el-form-item>
                    <el-form-item label="机房" prop="idc">
                        <el-select v-model="FormData.idc" placeholder="请选择机房">
                            <el-option v-for="item in IdcData" :key="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色" prop="role">
                        <el-select v-model="FormData.role" multiple placeholder="请选择">
                            <el-option v-for="item in RoleData" :key="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务线" prop="business_unit">
                        <treeselect
                                :options="BusinessUnitData"
                                v-model="FormData.business_unit"
                                :normalizer="normalizer"
                                placeholder="请选择业务线"
                        />
                    </el-form-item>
                    <el-form-item label="主机描述" prop="desc">
                        <el-input type="textarea" rows="5" v-model="FormData.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-form-item>
                            <p class="error-text" v-show="error">{{error}}</p>
                            <el-button type="primary" @click="onSubmit('hostform')">提交</el-button>
                            <el-button @click="dialog.show=false">取消</el-button>
                        </el-form-item>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import {addHost, updateHost} from '@/api/sys/hosts'
    import {getIdcs, getBusinessUnits, getRoles, getBusinessUnitTree} from '@/api/sys/hosts'

    export default {
        name: 'Hostdialog',
        components: {Treeselect},
        props: {
            dialog: Object,
            FormData: Object,
            rowdata: Object,
        },
        created() {
            this.getRoleData();
            this.getBusinessUnitsData();
            this.getIdcData();
        },
        data() {
            return {
                normalizer(node) {
                    return {
                        id: node.name,
                        label: node.name,
                        children: node.parent_level,
                    }
                },
                RoleData: {},
                IdcData: {},
                BusinessUnitData: {},
                ASSET_STATUS: [
                    {key: 'online', name: '上线'},
                    {key: 'offline', name: '下线'},
                ],
                ASSET_TYPE: [
                    {key: 'physical', name: '物理机'},
                    {key: 'virtual', name: '虚拟机'},
                    {key: 'instance', name: '云主机'},
                ],
                error: false,
                hosterror: false,
                wiperror: false,
                niperror: false,
                rules: {
                    hostname: [
                        {required: true, message: '主机名不能为空', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            onSubmit(Formname) {
                var that = this
                this.$refs[Formname].validate((valid) => {
                    if (valid) {
                        const option = this.dialog.option == "add" ? addHost(this.FormData) : updateHost(this.rowdata.id, this.FormData);
                        option.then(res => {
                            this.$message.success('添加更新成功');
                            this.dialog.show = false;
                            this.$emit('updatehosts')
                        }).catch(function (error) {
                            const err = error.response.data;
                            if ("non_field_errors" in err) {
                                that.error = err.non_field_errors[0];
                            }
                            if ("hostname" in err) {
                                that.hostnameerror = err.hostname[0];
                            }
                            ;
                            if ("wip" in err) {
                                that.wiperror = err.wip[0];
                            }
                            ;
                            if ("nip" in err) {
                                that.niperror = err.nip[0];
                            }
                            ;
                        })
                    }
                    else {
                        this.$message.error('失败了！');
                    }
                })
            },
            getRoleData() {
                getRoles()
                    .then(res => {
                        this.RoleData = res;
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            getIdcData() {
                getIdcs()
                    .then(res => {
                        this.IdcData = res;
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            getBusinessUnitsData() {
                getBusinessUnits()
                    .then(res => {
                        this.BusinessUnitData = res;
                    }).catch(function (error) {
                    console.log(error)
                })
            },
        }
    }
</script>

<style scoped>
    .error-text {
        color: #fa8341;
    }
</style>