import React from 'react';
import { Card, Button, Table, Form, Select, Modal, Divider, Tag, message, Input, Radio, Pagination } from 'antd';
import { Router, Route, Link } from 'react-router-dom'
import $ from 'jquery'
import Zmage from 'react-zmage'
import { fetchPost } from './../../../fetch/fetch.js'
import Untils from './../../../untils/index1.js'
import './index.css'
const RadioGroup = Radio.Group;
const Search = Input.Search;
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
export default class Div extends React.Component {
    state = {
        defeatInfos: "",
        defeatInfo: ""
    }
    componentDidMount() {
        let divv = document.querySelector(".huiqu")
        let divss = document.querySelector(".content")

        divv.onclick = () => {
            console.log("返回啦")
            divss.style.transition = "all 0.2s linear"
            divss.style.marginLeft = "-20px"
        }
    }
    defeat = (defeatInfo, objsFlag, flag) => {
        console.log("委托人", defeatInfo)

        this.setState({
            objsFlag: objsFlag,
            flag: flag,
            owerArra: defeatInfo.owerArr.a,//姓名
            owerArrb: defeatInfo.owerArr.b,//手机号
            owerArrc: defeatInfo.owerArr.c,//身份证号
            owerArrd: defeatInfo.owerArr.d,//房东身份证正面
            owerArre: defeatInfo.owerArr.e,//反面
            owerImgs: defeatInfo.owerImgs,//房东房屋信息

            custArra: defeatInfo.custArr.a,
            custArrb: defeatInfo.custArr.b,
            custArrc: defeatInfo.custArr.c,
            custArrd: defeatInfo.custArr.d,//委托人身份证正面
            custArre: defeatInfo.custArr.e,
            custImgs: defeatInfo.custImgs,

            address: defeatInfo.record.address,
            dReason: defeatInfo.dReason,
        })
    }
    defeats = (defeatsInfos, objsFlag, flag) => {
        console.log("房主", defeatsInfos)
        this.setState({
            objsFlag: objsFlag,
            flag: flag,

            custArrDa: defeatsInfos.custArrD.a,//房东姓名
            custArrDb: defeatsInfos.custArrD.b,//手机号
            custArrDc: defeatsInfos.custArrD.c,//身份证号
            custArrDd: defeatsInfos.custArrD.d,//正面
            custArrDe: defeatsInfos.custArrD.e,//反面
            custImgD: defeatsInfos.custImgD,

            address: defeatsInfos.record.address,
            dReason: defeatsInfos.dReason,
        })
    }

    victory = (victoryinfo, objsFlag, flag) => {
        this.setState({
            objsFlag: objsFlag,
            flag: flag,

            owerArra: victoryinfo.owerArr.a,//姓名
            owerArrb: victoryinfo.owerArr.b,//手机号
            owerArrc: victoryinfo.owerArr.c,//身份证号
            owerArrd: victoryinfo.owerArr.d,//房东身份证正面
            owerArre: victoryinfo.owerArr.e,//反面
            owerImgs: victoryinfo.owerImgs,//房东房屋信息

            custArra: victoryinfo.custArr.a,
            custArrb: victoryinfo.custArr.b,
            custArrc: victoryinfo.custArr.c,
            custArrd: victoryinfo.custArr.d,//委托人身份证正面
            custArre: victoryinfo.custArr.e,
            custImgs: victoryinfo.custImgs,

            address: victoryinfo.record.address,
            vReason: victoryinfo.vReason,
        })
    }
    victorys = (victorysinfos, objsFlag, flag) => {
        this.setState({
            objsFlag: objsFlag,
            flag: flag,

            custArrDa: victorysinfos.custArrV.a,//房东姓名
            custArrDb: victorysinfos.custArrV.b,//手机号
            custArrDc: victorysinfos.custArrV.c,//身份证号
            custArrDd: victorysinfos.custArrV.d,//正面
            custArrDe: victorysinfos.custArrV.e,//反面
            custImgD: victorysinfos.custImgD,

            address: victorysinfos.record.address,
            vReason: victorysinfos.vReason,
        })
    }
    shenhe = (shenheInfo, objsFlag, flag, shenheflag) => {
        console.log(shenheflag)
        this.setState({
            shenheflag: shenheflag,
            flag: flag,
            objsFlag: objsFlag,
            owerArra: shenheInfo.owerArr.a,//姓名
            owerArrb: shenheInfo.owerArr.b,//手机号
            owerArrc: shenheInfo.owerArr.c,//身份证号
            owerArrd: shenheInfo.owerArr.d,//房东身份证正面
            owerArre: shenheInfo.owerArr.e,//反面
            owerImgs: shenheInfo.owerImgs,//房东房屋信息

            custArra: shenheInfo.custArr.a,
            custArrb: shenheInfo.custArr.b,
            custArrc: shenheInfo.custArr.c,
            custArrd: shenheInfo.custArr.d,//委托人身份证正面
            custArre: shenheInfo.custArr.e,
            custImgs: shenheInfo.custImgs,

            houseVerifyId: shenheInfo.ids.houseVerifyId,//点击提交审核需要的两条信息
            houseId: shenheInfo.ids.houseId,
            name: shenheInfo.ids.ownerName,
            address: shenheInfo.record.address,
        })
    }
    shenhes = (shenhesInfos, objsFlag, flag, shenheflag) => {

        this.setState({
            shenheflag: shenheflag,
            flag: flag,
            objsFlag: objsFlag,
            custArrDa: shenhesInfos.owerArr.a,//房东姓名
            custArrDb: shenhesInfos.owerArr.b,//手机号
            custArrDc: shenhesInfos.owerArr.c,//身份证号
            custArrDd: shenhesInfos.owerArr.d,//正面
            custArrDe: shenhesInfos.owerArr.e,//反面
            custImgD: shenhesInfos.owerImgs,

            houseVerifyId: shenhesInfos.ids.houseVerifyId,//点击提交审核需要的两条信息
            houseId: shenhesInfos.ids.houseId,
            name: shenhesInfos.ids.custName,
            address: shenhesInfos.record.address,
        })
    }
    // 查询界面的审核
    num = (i) => {
        console.log("我是传过来的num", i)
        this.setState({
            num: i,
        })
    }
    numQuest = (i) => {
        console.log("我是传过来的numQuest", i)
        this.setState({
            numQuest: i,
        })
    }
    shenheFuRender = () => {
        console.log("bangbang")
        console.log(this.refs)
        this.refs.getSwordButton.handleSearch()
    }
    shenheQuestRender = () => {
        this.refs.getSwordButton.questRender()
    }

