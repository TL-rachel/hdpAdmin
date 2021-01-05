<template>
    <div class="equipmentList">
        <div class="user-data clearfix">
            <div class="user-property user-img">
                <img style="width: 42px;height: 42px;border-radius: 20px" :src="userData.img" alt="">
            </div>
            <div class="user-property">
                <div class="user-name">{{userData.name}}</div>
                <div class="user-custom">{{userData.age}} &nbsp; {{userData.sex}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">联系电话</div>
                <div>{{userData.phoneNumber}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">身高</div>
                <div>{{userData.stature}} cm</div>
            </div>
            <div class="user-property">
                <div class="user-custom">体重</div>
                <div>{{userData.weight}} kg</div>
            </div>
            <div class="user-property">
                <div class="user-custom">BMI</div>
                <div>{{userData.BMI}}</div>
            </div>
        </div>
        <span class="update-case">修改病例</span>
        <div class="form-save">
            <el-form ref="form" class="clearfix" :model="form" label-width="80px">
                <el-form-item label="体检时间" label-width="90px">
                    <el-date-picker type="date" class="w420" placeholder="选择日期" v-model="form.date1"></el-date-picker>
                </el-form-item>

                <el-form-item label="血压" label-width="90px" style="width: 20%;">
                    舒适压 <el-input class="w100" v-model="form.credNo" placeholder="请输入舒适压"></el-input>
                </el-form-item>

                <el-form-item label="" label-width="100px" style="width: 25%;">
                    收缩压 <el-input class="w100" v-model="form.credNo" placeholder="请输入收缩压"></el-input>
                </el-form-item>

                <el-form-item label="血氧" label-width="90px">
                    <el-input class="w420" v-model="form.userName" placeholder="请输入血氧"></el-input>
                </el-form-item>

                <el-form-item label="心率" label-width="90px">
                    <el-input class="w420" v-model="form.userName" placeholder="请输入心率"></el-input>
                </el-form-item>

                <el-form-item label="异常状况" class="whole100">
                    <el-input type="textarea" v-model="form.desc" placeholder="请描述异常状况"></el-input>
                </el-form-item>

                <el-form-item label="医生诊断" class="whole100">
                    <el-input type="textarea" v-model="form.desc" placeholder="请描述异常状况"></el-input>
                </el-form-item>

                <el-form-item label="测量时间" label-width="90px">
                    <el-date-picker type="date" class="w420" placeholder="选择日期" v-model="form.date1"></el-date-picker>
                </el-form-item>

                <el-form-item label="设备编号" label-width="90px">
                    <el-input class="w420" v-model="form.userName" placeholder="请输入设备编号"></el-input>
                </el-form-item>
                <el-form-item label="操作人" class="whole100" label-width="90px">
                    <el-input class="w420" v-model="form.userName" placeholder="请输入人名"></el-input>
                </el-form-item>

                <el-form-item label="病例附件" label-width="90px">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple
                            :on-success="handleAvatarSuccess"
                            :limit="3">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        <span>未选择任何文件</span>
                    </el-upload>
                </el-form-item>

                <el-form-item label="体检报告" label-width="90px">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple
                            :on-success="handleAvatarSuccess"
                            :limit="3">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        <span>未选择任何文件</span>
                    </el-upload>
                </el-form-item>

                <el-form-item label="心电数据" label-width="90px">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple
                            :on-success="handleAvatarSuccess"
                            :limit="3">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        <span>未选择任何文件</span>
                    </el-upload>
                </el-form-item>

                <el-form-item label="心电图" label-width="90px">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple
                            :on-success="handleAvatarSuccess"
                            :limit="3">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        <span>未选择任何文件</span>
                    </el-upload>
                </el-form-item>

                <el-form-item class="operation-btn" label-width="0">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button @click="handleHistory">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'addCase',
        data() {
            return {
                form: {},
                imageUrl: '',
                userData: {
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                    name: '刘亚芳',
                    age: '56',
                    sex: '女',
                    phoneNumber: '15999999999',
                    stature: '158',
                    weight: '57',
                    BMI: '21',
                }
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            /**
             * 提交数据
             */
            submitForm() {
                this.$router.push({path: '/userList'});
            },
            handleHistory() {
                this.$router.back(-1);
            }
        }
    };
</script>

<style lang="less">
    .update-case {
        margin: 18px 0;
        display: inline-block;
        color: rgba(0, 0, 0, 1);
        font-size: 16px;
    }
    .el-textarea .el-textarea__inner {
        width: 80%;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(226, 233, 237, 1);
    }
    .upload-case {
        width: 100px;
        height: 30px;
        padding: 0;
        line-height: 30px;
        border: 0;
        color: #4D7CFE;
        display: inline-block;
        border-radius: 15px;
        background-color: rgba(242, 247, 250, 1);
    }
    .upload-case:hover {
        color: #4D7CFE;
        background-color: rgba(242, 247, 250, 1);
    }
    .el-upload-list.el-upload-list--text {
        display: none;
    }
</style>