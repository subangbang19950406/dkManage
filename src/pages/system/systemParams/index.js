import React from 'react'
import { Table, Divider, Tag, Button, Form, Input, Modal, message, Popconfirm, Icon, Select } from 'antd'
import './index.css'
import $ from 'jquery'
import { fetchPost } from './../../../fetch/fetch.js'
import Untils from './../../../untils/index1.js'
const Option = Select.Option;
export default class SystemList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: false,
            editVisible: false,
            chakanVisible: false,
        }
        this.params = {
            pageNo: 1,
        }
        this.questRender = this.questRender.bind(this)
        this.hideEditModal = this.hideEditModal.bind(this)
    }

    componentDidMount() {
        this.questRender()
    }

    render() {
        const columns = [
            {
                title: '参数编号',
                dataIndex: 'paramCode',
                key: 'paramCode',
                className: "title",
                width: "20%",
            },
            // {
            //     title: 'ID',
            //     dataIndex: 'tenantId',
            //     key: 'tenantId',

            //     width: "4%",
            // },
            {
                title: '参数类型编号',
                dataIndex: 'paramTypeCode',
                key: 'paramTypeCode',
                className: "title",
                width: "20%",
            },
            {
                title: '参数值类型',
                dataIndex: 'valueType',
                key: 'valueType',
                className: "title",
                width: "14%",
            },
            // {
            //     title: '参数值',
            //     dataIndex: 'paramValue',
            //     key: 'paramValue',

            //     width: "16%",

            // },
            {
                title: '参数名称',
                dataIndex: 'paramName',
                key: 'paramName',
                className: "title",
                width: "20%",
            },
            // {
            //     title: '参数描述',
            //     dataIndex: 'paramDesc',
            //     key: 'paramDesc',
            //     width: "16%",
            // },
            {
                title: '操作',
                key: 'action',
                // width: "15%",
                className: "title",
                render: (text, record) => (
                    <span>
                        <a href="javascript:;" style={{ marginLeft: 0 }} onClick={this.edit.bind(this, record)}>编辑</a>
                        <Modal
                            title={"编辑"}
                            visible={this.state.editVisible}
                            onCancel={this.hideEditModal}
                            okText="提交"
                            cancelText="取消"
                            mask={this.state.flag}
                            maskClosable={this.state.flag}
                            confirmLoading={this.state.flag}
                            footer={null}
                            width={630}
                        >
                            <EditData
                                editRecord={this.state.editRecord}
                                hideEditModal={this.hideEditModal}
                                editQuestRender={this.questRender}
                                key={this.state.key}
                            />
                        </Modal>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除吗？"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={this.delete.bind(this, record)}
                            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        >
                            <a href="javascript:;">删除</a>
                        </Popconfirm >
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={this.chakan.bind(this, record)}>查看</a>
                        <Modal
                            title={"详情"}
                            visible={this.state.chakanVisible}
                            onCancel={this.hideEditModal}
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
                    </span>
                ),
            }
        ];

        return (
            <div>
                <FilteTable
                    questRenderReset={this.resetPage}
                    searchPage={this.searchPage}
                    pageNo={this.params.pageNo}
                    wrappedComponentRef={(e) => this.formRef = e}
                />
                <Table
                    columns={columns}
                    dataSource={this.state.searchPage ? this.state.searchList : this.state.dataList}
                    bordered
                    pagination={this.state.pagination}
                />
            </div>
        )
    }


    onConfirm = () => {
        console.log("确认")
    }
    resetPage = () => {
        console.log("我是子传过来的searchPage")
        this.setState({
            searchPage: false,
        })
    }
    searchPage = (searchPage, searchList) => {
        this.setState({
            searchPage: searchPage,
            searchList: searchList,
        })
    }
    edit(record) {
        console.log("编辑行", record)
        this.setState({
            editVisible: true,
            editRecord: record,
            key: record.key,
        })
    }
    delete(record) {
        console.log("删除行", record)
        // if()
        fetchPost("tms","/sysparam/del-sysparam", {
            paramCode: record.paramCode,
            tenantId: record.tenantId,
        }).then(res => {
            console.log("删除成功", res)
            if (res.code === "0") {
                this.questRender()
            }

        })
    }

    chakan(record) {
        // this.props.history.push('/admin/home')
        console.log("查看行", record)
        fetchPost("tms","/sysparam/get-sysparam", {
            paramCode: record.paramCode,
            tenantId: record.tenantId,
        }).then(res => {
            console.log("查看连接成功", res)
            if (res.code === "0") {
                this.setState({
                    chakanVisible: true,
                    chakanRecord: res.data,
                    key: record.key,
                })
            }

        })
    }

    hideEditModal() {
        this.setState({
            editVisible: false,
            chakanVisible: false,
        })
    }

    questRender() {
        fetchPost("tms","/sysparam/get-sysparam-fast", {
            queryType: "0",
            pageInfo: {
                pageNo: this.params.pageNo,
                // pageSize: 10,
            }
        }).then(res => {
            console.log("首次渲染列表", res)
            let _this = this
            if (res.code === "0") {
                let arr = []
                console.log("res.data.rows", res.data.rows)
                res.data.rows.map((ite, ind) => {
                    let obj = {
                        key: ind,
                        paramCode: ite.paramCode,
                        tenantId: ite.tenantId,
                        paramTypeCode: ite.paramTypeCode,
                        valueType: Untils.queryType(ite.valueType),
                        paramValue: ite.paramValue,
                        paramName: ite.paramName,
                        paramDesc: ite.paramDesc,
                    }
                    arr.push(obj)
                })
                console.log("初始数据", arr)
                console.log(this.formRef)
                this.setState({
                    dataList: arr,
                    total: res.data.total,
                    pagination: Untils.pagination(res, (current) => {
                        _this.params.pageNo = current
                        // if(this.state.searchPage){                                  
                        //     this.formRef.handleSearch()
                        // }else{
                        this.questRender()
                        // }

                    })
                })
            }
        })
    }

}



class FilteTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addVisible: false,
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

                    <Form.Item label="参数查询类型" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('queryType', {
                            rules: [{ required: true, whitespace: true, message: "请选择参数类型" }],

                        })(
                            <Select
                                style={{ width: 300 }}
                                placeholder="请选择"
                            >
                                <Option value="0">编码查询</Option>
                                <Option value="1">编码类型查询</Option>
                                <Option value="2">名称模糊查询</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="查询条件(选填)：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('params')(
                            <Input style={{ width: 300 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{ marginRight: 20 }} onClick={this.handleSearch}>查询</Button>
                        <Button type="dashed" style={{ marginRight: 20 }} onClick={this.handleAdd}>新增</Button>
                        <Button onClick={this.handleReset}>重置</Button>
                        <Modal
                            title={"添加"}
                            visible={this.state.addVisible}
                            // onOk={this.submitModal}
                            onCancel={this.hideAddModal}
                            okText="提交"
                            cancelText="取消"
                            mask={this.state.flag}
                            maskClosable={this.state.flag}
                            // closable={this.state.flag}
                            confirmLoading={this.state.flag}
                            footer={null}
                            width={630}
                        >
                            <AddData
                                hideAddModal={this.hideAddModal}
                            />
                        </Modal>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    handleSearch(e) {
        const { resetFields, setFieldsValue, validateFields } = this.props.form;

        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (values.queryType === undefined) {
                return
            } else {
                if (values.queryType === "0") {
                    fetchPost("tms","/sysparam/get-sysparam-fast", {
                        queryType: values.queryType,
                        paramCode: values.params,
                        pageInfo: {
                            pageNo: this.props.pageNo,
                            // pageSize: 10,
                        }
                    }).then(res => {
                        console.log("查询的数据", res)
                        let arr = []
                        res.data.rows.map((ite, ind) => {
                            let obj = {
                                key: ind,
                                paramCode: ite.paramCode,
                                tenantId: ite.tenantId,
                                paramTypeCode: ite.paramTypeCode,
                                valueType: ite.valueType,
                                paramValue: ite.paramValue,
                                paramName: ite.paramName,
                                paramDesc: ite.paramDesc,
                            }
                            arr.push(obj)
                        })
                        this.setState({
                            searchPage: true,
                            searchList: arr,
                        })
                        this.props.searchPage(this.state.searchPage, this.state.searchList)
                        // this.props.questRenderSearch()
                        resetFields()//清空表单里的数据的
                    })
                } else if (values.queryType === "1") {
                    fetchPost("tms","/get-sysparam-fast", {
                        queryType: values.queryType,
                        paramTypeCode: values.params,
                        pageInfo: {
                            pageNo: this.props.pageNo,
                            // pageSize: 10,
                        }
                    }).then(res => {
                        console.log("查询的数据", res)
                        let arr = []
                        res.data.rows.map((ite, ind) => {
                            let obj = {
                                key: ind,
                                paramCode: ite.paramCode,
                                tenantId: ite.tenantId,
                                paramTypeCode: ite.paramTypeCode,
                                valueType: ite.valueType,
                                paramValue: ite.paramValue,
                                paramName: ite.paramName,
                                paramDesc: ite.paramDesc,
                            }
                            arr.push(obj)
                        })
                        this.setState({
                            searchPage: true,
                            searchList: arr,
                        })
                        this.props.searchPage(this.state.searchPage, this.state.searchList)
                        // this.props.questRenderSearch()
                        resetFields()//清空表单里的数据的
                    })
                } else if (values.queryType === "2") {
                    fetchPost("tms","/sysparam/get-sysparam-fast", {
                        queryType: values.queryType,
                        paramName: values.params,
                        pageInfo: {
                            pageNo: this.props.pageNo,
                            // pageSize: 10,
                        }
                    }).then(res => {
                        console.log("查询的数据", res)
                        let arr = []
                        res.data.rows.map((ite, ind) => {
                            let obj = {
                                key: ind,
                                paramCode: ite.paramCode,
                                tenantId: ite.tenantId,
                                paramTypeCode: ite.paramTypeCode,
                                valueType: ite.valueType,
                                paramValue: ite.paramValue,
                                paramName: ite.paramName,
                                paramDesc: ite.paramDesc,
                            }
                            arr.push(obj)
                        })
                        this.setState({
                            searchPage: true,
                            searchList: arr,
                        })
                        this.props.searchPage(this.state.searchPage, this.state.searchList)
                        // this.props.questRenderSearch()
                        resetFields()//清空表单里的数据的
                    })
                }


            }

        });
    }

    handleAdd(e) {
        e.preventDefault();
        this.setState({
            addVisible: true
        })
    }

    handleReset(e) {
        e.preventDefault()
        console.log("重置按钮执行")
        this.props.questRenderReset()


    }

    hideAddModal() {
        this.setState({
            addVisible: false
        })
    }
}

