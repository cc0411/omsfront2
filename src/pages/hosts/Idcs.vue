<template>
    <d2-container>
        <div class="d2-mt d2-mr">
            <el-card  class="d2-card d2-mb">
                <el-button type="success" round  @click="handleAdd">添加机房</el-button>
                <el-table
                        :data='TableData'
                        v-if="TableData.length>0"
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="机房名"
                            width="100">
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
                            label="机房描述"
                            width="200">
                    </el-table-column>
                    <el-table-column label="操作"  width="200" aligin="center">
                        <template slot-scope="scope">
                            <el-button type="primary"  @click="handleEdit(scope.row)"  icon="el-icon-edit" circle></el-button>
                            <el-button type="danger"  @click="handleDelete(scope.row)"  icon="el-icon-delete" circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Idcdialog :dialog="dialog"
                           :rowdata="rowdata"
                           :FormData="FormData"
                           @updateidcs="getIdcData">
                </Idcdialog>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
    import Idcdialog  from './Idcdialog'
    import { getIdcs,deleteIdc} from  '@/api/sys/hosts'
    export default {
        name: "Idcs",
        created() {
            this.getIdcData();
        },
        components:{
            Idcdialog
        },
        data(){
            return{
                TableData: [],
                dialog:{
                    show:false,
                    title:'',
                    option:'edit',
                },
                FormData:{
                    name:'',
                    desc:''
                },
                rowdata:{},
            }
        },
        methods:{
            //获取机房信息
            getIdcData(){
                getIdcs()
                    .then(res=>{
                        console.log(res)
                        this.TableData = res;
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            //删除机房
            handleDelete(row){
                this.$confirm("确定要删除吗？该机房下的所有主机将会被删除").then(()=>{
                    deleteIdc(row.id).then((res)=>{
                        this.$message({
                            message: '恭喜你，删除成功',
                            type: 'success'
                        })
                        this.getIdcData()
                    })
                }).catch(error => {
                    this.$message.info('点错了')
                    console.log(error)
                })
            },
            //编辑机房
            handleEdit(row){
                this.dialog={
                    title:"编辑机房",
                    show:true,
                    option:'edit',
                };
                this.rowdata=row;
                this.FormData ={
                    name:row.name,
                    desc:row.desc
                }
            },
            //添加机房
            handleAdd(){
                this.dialog={
                    title:"添加机房",
                    show:true,
                    option:'add',
                };
            }
        }
    }
</script>

<style scoped>

</style>