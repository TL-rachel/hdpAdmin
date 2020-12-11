<template>
    <div class="search-wrapper">
        <el-form :inline="true" :model="searchForm" :label-width="labelWidth" class="search-form">
            <div class="search-fields">
                <el-form-item :label="field.name" v-for="(field,index) in fields" :key="index">
                    <el-input v-model.trim="searchForm[field.key]" v-if="field.type == 'input'"
                              :placeholder="field.placeholder?field.placeholder: '请输入'"></el-input>
                    <el-select v-model="searchForm[field.key]" :filterable="field.filterable"
                               v-if="field.type == 'select'" :placeholder="field.placeholder?field.placeholder: '请选择'"
                               @change="change($event, field.cascadeKeys, field.changeHandler)">
                        <el-option value="" label="全部"></el-option>
                        <template v-for="(op,i) in field.options">
                            <el-option :value="op.id?op.id: ''" :key="i"
                                       :label="(op.name || op.value)?(op.name || op.value):''"></el-option>
                        </template>
                    </el-select>
                    <div v-if="field.type == 'time'" :class="field.childKeyPosition?'time-select-wrapper':''">
                        <template v-if="field.childKeyPosition =='left'">
                            <el-date-picker v-model="searchForm[field.childKey[0]+field.key]"
                                            default-time="['00:00:00']" value-format="yyyy-MM-dd HH:mm:ss"
                                            type="datetime" placeholder="选择开始时间"
                                            @change="validTime($event,'start',field.childKey[0]+field.key)"></el-date-picker>
                            <span class="dash-line">-</span>
                            <el-date-picker v-model="searchForm[field.childKey[1]+field.key]"
                                            default-time="['23:59:59']" value-format="yyyy-MM-dd HH:mm:ss"
                                            type="datetime" placeholder="选择结束时间"
                                            @change="validTime($event,'end', field.childKey[1]+field.key)"></el-date-picker>
                        </template>
                        <template v-else-if="field.childKeyPosition =='right'">
                            <el-date-picker v-model="searchForm[field.key+field.childKey[0]]"
                                            default-time="['00:00:00']" value-format="yyyy-MM-dd HH:mm:ss"
                                            type="datetime" placeholder="选择开始时间"
                                            @change="validTime($event,'start',field.key+field.childKey[0])"></el-date-picker>
                            <span class="dash-line">-</span>
                            <el-date-picker v-model="searchForm[field.key+field.childKey[1]]"
                                            default-time="['23:59:59']" value-format="yyyy-MM-dd HH:mm:ss"
                                            type="datetime" placeholder="选择结束时间"
                                            @change="validTime($event,'end', field.key+field.childKey[1])"></el-date-picker>

                        </template>
                        <template v-else-if="field.childKeyPosition =='center'">
                            <el-date-picker
                                    v-model="searchForm[field.key+field.childKey[0]]"
                                    type="month"
                                    value-format="yyyy-MM"
                                    placeholder="选择月"
                                    @change="validTime($event,'start',field.key+field.childKey[0])">
                            </el-date-picker>
                            <span class="dash-line">-</span>
                            <el-date-picker
                                    v-model="searchForm[field.key+field.childKey[1]]"
                                    type="month"
                                    value-format="yyyy-MM"
                                    placeholder="选择月"
                                    @change="validTime($event,'end', field.key+field.childKey[1])">
                            </el-date-picker>
                            <!---->
                            <!--<el-date-picker-->
                            <!--v-model="searchForm[field.key+field.childKey[0]]"-->
                            <!--type="monthrange"-->
                            <!--value-format="yyyy-MM"-->
                            <!--range-separator="至"-->
                            <!--start-placeholder="开始月份"-->
                            <!--end-placeholder="结束月份">-->
                            <!--</el-date-picker>-->
                        </template>
                        <template v-else>
                            <el-date-picker v-model="searchForm[field.childKey+field.key]"
                                            default-time="['00:00:00']" value-format="yyyy-MM-dd HH:mm:ss"
                                            type="datetime" placeholder="选择时间"
                                            @change="validTime($event,'',field.childKey+field.key)"></el-date-picker>
                        </template>

                    </div>
                </el-form-item>
            </div>
            <el-form-item class="search-from-btn">
                <el-button type="primary" icon="iconfont icon-chakan" class="search-submit" @click="submit" :id="id">
                    查询
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'search-form',
        props: {
            // form显示的查询字段
            fields: {
                type: Array, //
                default: Array,
                required: true,
                validator: (value) => {
                    value.forEach(item => {
                        if (!item.name || !item.type) {
                            throw new Error('字段名和字段类型不可为空');
                        }
                        if (item.type === 'select' && (!item.options || item.options.constructor.name !== 'Array')) {
                            throw new Error('select字段类型的options不是Array类型');
                        }
                    });
                    return true;
                }
            },
            // 查询处理函数
            searchHandler: {
                type: Function,
                default: () => {
                }
            },
            // 字段名宽度
            labelWidth: {
                type: String,
                default: '100px'
            },
            historyCondition: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                searchForm: {},
                startTime: 0,
                endTime: 0,
                id: this.$ZFCommon.util.getUid(),
                keyTime: 0,
            };
        },
        created() {
            if (this.historyCondition) {
                this.searchForm = this.historyCondition;
            }
        },

        methods: {
            submit() {
                for (let key in this.searchForm) {
                    if (this.searchForm[key]) {
                        continue;
                    }
                    delete this.searchForm[key];
                }
                this.searchHandler(this.searchForm);
            },
            validTime(val, type, key) {
                if (this.keyTime !== 0) {
                    this.endTime = 0;
                }
                if (type === 'start') {
                    this.startTime = new Date(val).getTime();
                } else {
                    this.endTime = new Date(val).getTime();
                }
                if (this.startTime !== 0 && this.endTime !== 0) {
                    if (this.startTime > this.endTime) {
                        this.$message({
                            type: 'error',
                            message: '开始时间不可大于结束时间'
                        });
                        this.searchForm[key] = '';
                        this.endTime = 0;
                    }
                    this.keyTime = this.endTime;
                }
            },
            change(val, keys, cb) {
                if (keys && keys.length) {
                    keys.forEach(key => {
                        this.$set(this.searchForm, key, '');
                    });
                }
                if (typeof cb === 'function') {
                    cb(val);
                }
            }
        }
    };
