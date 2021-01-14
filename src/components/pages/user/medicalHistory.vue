<template>
    <div class="equipmentList">
        <div class="user-data clearfix">
            <div class="user-property user-img">
                <img style="width: 42px;height: 42px;border-radius: 20px" :src="userData.userImage1" alt="">
            </div>
            <div class="user-property">
                <div class="user-name">{{userData.userName}}</div>
                <div class="user-custom">{{userData.userAge}} &nbsp; {{userData.userSex === 0 ? '男' : '女'}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">联系电话</div>
                <div>{{userData.userPhone}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">身高</div>
                <div>{{userData.userHeight}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">体重</div>
                <div>{{userData.userWeight}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">BMI</div>
                <div>{{userData.userBmi}}</div>
            </div>
        </div>
        <span class="update-case">病史数据</span>
        <div>
            <el-form ref="form" class="clearfix medical-history" :model="form" label-width="80px">
                <el-form-item label="药物过敏史" class="whole100" label-width="150px">
                    <el-checkbox-group v-model="form.medicalAllergy">
                        <el-checkbox label="青霉素" name="type">青霉素</el-checkbox>
                        <el-checkbox label="磺胺" name="type">磺胺</el-checkbox>
                        <el-checkbox label="链霉素" name="type">链霉素</el-checkbox>
                        <el-checkbox label="其他" name="type">其他</el-checkbox>
                        <el-input class="message" v-model="form.irritabilityMessage"
                                  :disabled="form.medicalAllergy.indexOf('其他') == -1" placeholder="请输入"></el-input>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="暴露史" class="whole100" label-width="150px">
                    <el-checkbox-group v-model="form.medicalExpose">
                        <el-checkbox label="化学品" name="type">化学品</el-checkbox>
                        <el-checkbox label="毒物" name="type">毒物</el-checkbox>
                        <el-checkbox label="射线" name="type">射线</el-checkbox>
                        <el-checkbox label="其他" name="type">其他</el-checkbox>
                        <el-input class="message" v-model="form.exposureMessage"
                                  :disabled="form.medicalExpose.indexOf('其他') == -1" placeholder="请输入"></el-input>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="是否佩戴起搏器" class="whole100" label-width="150px">
                    <el-radio-group v-model="form.isPacemaker">
                        <el-radio label="0">否</el-radio>
                        <el-radio label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="既往史" class="whole100 previous" label-width="150px">
                    <div class="previous-history">
                        <span>疾病</span>
                        <el-checkbox-group v-model="form.pastDisease">
                            <el-checkbox label="高血压" name="type">高血压</el-checkbox>
                            <el-checkbox label="糖尿病" name="type">糖尿病</el-checkbox>
                            <el-checkbox label="冠心病" name="type">冠心病</el-checkbox>
                            <el-checkbox label="慢性阻塞性肺疾病" name="type">慢性阻塞性肺疾病</el-checkbox>
                            <el-checkbox label="脑卒中" name="type">脑卒中</el-checkbox>
                            <el-checkbox label="结核病" name="type">结核病</el-checkbox>
                            <el-checkbox label="肝炎" name="type">肝炎</el-checkbox>
                            <el-checkbox label="其他法定传染病" name="type">其他法定传染病</el-checkbox>
                            <el-checkbox label="重性精神疾病" name="type">重性精神疾病</el-checkbox>
                            <el-checkbox label="先天畸形" name="type">先天畸形</el-checkbox>
                            <el-checkbox label="恶性肿瘤" name="type">恶性肿瘤</el-checkbox>
                            <el-input class="message w160" style="margin-right: 20px" v-model="form.previousHistoryMessage1"
                                      :disabled="form.pastDisease.indexOf('恶性肿瘤') == -1" placeholder="请输入"></el-input>
                            <el-checkbox label="职业病" name="type">职业病</el-checkbox>
                            <el-input class="message w160" style="margin-right: 20px" v-model="form.previousHistoryMessage2"
                                      :disabled="form.pastDisease.indexOf('职业病') == -1" placeholder="请输入"></el-input>
                            <el-checkbox label="其他" name="type">其他</el-checkbox>
                            <el-input class="message w160" v-model="form.previousHistoryMessage3"
                                      :disabled="form.pastDisease.indexOf('其他') == -1" placeholder="请输入"></el-input>
                        </el-checkbox-group>
                    </div>
                    <div class="previous-history">
                        <div>手术</div>
                        <el-radio-group v-model="form.operation">
                            <el-radio :label="1">有</el-radio>
                            <el-radio :label="0">无</el-radio>
                        </el-radio-group>
                        <template v-for="(item,index) in form.dataOperation">
                            <el-form-item class="small-item" :key="index + '1'" label="手术名">
                                <el-input :disabled="form.operation === 1 ? false : true" placeholder="请输入" class="w160" v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item class="small-item" :key="index + '2'" label="手术时间">
                                <el-date-picker :disabled="form.operation === 1 ? false : true" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="item.date" style="width: 160px;"></el-date-picker>
                                <i @click="form.operation === 1 ? deletePastSurgery(index) : ''" class="icon-picture icon-picture-delete"></i>
                            </el-form-item>
                        </template>
                        <button class="increased" :disabled="form.operation === 1 ? false : true" @click="addOperation1()">新增</button>
                    </div>
                </el-form-item>

                <el-form-item label="家族史" class="whole100" label-width="150px">
                    <el-checkbox-group v-model="form.familyHis">
                        <el-checkbox label="高血压" name="type">高血压</el-checkbox>
                        <el-checkbox label="糖尿病" name="type">糖尿病</el-checkbox>
                        <el-checkbox label="冠心病" name="type">冠心病</el-checkbox>
                        <el-checkbox label="慢性阻塞性肺疾病" name="type">慢性阻塞性肺疾病</el-checkbox>
                        <el-checkbox label="脑卒中" name="type">脑卒中</el-checkbox>
                        <el-checkbox label="结核病" name="type">结核病</el-checkbox>
                        <el-checkbox label="肝炎" name="type">肝炎</el-checkbox>
                        <el-checkbox label="其他法定传染病" name="type">其他法定传染病</el-checkbox>
                        <el-checkbox label="重性精神疾病" name="type">重性精神疾病</el-checkbox>
                        <el-checkbox label="先天畸形" name="type">先天畸形</el-checkbox>
                        <el-checkbox label="恶性肿瘤" name="type">恶性肿瘤</el-checkbox>
                        <el-input class="message w160" style="margin-right: 20px" v-model="form.familyMessage1"
                                  :disabled="form.familyHis.indexOf('恶性肿瘤') == -1" placeholder="请输入"></el-input>
                        <el-checkbox label="其他" name="type">其他</el-checkbox>
                        <el-input class="message w160" v-model="form.familyMessage2"
                                  :disabled="form.familyHis.indexOf('其他') == -1" placeholder="请输入"></el-input>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="遗传病史" class="whole100" label-width="150px">
                    <el-radio-group v-model="form.inheritance">
                        <el-radio :label="0">无</el-radio>
                        <el-radio :abel="1">有</el-radio>
                        <el-input class="message w160" v-model="form.geneticDiseaseMessage"
                                  :disabled="form.inheritance === 1?false:true" placeholder="请输入"></el-input>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="残疾情况" class="whole100" label-width="150px">
                    <el-checkbox-group v-model="form.disability">
                        <el-checkbox label="视力残疾" name="type">视力残疾</el-checkbox>
                        <el-checkbox label="听力残疾" name="type">听力残疾</el-checkbox>
                        <el-checkbox label="肢体残疾" name="type">肢体残疾</el-checkbox>
                        <el-checkbox label="智力残疾" name="type">智力残疾</el-checkbox>
                        <el-checkbox label="其他" name="type">其他</el-checkbox>
                        <el-input class="message" v-model="form.disabilityMessage"
                                  :disabled="form.disability.indexOf('其他') == -1" placeholder="请输入"></el-input>
                    </el-checkbox-group>
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
    import {medicalCreate,medicalRead} from '../../../api/api';
    export default {
        name: 'medicalHistory',
        data() {
            return {
                form: {
                    medicalAllergy: [], // 药物过敏史
                    medicalExpose: [], // 暴露史
                    disability: [], // 残疾情况
                    familyHis: [], // 家族史
                    pastDisease: [], // 既往史
                    irritabilityMessage: '', // 药物过敏史 其他情况
                    exposureMessage: '', // 暴露史 其他情况
                    isPacemaker: '', // 是否佩戴起搏器
                    operation: '', // 有无手术
                    inheritance: '', // 遗传病史
                    geneticDiseaseMessage: '', // 遗传病史其他情况
                    disabilityMessage: '', // 残疾情况 其他情况
                    familyMessage1: '', // 家族史 恶性肿瘤情况
                    familyMessage2: '', // 家族史 其他情况
                    previousHistoryMessage1: '', // 既往史 恶性肿瘤情况
                    previousHistoryMessage2: '', // 既往史 职业病情况
                    previousHistoryMessage3: '', // 既往史 其他情况
                    // 手术
                    dataOperation: [
                        {
                            name: '',
                            date: ''
                        }
                    ]
                },
                userData: {}, // 用户信息
            };
        },
        created: function () {
            // 获取用户信息
            if (sessionStorage.getItem('userDetail')) {
                this.userData = JSON.parse(sessionStorage.getItem('userDetail'));
                // 获取用户病史
                medicalRead(this.userData.id).then(res => {
                    if (res.data.errno === 0) {
                        let para = JSON.parse(JSON.stringify(res.data.data));
                        let pastList = para.pastSurgery.split(',');
                        this.form.dataOperation = [];
                        for (let i = 0; i < pastList.length; i++) {
                            this.form.dataOperation.push({
                                name: pastList[i].split(';')[0],
                                date: pastList[i].split(';')[1],
                            })
                        }
                        if (pastList.length > 0) {
                            this.form.operation = 1;
                        }
                        this.form.inheritance = Number(para.inheritance);
                        this.form.isPacemaker = para.isPacemaker;
                        this.form.medicalAllergy = para.medicalAllergy.split(',');
                        for (let i = 0; i < this.form.medicalAllergy.length; i++) {
                            if (this.form.medicalAllergy[i] !== '青霉素' && this.form.medicalAllergy[i] !== '磺胺' && this.form.medicalAllergy[i] !== '链霉素') {
                                this.form.irritabilityMessage = this.form.medicalAllergy[i];
                                this.form.medicalAllergy.push('其他');
                                this.form.medicalAllergy.splice(i, 1);
                            }
                        }
                        this.form.medicalExpose = para.medicalExpose.split(',');
                        for (let i = 0; i < this.form.medicalExpose.length; i++) {
                            if (this.form.medicalExpose[i] !== '化学品' && this.form.medicalExpose[i] !== '毒物' && this.form.medicalExpose[i] !== '射线') {
                                this.form.exposureMessage = this.form.medicalExpose[i];
                                this.form.medicalExpose.push('其他');
                                this.form.medicalExpose.splice(i, 1);
                            }
                        }
                        this.form.disability = para.disability.split(',');
                        for (let i = 0; i < this.form.disability.length; i++) {
                            if (this.form.disability[i] !== '视力残疾' && this.form.disability[i] !== '听力残疾' && this.form.disability[i] !== '肢体残疾' && this.form.disability[i] !== '智力残疾') {
                                this.form.disabilityMessage = this.form.disability[i];
                                this.form.disability.push('其他');
                                this.form.disability.splice(i, 1);
                            }
                        }
                        this.form.familyHis = para.familyHis.split(',');
                        for (let i = 0; i < this.form.familyHis.length; i++) {
                            if (this.form.familyHis[i] !== '高血压' && this.form.familyHis[i] !== '糖尿病' && this.form.familyHis[i] !== '冠心病' &&
                                this.form.familyHis[i] !== '慢性阻塞性肺疾病' && this.form.familyHis[i] !== '脑卒中' && this.form.familyHis[i] !== '结核病' &&
                                this.form.familyHis[i] !== '肝炎' && this.form.familyHis[i] !== '其他法定传染病' && this.form.familyHis[i] !== '重性精神疾病' && this.form.familyHis[i] !== '先天畸形' && (this.form.pastDisease[i] + '').indexOf('恶性肿瘤') !== -1) {
                                this.form.familyMessage2 = this.form.familyHis[i];
                                this.form.familyHis.push('其他');
                                this.form.familyHis.splice(i, 1);
                            }
                            if ((this.form.pastDisease[i] + '').indexOf('恶性肿瘤') !== -1) {
                                this.form.familyHis.push(this.form.familyHis[i].split(':')[0]);
                                this.form.familyMessage1 = this.form.familyHis[i].split(':')[1];
                                this.form.familyHis.splice(i, 1);
                            }
                        }
                        this.form.pastDisease = para.pastDisease.split(',');
                        for (let i = 0; i < this.form.pastDisease.length; i++) {
                            if (this.form.pastDisease[i] !== '高血压' && this.form.pastDisease[i] !== '糖尿病' && this.form.pastDisease[i] !== '冠心病' && this.form.pastDisease[i] !== '肝炎' &&
                                this.form.pastDisease[i] !== '慢性阻塞性肺疾病' && this.form.pastDisease[i] !== '脑卒中' && this.form.pastDisease[i] !== '结核病' && (this.form.pastDisease[i] + '').indexOf('职业病') !== -1 &&
                                this.form.pastDisease[i] !== '其他法定传染病' && this.form.pastDisease[i] !== '重性精神疾病' && this.form.pastDisease[i] !== '先天畸形' && (this.form.pastDisease[i] + '').indexOf('恶性肿瘤') !== -1) {
                                this.form.previousHistoryMessage3 = this.form.pastDisease[i];
                                this.form.pastDisease.push('其他');
                                this.form.pastDisease.splice(i, 1);
                            }
                            if ((this.form.pastDisease[i] + '').indexOf('恶性肿瘤') !== -1) {
                                this.form.pastDisease.push(this.form.pastDisease[i].split(':')[0]);
                                this.form.previousHistoryMessage1 = this.form.pastDisease[i].split(':')[1];
                                this.form.pastDisease.splice(i, 1);
                            }
                            if ((this.form.pastDisease[i] + '').indexOf('职业病') !== -1) {
                                this.form.pastDisease.push(this.form.pastDisease[i].split(':')[0]);
                                this.form.previousHistoryMessage2 = this.form.pastDisease[i].split(':')[1];
                                this.form.pastDisease.splice(i, 1);
                            }
                        }
                    }
                })
            }
        },
        methods: {
            /**
             * 添加手术
             */
            addOperation1() {
                this.form.dataOperation.push({name: '',date: ''});
            },
            /**
             * 删除手术
             * @param {Number} index 索引
             */
            deletePastSurgery(index) {
                if (this.form.dataOperation.length === 1) {
                    this.$message({
                        showClose: true,
                        message: '数据不能少于一个',
                        type: 'error'
                    });
                } else {
                    this.form.dataOperation.splice(index,1);
                }
            },
            /**
             * 提交数据
             */
            submitForm() {
                let para = JSON.parse(JSON.stringify(this.form));
                para.userId = this.userData.id;
                para.medicalAllergy = this.getToStr(para.medicalAllergy,para.irritabilityMessage);
                para.medicalExpose = this.getToStr(para.medicalExpose,para.exposureMessage);
                para.pastDisease = this.getToStr(para.pastDisease,para.previousHistoryMessage3,para.previousHistoryMessage1,para.previousHistoryMessage2);
                para.familyHis = this.getToStr(para.familyHis,para.familyMessage2,para.familyMessage1);
                para.disability = this.getToStr(para.disability,para.disabilityMessage);
                para.pastSurgery = '';
                if (para.operation === 1) {
                    for (let i = 0; i < para.dataOperation.length; i++) {
                        if (para.dataOperation[i].name === '' || para.dataOperation[i].date === '') {
                            this.$message({
                                showClose: true,
                                message: '请完善手术信息',
                                type: 'error'
                            });
                        } else {
                            if (i === para.dataOperation.length - 1) {
                                para.pastSurgery += para.dataOperation[i].name + ';' + para.dataOperation[i].date;
                            } else {
                                para.pastSurgery += para.dataOperation[i].name + ';' + para.dataOperation[i].date + ',';
                            }
                        }
                    }
                }
                medicalCreate(para).then(res => {
                    if (res.data.errno === 0) {
                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        this.$router.push({path: '/userList'});
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                });
            },
            /**
             * 数据过滤 第三个参数是恶性肿瘤   第四个参数是职业病  没有恶性肿瘤 传空
             * @param {*} list 目标数组
             * @param {String} rests 其他项 添加进去
             * @returns {string} 目的字符串
             */
            getToStr(list,rests) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i] === '其他') {
                        list.push(rests);
                        list.splice(i,1);
                    }
                    if (list[i] === '恶性肿瘤') {
                        list[i] = list[i] + ':' + arguments[2];
                    }
                    if (list[i] === '职业病') {
                        list[i] = list[i] + ':' + arguments[3];
                    }
                }
                return list.toString();
            },
            // 返回上一页
            handleHistory() {
                this.$router.back(-1);
            }
        }
    };
</script>

<style lang="less">
    .medical-history {
        .el-form-item.whole100 {
            position: relative;
        }

        .operation-btn {
            .el-form-item__content {
                background: transparent!important;
                box-shadow: 0 0 0 0;
                text-align: center;
                margin-left: 0!important;
                .el-button {
                    width: 153px;
                    height: 46px;
                    border-radius: 4px;
                    background-color: rgba(242, 247, 250, 1);
                    box-shadow: 0px 2px 4px 0px rgba(196, 206, 220, 0.5);
                    border: 0;
                    color: #4D7CFE;
                }
            }
        }

        .previous {
            .el-form-item__content {
                background-color: transparent!important;
                padding: 0;
                box-shadow: 0 0 0 0;

                .previous-history {
                    width: 49%;
                    float: left;
                    border-radius: 2px;
                    margin-right: 6px;
                    padding-left: 18px;
                    background-color: rgba(255, 255, 255, 1);
                    box-shadow: 0px 2px 5px 0px rgba(185, 187, 190, 0.5);
                    .el-radio-group {
                        width: 100%;
                    }
                    .small-item {
                        width: 49%;
                        float: left;
                        .el-form-item__label {
                            height: 30px!important;
                            line-height: 40px;
                            box-shadow: 0 0 0 0;
                            color: #4D7CFE;
                            width: 70px!important;
                        }
                        .el-form-item__content {
                            margin-left: 70px!important;
                            .el-input__inner {
                                height: 22px;
                                border-color: #4D7CFE;
                                border-radius: 2px;
                            }
                        }
                    }
                    .increased {
                        width: 100px;
                        height: 30px;
                        line-height: 30px;
                        border-radius: 4px;
                        background-color: rgba(242, 247, 250, 1);
                        box-shadow: 0px 2px 4px 0px rgba(196, 206, 220, 0.5);
                        color: #4D7CFE;
                        border: 0;
                        padding: 0;
                    }
                }
            }
        }

        .el-form-item__label {
            width: 148px;
            min-height: 42px;
            line-height: 44px;
            position: absolute;
            height: 100%;
            border-radius: 2px;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 5px 0px rgba(185, 187, 190, 0.5);
            color: rgba(0, 0, 0, 1);
            font-size: 14px;
            font-family: PingFangSC-Medium;
        }

        .el-form-item__content {
            min-height: 42px;
            line-height: 42px;
            padding-left: 18px;
            border-radius: 2px;
            margin-left: 156px !important;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 5px 0px rgba(185, 187, 190, 0.5);

            .el-checkbox__label {
                color: #4D7CFE;
            }

            .el-checkbox__inner {
                border-color: #4D7CFE;
            }

            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                background-color: #4D7CFE;
            }

            .el-radio__input.is-checked .el-radio__inner {
                border-color: #4D7CFE;
                background: #4D7CFE
            }

            .message {
                width: 70px;

                .el-input__inner {
                    height: 22px;
                    padding: 0 3px;
                    border-color: #4D7CFE;
                    border-radius: 2px;
                }
            }
        }
    }

    .w160 {
        width: 160px !important;
    }
</style>