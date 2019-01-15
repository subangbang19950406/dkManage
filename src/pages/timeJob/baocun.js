import React from 'react'
import './index.css'
import { Table, Button, message, Modal, Form, Input } from 'antd';
import { fetchPost } from '../../fetch/fetch'
import Untils from './../../untils/index1.js'
import FormItem from 'antd/lib/form/FormItem';
export default class TimeJob extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: false,
            visibleEdit: false,
        }
        this.params = {
            pageNo: 1,
        }
        this.questRender = this.questRender.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.hideEditModal = this.hideEditModal.bind(this)
    }
    componentDidMount() {
        this.questRender()
    }
    render() {
        const columns = [
            c
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                // fixed: 'right',
                className: 'title',
                render: (text, record) =>
                    <div>
                        <Button type="primary" style={{ marginRight: 5 }}
                            onClick={this.handleStart.bind(this, record)}>开启</Button>
                        <Button type="danger" style={{ marginRight: 5 }}
                            onClick={this.handleStop.bind(this, record)}>终止</Button>
                        <Button href="javascript:;" style={{ marginLeft: 0 }} onClick={this.handleEdit.bind(this, record)}>编辑</Button>
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
                                // editQuestRender={this.questRenderEdit}
                                key={this.state.rowKey}
                            />
                        </Modal>
                        <Button type="normal" style={{ marginRight: 5 }}
                            onClick={this.handleOnce.bind(this, record)}>执行一次</Button>
                    </div>
            },
        ]
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.dataList}
                    pagination={this.state.pagination}
                // scroll={{ x: 1500 }}
                />
            </div >
        )
    }

    handleStart(record) {
        console.log(record)
        fetchPost("https://test.dongkenet.com/api/tms/1.0.0.daily/taskTimingCfg/start", {
            taskId: record.taskId,
        }).then(res => {
            console.log("开启成功的res", res)
            if (res.code === "0") {
                message.success("定时任务已开启")
            }
        })
    }

    handleStop(record) {
        fetchPost("https://test.dongkenet.com/api/tms/1.0.0.daily/taskTimingCfg/stop", {
            taskId: record.taskId,
        }).then(res => {
            console.log("停止成功的res", res)
            if (res.code === "0") {
                message.success("定时任务已停止")
            }
        })
    }

    handleOnce(record) {
        fetchPost("https://test.dongkenet.com/api/tms/1.0.0.daily/taskTimingCfg/execute", {
            taskId: record.taskId,
        }).then(res => {
            console.log("开启一次成功的res", res)
            if (res.code === "0") {
                message.success("定时任务已开启执行一次")
            }
        })
    }

    handleEdit(record) {
        console.log(record)
        this.setState({
            rowKey: record.key,
            visibleEdit: true,
            editRecord: record,
        })
    }

    // submitEdit(record) {
    //     const { setFieldsValue } = this.props.form
    //     setFieldsValue({
    //         taskName: record.taskName,
    //     })
    //     // fetchPost("https://test.dongkenet.com/api/tms/1.0.0.daily/taskTimingCfg/modify", {
    //     //     taskId: record.taskId,
    //     //     taskName: record.taskName,
    //     //     taskDesc: record.taskDesc,
    //     //     taskSvc: record.taskSvc,
    //     //     taskWorkTime: record.taskWorkTime,
    //     //     taskJob: record.taskJob,
    //     // }).then(res => {
    //     //     console.log("修改提交成功的res", res)
    //     //     if (res.code === "0") {
    //     //         message.success("定时任务修改成功")
    //     //     }
    //     // })
    // }

    hideEditModal() {
        this.setState({
            visibleEdit: false
        })
    }

    questRender() {
        fetchPost("https://test.dongkenet.com/api/tms/1.0.0.daily/taskTimingCfg/query-list", {
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
}

class EditData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.submitEdit = this.submitEdit.bind(this)
    }

    componentDidMount() {
        console.log(this.props.editRecord)
        const { setFieldsValue } = this.props.form
        setFieldsValue({
            taskName: this.props.editRecord.taskName,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div style={{ overflow: "hidden" }}>
                <Form layout="inline" >
                    <Form.Item label="任务名称" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('paramCode')(
                            <Input className="taskName" style={{ width: 350 }} placeholder="请输入" />
                        )}
                    </Form.Item>
                    <Form.Item label="任务描述" style={{ marginLeft: 30 }}>
                        {getFieldDecorator('taskDesc', {
                            // initialValue: "1",
                        })(
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
                    <Button onClick={this.submitEdit} type="primary" style={{ float: "right", marginTop: 30 }}>提交</Button>
                </Form>
            </div>
        )
    }

    submitEdit() {

    }
}

EditData = Form.create()(EditData);