</script>
<style lang="less">
    @import '../../common/less/base-ui-variables.less';

    .search-wrapper {
        width: 100%;
        border-bottom: 10px solid #f2f3f7;
    }

    .search-form {
        display: flex;
        width: 100%;
        align-items: center;
        min-height: 76px;
        background-color: white;
        padding-right: 20px;
    }

    .search-fields {
        margin-right: 20px;
        padding: 15px;
    }

    .search-from-btn {
        align-self: flex-end;
        padding: 15px 0 15px 15px;
        /*margin-right: 0;*/
        flex-grow: 0;
    }

    .search-submit {
        width: 100px;
        height: 36px;
        line-height: 1;
        padding: 0;
        background-color: @zf-color-primary;
    }

    /*重置element-ui form组件样式 */
    .search-wrapper .el-input, .search-wrapper .el-input__inner {
        border-radius: 0;
        height: 36px;
        width: 150px;
    }

    .search-wrapper {
        .el-form-item:not(.search-from-btn) {
            margin: 5px 0;
        }
        .search-from-btn{
            align-self: flex-end;
            margin: 5px 0;
            .el-form-item__content{
                padding: 0;
            }

        }
        .dash-line{
            margin: 0 5px;
        }

        .el-form-item__label, .el-form-item__content {
            line-height: 36px;
            margin: 0;
            padding: 0 12px 0 0;
            font-weight: 400;
        }
        .el-date-editor.el-input {
            width: 198px;
            .el-input__inner {
                width: 198px;
            }
        }
        .time-select-wrapper {
            width: 412px;
            display: flex;
            justify-content: space-between;
            vertical-align: top;
        }
    }

</style>