    gaibianNum=()=>{
        console.log("父亲的gaibianNum",this.refs)
        this.refs.getSwordButton.gaibianNum()
    }
    page = () => {
        console.log("flag", this.state.flag)
        console.log("objsflag", this.state.objsFlag)
        if (this.state.flag == true || this.state.flag == false) {
            // 查看通过

            return <Detials
                flag={this.state.flag}
                address={this.state.address}
                vReason={this.state.vReason}


                owerArra={this.state.owerArra}//房东
                owerArrb={this.state.owerArrb}
                owerArrc={this.state.owerArrc}
                owerArrd={this.state.owerArrd}
                owerArre={this.state.owerArre}
                owerImgs={this.state.owerImgs}
                custArra={this.state.custArra}//委托人
                custArrb={this.state.custArrb}
                custArrc={this.state.custArrc}
                custArrd={this.state.custArrd}
                custArre={this.state.custArre}
                custImgs={this.state.custImgs}

                custArrDa={this.state.custArrDa}//只有房东
                custArrDb={this.state.custArrDb}
                custArrDc={this.state.custArrDc}
                custArrDd={this.state.custArrDd}
                custArrDe={this.state.custArrDe}
                custImgD={this.state.custImgD}
            />

        } else if (this.state.objsFlag == true || this.state.objsFlag == false) {
            //查看不通过
            return <Detial
                objsFlag={this.state.objsFlag}
                address={this.state.address}
                dReason={this.state.dReason}

                owerArra={this.state.owerArra}//房东
                owerArrb={this.state.owerArrb}
                owerArrc={this.state.owerArrc}
                owerArrd={this.state.owerArrd}
                owerArre={this.state.owerArre}
                owerImgs={this.state.owerImgs}
                custArra={this.state.custArra}//委托人
                custArrb={this.state.custArrb}
                custArrc={this.state.custArrc}
                custArrd={this.state.custArrd}
                custArre={this.state.custArre}
                custImgs={this.state.custImgs}

                custArrDa={this.state.custArrDa}//只有房东
                custArrDb={this.state.custArrDb}
                custArrDc={this.state.custArrDc}
                custArrDd={this.state.custArrDd}
                custArrDe={this.state.custArrDe}
                custImgD={this.state.custImgD}
            />
        } else if (this.state.shenheflag == true || this.state.shenheflag == false) {
            return <ShenHe
                shenheflag={this.state.shenheflag}
                address={this.state.address}
                num={this.state.num}
                numQuest={this.state.numQuest}
                owerArra={this.state.owerArra}//房东
                owerArrb={this.state.owerArrb}
                owerArrc={this.state.owerArrc}
                owerArrd={this.state.owerArrd}
                owerArre={this.state.owerArre}
                owerImgs={this.state.owerImgs}
                custArra={this.state.custArra}//委托人
                custArrb={this.state.custArrb}
                custArrc={this.state.custArrc}
                custArrd={this.state.custArrd}
                custArre={this.state.custArre}
                custImgs={this.state.custImgs}

                houseVerifyId={this.state.houseVerifyId}
                houseId={this.state.houseId}
                custArrDa={this.state.custArrDa}//只有房东
                custArrDb={this.state.custArrDb}
                custArrDc={this.state.custArrDc}
                custArrDd={this.state.custArrDd}
                custArrDe={this.state.custArrDe}
                custImgD={this.state.custImgD}
                shenheRender={this.shenheFuRender}
                shenheQuestRender={this.shenheQuestRender}

                gaibianNum={this.gaibianNum}
            />
        }
    }
    render() {
        return (
            <div className="content" style={{ width: "209%", marginLeft: -20, overflow: "hidden" }}>
                <div style={{ width: "50%", float: "left" }} onClick={this.scrolLeft}>
                    <HouseList
                        defeat={this.defeat}//委托人未通过查看，子组件传过来的
                        defeats={this.defeats}//业主未通过查看，子组件传过来的
                        victory={this.victory}
                        victorys={this.victorys}
                        shenhe={this.shenhe}
                        shenhes={this.shenhes}
                        nums={this.num}
                        numQuest={this.numQuest}
                        ref="getSwordButton"
                    />

                </div>
                <div style={{ width: "50%", float: "right" }}>
                    <Button className="huiqu" type="primary">返回</Button>
                    {this.page()}
                </div>
            </div>
        )
    }
}

//不通过查看
class Detial extends React.Component {

