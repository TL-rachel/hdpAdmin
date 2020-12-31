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
        <span class="update-case">病史数据</span>
        <div>
            <el-form ref="form" class="clearfix medical-history" :model="form" label-width="80px">
                <el-form-item label="药物过敏史" class="whole100" label-width="150px">
                    <el-checkbox-group v-model="form.irritability">
                        <el-checkbox label="0" name="type">青霉素</el-checkbox>
                        <el-checkbox label="1" name="type">磺胺</el-checkbox>
                        <el-checkbox label="2" name="type">链霉素</el-checkbox>
                        <el-checkbox label="3" name="type">其他</el-checkbox>
                        <el-input class="message" v-model="form.irritabilityMessage"
                                  :disabled="form.irritability.indexOf('3') == -1" placeholder="请输入"></el-input>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="暴露史" class="whole100" label-width="150px">
                    <el-checkbox-group v-model="form.exposure">
                        <el-checkbox label="0" name="type">化学品</el-checkbox>
                        <el-checkbox label="1" name="type">毒物</el-checkbox>
                        <el-checkbox label="2" name="type">射线</el-checkbox>
                        <el-checkbox label="3" name="type">其他</el-checkbox>
                        <el-input class="message" v-model="form.exposureMessage"
                                  :disabled="form.exposure.indexOf('3') == -1" placeholder="请输入"></el-input>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="是否佩戴起搏器" class="whole100" label-width="150px">
                    <el-radio-group v-model="form.pacemaker">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="既往史" class="whole100 previous" label-width="150px">
                    <div class="previous-history">
                        <span>疾病</span>
                        <el-checkbox-group v-model="form.previousHistory">
                            <el-checkbox label="0" name="type">高血压</el-checkbox>
                            <el-checkbox label="1" name="type">糖尿病</el-checkbox>
                            <el-checkbox label="2" name="type">冠心病</el-checkbox>
                            <el-checkbox label="3" name="type">慢性阻塞性肺疾病</el-checkbox>
                            <el-checkbox label="4" name="type">脑卒中</el-checkbox>
                            <el-checkbox label="5" name="type">结核病</el-checkbox>
                            <el-checkbox label="6" name="type">肝炎</el-checkbox>
                            <el-checkbox label="7" name="type">其他法定传染病</el-checkbox>
                            <el-checkbox label="8" name="type">重性精神疾病</el-checkbox>
                            <el-checkbox label="9" name="type">先天畸形</el-checkbox>
                            <el-checkbox label="10" name="type">恶性肿瘤</el-checkbox>
                            <el-input class="message w160" style="margin-right: 20px" v-model="form.previousHistoryMessage1"
                                      :disabled="form.previousHistory.indexOf('10') == -1" placeholder="请输入"></el-input>
                            <el-checkbox label="11" name="type">职业病</el-checkbox>
                            <el-input class="message w160" style="margin-right: 20px" v-model="form.previousHistoryMessage2"
                                      :disabled="form.previousHistory.indexOf('11') == -1" placeholder="请输入"></el-input>
                            <el-checkbox label="12" name="type">其他</el-checkbox>
                            <el-input class="message w160" v-model="form.previousHistoryMessage3"
                                      :disabled="form.previousHistory.indexOf('12') == -1" placeholder="请输入"></el-input>
                        </el-checkbox-group>
                    </div>
                    <div class="previous-history">
                        <div>手术</div>
                        <el-radio-group v-model="form.operation">
                            <el-radio label="1">有</el-radio>
                            <el-radio label="0">无</el-radio>
                        </el-radio-group>
                        <template v-for="(item,index) in form.dataOperation">
                            <el-form-item class="small-item" :key="index + '1'" label="手术名">
                                <el-input class="w160" v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item class="small-item" :key="index + '2'" label="手术时间">
                                <el-date-picker type="date" placeholder="选择日期" v-model="item.date" style="width: 160px;"></el-date-picker>
                                <i>删除</i>
                            </el-form-item>
                        </template>
                        <button class="increased" @click="addOperation">新增</button>
                    </div>
                </el-form-item>

                <el-form-item label="家族史" class="whole100" label-width="150px">
                    <el-checkbox-group v-model="form.family">
                        <el-checkbox label="0" name="type">高血压</el-checkbox>
                        <el-checkbox label="1" name="type">糖尿病</el-checkbox>
                        <el-checkbox label="2" name="type">冠心病</el-checkbox>
                        <el-checkbox label="3" name="type">慢性阻塞性肺疾病</el-checkbox>
                        <el-checkbox label="4" name="type">脑卒中</el-checkbox>
                        <el-checkbox label="5" name="type">结核病</el-checkbox>
                        <el-checkbox label="6" name="type">肝炎</el-checkbox>
                        <el-checkbox label="7" name="type">其他法定传染病</el-checkbox>
                        <el-checkbox label="8" name="type">重性精神疾病</el-checkbox>
                        <el-checkbox label="9" name="type">先天畸形</el-checkbox>
                        <el-checkbox label="10" name="type">恶性肿瘤</el-checkbox>
                        <el-input class="message w160" style="margin-right: 20px" v-model="form.familyMessage1"
                                  :disabled="form.family.indexOf('10') == -1" placeholder="请输入"></el-input>
                        <el-checkbox label="11" name="type">其他</el-checkbox>
                        <el-input class="message w160" v-model="form.familyMessage2"
                                  :disabled="form.family.indexOf('11') == -1" placeholder="请输入"></el-input>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="遗传病史" class="whole100" label-width="150px">
                    <el-radio-group v-model="form.geneticDisease">
                        <el-radio label="0">无</el-radio>
                        <el-radio label="1">有</el-radio>
                        <el-input class="message w160" v-model="form.geneticDiseaseMessage"
                                  :disabled="form.geneticDisease == '0'" placeholder="请输入"></el-input>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="残疾情况" class="whole100" label-width="150px">
                    <el-checkbox-group v-model="form.disability">
                        <el-checkbox label="0" name="type">视力残疾</el-checkbox>
                        <el-checkbox label="1" name="type">听力残疾</el-checkbox>
                        <el-checkbox label="2" name="type">肢体残疾</el-checkbox>
                        <el-checkbox label="3" name="type">智力残疾</el-checkbox>
                        <el-checkbox label="4" name="type">其他</el-checkbox>
                        <el-input class="message" v-model="form.disabilityMessage"
                                  :disabled="form.disability.indexOf('4') == -1" placeholder="请输入"></el-input>
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
    export default {
        name: 'medicalHistory',
        data() {
            return {
                form: {
                    irritability: [],
                    exposure: [],
                    disability: [],
                    family: [],
                    previousHistory: [],
                    irritabilityMessage: '',
                    exposureMessage: '',
                    pacemaker: '',
                    operation: '',
                    geneticDisease: '',
                    geneticDiseaseMessage: '',
                    disabilityMessage: '',
                    familyMessage1: '',
                    familyMessage2: '',
                    previousHistoryMessage1: '',
                    previousHistoryMessage2: '',
                    previousHistoryMessage3: '',
                    dataOperation: [
                        {
                            name: '',
                            date: ''
                        }
                    ]
                },
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
            addOperation() {
                this.form.dataOperation.push({name: '',date: ''});
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