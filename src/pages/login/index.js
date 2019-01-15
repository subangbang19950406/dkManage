import React, { Component } from 'react';
import { Button, Card, Form, Input, Icon, Checkbox, message } from 'antd';
// import $ from 'jquery'
import { fetchPost } from './../../fetch/fetch.js'
import './index.css';
const FormItem = Form.Item;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleSubmit = this.handleSubmit.bind(this); // 提交
    }

    componentDidMount() {
            if (window.localStorage.getItem("userData")) {
                let objData = JSON.parse(window.localStorage.getItem("userData"))
                console.log("objLoginData", objData)
                const { setFieldsValue } = this.props.form
                setFieldsValue({
                    username: objData.data.staffCode,
                    password: objData.data.inputPassword,
                    remember: true,
                })
            }          
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='Login'>
                <Card title="欢迎登陆" style={{ width: 350, position: 'absolute', top: 200, right: '37%' }}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} class="user" />} placeholder='请输入用户名' />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                            <a style={{ float: 'right' }} href=''>忘记密码</a>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                登陆
                            </Button>
                            {/* Or <a href="">register now!</a> */}
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }


    handleSubmit(e) {
        e.preventDefault();
        const { history } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                console.log(values)
                fetchPost('tms','/console/login', {
                    staffCode: values.username,
                    inputPassword: values.password,
                    remember: values.remember,
                }).then(rep => {
                    console.log("登陆获取的", rep)
                    if (rep.code === "0") {
                        if (values.remember) {
                            localStorage.setItem('userData', JSON.stringify(rep))
                            // localStorage.clear()
                        }
                        message.success("恭喜你,登陆成功,正在跳转", 1, () => {
                            // history.replace('/admin/home');
                            this.props.history.push('/admin/home')
                        })
                    } else {
                        message.error("用户名或密码不正确！")
                    }

                })

            }
        });
    }
}

export default Form.create()(Login);