<template>
    <d2-container>
        <div class="d2-mt d2-mr">
            <el-card class="d2-card d2-mb">
                <el-row>
                    <el-col :span="12">
                        <div class="form-group">
                            <el-card>
                                <el-form ref="cmdForm" label-position="top" :rules="rules" :model="formData" size="default">
                                    <el-form-item prop="minions">
                                        <el-transfer
                                        filterable
                                        v-model="formData.SelectedData"
                                        :props ="{
                                        key: 'minion_id',
                                        label: 'minion_id',
                                        }"
                                        :data="MinionsData"
                                        :filter-method="filterMethod"
                                        filter-placeholder="请输入minions"
                                        ></el-transfer>
                                    </el-form-item>
                                    <el-form-item prop="cmd">
                                        <el-input type="text" v-model="formData.cmd" placeholder="请输入要执行的命令">
                                        </el-input>
                                    </el-form-item>
                                    <el-button size="default" @click="submit" type="primary">执行</el-button>
                                </el-form>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="12" height="350">

                        22222
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
    import {getMinions} from '@/api/sys/salt'
    export default {
        name: "SaltCmd",
        created() {
            this.getMinionData();

        },
        data(){
            return{
                formData:{
                    SelectedData:[],
                    cmd:''
                },
                MinionsData :[],
                rules: {
                    cmd: [
                        {required: true, message: '请输入命令', trigger: 'blur'}
                    ],
                    SelectedData: [
                        {required: true, message: '请选择minion', trigger: 'blur'},

                    ],
                }
            }
        },

        methods:{
            filterMethod(query,item){

            },
            submit(){},
            getMinionData(){
                getMinions().then(res=>{
                    this.MinionsData = res.results;
                }).catch(function (error) {
                    console.log(error)
                })
            },
        }

    }
</script>

<style scoped>

</style>