    render() {
        console.log("不通过查看objsFlag", this.props.objsFlag, this.props.custImgs)

        return (
            <div className="chakanD">
                <h3 style={{ fontWeight: "bold" }}>房屋所有人信息：</h3>
                <p>姓名：{this.props.objsFlag ? this.props.custArrDa : this.props.owerArra}<span style={{ marginLeft: 140 }}>手机号：{this.props.objsFlag ? this.props.custArrDb : this.props.owerArrb}</span></p>
                <p>身份证号：{this.props.objsFlag ? this.props.custArrDc : this.props.owerArrc}</p>
                <p className="imgP">
                    身份证照片：
                        {this.props.objsFlag ? <Zmage alt="身份证照片" src={"https://test.dongkenet.com/" + this.props.custArrDd} /> : <Zmage alt="身份证照片" src={"https://test.dongkenet.com/" + this.props.owerArrd} />}
                    {this.props.objsFlag ? <Zmage alt="身份证照片" src={"https://test.dongkenet.com/" + this.props.custArrDe} /> : <Zmage alt="身份证照片" src={"https://test.dongkenet.com/" + this.props.owerArre} />}
                </p>
                <p>房屋证件：
                {this.props.objsFlag ? this.props.custImgD : this.props.owerImgs}
                </p>
                <div>
                    {
                        this.props.objsFlag ? "" : <div>
                            <h3 style={{ fontWeight: "bold" }}>房屋委托人信息：</h3>
                            <p>姓名：{this.props.custArra}<span style={{ marginLeft: 140 }}>手机号：{this.props.custArrb}</span></p>
                            <p>身份证号：{this.props.custArrc}</p>
                            <p className="imgP">
                                身份证照片：
                                <Zmage alt="身份证照片" src={"https://test.dongkenet.com/" + this.props.custArrd} />
                                <Zmage alt="身份证照片" src={"https://test.dongkenet.com/" + this.props.custArre} />
                            </p>
                            <p>房屋委托书：
                            {this.props.custImgs}
                            </p>
                        </div>
                    }
                </div>
                <p>房屋地址：{this.props.address}</p>
                <p>
                    审核结果：<span style={{ color: "red" }}>未通过</span>
                </p>
                <p>
                    未通过原因：{this.props.dReason}
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
        let imgs = document.querySelectorAll(".sbimg")
        console.log(imgs)

    }
    render() {
        console.log("通过查看flag", this.props.flag)
        console.log("查看界面原因", this.props.vReason)
        return (
            <div className="chakanV">
                <h3 style={{ fontWeight: "bold" }}>房屋所有人信息：</h3>
                <p>姓名：{this.props.flag ? this.props.custArrDa : this.props.owerArra}<span style={{ marginLeft: 140 }}>手机号：{this.props.flag ? this.props.custArrDb : this.props.owerArrb}</span></p>
                <p>身份证号：{this.props.flag ? this.props.custArrDc : this.props.owerArrc}</p>
                <p className="imgP">
                    身份证照片：
                        <Zmage alt="身份证照片" src={this.props.flag ? ("https://test.dongkenet.com/" + this.props.custArrDd) : ("https://test.dongkenet.com/" + this.props.owerArrd)} />
                    <Zmage alt="身份证照片" src={this.props.flag ? ("https://test.dongkenet.com/" + this.props.custArrDe) : ("https://test.dongkenet.com/" + this.props.owerArre)} />

                </p>
                <p>房屋证件：
                {this.props.flag ? this.props.custImgD : this.props.owerImgs}
                </p>
                <div>
                    {
                        this.props.flag ? "" : <div>
                            <h3 style={{ fontWeight: "bold" }}>房屋委托人信息：</h3>
                            <p>姓名：{this.props.custArra}<span style={{ marginLeft: 140 }}>手机号：{this.props.custArrb}</span></p>
                            <p>身份证号：{this.props.custArrc}</p>
                            <p className="imgP">
                                身份证照片：
                                <Zmage alt="身份证照片" src={"https://test.dongkenet.com/" + this.props.custArrd} />
                                <Zmage alt="身份证照片" src={"https://test.dongkenet.com/" + this.props.custArre} />

                            </p>
                            <p>房屋委托书：
                            {this.props.custImgs}
                            </p>

                        </div>
                    }
                </div>
                <p>房屋地址：{this.props.address}</p>
                <p>
                    审核结果：<span style={{ color: "green" }}>通过</span>
                </p>
                <p>
                    通过原因：{this.props.vReason}
                </p>

            </div>
        )
    }
}
class ShenHe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flagsNormal: false,
        }
        this.submitModal = this.submitModal.bind(this)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log("审核shenheflag", this.props.shenheflag)

        return (
            <div style={{ overflow: "hidden" }} className="shenhe">
                <Form className="login-form">
                    <h3 style={{ fontWeight: "bold" }}>房屋所有人信息：</h3>
                    <p>姓名：{this.props.shenheflag ? this.props.custArrDa : this.props.owerArra}<span style={{ marginLeft: 140 }}>手机号：{this.props.shenheflag ? this.props.custArrDb : this.props.owerArrb}</span></p>
                    <p>身份证号：{this.props.shenheflag ? this.props.custArrDc : this.props.owerArrc}</p>
                    <p className="imgP">
                        身份证照片：
                        <Zmage alt="身份证照片" src={this.props.shenheflag ? ("https://test.dongkenet.com/" + this.props.custArrDd) : ("https://test.dongkenet.com/" + this.props.owerArrd)} />
                        <Zmage alt="身份证照片" src={this.props.shenheflag ? ("https://test.dongkenet.com/" + this.props.custArrDe) : ("https://test.dongkenet.com/" + this.props.owerArre)} />

                    </p>
                    <p>
                        房屋证件：{this.props.shenheflag ? this.props.custImgD : this.props.owerImgs}
                    </p>
                    <div>
                        {
                            this.props.shenheflag ? "" : <div>
                                <h3 style={{ fontWeight: "bold" }}>房屋委托人信息：</h3>
                                <p>姓名：{this.props.custArra}<span style={{ marginLeft: 140 }}>手机号：{this.props.custArrb}</span></p>
                                <p>身份证号：{this.props.custArrc}</p>
                                <p className="imgP">
                                    身份证照片：
                                    <Zmage alt="身份证照片" src={"https://test.dongkenet.com/" + this.props.custArrd} />
                                    <Zmage alt="身份证照片" src={"https://test.dongkenet.com/" + this.props.custArre} />
                                </p>
                                <p>房屋委托书：
                                    {this.props.custImgs}
                                </p>
                            </div>
                        }
                    </div>

                    <p>房屋地址：{this.props.address}</p>
                    <FormItem style={{ marginBottom: 4 }}>
                        {getFieldDecorator('radio', {
                            rules: [{ required: true, message: '请勾选审核结果' }],
                        })(
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
                        {getFieldDecorator('textarea', {
                            rules: [{ required: true, message: '请填入审核信息' }],
                        })(
                            <TextArea style={{ height: 50, width: "50%" }} rows={4} placeholder="请输入说明" />
                        )}
                    </FormItem>
                    <Button type="primary" onClick={this.submitModal}
                        className="subShenHe"
                        style={{ width: '15%', marginLeft: "16%" }}>
                        提交
                    </Button>
                </Form>
            </div>
        )
    }

    //点击提交审核  此处调接口
    submitModal() {
        const { resetFields, setFieldsValue, validateFields } = this.props.form;
        this.props.form.validateFields((err, values) => {
            console.log("提交审核的values表单", values)
            if (!err) {
                // let cityInfo = this.cityForm.props.form.getFieldsValue();
                console.log("提交审核", values, "审核所需ID", this.props.houseId, "和", this.props.houseVerifyId);
                if (values.radio == "1") {
                    if (values.radio == undefined || values.textarea == undefined || values.number == undefined) {
                        return message.error("请勾选审核状态,输入审核说明以及房产证号")
                    } else {
                        if (this.props.numQuest == 1) {//通过
                            if (this.props.shenheflag) {
                                console.log("第一行进的这个")
                                fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/approval", {
                                    houseVerifyId: this.props.houseVerifyId,
                                    houseId: this.props.houseId,
                                    reason: values.textarea,
                                    ownerShipDto: {
                                        certNum: values.number,
                                        name: this.props.custArrDa,
                                    }
                                }).then(red => {
                                    console.log("red提交审核表单响应", red)
                                    if (red.code == "0") {

                                        // this.props.questRenderForm()
                                        resetFields()
                                        this.props.shenheQuestRender()
                                        let div = document.querySelector(".content")
                                        let divd = document.querySelector(".subShenHe")
                                        div.style.transition = "all 0.2s linear"
                                        div.style.marginLeft = "-20px"
                                    }

                                })
                            } else {
                                fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/approval", {
                                    houseVerifyId: this.props.houseVerifyId,
                                    houseId: this.props.houseId,
                                    reason: values.textarea,

                                    ownerShipDto: {
                                        certNum: values.number,
                                        name: this.props.owerArra,
                                    }
                                }).then(red => {
                                    console.log("red提交审核表单响应", red)
                                    if (red.code == "0") {

                                        // this.props.questRenderForm()
                                        resetFields()
                                        this.props.shenheQuestRender()
                                        let div = document.querySelector(".content")
                                        let divd = document.querySelector(".subShenHe")
                                        div.style.transition = "all 0.2s linear"
                                        div.style.marginLeft = "-20px"
                                    }

                                })
                            }

                        }
                        //查询界面的审核过后自动刷新
                        if (this.props.num == 1) {//通过
                            console.log("this.props.num == 1进的这个")
                            if (this.props.shenheflag) {
                                fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/approval", {
                                    houseVerifyId: this.props.houseVerifyId,
                                    houseId: this.props.houseId,
                                    reason: values.textarea,
                                    ownerShipDto: {
                                        certNum: values.number,
                                        name: this.props.custArrDa,
                                    }
                                }).then(red => {
                                    console.log("red提交审核表单响应", red)
                                    if (red.code == "0") {
                                        resetFields()
                                        this.props.shenheRender()
                                        let div = document.querySelector(".content")
                                        let divd = document.querySelector(".subShenHe")
                                        div.style.transition = "all 0.2s linear"
                                        div.style.marginLeft = "-20px"
                                        // this.props.gaibianNum()
                                        // this.setState({
                                        //     flagsNormal: false,//告诉render要刷新到初始列表页
                                        // })
                                    }

                                })
                            } else {
                                fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/approval", {
                                    houseVerifyId: this.props.houseVerifyId,
                                    houseId: this.props.houseId,
                                    reason: values.textarea,
                                    ownerShipDto: {
                                        certNum: values.number,
                                        name: this.props.owerArra,
                                    }
                                }).then(red => {
                                    console.log("red提交审核表单响应", red)
                                    if (red.code == "0") {
                                        resetFields()
                                        this.props.shenheRender()
                                        let div = document.querySelector(".content")
                                        let divd = document.querySelector(".subShenHe")
                                        div.style.transition = "all 0.2s linear"
                                        div.style.marginLeft = "-20px"
                                        // this.setState({
                                        //     flagsNormal: false,//告诉render要刷新到初始列表页
                                        // })
                                        // this.props.gaibianNum()
                                    }

                                })
                            }

                        }
                        if ( this.props.numQuest == 2) {//通过
                            console.log("this.props.numQuest == 2进的这个")
                            if (this.props.shenheflag) {
                                fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/approval", {
                                    houseVerifyId: this.props.houseVerifyId,
                                    houseId: this.props.houseId,
                                    reason: values.textarea,
                                    ownerShipDto: {
                                        certNum: values.number,
                                        name: this.props.custArrDa,
                                    }
                                }).then(red => {
                                    console.log("red提交审核表单响应", red)
                                    if (red.code == "0") {

                                        // this.props.questRenderForm()
                                        resetFields()
                                        this.props.shenheQuestRender()
                                        let div = document.querySelector(".content")
                                        let divd = document.querySelector(".subShenHe")
                                        div.style.transition = "all 0.2s linear"
                                        div.style.marginLeft = "-20px"
                                        this.props.gaibianNum()
                                    }

                                })
                            } else {
                                fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/approval", {
                                    houseVerifyId: this.props.houseVerifyId,
                                    houseId: this.props.houseId,
                                    reason: values.textarea,

                                    ownerShipDto: {
                                        certNum: values.number,
                                        name: this.props.owerArra,
                                    }
                                }).then(red => {
                                    console.log("red提交审核表单响应", red)
                                    if (red.code == "0") {

                                        // this.props.questRenderForm()
                                        resetFields()
                                        this.props.shenheQuestRender()
                                        let div = document.querySelector(".content")
                                        let divd = document.querySelector(".subShenHe")
                                        div.style.transition = "all 0.2s linear"
                                        div.style.marginLeft = "-20px"
                                        this.props.gaibianNum()
                                    }

                                })
                            }

                        }

                    }


                } else if (values.radio == "2") {
                    if (values.radio == undefined || values.textarea == undefined) {
                        return message.error("请勾选审核状态,输入审核说明以及房产证号")
                    } else {
                        // if (values.radio == "1") {//通过
                        //     fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/approval", {
                        //         houseVerifyId: this.props.houseVerifyId,
                        //         houseId: this.props.houseId,
                        //         reason: values.textarea,
                        //     }).then(red => {
                        //         console.log("red提交审核表单响应", red)
                        //         if (red.code == "0") {

                        //             // this.props.questRenderForm()
                        //             resetFields()
                        //             this.props.shenheQuestRender()
                        //             let div = document.querySelector(".content")
                        //             let divd = document.querySelector(".subShenHe")
                        //             div.style.transition = "all 0.2s linear"
                        //             div.style.marginLeft = "-20px"
                        //         }

                        //     })
                        // } else 
                        if (values.radio == "2" && this.props.numQuest == 1) {//不通过
                            fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/reject", {
                                houseVerifyId: this.props.houseVerifyId,
                                houseId: this.props.houseId,
                                reason: values.textarea,
                            }).then(red => {
                                console.log("red提交", red)
                                if (red.code == "0") {
                                    console.log("red.data 提交审核失败", red.data)
                                    resetFields()
                                    this.props.shenheRender()
                                    let div = document.querySelector(".content")
                                    let divd = document.querySelector(".subShenHe")
                                    div.style.transition = "all 0.2s linear"
                                    div.style.marginLeft = "-20px"
                                }

                            })
                        }
                        //查询界面的审核过后自动刷新
                        // if (values.radio == "1" && this.props.num == 1) {//通过
                        //     fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/approval", {
                        //         houseVerifyId: this.props.houseVerifyId,
                        //         houseId: this.props.houseId,
                        //         reason: values.textarea,
                        //     }).then(red => {
                        //         console.log("red提交审核表单响应", red)
                        //         if (red.code == "0") {
                        //             resetFields()
                        //             this.props.shenheRender()
                        //             let div = document.querySelector(".content")
                        //             let divd = document.querySelector(".subShenHe")
                        //             div.style.transition = "all 0.2s linear"
                        //             div.style.marginLeft = "-20px"
                        //             // this.setState({
                        //             //     flagsNormal: false,//告诉render要刷新到初始列表页
                        //             // })
                        //         }

                        //     })
                        // } else 
                        if (values.radio == "2" && this.props.num == 1) {//不通过
                            fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/reject", {
                                houseVerifyId: this.props.houseVerifyId,
                                houseId: this.props.houseId,
                                reason: values.textarea,
                            }).then(red => {
                                console.log("red提交", red)
                                if (red.code == "0") {
                                    console.log("red.data 提交审核失败", red.data)
                                    resetFields()
                                    this.props.shenheRender()
                                    let div = document.querySelector(".content")
                                    let divd = document.querySelector(".subShenHe")
                                    div.style.transition = "all 0.2s linear"
                                    div.style.marginLeft = "-20px" 

                                }

                            })
                        }
                        if (values.radio == "2" && this.props.numQuest == 2) {//不通过
                            fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/reject", {
                                houseVerifyId: this.props.houseVerifyId,
                                houseId: this.props.houseId,
                                reason: values.textarea,
                            }).then(red => {
                                console.log("red提交", red)
                                if (red.code == "0") {
                                    console.log("red.data 提交审核失败", red.data)
                                    resetFields()
                                    this.props.shenheRender()
                                    let div = document.querySelector(".content")
                                    let divd = document.querySelector(".subShenHe")
                                    div.style.transition = "all 0.2s linear"
                                    div.style.marginLeft = "-20px"
                                }

                            })
                        }
                    }
                }
            }
        });

    }
}

