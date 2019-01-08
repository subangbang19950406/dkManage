import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Input, Radio, Pagination } from 'antd';
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
export default class HouseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visibles: false,
            visibless: false,
            flag: false,//Modal框按钮,
            dataList: [],
            web: "web",
            num: 0
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
        this.questRender()

    }
    render() {
        const columns = [
            {
                title: '房屋地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '申请人身份',
                key: '1',
                dataIndex: 'type',
                render(type) {
                    return type == "OT0" ? '房屋所有人' : '房屋委托人'
                    // let config = {
                    //     "OT1": "业主",
                    //     "OT0": "委托人",
                    // }
                    // return config[type]
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
                            <Button size="small" type="primary" style={{ color: "black" }} onClick={this.showModal.bind(this, record)}>审核</Button>
                            <Modal
                                title={null}
                                visible={this.state.visible}
                                // onOk={this.submitModal}
                                onCancel={this.hideModal}
                                footer={null}
                                // okText="提交结果"
                                // cancelText="取消"
                                mask={this.state.flag}
                                maskClosable={this.state.flag}
                                // closable={this.state.flag}//背景笼罩
                                confirmLoading={this.state.flag}
                            >
                                <OpenModal
                                    // wrappedComponentRef={(inst) => { this.cityForm = inst; }}
                                    handleSearchRender={this.handleSearch}
                                    record={this.state.record}
                                    owerArr={this.state.owerArr}
                                    custArr={this.state.custArr}
                                    owerImgs={this.state.owerImgs}
                                    custImgs={this.state.custImgs}
                                    idss={this.state.idss}
                                    ids={this.state.ids}
                                    questRenderForm={this.questRender}
                                    modalVisibleHide={this.hideModal}
                                    vReason={this.vReason}
                                    dReason={this.dReason}
                                    num={this.state.num}
                                />
                            </Modal>
                        </div>


                    } else if (record.status == "00C") {
                        return <div>
                            <Button size="small" style={{ backgroundColor: "#FF4040" }} onClick={this.showModals.bind(this, record)}>查看</Button>
                            <Modal
                                title="查看未通过详情"
                                visible={this.state.visibles}
                                mask={this.state.flag}
                                onCancel={this.hideModal}
                                // cancelText="取消"
                                // okText="确定"
                                maskClosable={this.state.flag}
                                // closable={this.state.flag}
                                confirmLoading={this.state.flag}
                                footer={null}
                                wrapClassName={this.state.web}
                            >
                                <OpenModals
                                    record={this.state.record}
                                    owerArr={this.state.owerArr}
                                    custArr={this.state.custArr}
                                    owerImgs={this.state.owerImgs}
                                    custImgs={this.state.custImgs}
                                    custArrD={this.state.custArrD}//业主不通过查看信息
                                    custImgD={this.state.custImgD}
                                    dReason={this.state.dReason}
                                />
                            </Modal>
                        </div>
                    } else if (record.status == "00B") {
                        return <div>
                            <Button size="small" style={{ backgroundColor: "lightgreen" }} onClick={this.showModalB.bind(this, record)}>查看</Button>
                            <Modal
                                title="查看通过详情"
                                visible={this.state.visibless}
                                mask={this.state.flag}
                                onCancel={this.hideModal}
                                // cancelText="取消"
                                // okText="确定"
                                maskClosable={this.state.flag}
                                // closable={this.state.flag}
                                confirmLoading={this.state.flag}
                                footer={null}
                                wrapClassName={this.state.web}
                            >
                                <OpenModalB
                                    record={this.state.record}
                                    owerArr={this.state.owerArr}
                                    custArr={this.state.custArr}
                                    owerImgs={this.state.owerImgs}
                                    custImgs={this.state.custImgs}
                                    custArrV={this.state.custArrV}//业主通过查看信息
                                    custImgV={this.state.custImgV}
                                    vReason={this.state.vReason}
                                />
                            </Modal>
                        </div>
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
                // onRow={(record,index) => {//点击的行，record为选中的那行的信息
                //   return {
                //     onClick: () => {
                //       this.onRowClick(record,index);
                //     }
                //   }
                // }}
                />


            </div>
        )
    }
    // onRowClick=(record,index)=>{
    //   let selectKey = [index];
    //   console.log(record.userName+record.id)
    //   this.setState({
    //     selectedRowKeys:selectKey,//选的key值
    //     selectedItem:record//代表选的哪一项
    //   })
    // }

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
                        owerImgs.push(<img src={ite.housePicUrl} key={ins} />)
                    })
                } else {
                    owerImgs = []
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
                        custImgs.push(<img src={ites.housePicUrl} key={inss} />)
                    })
                } else {
                    custImgs = []
                }

                //姓名，手机号，身份证号，身份证正面，反面，委托书照片
                let ids = {
                    houseVerifyId: info.houseVerifyId,
                    houseId: info.houseId,
                }
                console.log("oweIMGs")
                console.log("委托人审核的ids", ids)
                this.setState({
                    owerArr: owerArr,
                    owerImgs: owerImgs,
                    custArr: custArr,
                    custImgs: custImgs,
                    ids: ids,
                    visible: true,
                    record: record,
                })
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
                        owerImgs.push(<img src={ite.housePicUrl} key={ins} />)
                    })
                } else {
                    owerImgs = []
                }

                let ids = {
                    houseVerifyId: info.houseVerifyId,
                    houseId: info.houseId,
                }
                this.setState({
                    owerArr: owerArr,
                    owerImgs: owerImgs,
                    ids: ids,//点击提交审核告诉后台提交哪行的
                    visible: true,
                    record: record,//因为模态框要有地址，但是点击审核接口没地址信息，所以用列表接口传地址
                })
            }
        })

    }

    //点击查看未通过出现的  此处调接口
    showModals(record) {
        console.log(record)
        this.setState({
            custArr: null
        })
        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query", {
            houseId: record.houseId,
            houseVerifyId: record.houseVerifyId,
        }).then(res => {

            // let infos = res.data.houseOwnerPo
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
                        owerImgs.push(<img src={ite.housePicUrl} key={ins} />)
                    })
                } else {
                    owerImgs = []
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
                        custImgs.push(<img src={ites.housePicUrl} key={inss} />)
                    })
                } else {
                    custImgs = []
                }

                //姓名，手机号，身份证号，身份证正面，反面，委托书照片
                console.log("oweIMGs未通过查看", owerImgs, custArr)
                this.setState({
                    owerArr: owerArr,
                    owerImgs: owerImgs,
                    custArr: custArr,
                    custImgs: custImgs,
                    visibles: true,
                    record: record,
                })
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
                        custImgD.push(<img src={ite.housePicUrl} key={ins} />)
                    })
                } else {
                    custImgD = []
                }

                this.setState({
                    custArrD: custArrD,
                    visibles: true,
                    custImgD: custImgD,
                    record: record,
                })
            }

        })

    }

    //点击查看通过的出现的  此处调接口
    showModalB(record) {
        console.log(record)
        this.setState({
            custArr: null
        })

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
                        owerImgs.push(<img src={ite.housePicUrl} key={ins} />)
                    })
                } else {
                    owerImgs = []
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
                        custImgs.push(<img src={ites.housePicUrl} key={inss} />)
                    })
                } else {
                    custImgs = []
                }

                //姓名，手机号，身份证号，身份证正面，反面，委托书照片
                console.log("oweIMGs未通过查看", owerImgs)
                this.setState({
                    owerArr: owerArr,
                    owerImgs: owerImgs,
                    custArr: custArr,
                    custImgs: custImgs,
                    visibless: true,
                    record: record,
                })
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
                        custImgV.push(<img src={ite.housePicUrl} key={ins} />)
                    })
                } else {
                    custImgV = []
                }

                console.log(custImgV)
                this.setState({
                    owerArr: custArrV,
                    visibless: true,
                    custImgV: custImgV,
                    record: record,
                })
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
                    "pageNo": 1,
                    "pageSize": this.state.total
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
                    })
                }

            })
        }
    }


    handleReset = () => {//重置按钮
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        console.log("sss")
        this.setState({
            num: 0
        })
    }



    hideModal = () => {
        this.setState({
            visible: false,
            visibles: false,
            visibless: false,
        });
    }
    // handleChakan = (item) => {
    //     console.log(item)
    // }

    questRender = () => {
        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query-by-page", {
            "pageInfo": {
                pageNo: this.params.pageNo,
                // pageSize: 7  //默认是10
            }
        }).then(res => {
            let _this = this
            console.log("res", res)
            if (res.code == "0") {
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
                // console.log(arr)
                this.setState({
                    dataList: arr,
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
                        getFieldDecorator('status')(
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

class OpenModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 2,
            bangbang: "邦邦"
        }
        this.submitModal = this.submitModal.bind(this)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ overflow: "hidden" }}>
                <Form className="login-form">
                    <p>业主姓名：{this.props.owerArr.a}<span style={{ marginLeft: 140 }}>业主手机号：{this.props.owerArr.b}</span></p>
                    <p>业主身份证号：{this.props.owerArr.c}</p>
                    <p className="imgP">
                        业主证明信息：
                        <img src={"https://test.dongkenet.com/" + this.props.owerArr.d} />
                        <img src={"https://test.dongkenet.com/" + this.props.owerArr.e} />
                        {this.props.owerImgs}
                    </p>
                    <div>
                        {
                            this.props.custArr ? (
                                <div>
                                    <p>委托人姓名：{this.props.custArr.a}<span style={{ marginLeft: 140 }}>业主手机号：{this.props.custArr.b}</span></p>
                                    <p>业主身份证号：{this.props.custArr.c}</p>
                                    <p className="imgP">
                                        委托人证明信息：
                                        <img src={"https://test.dongkenet.com/" + this.props.custArr.d} />
                                        <img src={"https://test.dongkenet.com/" + this.props.custArr.e} />
                                        {this.props.custImgs}
                                    </p>
                                </div>
                            ) : ""
                        }
                    </div>

                    <p>房屋地址：{this.props.record.address}</p>
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
                    <FormItem>
                        {getFieldDecorator('textarea', {
                            rules: [{ required: true, message: '请填入审核信息' }],
                        })(
                            <TextArea style={{ height: 50 }} rows={4} placeholder="请输入说明" />
                        )}
                    </FormItem>
                    <Button type="primary" onClick={this.submitModal} style={{ width: '30%', float: "right" }}>
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
            console.log(this.props.num)
            if (!err) {
                // let cityInfo = this.cityForm.props.form.getFieldsValue();
                console.log("提交审核", values, this.state.ids);
                if (values.radio == undefined || values.textarea == undefined) {
                    return message.error("请勾选审核状态和输入说明")
                } else {
                    if (values.radio == "1" && this.props.num !== 1) {//通过
                        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/approval", {
                            houseVerifyId: this.props.ids.houseVerifyId,
                            houseId: this.props.ids.houseId,
                            reason: values.textarea,
                        }).then(red => {
                            console.log("red提交审核表单响应", red)
                            if (red.code == "0") {

                                this.props.modalVisibleHide()
                                this.props.questRenderForm()
                                this.props.vReason(values.textarea)
                                resetFields()
                            }

                        })
                    } else if (values.radio == "2" && this.props.num !== 1) {//不通过
                        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/reject", {
                            houseVerifyId: this.props.ids.houseVerifyId,
                            houseId: this.props.ids.houseId,
                            reason: values.textarea,
                        }).then(red => {
                            console.log("red提交", red)
                            if (red.code == "0") {
                                console.log("red.data 提交审核失败", red.data)
                                this.props.modalVisibleHide()
                                this.props.questRenderForm()
                                this.props.dReason(values.textarea)
                                resetFields()
                            }

                        })
                    }
                    //查询里的审核刷新
                    if (values.radio == "1" && this.props.num == 1) {
                        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/approval", {
                            houseVerifyId: this.props.ids.houseVerifyId,
                            houseId: this.props.ids.houseId,
                            reason: values.textarea,
                        }).then(red => {
                            console.log("red提交审核表单响应", red)
                            if (red.code == "0") {
                                this.props.modalVisibleHide()
                                this.props.handleSearchRender()
                                this.props.vReason(values.textarea)
                                resetFields()
                            }
                        })
                    } else if (values.radio == "2" && this.props.num == 1) {
                        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/reject", {
                            houseVerifyId: this.props.ids.houseVerifyId,
                            houseId: this.props.ids.houseId,
                            reason: values.textarea,
                        }).then(red => {
                            console.log("red提交", red)
                            if (red.code == "0") {
                                console.log("red.data 提交审核失败", red.data)
                                this.props.modalVisibleHide()
                                this.props.handleSearchRender()
                                this.props.dReason(values.textarea)
                                resetFields()
                            }
                        })
                    }

                }
            }
        });

    }
}

