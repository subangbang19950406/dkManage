import React from 'react';
import { Card, Button, Table, Form, Select, Modal, Divider, Tag, message, Input, Radio, Pagination } from 'antd';
import { Router, Route, Link } from 'react-router-dom'
import $ from 'jquery'
import Zmage from 'react-zmage'
import { fetchPost } from './../../../fetch/fetch.js'
import Untils from './../../../untils/index1.js'
import './index.css'
import { get } from 'https';
const RadioGroup = Radio.Group;
const Search = Input.Search;
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
export default class Div extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.parentRightPage = this.parentRightPage.bind(this)
        this.shenheRecord = this.shenheRecord.bind(this)
        this.tongguoRecord = this.tongguoRecord.bind(this)
        this.shibaiRecord = this.shibaiRecord.bind(this)
        this.questSearch = this.questSearch.bind(this)
        this.questOri = this.questOri.bind(this)
    }
    componentDidMount() {
        let divLeft = document.querySelector(".huiqu")
        let divAll = document.querySelector(".content")
        divLeft.onclick = () => {
            divAll.style.transition = "all 0.2s linear"
            divAll.style.marginLeft = "-20px"
        }
    }

    shenheRecord(i) {
        console.log("我是父亲的审核数据")
        this.setState({
            shenheRecord: i,
            shenheFlag: true,
            tongguoFlag: false,
            shibaiFlag: false,
        })
    }

    tongguoRecord(i) {
        console.log("我是父亲的通过查看数据")
        this.setState({
            tongguoRecord: i,
            shenheFlag: false,
            tongguoFlag: true,
            shibaiFlag: false,
        })
    }

    shibaiRecord(i) {
        console.log("我是父亲的不通过查看数据")
        this.setState({
            shibaiRecord: i,
            shenheFlag: false,
            tongguoFlag: false,
            shibaiFlag: true,
        })
    }

    questSearch() {
        this.formRef.handleSearch()
    }

    questOri() {
        this.formRef.questRender()
    }

    parentRightPage() {
        const { shenheFlag, shibaiFlag, tongguoFlag, } = this.state
        if (shenheFlag) {
            return <ShenHe
                shenheRecords={this.state.shenheRecord}
                questOri={this.questOri}
                questSearch={this.questSearch}
            />

        } else if (tongguoFlag) {
            return <Detials
                tongguoRecords={this.state.tongguoRecord}
            />
        } else if (shibaiFlag) {
            return <Detial
                shibaiRecords={this.state.shibaiRecord}
            />
        }
    }

    render() {
        return (
            <div className="content" style={{ width: "209%", marginLeft: -20, overflow: "hidden" }}>
                <div style={{ width: "50%", float: "left" }}>
                    <HouseList
                        shenheRecord={this.shenheRecord}
                        tongguoRecord={this.tongguoRecord}
                        shibaiRecord={this.shibaiRecord}
                        wrappedComponentRef={(e) => this.formRef = e}
                    />

                </div>
                <div style={{ width: "50%", float: "right" }}>
                    <Button className="huiqu" type="primary">返回</Button>
                    {this.parentRightPage()}
                    {/* <Ceshi /> */}
                </div>
            </div>
        )
    }
}

