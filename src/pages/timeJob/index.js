import React from 'react'
import './index.css'
import { Table, Button, message, Modal, Form, Input, Divider } from 'antd';
import { fetchPost } from '../../fetch/fetch'
import Untils from './../../untils/index1.js'
import FormItem from 'antd/lib/form/FormItem';

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleEdit: false,
            flag: false,
        };
        this.params = {
            pageNo: 1,
        }
        this.hideEditModal = this.hideEditModal.bind(this)
        this.questRender = this.questRender.bind(this)
        this.edit = this.edit.bind(this)
        this.hideEditModal = this.hideEditModal.bind(this)
    }
    componentDidMount() {
        this.questRender()
    }

    render() {
        const columns = [
            {
                title: '任务名称',
                dataIndex: 'taskName',
                key: 'taskName',
                width: "10%",
                // fixed: 'left',
                className: 'title',
            },
            {
                title: '任务描述',
                dataIndex: 'taskDesc',
                key: 'taskDesc',
                width: "16%",
                className: 'title',
            },
            {
                title: '工作类',
                dataIndex: 'taskSvc',
                key: 'taskSvc',
                width: "16%",
                className: 'title',
            },
            {
                title: '时间表达式',
                dataIndex: 'taskWorkTime',
                key: 'taskWorkTime',
                width: "12%",
                className: 'title',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: "8%",
                className: 'title',
                render: (text) => {
                    let config = {
                        "00A": "已启用",
                        "00X": "已停止"
                    }
                    return config[text]
                }
            },
            {
                title: '工作内容',
                dataIndex: 'taskJob',
                key: 'taskJob',
                width: "18%",
                className: 'title',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                className: "title",
                render: (text, record) => (
                    < span >
                        <a href="javascript:;" onClick={this.handleStart.bind(this, record)}>开启</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={this.handleStop.bind(this, record)}>终止</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={this.edit.bind(this, record)}>编辑</a>
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
                        <a href="javascript:;" onClick={this.handleOnce.bind(this, record)}>执行一次</a>
                    </span >
                ),
            },
        ];
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.dataList}
                    pagination={this.state.pagination}
                />
            </div >

        );
    }

    questRender() {
        fetchPost("tms","/taskTimingCfg/query-list", {
            pageNo: this.params.pageNo,
        }).then(res => {
            console.log(res)
            if (res.code === "0") {
                let _this = this
                let dataList = res.data.rows.map((item, index) => {
                    item.key = index
                    return item
                })
                this.setState({
                    dataList,
                    pagination: Untils.pagination(res, (current) => {
                        _this.params.pageNo = current
                        console.log("页码", _this.params.pageNo)
                        this.questRender()
                    })
                })
            }
        })
    }
    handleStart(record) {
        console.log(record)
        fetchPost("tms","/taskTimingCfg/start", {
            taskId: record.taskId,
        }).then(res => {
            console.log("开启成功的res", res)
            if (res.code === "0") {
                message.success("定时任务已开启")
                this.questRender()
            }
        })
    }

    handleStop(record) {
        fetchPost("tms","/taskTimingCfg/stop", {
            taskId: record.taskId,
        }).then(res => {
            console.log("停止成功的res", res)
            if (res.code === "0") {
                message.success("定时任务已停止")
                this.questRender()
            }
        })
    }

    handleOnce(record) {
        fetchPost("tms","/taskTimingCfg/execute", {
            taskId: record.taskId,
        }).then(res => {
            console.log("开启一次成功的res", res)
            if (res.code === "0") {
                message.success("定时任务已开启执行一次")
                this.questRender()
            }
        })
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

    edit(record) {
        console.log(record)
        this.setState({
            rowKey: record.key,
            visibleEdit: true,
            editRecord: record,
        })
    }
}



class EditData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.submitEditModal = this.submitEditModal.bind(this)
    }
    componentDidMount() {
        console.log(this.props.editRecord)
        const { setFieldsValue } = this.props.form;
        const { taskName, taskDesc, taskSvc, taskWorkTime, taskJob } = this.props.editRecord
        setFieldsValue({
            taskName: taskName,
            taskDesc: taskDesc,
            taskSvc: taskSvc,
            taskWorkTime: taskWorkTime,
            taskJob: taskJob,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div style={{ overflow: "hidden" }}>
                <Form layout="inline" >
                    <Form.Item label="任务名称：" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('taskName')(
                            <Input className="name" style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="任务描述" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('taskDesc')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="工作类：" style={{ marginLeft: 44 }}>
                        {getFieldDecorator('taskSvc')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="时间表达式：" style={{ marginLeft: 16 }}>
                        {getFieldDecorator('taskWorkTime')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="工作内容" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('taskJob')(
                            <Input style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                </Form>
                <Form>
                    <Button onClick={this.submitEditModal} type="primary" style={{ float: "right", marginTop: 30 }}>提交</Button>
                </Form>
            </div>
        )
    }

    // 编辑提交新编辑的内容
    submitEditModal() {
        console.log(this.props.editRecord.taskId)
        const { resetFields,validateFields } = this.props.form;
        this.props.form.validateFields((err, values) => {
            fetchPost("tms","/taskTimingCfg/modify", {
                taskId: this.props.editRecord.taskId,
                taskName: values.taskName,
                taskDesc: values.taskDesc,
                taskSvc: values.taskSvc,
                taskWorkTime: values.taskWorkTime,
                taskJob: values.taskJob,
            }).then(res => {
                console.log("修改提交的res", res)
                    if (res.code === "0") {
                        message.success("定时任务修改成功", 1, () => {
                            this.props.hideEditModal()
                            this.props.editQuestRender()
                            resetFields()
                        })
                    }else if(res.code==="ERR-TMS-0800"){
                        message.error("请先停止定时任务再进行编辑提交！")
                    }
            })
        });
    }
}
EditData = Form.create()(EditData)
