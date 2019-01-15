import React from 'react'
import './index.css'
import { Tree, Form, Select, Button, message } from 'antd';
import { fetchPost } from './../../../fetch/fetch.js'
const FormItem = Form.Item;
const Option = Select.Option;
const { TreeNode } = Tree;
export default class CityManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // treeData: [
            //     { title: 'Expand to load', key: '0' },
            //     { title: 'Expand to load', key: '1' },
            //     { title: 'Tree Node', key: '2', isLeaf: true },
            // ],
            regionId: "",
            title: "",
            treeData: []
        }
    }
    componentDidMount() {
        this.questRender()
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div style={{ position: "relative" }}>
                <Tree loadData={this.onLoadData} onSelect={this.onSelect} style={{ width: "500px" }}>
                    {this.renderTreeNodes(this.state.treeData)}
                </Tree>
                <div style={{ position: "absolute", right: 400, top: 100 }}>
                    <Form layout="inline">
                        <FormItem label="开通城市：" style={{ marginLeft: 30 }}>
                            {
                                getFieldDecorator('isOpen', {
                                    // initialValue: "00A",
                                    // rules: [{ required: true, whitespace: true, message: "请选择房屋状态" }],
                                })(
                                    <Select
                                        style={{ width: 350 }}
                                        placeholder="请选择"
                                    >
                                        <Option value="T">开通城市服务</Option>
                                        <Option value="F">关闭城市服务</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Form>
                    <div style={{ position: "absolute", left: "372px", top: "100px" }}>
                        <Button type="primary" onClick={this.submit.bind(this)}>提交申请</Button>
                    </div>
                </div>
            </div>

        )
    }

    submit() {
        const { resetFields, setFieldsValue, validateFields } = this.props.form;
        this.props.form.validateFields((err, values) => {
            console.log(values.isOpen,this.state.regionId)
            if (this.state.regionId === "" || values.isOpen === undefined) {
                message.info("请选择城市或者选择条件")
            } else {
                fetchPost("tms", "/region/mod-open", {
                    regionId: this.state.regionId,
                    isOpen: values.isOpen,
                }).then(res => {
                    this.setState({
                        regionId:""
                    })
                    if (res === "0") {
                        resetFields()
                        console.log("开通城市提交成功的res", res)
                        message.success("提交成功！")
                    }

                })
            }

        })

    }

    questRender = () => {
        fetchPost("tms", "/region/query-list", {
        }).then(res => {
            console.log("首次加载的数据", res)
            let treeDatas = []
            res.data.map((it, ind) => {
                let obj = {}
                obj.title = it.regionName
                obj.key = ind
                obj.isOpen = it.isOpen
                obj.regionId = it.regionId
                treeDatas.push(obj)
            })
            console.log(treeDatas)
            this.setState({
                treeData: treeDatas
            })
        })
    }

    onSelect = (selectedKeys, info) => {
        console.log(this.state.regionId)
        console.log('onSelect', info, selectedKeys);
        let das = ""
        let tit = ""
        if (info.node) {
            das = info.node.props.dataRef.regionId
            tit = info.node.props.dataRef.title
        }
        this.setState({
            regionId: das,
            title: tit,
        });
    }

    onLoadData = treeNode => new Promise((resolve) => {
        console.log(treeNode.props)
        if (treeNode.props.children) {
            resolve();
            return;
        }
        // setTimeout(() => {
        fetchPost("tms", "/region/query-list", {
            parentRegionId: treeNode.props.regionId
        }).then(res => {
            let treeDatas = []
            res.data.map((it, ind) => {
                let obj = {}
                obj.title = it.regionName
                obj.key = treeNode.props.eventKey + "-" + ind
                obj.regionId = it.regionId
                obj.parentRegionId = it.parentRegionId
                obj.isOpen = it.isOpen
                treeDatas.push(obj)
            })
            console.log(treeDatas)
            treeNode.props.dataRef.children = treeDatas
            this.setState({
                treeData: [...this.state.treeData],
            });
            resolve();
        })
        // }, 1000);
    })
    renderTreeNodes = data => data.map((item) => {
        // console.log(data)
        if (item.children) {
            // console.log(item)
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item} >
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} dataRef={item} />;
    })
}

CityManage = Form.create()(CityManage)