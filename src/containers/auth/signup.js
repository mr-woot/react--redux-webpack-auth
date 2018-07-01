import React from "react";
import { connect } from "react-redux";
import { signup } from "./../../_actions/auth_actions";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";
const FormItem = Form.Item;
import "./auth.css";

@connect(store => {
  return {
    login: store.login
  };
})
class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
      }
    });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirmPassword"], { force: true });
    }
    callback();
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const payload = {
          username: values.username,
          password: values.password,
          email: values.email,
          address: values.address,
          phoneNumber: values.phoneNumber,
          country: values.country,
          fullName: values.fullName,
          tradeFactor: values.tradeFactor ? Integer.parseInt(values.tradeFactor) : 1,
          apiKey: values.apiKey,
          secretKey: values.secretKey
        };
        this.props
          .dispatch(signup(payload, this.props.history))
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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <div className="auth">
        <Form
          onSubmit={this.handleSubmit}
          className="signup-form card card-1"
          style={{
            padding: "1rem 2rem",
            paddingBottom: "2rem"
          }}
        >
          <h2
            className="text-center"
            style={{
              padding: 12
            }}
          >
            Register
          </h2>
          <Row gutter={12}>
            <Col md={12} sm={24}>
              <FormItem {...formItemLayout} label="E-mail">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem {...formItemLayout} label="Username">
                {getFieldDecorator("username", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your Username!"
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col md={12} sm={24}>
              <FormItem {...formItemLayout} label="Password">
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input type="password" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem {...formItemLayout} label="Confirm Password">
                {getFieldDecorator("confirmPassword", {
                  rules: [
                    {
                      required: true,
                      message: "Please confirm your password!"
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col md={12} sm={24}>
              <FormItem {...formItemLayout} label="Full Name">
                {getFieldDecorator("fullName", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your full name!",
                      whitespace: true
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem {...formItemLayout} label="Phone Number">
                {getFieldDecorator("phoneNumber", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your phone number!"
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col md={12} sm={24}>
              <FormItem {...formItemLayout} label="Country">
                {getFieldDecorator("country", {
                  rules: [
                    { required: true, message: "Please input your country!" }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem {...formItemLayout} label="Address">
                {getFieldDecorator("address", {
                  rules: [
                    { required: true, message: "Please input your address!" }
                  ]
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem {...formItemLayout} label={(
            <span>
              Trade Factor&nbsp;
              <Tooltip title="Default is 1, i.e you place 0.01 BTC (1 x 0.01, 2 x 0.01, 3 x 0.01 and so on) minimum order.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>)}>
            {getFieldDecorator("tradeFactor", {
              rules: [
                { required: false, message: "Please input your trade factor!" }
              ]
            })(
              <Input />
            )}
          </FormItem>
          <Row gutter={12}>
            <Col md={12} sm={24}>
              <FormItem {...formItemLayout} label="API Key">
                {getFieldDecorator("apiKey", {
                  rules: [
                    { required: true, message: "Please input your API Key!" }
                  ]
                })(<Input type="password" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem {...formItemLayout} label="Secret Key">
                {getFieldDecorator("secretKey", {
                  rules: [
                    { required: true, message: "Please input your Secret Key!" }
                  ]
                })(<Input type="password" />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator(
              "agreement",
              {
                valuePropName: "checked"
              },
              {
                rules: [
                  {
                    required: true,
                    message:
                      "Please read and accept our license agreement to register."
                  }
                ]
              }
            )(
              <Checkbox>
                I have read the{" "}
                <a
                  href="https://s3.ap-south-1.amazonaws.com/zingniz.com/docs/Terms+and+Policy.pdf"
                  target="_blank"
                >
                  License & Agreement
                </a>
              </Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              Register
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const SignupForm = Form.create()(Signup);

export default SignupForm;
