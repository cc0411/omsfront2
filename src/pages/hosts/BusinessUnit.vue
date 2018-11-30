<template>
    <d2-container>
        <div class="d2-mt d2-mr">
            <el-card class="d2-card d2-mb">
                <div class="handle-box">
                    <el-button type="success" round @click="handleAdd">添加业务线</el-button>
                    <el-table
                            :data='TableData'
                            v-if="TableData.length>0"
                            tooltip-effect="dark"
                            style="width: 100%"
                    >
                        <el-table-column
                                prop="name"
                                label="业务线名"
                                width="200">
                        </el-table-column>
                        <el-table-column  prop='group' label='主机组' width="200">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper" style="text-align: left; color: rgb(0,0,0)">
                                    <span v-for="g in scope.row.group">{{g}}&nbsp;&nbsp;</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop='ctime' label='创建时间' width="200">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper" style="text-align: left; color: rgb(0,0,0)">
                                    <span>{{scope.row.ctime | parseDate}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="desc"
                                label="业务线描述"
                                width="300">
                        </el-table-column>
                        <el-table-column label="操作" width="180" aligin="center">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="handleEdit(scope.row)" icon="el-icon-edit"
                                           circle></el-button>
                                <el-button type="danger" @click="handleDelete(scope.row)" icon="el-icon-delete"
                                           circle></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <BusinessUnitdialog :dialog="dialog"
                                    :rowdata="rowdata"
                                    :FormData="FormData"
                                    @updatebusinessunits="getBusinessUnitsData">

                </BusinessUnitdialog>
            </el-card>
        </div>
    </d2-container>

</template>

<script>
    import BusinessUnitdialog from './BusinessUnitdialog'
    import {getBusinessUnits, deleteBusinessUnit} from '@/api/sys/hosts'

    export default {
        name: 'BusinessUnit',
        data() {
            return {
                TableData: [],
                dialog: {
                    show: false,
                    title: '',
                    option: 'edit',
                },
                rowdata: {},
                FormData: {
                    group: '',
                    name: '',
                    desc: '',
                },
            }
        },
        components: {
            BusinessUnitdialog
        },
        created() {
            this.getBusinessUnitsData()
        },
        methods: {
            //  获取机房信息
            getBusinessUnitsData() {
                getBusinessUnits({})
                    .then(res => {
                        console.log(res)
                        this.TableData = res;
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            //删除业务线
            handleDelete(row) {
                this.$confirm("确定要删除吗？该业务线下的所有主机将会被删除").then(() => {
                    deleteBusinessUnit(row.id).then((res) => {
                        this.$message({
                            message: '恭喜你，删除成功',
                            type: 'success'
                        })
                        this.getBusinessUnitsData()
                    })
                }).catch(error => {
                    this.$message.info('点错了')
                    console.log(error)
                })
            },
            //编辑业务线
            handleEdit(row) {
                this.dialog = {
                    title: "编辑业务线",
                    show: true,
                    option: 'edit',
                },
                    this.rowdata = row;
                this.FormData = {
                    name: row.name,
                    desc: row.desc,
                    group: row.group
                }
            },
            //添加业务线
            handleAdd() {
                this.dialog = {
                    title: "添加业务线",
                    show: true,
                    option: 'add',
                };
            }
        },
    }
</script>

<style scoped>
</style>