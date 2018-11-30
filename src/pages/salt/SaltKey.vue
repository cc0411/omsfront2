<template>
    <d2-container>
        <div class="d2-mt d2-mr">
            <el-card class="d2-card d2-mb">
                <div class="handle-box">
                    <div class="handle-head">
                    <h3>SaltKey列表信息</h3>
                    </div>
                    <el-tabs type="border-card" @tab-click="handleClick" v-model="activetabs">
                        <el-tab-pane label="已认证KEYS" name="accepted">
                            <el-table
                                    :data="AcceptedKeys.filter(data => !search || data.minion_id.toLowerCase().includes(search.toLowerCase()))"
                                    style="width: 100%">
                                <el-table-column
                                        label="MinionID"
                                        prop="minion_id">
                                </el-table-column>
                                <el-table-column
                                        label="认证状态"
                                        prop="certification_status">
                                </el-table-column>
                                <el-table-column
                                        align="right">
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model="search"
                                                size="mini"
                                                placeholder="输入关键字搜索"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                type="primary"
                                                @click="handlePing(scope.row)">测试</el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleKeysManage(scope.row,'delete')">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="待认证KEYS" name="unaccepted">
                            <el-table
                                    :data="UnacceptedKeys.filter(data => !search || data.minion_id.toLowerCase().includes(search.toLowerCase()))"
                                    style="width: 100%">
                                <el-table-column
                                        label="MinionID"
                                        prop="minion_id">
                                </el-table-column>
                                <el-table-column
                                        label="认证状态"
                                        prop="certification_status">
                                </el-table-column>
                                <el-table-column
                                        align="right">
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model="search"
                                                size="mini"
                                                placeholder="输入关键字搜索"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                type="primary"
                                                @click="handleKeysManage(scope.row,'add')">认证</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="未被允许KEYS" name="denied">
                        </el-tab-pane>
                        <el-tab-pane label="已拒绝KEYS" name="rejected">
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
    import {getKeyStatus,pingminion,keysManage,refreshsalt} from '@/api/sys/salt'
    export default {
        name: "SaltKey",
    created(){
        this.getAcceptedKeys()
        this.getDenideKeys()
        this.getUnacceptedKeys()
        this.getRejectedKeys()

    },
    data(){
      return {
          activetabs:'accepted',
          AcceptedKeys: [],
          DeniedKeys:[],
          UnacceptedKeys:[],
          RejectedKeys:[],
          status:'accepted',
          total:0,
          search: ''
      }
    },
    methods:{
        getAcceptedKeys(){
          getKeyStatus({certification_status:'accepted'}).then(res=>{
              this.AcceptedKeys = res.results
              this.total = res.count
          }).catch(function (err) {
              console.log(err)
          })
        },
        getDenideKeys(){
            getKeyStatus({certification_status:'denied'}).then(res=>{
                this.DeniedKeys = res.results
                this.total = res.count
            }).catch(function (err) {
                console.log(err)

            })
        },
        getUnacceptedKeys(){
            getKeyStatus({certification_status:'unaccepted'}).then(res=>{
                this.UnacceptedKeys = res.results
                this.total = res.count
            }).catch(function (err) {
                console.log(err)
            })
        },
        getRejectedKeys(){
            getKeyStatus({certification_status:'rejected'}).then(res=>{
                this.RejectedKeys = res.results
                this.total = res.count
            }).catch(function (err) {
                console.log(err)
            })
        },

        handleClick(tab) {
            this.status = tab.name;
            if(this.status==='unaccepted'){
              this.getUnacceptedKeys()
            }else if(this.status==='denied'){
                this.getDenideKeys()
            }else  if(this.status==='rejected'){
                this.getRejectedKeys()
            }else{
               this.getAcceptedKeys()
            }

        },
        handlePing(row) {
            pingminion({minion_id:row.minion_id}).then(response=> {
                console.log(response)
                if(response.status){
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    });
                }
                else{
                    this.$message.error(res.msg)
                }
            }  ).catch(function (error) {
                console.log(error)
            })
        },

        handleKeysManage(row,type) {
            if(type ==='delete'){
                keysManage({minion_id:row.minion_id,type:'delete'}).then(response=> {
                    if(response.status){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.refreshSalt()
                    }
                    else{
                        this.$message.error('删除失败')
                    }
                }  ).catch(function (error) {
                    console.log(error)
                })
            }else  if(type==='add'){
                keysManage({minion_id:row.minion_id,type:'add'}).then(response=> {
                    if(response.status){
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        });
                    }
                    else{
                        this.$message.error('认证失败')
                    }
                }  ).catch(function (error) {
                    console.log(error)
                })
            }else if (type==='rejected'){
                keysManage({minion_id:row.minion_id,type:'rejected'}).then(response=> {
                    if(response.status){
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        });
                    }
                    else{
                        this.$message.error('失败了！')
                    }
                }  ).catch(function (error) {
                    console.log(error)
                })
            }


        },
    }
    }
</script>

<style scoped>

</style>