OpenModal = Form.create({})(OpenModal);


class OpenModals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <p>业主姓名：{this.props.custArrD ? this.props.custArrD.a : this.props.owerArr.a}<span style={{ marginLeft: 140 }}>业主手机号：{this.props.custArrD ? this.props.custArrD.b : this.props.owerArr.b}</span></p>
                <p>业主身份证号：{this.props.custArrD ? this.props.custArrD.c : this.props.owerArr.c}</p>
                <p className="imgP">
                    业主证明信息：
                        <img src={"https://test.dongkenet.com/" + (this.props.custArrD ? this.props.custArrD.d : this.props.owerArr.d)} />
                    <img src={"https://test.dongkenet.com/" + (this.props.custArrD ? this.props.custArrD.e : this.props.owerArr.e)} />
                    {this.props.custArrD ? this.props.custImgD : this.props.owerImgs}
                </p>
                {/* <p className="imgP">{
                        
                    }</p> */}
                <div>
                    {
                        this.props.custArr ? <div>
                            <p>委托人姓名：{this.props.custArr.a}<span style={{ marginLeft: 140 }}>业主手机号：{this.props.custArr.b}</span></p>
                            <p>委托人身份证号：{this.props.custArr.c}</p>
                            <p className="imgP">
                                委托人证明信息：
                                <img src={"https://test.dongkenet.com/" + this.props.custArr.d} />
                                <img src={"https://test.dongkenet.com/" + this.props.custArr.e} />
                                {this.props.custImgs}
                            </p>
                            <p>房屋地址：{this.props.record.address}</p>
                        </div> : ""
                    }
                </div>
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
class OpenModalB extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        let imgs = document.querySelectorAll(".sbimg")
        console.log(imgs)
        // imgs[0].onclick=function(){
        //     this.style.transition = "all linear 1s"
        //     this.style.transform = "scale(7)"



        // }
        // imgs.map(function(item,ind){
        //     imgs[ind].onclick=function(){
        //         this.style.transition = "all linear 1s"
        //         this.style.transform = "scale(7)"
        //     }
        // })
        // for(let i = 0 ; i<=imgs.length-1;i++){
        //     let num = 0;
        //     imgs[i].onclick=function(){
        //         if(num==0){
        //             this.style.transition = "all linear 0.5s"
        //             this.style.transform = "scale(7)"
        //             this.style.position = "fixed"
        //             this.style.top = "50%"
        //             this.style.left = "50%"
        //             console.log(this.width)
        //             num = 1
        //         }else{
        //             this.style.transition = "all linear 0.5s"
        //             this.style.transform = "scale(1)"
        //             this.style.position = "static"

        //             // console.log(this.width)
        //             num = 0
        //         }


        //     }
        // }
    }
    render() {
        let srcs = "http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg"
        return (
            <div>
                <p>业主姓名：{this.props.custArrV ? this.props.custArrV.a : this.props.owerArr.a}<span style={{ marginLeft: 140 }}>业主手机号：{this.props.custArrV ? this.props.custArrV.b : this.props.owerArr.b}</span></p>
                <p>业主身份证号：{this.props.custArrV ? this.props.custArrV.c : this.props.owerArr.c}</p>
                <p className="imgP">
                    业主证明信息：
                        {/* <Zmage src={ this.props.custArrV ? this.props.custArrV.d : srcs}/>
                        <Zmage src= {srcs}/> */}
                    <img src={"https://test.dongkenet.com/" + (this.props.custArrV ? this.props.custArrV.d : this.props.owerArr.d)} />
                    <img src={"https://test.dongkenet.com/" + (this.props.custArrV ? this.props.custArrV.e : this.props.owerArr.e)} />
                    {this.props.custArrV ? this.props.custImgV : this.props.owerImgs}
                </p>
                <div>
                    {
                        this.props.custArr ? <div>
                            <p>委托人姓名：{this.props.custArr.a}<span style={{ marginLeft: 140 }}>业主手机号：{this.props.custArr.b}</span></p>
                            <p>业主身份证号：{this.props.custArr.c}</p>
                            <p className="imgP">
                                委托人证明信息：
                                <img class="sbimg" src={"https://test.dongkenet.com/" + this.props.custArr.d} />
                                <img class="sbimg" src={"https://test.dongkenet.com/" + this.props.custArr.e} />
                                {this.props.custImgs}
                            </p>
                            <p>房屋地址：{this.props.record.address}</p>
                        </div> : ""
                    }
                </div>
                <p>
                    审核结果：<span style={{ color: "lightgreen" }}>已通过</span>
                </p>
                <p>
                    通过原因：{this.props.vReason}
                </p>
            </div>
        )
    }
}