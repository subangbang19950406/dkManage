import React, { Component } from 'react'

import {
    Table, Form, Icon, Input, Button, Card, message, Modal, DatePicker, TimePicker,
    InputNumber, Popconfirm, Divider
} from 'antd'
import './index.css'
import $ from 'jquery'
import { fetchPost } from './../../../fetch/fetch.js'
import Untils from './../../../untils/index1.js'

export default class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleEdit: false,
            visibleChakan: false,
            flag: false,
        };
        this.hideChakanModal = this.hideChakanModal.bind(this)
        this.hideEditModal = this.hideEditModal.bind(this)
        this.params = {
            pageNo: 1,
        }

    }
    componentDidMount() {
        this.questRender()
    }

    render() {
        const columns = [
            {
                title: '初始设备号',
                dataIndex: 'oriDeviceCode',
                key: 'oriDeviceCode',
                // editable: true,
                width: "16%",
                className: "title",
            },
            {
                title: '设备类型',
                dataIndex: 'deviceType',
                key: 'deviceType',
                // editable: true,
                width: "16%",
                className: "title",
            },
            {
                title: '设备名称',
                dataIndex: 'deviceName',
                key: 'deviceName',
                // editable: true,
                width: "16%",
                className: "title",
            },
            // {
            //     title: '设备描述',
            //     dataIndex: 'deviceDesc',
            //     key: 'deviceDesc',
            //     // editable: true,
            //     width: "14%",
            // },
            // {
            //     title: '状态',
            //     dataIndex: 'status',
            //     key: 'status',
            //     editable: true,
            //     width: "8%",

            // },
            {
                title: '生效时间',
                dataIndex: 'effDate',
                key: 'effDate',
                // editable: true,
                width: "16%",
                className: "title",
            },
            // {
            //     title: '过期时间',
            //     dataIndex: 'expDate',
            //     key: 'expDate',
            //     editable: true,
            //     width: "16%",
            // },
            {
                title: '操作',
                dataIndex: 'operation',
                width: "14%",
                className: "title",
                render: (text, record) => (
                    < span >
                        <a href="javascript:;" style={{ marginLeft: 0 }} onClick={this.edit.bind(this, record)}>编辑</a>
                        <Modal
                            title={"编辑"}
                            visible={this.state.visibleEdit}
                            onCancel={this.hideEditModal}
                            okText="提交"
                            cancelText="取消"
                            mask={this.state.flag}
                            maskClosable={this.state.flag}
                            confirmLoading={this.state.flag}
                            footer={null}
                            width={630}
                            key={this.state.rowKey}
                        >
                            <EditData
                                editRecord={this.state.editRecord}
                                hideEditModal={this.hideEditModal}
                                editQuestRender={this.questRenderEdit}
                                key={this.state.rowKey}
                            />
                        </Modal>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={this.chakan.bind(this, record)}>查看</a>
                        <Modal
                            title={"详情"}
                            visible={this.state.visibleChakan}
                            onCancel={this.hideChakanModal}
                            cancelText="取消"
                            mask={this.state.flag}
                            maskClosable={this.state.flag}
                            confirmLoading={this.state.flag}
                            footer={null}
                            width={630}
                        >
                            <ChakanData
                                chakanRecord={this.state.chakanRecord}
                                key={this.state.key}
                            />
                        </Modal>
                    </span >
                ),
            },
        ];
        return (
            <div>
                <FilteTable
                    // questRenderSearch={this.questRender}
                    dataListSearch={this.dataListSearch.bind(this)}
                    questRenderReset={this.questRenderReset.bind(this)}
                    searchPage={this.params.pageNo}
                />
                <Table
                    bordered
                    dataSource={this.state.num ? this.state.dataListSearchs : this.state.dataList}
                    columns={columns}
                    pagination={this.state.pagination}
                // rowClassName="editable-row"
                />
            </div >

        );
    }

    questRender() {
        fetchPost("bms","/device-list/query-by-page", {
            pageInfo: {
                pageNo: this.params.pageNo,
                // pageSize: 5
            }
        }).then(res => {
            let _this = this
            if (res.code === "0") {
                let arr = []
                let ids = []
                console.log("res.data.rows", res.data.rows)
                res.data.rows.map((ite, ind) => {
                    let obj = {
                        key: ind,
                        deviceId: ite.deviceId,
                        oriDeviceCode: ite.oriDeviceCode,
                        deviceType: ite.deviceType,
                        deviceName: ite.deviceName,
                        deviceDesc: ite.deviceDesc,
                        status: ite.status,
                        effDate: ite.effDate,
                        expDate: ite.expDate,
                    }
                    arr.push(obj)
                    ids.push(ite.deviceId)
                })
                console.log(arr)
                this.setState({
                    dataList: arr,
                    deviceIds: ids,
                    pagination: Untils.pagination(res, (current) => {
                        _this.params.pageNo = current
                        console.log("页码", _this.params.pageNo)
                        this.questRender()
                    })
                })
            }
        })
    }
    //查询得到的列表
    dataListSearch(ins) {
        console.log(ins)
        this.setState({
            num: true,
            dataListSearchs: ins,
        })
    }
    //Filter子组件传过来的重置信息
    questRenderReset() {
        if (this.state.num) {
            this.setState({
                num: false,
            })
        } else {
            this.params = {
                pageNo: 1,
            }
            this.questRender()
        }
    }

    questRenderEdit = () => {
        this.params = {
            pageNo: this.params.pageNo
        }
        this.questRender()
    }
    hideEditModal() {
        this.setState({
            visibleEdit: false,
        })
    }

    hideChakanModal() {
        this.setState({
            visibleChakan: false,
        })
    }

    edit(record) {
        console.log(record)
        this.setState({
            rowKey: record.key,
            visibleEdit: true,
            editRecord: record,
        })
    }
    chakan(record) {
        console.log("查看行", record)
        // fetchPost("https://test.dongkenet.com/api/bms/1.0.0.daily/device-list/query", {
        //     oriDeviceCode: record.oriDeviceCode,
        //     deviceType: record.deviceType,
        //     deviceName: record.deviceName,
        // }).then(res => {
        //     console.log("查看连接成功", res)
        //     if (res.code === "0") {
        //         this.setState({
        //             visibleChakan: true,
        //             chakanRecord: record,
        //             key: record.key,
        //         })
        //     }

        // })
        this.setState({
            visibleChakan: true,
            chakanRecord: record,
            key: record.key,
        })
    }
}

class FilteTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleAdd: false,
            flag: false,
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.hideAddModal = this.hideAddModal.bind(this)
    }
    render() {
        const { getFieldDecorator, resetFields } = this.props.form;
        return (
            <div style={{ marginBottom: 40, marginTop: 30 }}>
                <Form layout="inline">
                    <Form.Item label="初始编号" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('oriDeviceCode')(
                            <Input style={{ width: 200 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备类型：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('deviceType')(
                            <Input style={{ width: 200 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备名称：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('deviceName')(
                            <Input style={{ width: 200 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{ marginRight: 20 }} onClick={this.handleSearch}>查询</Button>
                        <Button type="dashed" style={{ marginRight: 20 }} onClick={this.handleAdd}>新增</Button>
                        <Button onClick={this.handleReset}>重置</Button>
                        <Modal
                            title={"添加"}
                            visible={this.state.visibleAdd}
                            onCancel={this.hideAddModal}
                            okText="提交"
                            cancelText="取消"
                            mask={this.state.flag}
                            maskClosable={this.state.flag}
                            confirmLoading={this.state.flag}
                            footer={null}
                            width={630}
                        >
                            <AddData
                                hide={this.hideAddModal}

                            />
                        </Modal>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    handleSearch(e) {
        const { resetFields, setFieldsValue, validateFields } = this.props.form;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (values.oriDeviceCode === undefined || values.deviceType === undefined || values.deviceName === undefined) {
                message.error("请分别输入设备编号和名称")
            } else {
                fetchPost("bms","/device-list/query", {
                    oriDeviceCode: values.oriDeviceCode.trim(),
                    deviceType: values.deviceType.trim(),
                    deviceName: values.deviceName.trim(),
                    pageInfo:{
                        pageNo:this.props.searchPage.pageNo,
                    },
                }).then(res => {
                    // this.props.questRenderSearch()
                    this.props.dataListSearch(res.data)
                    resetFields()//清空表单里的数据的
                })

            }

        });
    }

    handleAdd(e) {
        e.preventDefault();
        this.setState({
            visibleAdd: true
        })
    }

    handleReset(e) {
        e.preventDefault();
        this.props.questRenderReset()
    }

    hideAddModal() {
        this.setState({
            visibleAdd: false
        })
    }
}

FilteTable = Form.create()(FilteTable);

class AddData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // subData: {device_name: ''}
            // visible: false
        }
        // this.onchange = this.onchange.bind(this)
        this.submitModal = this.submitModal.bind(this)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ overflow: "hidden" }}>
                <Form layout="inline" >
                    <Form.Item label="初始编号：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('oriDeviceCode')(
                            <Input className="name" style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备类型：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('deviceType')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备名称：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('deviceName')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备描述：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('deviceDesc')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="生效日期：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('effDate')(
                            <DatePicker />
                        )}
                    </Form.Item>
                    <Form.Item label="当天点数：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('effTime')(
                            <TimePicker />
                        )}
                    </Form.Item>
                    <Form.Item label="过期日期：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('expDate')(
                            <DatePicker />
                        )}
                    </Form.Item>
                    <Form.Item label="当天点数：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('expTime')(
                            <TimePicker />
                        )}
                    </Form.Item>
                </Form>
                <Form>
                    <Button onClick={this.submitModal} type="primary" style={{ float: "right", marginTop: 30 }}>提交</Button>
                </Form>
            </div>
        )
    }

    //提交新增的数据到接口
    submitModal() {

        const { resetFields, setFieldsValue, validateFields } = this.props.form;
        this.props.form.validateFields((err, values) => {
            if (values.effDate === undefined || values.effTime === undefined || values.deviceDesc === undefined
                || values.deviceName === undefined || values.deviceType === undefined || values.expDate === undefined
                || values.expTime === undefined || values.oriDeviceCode === undefined) {
                message.error("请将各项信息输入完整")
            } else {//写接口内容
                let effDT = Untils.dates(values.effDate) + Untils.times(values.effTime)
                let expDT = Untils.dates(values.expDate) + Untils.times(values.expTime)
                console.log(expDT, effDT)
                fetchPost("bms","/device-list/add", {
                    oriDeviceCode: values.oriDeviceCode,
                    deviceType: values.deviceType,
                    deviceName: values.deviceName,
                    deviceDesc: values.deviceDesc,
                    effDate: effDT,
                    expDate: expDT,
                    // deviceCode: "123"
                }).then(res => {
                    console.log("res", res)
                    if (res.code === "0") {
                        console.log("res新增成功的", res)
                        resetFields()//清空表单里的数据的            
                        this.props.hide();
                        message.success("新增成功")
                    }

                })
            }
        });
    }

}

