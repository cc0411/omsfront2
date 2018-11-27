<template>
    <d2-container>
        <div class="d2-mt d2-mr">
            <el-card class="d2-card d2-mb">
                <div class="handle-box">
                    <el-button type="success" round @click="handleAdd">添加主机组</el-button>
                    <el-table
                            :data='TableData'
                            v-if="TableData.length>0"
                            tooltip-effect="dark"
                            style="width: 100%"
                    >
                        <el-table-column
                                prop="name"
                                label="主机组名"
                                width="200">
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
                                label="主机组描述"
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
                <Groupdialog :dialog="dialog"
                            :rowdata="rowdata"
                            :FormData="FormData"
                            @updategroup="getGroupData">
                </Groupdialog>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
    import Groupdialog from './Groupdialog'
    import {getGroup, deleteGroup} from '@/api/sys/hosts'

    export default {
        name: "Groups",
        created() {
            this.getGroupData();
        },
        components: {
            Groupdialog,
        },
        data() {
            return {
                TableData: [],
                dialog: {
                    show: false,
                    title: '',
                    option: 'edit',
                },
                FormData: {
                    name: '',
                    desc: ''
                },
                rowdata: {},
            }
        },
        methods: {
            //  获取主机组信息
            getGroupData() {
                getGroup()
                    .then(res => {
                        this.TableData = res;
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            //删除主机组
            handleDelete(row) {
                this.$confirm("确定要删除吗？").then(() => {
                    deleteGroup(row.id).then((res) => {
                        this.$message({
                            message: '恭喜你，删除成功',
                            type: 'success'
                        })
                        this.getGroupData()
                    })
                }).catch(error => {
                    this.$message.info('点错了')
                    console.log(error)
                })
            },
            //编辑主机组
            handleEdit(row) {
                this.dialog = {
                    title: "编辑主机组",
                    show: true,
                    option: 'edit',
                },
                    this.rowdata = row;
                this.FormData = {
                    name: row.name,
                    desc: row.desc
                }
            },
            //添加主机组
            handleAdd() {
                this.dialog = {
                    title: "添加主机组",
                    show: true,
                    option: 'add',
                };
            }
        }
    }
</script>

<style scoped>
</style>