ShenHe = Form.create({})(ShenHe);

class HouseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visibles: false,
            visibless: false,
            flag: false,//Modal框按钮,
            dataList: [],
            web: "web",
            num: 0,
            numQuest: 0,
        }
        this.showModal = this.showModal.bind(this)
        this.showModals = this.showModals.bind(this)
        this.showModalB = this.showModalB.bind(this)
        this.vReason = this.vReason.bind(this)
        this.dReason = this.dReason.bind(this)
    }
    params = {
        pageNo: 1
    }
    componentDidMount() {
        // this.questRender()
        this.handleSearch()
    }

    render() {
        const columns = [
            {
                title: '房屋地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '详情',
                key: '1',
                dataIndex: 'type',
                render(type) {
                    return type == "OT0" ? '业主' : '委托人'
                }
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
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
                dataIndex: 'createDate'
            },
            {
                title: "操作",
                key: "action",
                render: (text, record, index) => {
                    if (record.status == "00A") {
                        return <div>
                            <Button size="small" type="primary" style={{ color: "black" }}
                                className={"shenhe" + record.houseId}
                                onClick={this.showModal.bind(this, record)}>审核</Button>
                        </div >
                    } else if (record.status == "00C") {
                        return <div>
                            <Button size="small" style={{ backgroundColor: "#FF4040" }}
                                className={"chakanD" + record.houseId}
                                onClick={this.showModals.bind(this, record)}>查看</Button>

                        </div >
                    } else if (record.status == "00B") {
                        return <div>
                            <Button size="small" style={{ backgroundColor: "lightgreen" }}
                                className={"chakanV" + record.houseId}
                                onClick={this.showModalB.bind(this, record)}>查看</Button>

                        </div >
                    }
                }
            }
        ]
        const rowCheckSelection = {
            type: "checkbox",
            // selectedRowKeys:selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {//参数1当前选中的为哪一行，参数2选中的为哪些行，为对象
                console.log(selectedRowKeys)
                console.log(selectedRows)
                this.setState({//存储起来
                    selectedRowKeys: selectedRowKeys,//告诉文本框选中的为哪些行，把它勾上,会变成一个数组
                    selectedRows: selectedRows  //为选中的那些行，可以遍历查看各行的信息
                })
            }
        }
        return (
            <div>

                <div style={{ height: 100, paddingTop: 20 }}>
                    <FilterForm
                        handleSearch={this.handleSearch.bind(this)}
                        handleReset={this.handleReset.bind(this)}
                        wrappedComponentRef={(inst) => { this.cityForm = inst; }}
                        num={this.state.num}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={this.state.num == 1 ? this.state.dataSearchList : this.state.dataList}
                    pagination={this.state.pagination}
                    rowSelection={rowCheckSelection}
                />
            </div>
        )
    }
    

    gaibianNum=()=>{
        console.log("DataList里的gaibianNum:输出this.state.num",this.state.num)
        this.questRender()
        this.setState({
            num: 0,
        })
    }

    dReason(ins) {
        this.setState({
            dReason: ins
        })
    }

    vReason(ins) {
        this.setState({
            vReason: ins
        })
    }
    //点击审核出现   此处调接口
    showModal(record) {

        console.log("record", record)
        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query", {
            houseId: record.houseId,
            houseVerifyId: record.houseVerifyId,
        }).then(res => {
            console.log("res", res)
            if (res.data.houseOwnerPo) {//代表委托人身份   
                console.log("棒棒成功")
                let infos = res.data.houseOwnerPo
                let info = res.data
                let owerImgs = []
                let custImgs = []
                let owerArr = {
                    a: infos.ownerName,
                    b: infos.phoneNbr,
                    c: infos.identityCode,
                    d: infos.identityPic,
                    e: infos.identityPicBack,
                }
                //姓名，手机号，身份证号，身份证正面，反面，房屋认真书两张
                if (info.certificatePics) {
                    info.certificatePics.map((ite, ins) => {
                        owerImgs.push(<Zmage alt="房屋证件" src={"https:test.dongkenet.com/" + ite.housePicUrl} key={ins} />)
                    })
                }
                let custArr = {
                    a: info.custName,
                    b: info.phoneNbr,
                    c: info.identityCode,
                    d: info.identityPic,
                    e: info.identityPicBack
                }
                if (info.proxyPics) {
                    info.proxyPics.map((ites, inss) => {
                        custImgs.push(<Zmage alt="房屋委托书" src={"https:test.dongkenet.com/" + ites.housePicUrl} key={inss} />)
                    })
                }
                //姓名，手机号，身份证号，身份证正面，反面，委托书照片
                let ids = {
                    houseVerifyId: info.houseVerifyId,
                    houseId: info.houseId,
                    name: infos.ownerName,
                }
                console.log("oweIMGs")
                console.log("委托人审核的ids", ids)

                let obj = {
                    owerArr: owerArr,
                    owerImgs: owerImgs,
                    custArr: custArr,
                    custImgs: custImgs,
                    ids: ids,
                    record: record,
                }
                this.setState({
                    obj: obj,
                    flag: null,
                    objsFlag: null,
                    shenheflag: false,
                })
                console.log("委托人审核shenheflag", this.state.shenheflag)
                this.props.shenhe(this.state.obj, this.state.objsFlag, this.state.flag, this.state.shenheflag)
                let div = document.querySelector(".content")
                let divd = document.querySelector(".shenhe" + record.houseId)
                div.style.transition = "all 0.2s linear"
                div.style.marginLeft = "-106%"
            } else {
                let info = res.data
                let owerImgs = []
                let owerArr = {
                    a: info.custName,
                    b: info.custCode,
                    c: info.identityCode,
                    d: info.identityPic,
                    e: info.identityPicBack,
                }
                if (info.certificatePics) {
                    info.certificatePics.map((ite, ins) => {
                        owerImgs.push(<Zmage alt="房屋证件" src={"https:test.dongkenet.com/" + ite.housePicUrl} key={ins} />)
                    })
                }

                let ids = {
                    houseVerifyId: info.houseVerifyId,
                    houseId: info.houseId,
                    name: info.custName,
                }
                let objs = {
                    owerArr: owerArr,
                    owerImgs: owerImgs,
                    ids: ids,//点击提交审核告诉后台提交哪行的
                    record: record,//因为模态框要有地址，但是点击审核接口没地址信息，所以用列表接口传地址
                }
                this.setState({
                    objs: objs,
                    objsFlag: null,
                    flag: null,
                    shenheflag: true,
                })
                console.log("业主审核shenheflag", this.state.shenheflag)
                this.props.shenhes(this.state.objs, this.state.objsFlag, this.state.flag, this.state.shenheflag)
                let div = document.querySelector(".content")
                let divd = document.querySelector(".shenhe" + record.houseId)
                div.style.transition = "all 0.2s linear"
                div.style.marginLeft = "-106%"
            }
        })

    }

    //点击查看未通过出现的  此处调接口
    showModals(record) {

        console.log(record)
        // this.setState({
        //     obj:null,
        //     objsFlag:null,
        // })

        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query", {
            houseId: record.houseId,
            houseVerifyId: record.houseVerifyId,
        }).then(res => {
            // let infos = res.data.houseOwnerPo
            console.log(this.state.obj)
            console.log(this.state.objs)
            if (res.data.houseOwnerPo) {
                console.log("red未通过查看委托人信息", res)
                let infos = res.data.houseOwnerPo
                let info = res.data
                let owerImgs = []
                let custImgs = []
                let owerArr = {
                    a: infos.ownerName,
                    b: infos.phoneNbr,
                    c: infos.identityCode,
                    d: infos.identityPic,
                    e: infos.identityPicBack,
                }
                //姓名，手机号，身份证号，身份证正面，反面，房屋认真书两张
                if (info.certificatePics) {
                    info.certificatePics.map((ite, ins) => {
                        owerImgs.push(<Zmage alt="房屋证件" src={"https://test.dongkenet.com/" + ite.housePicUrl} key={ins} />)
                    })
                }
                let custArr = {
                    a: info.custName,
                    b: info.phoneNbr,
                    c: info.identityCode,
                    d: info.identityPic,
                    e: info.identityPicBack
                }

                if (info.proxyPics) {
                    info.proxyPics.map((ites, inss) => {
                        custImgs.push(<Zmage alt="房屋委托书" src={"https://test.dongkenet.com/" + ites.housePicUrl} key={inss} />)
                    })
                }
                //姓名，手机号，身份证号，身份证正面，反面，委托书照片
                console.log("oweIMGs未通过查看", owerImgs, custArr)
                let obj = {
                    owerArr: owerArr,
                    owerImgs: owerImgs,
                    custArr: custArr,
                    custImgs: custImgs,
                    record: record,
                    dReason: res.data.reason,
                }
                this.setState({
                    obj,
                    objsFlag: false,
                    flag: null,
                })
                console.log(this.state.obj)
                console.log("委托人查看不通过原因", res.data.reason)
                this.props.defeat(this.state.obj, this.state.objsFlag, this.state.flag)
                let div = document.querySelector(".content")
                let divd = document.querySelector(".chakanD" + record.houseId)
                div.style.transition = "all 0.2s linear"
                div.style.marginLeft = "-106%"

            } else {
                console.log("red未通过查看业主信息", res)
                let info = res.data
                let custImgD = []
                let custArrD = {
                    a: info.custName,
                    b: info.custCode,
                    c: info.identityCode,
                    d: info.identityPic,
                    e: info.identityPicBack,
                }
                if (info.certificatePics) {
                    info.certificatePics.map((ite, ins) => {
                        custImgD.push(<Zmage alt="房屋证件" src={"https://test.dongkenet.com/" + ite.housePicUrl} key={ins} />)
                    })
                }
                console.log(custImgD)
                let objs = {
                    custArrD: custArrD,
                    visibles: false,
                    custImgD: custImgD,
                    record: record,
                    dReason: res.data.reason,
                }
                this.setState({
                    objs,
                    objsFlag: true,
                    flag: null,
                })
                console.log(this.state.objs)
                console.log("业主查看不通过原因", res.data.reason)
                this.props.defeats(this.state.objs, this.state.objsFlag, this.state.flag)
                let div = document.querySelector(".content")
                let divd = document.querySelector(".chakanD" + record.houseId)
                div.style.transition = "all 0.2s linear"
                div.style.marginLeft = "-106%"


            }

        })

    }

    //点击查看通过的出现的  此处调接口
    showModalB(record) {
        console.log(record)
        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query", {
            houseId: record.houseId,
            houseVerifyId: record.houseVerifyId,
        }).then(res => {
            // console.log("res通过查看", res)
            if (res.data.houseOwnerPo) {
                console.log("red通过查看委托人信息", res)
                let infos = res.data.houseOwnerPo
                let info = res.data
                let owerImgs = []
                let custImgs = []
                let owerArr = {
                    a: infos.ownerName,
                    b: infos.phoneNbr,
                    c: infos.identityCode,
                    d: infos.identityPic,
                    e: infos.identityPicBack,
                }
                //姓名，手机号，身份证号，身份证正面，反面，房屋认真书两张
                if (info.certificatePics) {
                    info.certificatePics.map((ite, ins) => {
                        owerImgs.push(<Zmage alt="房屋证件" src={"https://test.dongkenet.com/" + ite.housePicUrl} key={ins} />)
                    })
                }
                let custArr = {
                    a: info.custName,
                    b: info.phoneNbr,
                    c: info.identityCode,
                    d: info.identityPic,
                    e: info.identityPicBack
                }
                if (info.proxyPics) {
                    info.proxyPics.map((ites, inss) => {
                        custImgs.push(<Zmage alt="房屋委托书" src={"https://test.dongkenet.com/" + ites.housePicUrl} key={inss} />)
                    })
                }

                //姓名，手机号，身份证号，身份证正面，反面，委托书照片
                let obj = {
                    owerArr: owerArr,
                    owerImgs: owerImgs,
                    custArr: custArr,
                    custImgs: custImgs,
                    record: record,
                    vReason: res.data.reason,
                }
                console.log("委托人审核通过原因", res.data.reason)
                this.setState({
                    obj: obj,
                    objsFlag: null,
                    flag: false,
                })
                this.props.victory(this.state.obj, this.state.objsFlag, this.state.flag)
                console.log("oweIMGs通过查看", owerImgs)
                let div = document.querySelector(".content")
                let divd = document.querySelector(".chakanV" + record.houseId)
                div.style.transition = "all 0.2s linear"
                div.style.marginLeft = "-106%"
                // this.setState({
                //     owerArr: owerArr,
                //     owerImgs: owerImgs,
                //     custArr: custArr,
                //     custImgs: custImgs,
                //     visibless: true,
                //     record: record,
                // })
            } else {
                console.log("red通过查看业主信息", res)
                let info = res.data
                let custImgV = []
                let custArrV = {
                    a: info.custName,
                    b: info.custCode,
                    c: info.identityCode,
                    d: info.identityPic,
                    e: info.identityPicBack,
                }
                if (info.certificatePics) {
                    info.certificatePics.map((ite, ins) => {
                        custImgV.push(<Zmage alt="房屋证件" src={"https://test.dongkenet.com/" + ite.housePicUrl} key={ins} />)
                    })
                }

                let objs = {
                    custArrV: custArrV,
                    custImgV: custImgV,
                    record: record,
                    vReason: res.data.reason,
                }
                this.setState({
                    objs: objs,
                    objsFlag: null,
                    flag: true,
                })
                console.log("业主审核通过原因", res.data.reason)
                this.props.victorys(this.state.objs, this.state.objsFlag, this.state.flag)
                console.log(custImgV)
                let div = document.querySelector(".content")
                let divd = document.querySelector(".chakanV" + record.houseId)
                div.style.transition = "all 0.2s linear"
                div.style.marginLeft = "-106%"
                // this.setState({
                //     owerArr: custArrV,
                //     visibless: true,
                //     custImgV: custImgV,
                //     record: record,
                // })
            }

        })

    }


    //表单查询按钮
    handleSearch = () => {

        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        if (cityInfo.status == undefined) {
            message.error("请将筛选的条件补充完毕")
        } else {
            fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query-by-page", {
                status: cityInfo.status,
                pageInfo: {
                    pageNo: 1,
                    pageSize: this.state.total,
                }
            }).then(res => {
                console.log(res)
                if (res.code == "0") {
                    let arrSearch = [];
                    res.data.rows.map((row, ind) => {
                        if (row.houseBaseInfoDto) {
                            let obj = {
                                address: row.houseBaseInfoDto.detailAddress,
                                status: row.status,
                                createDate: row.createDate,
                                houseId: row.houseId,
                                houseVerifyId: row.houseVerifyId,
                                type: row.type
                            }
                            arrSearch.push(obj)
                        } else {
                            let obj = {
                                address: "",
                                status: row.status,
                                createDate: row.createDate,
                                houseId: row.houseId,
                                houseVerifyId: row.houseVerifyId,
                                type: row.type
                            }
                            arrSearch.push(obj)
                        }

                    })

                    console.log(arrSearch)
                    this.setState({
                        dataSearchList: arrSearch,
                        num: 1,
                        numQuest: 0,
                    })
                    this.props.nums(this.state.num)
                }

            })
        }
    }


    handleReset = () => {//重置按钮
        console.log("调用重置按钮", this.state.num);
        this.questRender()
        this.setState({
            numQuest: 1,
            num: 0,
        })
        this.props.numQuest(this.state.numQuest)
    }



    hideModal = () => {
        this.setState({
            visible: false,
            visibles: false,
            visibless: false,
        });
    }

    questRender = () => {
        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query-by-page", {
            "pageInfo": {
                pageNo: this.params.pageNo,
                // pageSize: 7  //默认是10
            }
        }).then(res => {
            let _this = this
            console.log("res", res)
            if (res.code === "0") {
                let arr = [];

                res.data.rows.map((row, ind) => {
                    row.key = ind;
                    if (row.houseBaseInfoDto) {
                        let obj = {
                            address: row.houseBaseInfoDto.detailAddress,
                            status: row.status,
                            createDate: row.createDate,
                            houseId: row.houseId,
                            houseVerifyId: row.houseVerifyId,
                            type: row.type
                        }
                        arr.push(obj)
                    } else {
                        let obj = {
                            address: "",
                            status: row.status,
                            createDate: row.createDate,
                            houseId: row.houseId,
                            houseVerifyId: row.houseVerifyId,
                            type: row.type
                        }
                        arr.push(obj)
                    }

                })
                this.setState({
                    numQuest: 2,
                    dataList: arr,
                    total: res.data.total,
                    pagination: Untils.pagination(res, (current) => {
                        _this.params.pageNo = current
                        this.questRender()
                    })
                })
                this.props.numQuest(this.state.numQuest)
            } 
            
        })
    }
}


//查询组件
class FilterForm extends React.Component {


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="房屋地址：" style={{ marginLeft: 30 }} >
                    {getFieldDecorator('username')(
                        <Input style={{ width: 350 }} placeholder='请输入' disabled={true} />
                    )}
                </FormItem>
                <FormItem label="房屋状态：" style={{ marginLeft: 30 }}>
                    {
                        
                        getFieldDecorator('status', {
                            initialValue: "00A",
                        })(
                            <Select
                                style={{ width: 350 }}
                                placeholder="请选择"

                            >
                                <Option value="00B">已通过</Option>
                                <Option value="00A">待审核</Option>
                                <Option value="00C">未通过</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.props.handleSearch} className="ni">查询</Button>
                    <Button className="wo" onClick={this.props.handleReset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
    //查询按钮的点击事件


}
FilterForm = Form.create({})(FilterForm);
