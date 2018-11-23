<template>
    <d2-container>
        <div class="d2-mt d2-mr">
            <el-card  class="d2-card d2-mb">
                <div class="handle-box">
                    <el-button type="success" round @click="handleAdd" >添加业务线</el-button>
                    <el-table
                            :data='TableData'
                            v-if="TableData.length>0"
                            tooltip-effect="dark"
                            style="width: 100%"
                    >
                        <el-table-column prop='businessunit_type' label='类目' width="150" aligin="center">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper" style="text-align: left">
                                    <el-tag style="color: #000" :color="BusinessUnit_TYPE[scope.row.businessunit_type].color">
                                        {{BusinessUnit_TYPE[scope.row.businessunit_type].type}}
                                    </el-tag>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="parent_unit"
                                label="父业务线名"
                                width="200">
                        </el-table-column>

                        <el-table-column
                                prop="name"
                                label="业务线名"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="parent_level"
                                label="二级业务线名"
                                width="200">
                            <template slot-scope="scope">
                                <span v-if="scope.row.parent_level.length>0"  v-for="item in  scope.row.parent_level">{{item.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop='ctime' label='创建时间'  width="200">
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
                        <el-table-column label="操作"  width="180" aligin="center">
                            <template slot-scope="scope">
                                <el-button type="primary"  @click="handleEdit(scope.row)"  icon="el-icon-edit" circle></el-button>
                                <el-button type="danger"  @click="handleDelete(scope.row)"  icon="el-icon-delete" circle></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <BusinessUnitdialog :dialog="dialog"
                                    :rowdata="rowdata"
                                    :FormData="FormData"
                                    :TableData="TableData"
                                    @updatebusinessunits="getBusinessUnitsData">

                </BusinessUnitdialog>
            </el-card></div>
    </d2-container>

</template>

<script>
    import BusinessUnitdialog from './BusinessUnitdialog'
    import {getBusinessUnits,deleteBusinessUnit}  from  '@/api/sys/hosts'
    export default {
        name: 'BusinessUnit',
        data(){
            return {
                BusinessUnit_TYPE: {
                    1: { 'type': '一级业务线', 'color': '#c0dbff' },
                    2: { 'type': '二级业务线', 'color': '#19ddff' },
                    3: { 'type': '三级业务线', 'color': '#f06292' },
                },
                TableData:[],
                dialog:{
                    show:false,
                    title:'',
                    option:'edit',
                },
                rowdata:{},
                FormData: {
                    parent_unit: '',
                    businessunit_type:'',
                    name: '',
                    desc: '',
                },
            }
        },
        components:{
            BusinessUnitdialog
        },
        created(){
            this.getBusinessUnitsData()
        },
        methods:{
            //  获取机房信息
            getBusinessUnitsData(){
                getBusinessUnits()
                    .then(res=>{
                        console.log(res)
                        this.TableData = res;
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            //删除业务线
            handleDelete(row){
                this.$confirm("确定要删除吗？该业务线下的所有主机将会被删除").then(()=>{
                    deleteBusinessUnit(row.id).then((res)=>{
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
            handleEdit(row){
                this.dialog={
                    title:"编辑业务线",
                    show:true,
                    option:'edit',
                },
                    this.rowdata=row;
                this.FormData ={
                    name:row.name,
                    parent_unit:row.parent_unit,
                    desc:row.desc,
                    businessunit_type:row.businessunit_type
                }
            },
            //添加业务线
            handleAdd(){
                this.dialog={
                    title:"添加业务线",
                    show:true,
                    option:'add',
                };
            }
        },
    }
</script>

<style scoped>
</style>