FilteTable = Form.create()(FilteTable);


class AddData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.submitModal = this.submitModal.bind(this)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ overflow: "hidden" }}>
                <Form layout="inline" >
                    <Form.Item label="参数编码" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('paramCode')(
                            <Input className="name" style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="参数ID值" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('tenantId', {
                            initialValue: "1",
                        })(
                            <Input style={{ width: 350 }} placeholder="请输入" disabled />
                        )}
                    </Form.Item>
                    <Form.Item label="类型编码：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('paramTypeCode')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="参数类型：" style={{ marginLeft: 30 }}>
                        {
                            getFieldDecorator('valueType')(
                                <Select
                                    style={{ width: 350 }}
                                    placeholder="请选择"
                                >
                                    <Option value="A01">数值型</Option>
                                    <Option value="B01">字符串类型</Option>
                                    <Option value="C01">布尔型(T,F)</Option>
                                    <Option value="D01">时间型(日期)</Option>
                                    <Option value="D02">时间型(时间)</Option>
                                    <Option value="D03">时间型(日期+日期)</Option>
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="参数数值：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('paramValue')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="参数名称：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('paramName')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="参数描述：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('paramDesc')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
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
        const { resetFields, validateFields } = this.props.form;
        this.props.form.validateFields((err, values) => {
            if (values.paramCode === undefined || values.tenantId === undefined || values.paramTypeCode === undefined
                || values.valueType === undefined || values.paramValue === undefined || values.paramName === undefined
                || values.paramDesc === undefined) {
                message.error("请将各项信息输入完整")
            } else {//写接口内容            
                fetchPost("tms","/sysparam/add-sysparam", {
                    paramCode: values.paramCode,
                    tenantId: values.tenantId,
                    paramTypeCode: values.paramTypeCode,
                    valueType: values.valueType,
                    paramValue: values.paramValue,
                    paramName: values.paramName,
                    paramDesc: values.paramDesc,
                }).then(res => {
                    console.log("res", res)
                    if (res.code === "0") {
                        console.log("res新增成功的", res)
                        resetFields()//清空表单里的数据的            
                        this.props.hideAddModal();
                        message.success("新增成功")
                    } else {
                        message.info(res.msg)
                    }
                })
            }
        });
    }

}