//不通过查看
class Detial extends React.Component {
    render() {
        const { type, address, custName, custCode, identityCode, custImgs, identityPic, identityPicBack,
            ownerName, phoneNbr, ownerIdentityCode, owerImgs, ownerIdentityPic, ownerIdentityPicBack,
            reason
        } = this.props.shibaiRecords
        return (
            <div className="chakanD">
                <h3 style={{ fontWeight: "bold" }}>房屋所有人信息：</h3>
                <p>姓名：{type === "OT0" ? custName : ownerName}<span style={{ marginLeft: 140 }}>
                    手机号:{type === "OT0" ? custCode : phoneNbr}</span></p>
                <p>身份证号：{type === "OT0" ? identityCode : ownerIdentityCode}</p>
                <p className="imgP">
                    身份证照片：
                        {
                        type === "OT0" ? <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + identityPic} /> : <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + ownerIdentityPic} />
                    }
                    {
                        type === "OT0" ? <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + identityPicBack} /> : <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + ownerIdentityPicBack} />
                    }
                </p>
                <p>
                    房屋证件：{owerImgs}
                </p>
                <div>
                    {
                        type === "OT0" ? "" : <div>
                            <h3 style={{ fontWeight: "bold" }}>房屋委托人信息：</h3>
                            <p>姓名：{custName}<span style={{ marginLeft: 140 }}>手机号：{custCode}</span></p>
                            <p>身份证号：{identityCode}</p>
                            <p className="imgP">
                                身份证照片：
                                    <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + identityPic} />
                                <Zmage alt="身份证反面照" src={"https:test.dongkenet.com/" + identityPicBack} />
                            </p>
                            <p>房屋委托书：
                                    {custImgs}
                            </p>
                        </div>
                    }
                </div>
                <p>房屋地址：{address}</p>
                <p>
                    审核结果：<span style={{ color: "red" }}>未通过</span>
                </p>
                <p>
                    未通过原因：{reason}
                </p>
            </div>
        )
    }
}
//通过查看
class Detials extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {


    }
    render() {
        const { type, address, custName, custCode, identityCode, custImgs, identityPic, identityPicBack,
            ownerName, phoneNbr, ownerIdentityCode, owerImgs, ownerIdentityPic, ownerIdentityPicBack,
            reason
        } = this.props.tongguoRecords
        return (
            <div className="chakanV">
                <h3 style={{ fontWeight: "bold" }}>房屋所有人信息：</h3>
                <p>姓名：{type === "OT0" ? custName : ownerName}<span style={{ marginLeft: 140 }}>
                    手机号:{type === "OT0" ? custCode : phoneNbr}</span></p>
                <p>身份证号：{type === "OT0" ? identityCode : ownerIdentityCode}</p>
                <p className="imgP">
                    身份证照片：
                        {
                        type === "OT0" ? <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + identityPic} /> : <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + ownerIdentityPic} />
                    }
                    {
                        type === "OT0" ? <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + identityPicBack} /> : <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + ownerIdentityPicBack} />
                    }
                </p>
                <p>
                    房屋证件：{owerImgs}
                </p>
                <div>
                    {
                        type === "OT0" ? "" : <div>
                            <h3 style={{ fontWeight: "bold" }}>房屋委托人信息：</h3>
                            <p>姓名：{custName}<span style={{ marginLeft: 140 }}>手机号：{custCode}</span></p>
                            <p>身份证号：{identityCode}</p>
                            <p className="imgP">
                                身份证照片：
                                    <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + identityPic} />
                                <Zmage alt="身份证反面照" src={"https:test.dongkenet.com/" + identityPicBack} />
                            </p>
                            <p>房屋委托书：
                                    {custImgs}
                            </p>
                        </div>
                    }
                </div>

                <p>房屋地址：{address}</p>
                <p>
                    审核结果：<span style={{ color: "#00EE00" }}>通过</span>
                </p>
                <p>
                    通过原因：{reason}
                </p>

            </div>
        )
    }
}
class ShenHe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.submitShenhe = this.submitShenhe.bind(this)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { type, address, custName, custCode, identityCode, custImgs, identityPic, identityPicBack,
            ownerName, phoneNbr, ownerIdentityCode, owerImgs, ownerIdentityPic, ownerIdentityPicBack
        } = this.props.shenheRecords
        console.log(custName)
        return (
            <div style={{ overflow: "hidden" }} className="shenhe">
                <Form className="login-form">
                    <h3 style={{ fontWeight: "bold" }}>房屋所有人信息：</h3>
                    <p>姓名：{type === "OT0" ? custName : ownerName}<span style={{ marginLeft: 140 }}>
                        手机号:{type === "OT0" ? custCode : phoneNbr}</span></p>
                    <p>身份证号：{type === "OT0" ? identityCode : ownerIdentityCode}</p>
                    <p className="imgP">
                        身份证照片：
                        {
                            type === "OT0" ? <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + identityPic} /> : <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + ownerIdentityPic} />
                        }
                        {
                            type === "OT0" ? <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + identityPicBack} /> : <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + ownerIdentityPicBack} />
                        }
                    </p>
                    <p>
                        房屋证件：{owerImgs}
                    </p>
                    <div>
                        {
                            type === "OT0" ? "" : <div>
                                <h3 style={{ fontWeight: "bold" }}>房屋委托人信息：</h3>
                                <p>姓名：{custName}<span style={{ marginLeft: 140 }}>手机号：{custCode}</span></p>
                                <p>身份证号：{identityCode}</p>
                                <p className="imgP">
                                    身份证照片：
                                    <Zmage alt="身份证正面照" src={"https:test.dongkenet.com/" + identityPic} />
                                    <Zmage alt="身份证反面照" src={"https:test.dongkenet.com/" + identityPicBack} />
                                </p>
                                <p>房屋委托书：
                                    {custImgs}
                                </p>
                            </div>
                        }
                    </div>

                    <p>房屋地址：{address}</p>
                    <FormItem style={{ marginBottom: 4 }}>
                        {getFieldDecorator('radio')(
                            <RadioGroup>
                                审核结果：
                                <Radio value={1}>审核通过</Radio>
                                <Radio value={2}>审核未通过</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('number')(
                            <Input style={{ width: "50%" }} placeholder='请输入房产证号' />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('textarea')(
                            <TextArea style={{ height: 50, width: "50%" }} rows={4} placeholder="请输入说明" />
                        )}
                    </FormItem>
                    <Button type="primary" onClick={this.submitShenhe}
                        className="subShenHe"
                        style={{ width: '15%', marginLeft: "16%" }}>
                        提交
                    </Button>
                </Form>
            </div>
        )
    }

    //点击提交审核  此处调接口
    submitShenhe() {
        const { resetFields, setFieldsValue, validateFields } = this.props.form;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            } else {
                console.log(values)
                if (values.radio === 1) {//审核通过,房产证号必填
                    if (values.number !== undefined && values.textarea !== undefined &&
                        values.number !== "" && values.textarea !== ""
                    ) {
                        fetchPost("bms","/house-verify/approval", {
                            houseVerifyId: this.props.shenheRecords.houseVerifyId,
                            houseId: this.props.shenheRecords.houseId,
                            reason: values.textarea,
                            ownerShipDto: {
                                certNum: values.number,
                                name: this.props.shenheRecords.custName,//业主的姓名
                            }
                        }).then(res => {
                            message.success("提交成功", 1.5, () => {
                                resetFields()
                                if (this.props.shenheRecords.flag) {
                                    let divAll = document.querySelector(".content")
                                    divAll.style.transition = "all 0.2s linear"
                                    divAll.style.marginLeft = "-20px"
                                    this.props.questSearch()
                                } else {
                                    let divAll = document.querySelector(".content")
                                    divAll.style.transition = "all 0.2s linear"
                                    divAll.style.marginLeft = "-20px"
                                    this.props.questOri()
                                }

                            })

                        })
                    } else if (values.number === undefined || values.textarea === undefined ||
                        values.number === "" || values.textarea === ""
                    ) {
                        //房产证号,审核理由为空,不能提交审核
                        message.error("房产证号或者审核理由都不能为空")
                    }

                } else if (values.radio === 2) {//房屋审核不通过,房产证号选填
                    if (values.textarea !== undefined && values.textarea !== "") {
                        fetchPost("bms","/house-verify/reject", {
                            houseVerifyId: this.props.shenheRecords.houseVerifyId,
                            houseId: this.props.shenheRecords.houseId,
                            reason: values.textarea,
                        }).then(res => {
                            message.success("提交成功", 1.5, () => {
                                resetFields()
                                if (this.props.shenheRecords.flag) {
                                    let divAll = document.querySelector(".content")
                                    divAll.style.transition = "all 0.2s linear"
                                    divAll.style.marginLeft = "-20px"
                                    this.props.questSearch()
                                } else {
                                    let divAll = document.querySelector(".content")
                                    divAll.style.transition = "all 0.2s linear"
                                    divAll.style.marginLeft = "-20px"
                                    this.props.questOri()
                                }
                            })
                        })
                    } else if (values.textarea === undefined || values.textarea === "") {
                        message.error("请填写审核理由。房产证号可选填！")
                    }
                } else if (values.radio !== 1 || values.radio !== 2) {
                    message.error("请将各项信息填入完整！")
                }
            }
        }
        )
    }
}