AddData = Form.create()(AddData);

class EditData extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.submitAddModal = this.submitAddModal.bind(this)
    }
    componentDidMount() {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            oriDeviceCode: this.props.editRecord.oriDeviceCode,
            deviceType: this.props.editRecord.deviceType,
            deviceName: this.props.editRecord.deviceName,
            deviceDesc: this.props.editRecord.deviceDesc,
            // effDate: this.props.editRecord.effDate,
            // expDate: this.props.editRecord.expDate,
            // let effDT = Untils.dates(values.effDate) + Untils.times(values.effTime)
            // let expDT = Untils.dates(values.expDate) + Untils.times(values.expTime)
            // effDate：
            // effTime：
            // expDate：
            // expTime：
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div style={{ overflow: "hidden" }}>
                <Form layout="inline" >
                    <Form.Item label="初始编号：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('oriDeviceCode')(
                            <Input className="name" style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备类型：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('deviceType')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备名称：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('deviceName')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="设备描述：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('deviceDesc')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="生效日期：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('effDate')(
                            <DatePicker />
                        )}
                    </Form.Item>
                    <Form.Item label="当天点数：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('effTime')(
                            <TimePicker />
                        )}
                    </Form.Item>
                    <Form.Item label="过期日期：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('expDate')(
                            <DatePicker />
                        )}
                    </Form.Item>
                    <Form.Item label="当天点数：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('expTime')(
                            <TimePicker />
                        )}
                    </Form.Item>
                </Form>
                <Form>
                    <Button onClick={this.submitAddModal} type="primary" style={{ float: "right", marginTop: 30 }}>提交</Button>
                </Form>
            </div>
        )
    }

    // 编辑提交新增的内容
    submitAddModal() {

        const { resetFields, setFieldsValue, validateFields } = this.props.form;
        this.props.form.validateFields((err, values) => {
            if (values.effDate === undefined || values.effTime === undefined || values.deviceDesc === undefined
                || values.deviceName === undefined || values.deviceType === undefined || values.expDate === undefined
                || values.expTime === undefined || values.oriDeviceCode === undefined) {
                message.error("请将各项信息输入完整")
            } else {//写接口内容
                let effDT = Untils.dates(values.effDate) + Untils.times(values.effTime)
                let expDT = Untils.dates(values.expDate) + Untils.times(values.expTime)
                console.log(expDT, effDT)
                fetchPost("bms","/device-list/mod", {
                    deviceId: this.props.editRecord.deviceId,
                    oriDeviceCode: values.oriDeviceCode,
                    deviceType: values.deviceType,
                    deviceName: values.deviceName,
                    deviceDesc: values.deviceDesc,
                    effDate: effDT,
                    expDate: expDT,
                }).then(res => {
                    console.log("res编辑内容提交的", res)
                    if (res.code === "0") {
                        console.log("res编辑提交成功", res)
                        resetFields()//清空表单里的数据的            
                        this.props.hideEditModal()
                        this.props.editQuestRender()
                        message.success("编辑成功")
                    } else {
                        message.info("请输入正确格式的设备类型")
                    }
                })
            }
        });
    }
}
EditData = Form.create()(EditData)

class ChakanData extends Component {
    constructor(props){
        super(props)
        this.state={

        }

    }
    render(){
        return (
            <div>
                <p>初始编码：{this.props.chakanRecord.oriDeviceCode}</p>
                <p>设备类型：{this.props.chakanRecord.deviceType}</p>
                <p>设备名称：{this.props.chakanRecord.deviceName}</p>
                <p>设备描述：{this.props.chakanRecord.deviceDesc}</p>
                <p>生效时间：{this.props.chakanRecord.effDate}</p>
                <p>过期时间：{this.props.chakanRecord.expDate}</p>
            </div>
        )
    }
}