AddData = Form.create()(AddData);

class EditData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.submitModal = this.submitModal.bind(this)
    }
    componentDidMount = () => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            paramCode: this.props.editRecord.paramCode,
            tenantId: this.props.editRecord.tenantId,
            paramTypeCode: this.props.editRecord.paramTypeCode,
            valueType: this.props.editRecord.valueType,
            paramValue: this.props.editRecord.paramValue,
            paramName: this.props.editRecord.paramName,
            paramDesc: this.props.editRecord.paramDesc,
        })
    }
    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        return (
            <div style={{ overflow: "hidden" }}>
                <Form layout="inline" >
                    <Form.Item label="参数编码：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('paramCode')(
                            <Input className="name" style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="参数ID值：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('tenantId', {
                            initialValue: "1",
                        })(
                            <Input style={{ width: 350 }} placeholder="请输入" disabled />
                        )}
                    </Form.Item>
                    <Form.Item label="类型编码" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('paramTypeCode')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="参数类型" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('valueType')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="参数数值" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('paramValue')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="参数名称" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('paramName')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="参数描述" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('paramDesc')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                </Form>
                <Form>
                    <Button onClick={this.submitModal} type="primary" style={{ float: "right", marginTop: 30 }}>提交</Button>
                </Form>
            </div>
        )
    }

    //提交编辑的数据到接口
    submitModal() {
        const { resetFields, validateFields } = this.props.form;
        this.props.form.validateFields((err, values) => {
            if (values.paramCode === undefined || values.tenantId === undefined || values.paramTypeCode === undefined
                || values.valueType === undefined || values.paramValue === undefined || values.paramName === undefined
                || values.paramDesc === undefined) {
                message.error("请将各项信息输入完整")
            } else {//写接口内容            
                fetchPost("tms","/sysparam/modify-sysparam", {
                    paramCode: values.paramCode,
                    tenantId: values.tenantId,
                    paramTypeCode: values.paramTypeCode,
                    valueType: values.valueType,
                    paramValue: values.paramValue,
                    paramName: values.paramName,
                    paramDesc: values.paramDesc,
                }).then(res => {
                    console.log("res", res)
                    if (res.code === "0") {
                        console.log("res编辑成功的", res)
                        this.props.editQuestRender()
                        // resetFields()//清空表单里的数据的            
                        this.props.hideEditModal();
                    } else {
                        message.info("参数编码已存在")
                    }
                })
            }
        });
    }

}

EditData = Form.create()(EditData);

class ChakanData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    render() {
        return (
            <div>
                <p>ID：{this.props.chakanRecord.tenantId}</p>
                <p>参数编号：{this.props.chakanRecord.paramCode}</p>
                <p>值类型：{Untils.queryType(this.props.chakanRecord.valueType)}</p>
                <p>参数描述：{this.props.chakanRecord.paramDesc}</p>
                <p>参数名称：{this.props.chakanRecord.paramName}</p>
                <p>参数类型：{this.props.chakanRecord.paramTypeCode}</p>
                <p>参数值：{this.props.chakanRecord.paramValue}</p>
                <p>状态：{this.props.chakanRecord.status}</p>
            </div>
        )
    }
}