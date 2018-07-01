import React from "react";
import { connect } from "react-redux";
import { login } from "./../../_actions/auth_actions";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./auth.css";
const FormItem = Form.Item;

@connect(store => {
  return {
    login: store.login
  };
})
class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props
          .dispatch(
            login(
              { username: values.userName, password: values.password },
              this.props.history
            )
          )
          .then(response => {
            this.props.history.push("/");
          });
      }
    });
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { login } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 24
        },
        md: {
          span: 24
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 24
        },
        md: {
          span: 24
        }
      }
    };
    return (
      <div className="auth">
        <Form
          onSubmit={this.handleSubmit}
          className="login-form card card-1"
          style={{
            padding: "1rem 2rem",
            paddingBottom: "2rem"
          }}
        >
          <FormItem {...formItemLayout}>
            <h2 className="text-center">Login</h2>
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={login.processing}
          >
            Log in
          </Button>
          <Button
            type="default"
            className="login-form-button"
            style={{ marginTop: 10 }}
            onClick={() => this.props.history.push("/signup")}
          >
            Signup
          </Button>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create()(Login);

export default LoginForm;
