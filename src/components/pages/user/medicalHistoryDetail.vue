<template>
    <div class="equipmentList">
        <div class="user-data clearfix">
            <div class="user-property user-img">
                <img style="width: 42px;height: 42px;border-radius: 20px" :src="userData.userImage1?userData.userImage1:userImgUrl" alt="">
            </div>
            <div class="user-property">
                <div class="user-name">{{userData.userName}}</div>
                <div class="user-custom">{{userData.userAge}} 岁 &nbsp; {{userData.userSex === 0 ? '男' : '女'}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">联系电话</div>
                <div>{{userData.userPhone}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">身高</div>
                <div>{{userData.userHeight}} cm</div>
            </div>
            <div class="user-property">
                <div class="user-custom">体重</div>
                <div>{{userData.userWeight}} KG</div>
            </div>
            <div class="user-property">
                <div class="user-custom">BMI</div>
                <div>{{userData.userBmi}}</div>
            </div>
        </div>
        <span class="update-case">病史数据</span>
        <div>
            <el-form class="clearfix medical-history" label-width="80px">
                <el-form-item label="药物过敏史" class="whole100" label-width="150px">
                    <template v-for="(item,index) in medicalForm.medicalAllergy">
                        <span class="medical-span" :key="index">{{item}}</span>
                    </template>
                </el-form-item>

                <el-form-item label="暴露史" class="whole100" label-width="150px">
                    <template v-for="(item,index) in medicalForm.medicalExpose">
                        <span class="medical-span" :key="index">{{item}}</span>
                    </template>
                </el-form-item>

                <el-form-item label="是否佩戴起搏器" class="whole100" label-width="150px">
                    {{medicalForm.isPacemaker==1?'是':'否'}}
                </el-form-item>

                <el-form-item label="既往史" class="whole100 previous" label-width="150px">
                    <div class="previous-history">
                        <span>疾病</span>
                        <div>
                            <template v-for="(item,index) in medicalForm.pastDisease">
                                <span class="medical-span" :key="index">{{item}}</span>
                            </template>
                        </div>
                    </div>
                    <div class="previous-history">
                        <div>手术</div>
                        {{medicalForm.operation==1?'有':'无'}}
                        <template v-for="(item,index) in medicalForm.dataOperation">
                            <div :key="index">
                                <span class="medical-span">{{item.name}}</span>
                                <span class="medical-span">{{item.date}}</span>
                            </div>
                        </template>
                    </div>
                </el-form-item>

                <el-form-item label="家族史" class="whole100" label-width="150px">
                    <template v-for="(item,index) in medicalForm.familyHis">
                        <span class="medical-span" :key="index">{{item}}</span>
                    </template>
                </el-form-item>

                <el-form-item label="遗传病史" class="whole100" label-width="150px">
                    {{medicalForm.inheritance==1?'有':'否'}}
                    <template v-for="(item,index) in medicalForm.geneticDiseaseMessage">
                        <span class="medical-span" :key="index">{{item}}</span>
                    </template>
                </el-form-item>

                <el-form-item label="残疾情况" class="whole100" label-width="150px">
                    <template v-for="(item,index) in medicalForm.disability">
                        <span class="medical-span" :key="index">{{item}}</span>
                    </template>
                </el-form-item>

                <el-form-item class="operation-btn" label-width="0">
                    <router-link :to="{ path:'/medicalHistory',query: {id:$route.query.id}}">
                        <el-button>编 辑</el-button>
                    </router-link>
                    <el-button @click="handleHistory">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {medicalRead, userRead} from '../../../api/api';
    export default {
        name: 'medicalHistory',
        data() {
            return {
                medicalForm: {},
                userData: {}, // 用户信息
                /* eslint-disable */
                userImgUrl: require("../../../common/image/user.png"),
                /* eslint-disable */
            };
        },
        created() {
            if (this.$route.query.id) {
                userRead(this.$route.query.id).then(res => {
                    if (res.data.errno === 0) {
                        this.userData = res.data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                });
                // 获取用户病史
                medicalRead(this.$route.query.id).then(res => {
                    if (res.data.errno === 0 && res.data.data) {
                        this.medicalForm = res.data.data;
                        if (this.medicalForm.pastSurgery) {
                            let pastList = this.medicalForm.pastSurgery.split(',');
                            this.medicalForm.dataOperation = [];
                            for (let i = 0; i < pastList.length; i++) {
                                this.medicalForm.dataOperation.push({
                                    name: pastList[i].split(';')[0],
                                    date: pastList[i].split(';')[1],
                                });
                            }
                            if (pastList.length > 0) {
                                this.medicalForm.operation = 1;
                            }
                        }
                        if (this.medicalForm.inheritance !== 0 && this.medicalForm.inheritance) {
                            this.medicalForm.geneticDiseaseMessage = this.medicalForm.inheritance;
                            this.medicalForm.inheritance = 1;
                        }
                        this.medicalForm.medicalAllergy = this.medicalForm.medicalAllergy.split(',');
                        if (!this.medicalForm.medicalAllergy[0]) {
                            this.medicalForm.medicalAllergy.shift();
                        }
                        this.medicalForm.medicalExpose = this.medicalForm.medicalExpose.split(',');
                        if (!this.medicalForm.medicalExpose[0]) {
                            this.medicalForm.medicalExpose.shift();
                        }
                        this.medicalForm.pastDisease = this.medicalForm.pastDisease.split(',');
                        if (!this.medicalForm.pastDisease[0]) {
                            this.medicalForm.pastDisease.shift();
                        }
                        this.medicalForm.familyHis = this.medicalForm.familyHis.split(',');
                        if (!this.medicalForm.familyHis[0]) {
                            this.medicalForm.familyHis.shift();
                        }
                        if (this.medicalForm.geneticDiseaseMessage) {
                            this.medicalForm.geneticDiseaseMessage = this.medicalForm.geneticDiseaseMessage.split(',');
                            if (!this.medicalForm.geneticDiseaseMessage[0]) {
                                this.medicalForm.geneticDiseaseMessage.shift();
                            }
                        }
                        this.medicalForm.disability = this.medicalForm.disability.split(',');
                        if (!this.medicalForm.disability[0]) {
                            this.medicalForm.disability.shift();
                        }
                    }
                });
            }
        },
        methods: {
            // 返回上一页
            handleHistory() {
                this.$router.back(-1);
            }
        }
    };
</script>

<style lang="less">
    .medical-history {
        .medical-span {
            color: #576F88;
            margin-right: 30px;
        }
    }
</style>