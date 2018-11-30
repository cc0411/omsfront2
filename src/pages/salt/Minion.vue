<template>
    <d2-container>
        <div class="d2-mt d2-mr">
            <el-card class="d2-card d2-mb">
                <div class="handle-box">
                    <div class="handle-head">
                        <el-button size="mini" type="primary" round @click="refreshSalt('key')">更新列表</el-button>
                        <el-button size="mini" type="primary" round @click="refreshSalt('minion')">更新状态</el-button>
                        <div class="search">
                            <el-input v-model="searchdata" placeholder="搜索关键词" size="mini"
                                      class="handle-input mr10"></el-input>
                            <el-button size="mini" round type="primary" icon="search" @click="searchClick">搜索
                            </el-button>
                            <el-button size="mini" round icon="refresh" @click="refreshClick">重置</el-button>
                        </div>
                    </div>
                    <el-table
                            :data='MinionsData'
                            v-if="MinionsData.length>0"
                            max-height="500"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @sort-change="sortChange"
                    >
                        <el-table-column
                                prop="hostname"
                                label="主机名"
                                sortable="custom"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="ip"
                                label="IP地址"
                                sortable="custom"
                                width="350">
                        </el-table-column>
                        <el-table-column
                                prop="minion_version"
                                label="minion版本"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                fixed
                                prop="minion_id"
                                label="minionID"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="system_type"
                                label="系统版本"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="cpu_info"
                                label="CPU"
                                width="350">
                        </el-table-column>
                        <el-table-column
                                prop="memory"
                                label="内存"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="minion_status"
                                label="状态"
                                width="150">
                        </el-table-column>
                        <el-table-column prop='ctime' label='创建时间' width="150" sortable="custom">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper"
                                     style="text-align: left; color: rgb(0,0,0)">
                                    <span>{{scope.row.ctime | parseDate}}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="listQuery.page"
                                :page-sizes="[10, 20, 50,100,500]"
                                :page-size="listQuery.page_size"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="tabletotal">
                        </el-pagination>
                    </div>
                </div>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
    import {getMinions,refreshsalt} from '@/api/sys/salt'

    export default {
        name: "Minion",

    created() {
        this.getMinionData();

    },
    data(){
        return{
            searchdata: '',
            tabletotal: 0,
            MinionsData: [],
            listQuery: {
                page: 1,
                page_size: 10,
                search: '',
                ordering: '',
            },
        }
    },

    methods:{
       getMinionData(){
           getMinions(this.listQuery).then(res=>{
               this.MinionsData = res.results;
               this.tabletotal = res.count
           }).catch(function (error) {
               console.log(error)
           })
       },
        //排序
        sortChange(data) {
            const {prop, order} = data
            if (prop === 'minion_id') {
                this.sortByminionId(order)
            } else if (prop === 'memory') {
                this.sortBymemory(order)
            } else if (prop === 'ctime') {
                this.sortByctime(order)
            } else if (prop === 'hostname') {
                this.sortByhostname(order)
            }
        },
        sortByminionId(order) {
            if (order === 'ascending') {
                this.listQuery.ordering = 'minion_id'
            } else {
                this.listQuery.ordering = '-minion_id'
            }
            this.getMinionData()
        },
        sortBymemory(order) {
            if (order === 'ascending') {
                this.listQuery.ordering = 'memory'
            } else {
                this.listQuery.ordering = '-memory'
            }
            this.getMinionData()
        },
        sortByhostname(order) {
            if (order === 'ascending') {
                this.listQuery.ordering = 'hostname'
            } else {
                this.listQuery.ordering = '-hostname'
            }
            this.getMinionData()
        },
        sortByctime(order) {
            if (order === 'ascending') {
                this.listQuery.ordering = 'ctime'
            } else {
                this.listQuery.ordering = '-ctime'
            }
            this.getMinionData()
        },
        // 重置所有过滤条件
        refreshClick() {
            this.listQuery = {
                page: 1,
                page_size: 10,
                search: '',
                ordering: '',

            };
            this.getMinionData()
        },
        //搜索
        searchClick() {
            this.listQuery.search = this.searchdata;
            this.getMinionData()
        },
        //分页
        handleCurrentChange(val) {
            // this.currentPage =val  //点击多少页
            this.listQuery.page = val
            this.getMinionData()
        },
        handleSizeChange(val) {
            this.listQuery.page_size = val  //每页显示多少条
            this.getMinionData()
        },
        refreshSalt(val){
           refreshsalt({type:val}).then(res=>{
               if(res.status){
                   this.$message({
                       message: res.msg,
                       type: 'success'
                   });
               }
               else{
                   this.$message.error(res.msg)
               }
               this.getMinionData()
           }).catch(function (error) {
               console.log(error)
           });
        },

    },
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-head {
        padding-bottom: 10px;
    }

    .search {
        float: right;
    }

    .pagination {
        float: right;
        margin-top: 20px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
</style>