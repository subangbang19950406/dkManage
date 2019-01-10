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

    }
    componentDidMount() {
        let divLeft = document.querySelector(".huiqu")
        let divAll = document.querySelector(".content")
        divLeft.onclick = () => {
            divAll.style.transition = "all 0.2s linear"
            divAll.style.marginLeft = "-20px"
        }
    }

    rightPage = () => {

    }
    render() {
        return (
            <div className="content" style={{ width: "209%", marginLeft: -20, overflow: "hidden" }}>
                <div style={{ width: "50%", float: "left" }}>
                    <HouseList

                    />

                </div>
                <div style={{ width: "50%", float: "right" }}>
                    <Button className="huiqu" type="primary">返回</Button>
                    {this.rightPage()}
                </div>
            </div>
        )
    }
}

//不通过查看
class Detial extends React.Component {

    render() {

        return (
            <div className="chakanD">
                <h3 style={{ fontWeight: "bold" }}>房屋所有人信息：</h3>
                <p>姓名：<span style={{ marginLeft: 140 }}>手机号：</span></p>
                <p>身份证号：</p>
                <p className="imgP">
                    身份证照片：


                </p>
                <p>房屋证件：

                </p>
                <div>
                    {
                        //  <div>
                        //     <h3 style={{ fontWeight: "bold" }}>房屋委托人信息：</h3>
                        //     <p>姓名：<span style={{ marginLeft: 140 }}>手机号：</span></p>
                        //     <p>身份证号：</p>
                        //     <p className="imgP">
                        //         身份证照片：

                        //     </p>
                        //     <p>房屋委托书：

                        //     </p>
                        // </div>
                    }
                </div>
                <p>房屋地址：</p>
                <p>
                    审核结果：<span style={{ color: "red" }}>未通过</span>
                </p>
                <p>
                    未通过原因：
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
        return (
            <div className="chakanV">
                <h3 style={{ fontWeight: "bold" }}>房屋所有人信息：</h3>
                <p>姓名：<span style={{ marginLeft: 140 }}>手机号：</span></p>
                <p>身份证号：</p>
                <p className="imgP">
                    身份证照片：


                </p>
                <p>房屋证件：

                </p>
                <div>
                    {/* {
                        <div>
                            <h3 style={{ fontWeight: "bold" }}>房屋委托人信息：</h3>
                            <p>姓名：{this.props.custArra}<span style={{ marginLeft: 140 }}>手机号：{this.props.custArrb}</span></p>
                            <p>身份证号：{this.props.custArrc}</p>
                            <p className="imgP">
                                身份证照片：
                                

                            </p>
                            <p>房屋委托书：
                            
                            </p>

                        </div>
                    } */}
                </div>
                <p>房屋地址：</p>
                <p>
                    审核结果：<span style={{ color: "green" }}>通过</span>
                </p>
                <p>
                    通过原因：
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
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ overflow: "hidden" }} className="shenhe">
                <Form className="login-form">
                    <h3 style={{ fontWeight: "bold" }}>房屋所有人信息：</h3>
                    <p>姓名：<span style={{ marginLeft: 140 }}>手机号：</span></p>
                    <p>身份证号：</p>
                    <p className="imgP">
                        身份证照片：


                    </p>
                    <p>
                        房屋证件：
                    </p>
                    <div>
                        {
                            <div>
                                <h3 style={{ fontWeight: "bold" }}>房屋委托人信息：</h3>
                                <p>姓名：<span style={{ marginLeft: 140 }}>手机号：</span></p>
                                <p>身份证号：</p>
                                <p className="imgP">
                                    身份证照片：

                                </p>
                                <p>房屋委托书：

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
        // this.props.form.validateFields((err, values) => {}


    }
}

ShenHe = Form.create({})(ShenHe);

class HouseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
        this.questRender()
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
                                rules: [{ required: true, whitespace: true, message: "请输入房屋地址" }]
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
                            <Button className="wo" onclick={this.handleReset}>重置</Button>
                        </FormItem>
                    </Form>
                </div>
                <Table
                    columns={columns}
                    bordered
                    dataSource={this.state.dataList}
                    pagination={this.state.pagination}
                />
            </div>
        )
    }
    handleSearch() {
        // const {  } = this.props.form
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            } else {
                fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query-by-page", {
                    status: values.status,
                    // pageInfo: {
                    //     pageNo: 1,
                    //     pageSize: this.state.total,
                    // }
                }).then(res => {
                    console.log("查询得到的数据", res)
                    if (res.code === "0") {
                        
                    }
                })
            }
        })
    }

    handleReset() {

    }

    handleshenhe() {
        Untils.leftPage(".content")
    }

    handleChakanVitory() {
        Untils.leftPage(".content")
    }

    handleChakanDefeat() {
        Untils.leftPage(".content")
    }

    questRender = () => {
        fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/house-verify/query-by-page", {
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