ShenHe = Form.create({})(ShenHe);

class HouseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oriFlag: true,
            searchFlag: false,
        }
        this.dataSourceFlag = this.dataSourceFlag.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleshenhe = this.handleshenhe.bind(this)
        this.handleChakanVitory = this.handleChakanVitory.bind(this)
        this.handleChakanDefeat = this.handleChakanDefeat.bind(this)

    }
    params = {
        pageNo: 1
    }
    componentDidMount() {
        this.handleSearch()
    }

    render() {
        const columns = [
            {
                title: '房屋地址',
                key: 'address',
                dataIndex: 'address',
                className: "title",
                width: "30%",
            },
            {
                title: '房屋申请人身份',
                key: 'type',
                dataIndex: 'type',
                className: "title",
                width: "20%",
                render(type) {
                    return type == "OT0" ? '房屋所有者' : '房屋委托人'
                }
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                className: "title",
                width: "15%",
                render(text) {
                    let config = {
                        '00A': '待审核',
                        '00B': '审核通过',
                        '00C': '审核未通过',
                    }
                    return config[text];
                }
            },
            {
                title: '创建时间',
                key: 'createDate',
                dataIndex: 'createDate',
                className: "title",
                width: "15%",
            },
            {
                title: "操作",
                key: "action",
                className: "title",
                width: "13%",
                render: (text, record, index) => {
                    if (record.status == "00A") {
                        return <div>
                            <Button size="small" type="primary" style={{ color: "black" }}
                                className={"shenhe" + record.houseId}
                                onClick={this.handleshenhe.bind(this, record)}>审核</Button>
                        </div >
                    } else if (record.status == "00B") {
                        return <div>
                            <Button size="small" style={{ backgroundColor: "lightgreen" }}
                                className={"chakanV" + record.houseId}
                                onClick={this.handleChakanVitory.bind(this, record)}>查看</Button>

                        </div >
                    } else if (record.status == "00C") {
                        return <div>
                            <Button size="small" style={{ backgroundColor: "#FF4040" }}
                                className={"chakanD" + record.houseId}
                                onClick={this.handleChakanDefeat.bind(this, record)}>查看</Button>

                        </div >
                    }
                }
            }
        ]
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <div style={{ height: 100, paddingTop: 20 }}>
                    <Form layout="inline">
                        <FormItem label="房屋地址：" style={{ marginLeft: 30 }} >
                            {getFieldDecorator('username', {
                                rules: [{ required: false, whitespace: true, message: "请输入房屋地址" }]
                            })(
                                <Input style={{ width: 350 }} placeholder='请输入' disabled={true} />
                            )}
                        </FormItem>
                        <FormItem label="房屋状态：" style={{ marginLeft: 30 }}>
                            {
                                getFieldDecorator('status', {
                                    initialValue: "00A",
                                    rules: [{ required: true, whitespace: true, message: "请选择房屋状态" }],
                                })(
                                    <Select
                                        style={{ width: 350 }}
                                        placeholder="请选择"
                                    >
                                        <Option value="00A">待审核</Option>
                                        <Option value="00B">已通过</Option>
                                        <Option value="00C">未通过</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                style={{ margin: '0 20px' }}
                                className="ni"
                                onClick={this.handleSearch}>查询</Button>
                            <Button className="wo" onClick={this.handleReset}>重置</Button>
                        </FormItem>
                    </Form>
                </div>
                <Table
                    columns={columns}
                    bordered
                    dataSource={this.dataSourceFlag()}
                    pagination={this.state.pagination}
                />
            </div>
        )
    }
    dataSourceFlag() {
        console.log("oriFlag", this.state.oriFlag)
        console.log("searchFlag", this.state.searchFlag)
        if (this.state.oriFlag) {
            console.log("进入的是this.state.oriFlag：")
            return this.state.dataList
        } else if (this.state.searchFlag) {
            console.log("进入的是this.state.searchFlag：")
            return this.state.dataSearchList
        }

    }

    handleSearch() {
        console.log(this.props)
        const { resetFields } = this.props.form;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            } else {
                console.log(values)
               
                fetchPost("bms","/house-verify/query-by-page", {
                    status: values.status,
                    pageInfo: {
                        pageNo: 1,
                        pageSize: this.state.total,
                    }
                }).then(res => {
                    console.log("查询得到的数据", res,this.props)
                    if (res.code === "0") {
                        let dataSearchList = res.data.rows.map((item, index) => {
                            item.key = index
                            item.flag = true
                            if (item.houseBaseInfoDto) {
                                item.address = item.houseBaseInfoDto.detailAddress
                            } else {
                                item.address = ""
                            }
                            return item
                        })
                        console.log("当前页查询得到的数据", dataSearchList)
                        resetFields()
                        this.setState({
                            dataSearchList,
                            searchFlag: true,
                            oriFlag: false,
                        })
                    }
                })
            }
        })
    }

    handleReset() {
        console.log("重置按钮")
        this.params = {
            pageNo: 1,
        }
        // const { resetFields } = this.props.form
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            } else {
                this.setState({
                    oriFlag: true,
                    searchFlag: false,
                })
                this.questRender()
            }
        })

    }

    handleshenhe(record) {
        Untils.leftPage(".content")

        fetchPost("bms","/house-verify/query", {
            houseId: record.houseId,
            houseVerifyId: record.houseVerifyId,
        }).then(res => {
            console.log(res)
            if (res.code === "0") {
                let dataList = res.data
                let ownerName = ""
                let phoneNbr = ""
                let ownerIdentityCode = ""
                let ownerIdentityPic = ""
                let ownerIdentityPicBack = ""
                let owerImgs = []
                let custImgs = []
                if (dataList.houseOwnerPo) {
                    ownerName = dataList.houseOwnerPo.ownerName
                    phoneNbr = dataList.houseOwnerPo.phoneNbr
                    ownerIdentityCode = dataList.houseOwnerPo.identityCode
                    ownerIdentityPic = dataList.houseOwnerPo.identityPic
                    ownerIdentityPicBack = dataList.houseOwnerPo.identityPicBack

                }
                if (dataList.certificatePics) {
                    dataList.certificatePics.map((ite, ins) => {
                        owerImgs.push(<Zmage alt="房屋证件" src={"https:test.dongkenet.com/" + ite.housePicUrl} key={ins} />)
                    })
                }
                if (dataList.proxyPics) {
                    dataList.proxyPics.map((ites, inss) => {
                        custImgs.push(<Zmage alt="房屋委托书" src={"https:test.dongkenet.com/" + ites.housePicUrl} key={inss} />)
                    })
                }
                dataList.key = record.key
                dataList.flag = record.flag

                dataList.ownerName = ownerName
                dataList.phoneNbr = phoneNbr
                dataList.ownerIdentityCode = ownerIdentityCode
                dataList.ownerIdentityPic = ownerIdentityPic
                dataList.ownerIdentityPicBack = ownerIdentityPicBack
                dataList.owerImgs = owerImgs
                dataList.custImgs = custImgs

                if (record.houseBaseInfoDto) {
                    dataList.address = record.houseBaseInfoDto.detailAddress
                } else {
                    dataList.address = ""
                }
                this.props.shenheRecord(dataList)
                console.log("点击审核那一行的重新调的新数据：", dataList)
            }
        })

    }

    handleChakanVitory(record) {
        Untils.leftPage(".content")
        console.log("点击通过查看那一行的数据：", record)
        fetchPost("bms","/house-verify/query", {
            houseId: record.houseId,
            houseVerifyId: record.houseVerifyId,
        }).then(res => {
            console.log(res)
            if (res.code === "0") {
                let dataList = res.data
                let ownerName = ""
                let phoneNbr = ""
                let ownerIdentityCode = ""
                let ownerIdentityPic = ""
                let ownerIdentityPicBack = ""
                let owerImgs = []
                let custImgs = []
                if (dataList.houseOwnerPo) {
                    ownerName = dataList.houseOwnerPo.ownerName
                    phoneNbr = dataList.houseOwnerPo.phoneNbr
                    ownerIdentityCode = dataList.houseOwnerPo.identityCode
                    ownerIdentityPic = dataList.houseOwnerPo.identityPic
                    ownerIdentityPicBack = dataList.houseOwnerPo.identityPicBack

                }
                if (dataList.certificatePics) {
                    dataList.certificatePics.map((ite, ins) => {
                        owerImgs.push(<Zmage alt="房屋证件" src={"https:test.dongkenet.com/" + ite.housePicUrl} key={ins} />)
                    })
                }
                if (dataList.proxyPics) {
                    dataList.proxyPics.map((ites, inss) => {
                        custImgs.push(<Zmage alt="房屋委托书" src={"https:test.dongkenet.com/" + ites.housePicUrl} key={inss} />)
                    })
                }
                dataList.key = record.key
                // dataList.flag = record.flag

                dataList.ownerName = ownerName
                dataList.phoneNbr = phoneNbr
                dataList.ownerIdentityCode = ownerIdentityCode
                dataList.ownerIdentityPic = ownerIdentityPic
                dataList.ownerIdentityPicBack = ownerIdentityPicBack
                dataList.owerImgs = owerImgs
                dataList.custImgs = custImgs

                if (record.houseBaseInfoDto) {
                    dataList.address = record.houseBaseInfoDto.detailAddress
                } else {
                    dataList.address = ""
                }
                this.props.tongguoRecord(dataList)
                console.log("点击查看通过那一行的重新调的新数据：", dataList)
            }
        })
    }

    handleChakanDefeat(record) {
        Untils.leftPage(".content")
        console.log("点击不通过查看那一行的数据：", record)
        fetchPost("bms","/house-verify/query", {
            houseId: record.houseId,
            houseVerifyId: record.houseVerifyId,
        }).then(res => {
            console.log(res)
            if (res.code === "0") {
                let dataList = res.data
                let ownerName = ""
                let phoneNbr = ""
                let ownerIdentityCode = ""
                let ownerIdentityPic = ""
                let ownerIdentityPicBack = ""
                let owerImgs = []
                let custImgs = []
                if (dataList.houseOwnerPo) {
                    ownerName = dataList.houseOwnerPo.ownerName
                    phoneNbr = dataList.houseOwnerPo.phoneNbr
                    ownerIdentityCode = dataList.houseOwnerPo.identityCode
                    ownerIdentityPic = dataList.houseOwnerPo.identityPic
                    ownerIdentityPicBack = dataList.houseOwnerPo.identityPicBack

                }
                if (dataList.certificatePics) {
                    dataList.certificatePics.map((ite, ins) => {
                        owerImgs.push(<Zmage alt="房屋证件" src={"https:test.dongkenet.com/" + ite.housePicUrl} key={ins} />)
                    })
                }
                if (dataList.proxyPics) {
                    dataList.proxyPics.map((ites, inss) => {
                        custImgs.push(<Zmage alt="房屋委托书" src={"https:test.dongkenet.com/" + ites.housePicUrl} key={inss} />)
                    })
                }
                dataList.key = record.key
                // dataList.flag = record.flag

                dataList.ownerName = ownerName
                dataList.phoneNbr = phoneNbr
                dataList.ownerIdentityCode = ownerIdentityCode
                dataList.ownerIdentityPic = ownerIdentityPic
                dataList.ownerIdentityPicBack = ownerIdentityPicBack
                dataList.owerImgs = owerImgs
                dataList.custImgs = custImgs

                if (record.houseBaseInfoDto) {
                    dataList.address = record.houseBaseInfoDto.detailAddress
                } else {
                    dataList.address = ""
                }
                this.props.shibaiRecord(dataList)
                console.log("点击失败查看那一行的重新调的新数据：", dataList)
            }
        })

    }

    questRender = () => {
        fetchPost("bms","/house-verify/query-by-page", {
            "pageInfo": {
                pageNo: this.params.pageNo,
                // pageSize: 7  //默认是10
            }
        }).then(res => {
            let _this = this
            console.log("房屋审核首次渲染的所有数据", res)
            if (res.code === "0") {
                let dataList = res.data.rows.map((item, index) => {
                    item.key = index
                    item.flag = false
                    if (item.houseBaseInfoDto) {
                        item.address = item.houseBaseInfoDto.detailAddress
                    } else {
                        item.address = ""
                    }
                    return item
                })
                console.log("当前页得到的数据", dataList)
                this.setState({
                    dataList,
                    total: res.data.total,
                    pagination: Untils.pagination(res, (current) => {
                        _this.params.pageNo = current
                        this.questRender()
                    })
                })
            }

        })
    }
}

HouseList = Form.create()(HouseList)