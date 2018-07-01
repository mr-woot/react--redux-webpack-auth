import React from "react";
import { connect } from "react-redux";
import { getCountryCodes } from "../../_helpers/utils";
import { Form, Input, Icon, Row, Col, Button } from "antd";
import { updateSettings } from "../../_actions/auth_actions";
import { notify } from "../../_helpers/notify";
const FormItem = Form.Item;
const { TextArea } = Input;

@connect(store => {
  return {
    user: store.user
  };
})
class SettingsForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props
          .dispatch(updateSettings(this.props.history, values))
          .then(response => {
            notify("Settings updated successfully", "success");
          })
          .catch(err => {
            notify("Error updating settings", "error");
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { userData } = this.props.user;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 6 }
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
        },
        md: {
          span: 6,
          offset: 8
        }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: false,
                message: "Please input your E-mail!"
              }
            ],
            initialValue: userData.email
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Full Name">
          {getFieldDecorator("fullName", {
            rules: [
              {
                required: false,
                message: "Please input your full name!",
                whitespace: true
              }
            ],
            initialValue: userData.fullName
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Phone Number">
          {getFieldDecorator("phoneNumber", {
            rules: [
              { required: false, message: "Please input your phone number!" }
            ],
            initialValue: userData.phoneNumber
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Country">
          {getFieldDecorator("country", {
            rules: [{ required: false, message: "Please input your country!" }],
            initialValue: userData.country
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Address">
          {getFieldDecorator("address", {
            rules: [{ required: false, message: "Please input your address!" }],
            initialValue: userData.address
          })(
            <TextArea
              placeholder="Please enter your address"
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Trade Factor">
          {getFieldDecorator("tradeFactor", {
            rules: [{ required: false, message: "Please input your trade factor!" }],
            initialValue: userData.tradeFactor
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="API Key">
          {getFieldDecorator("apiKey", {
            rules: [{ required: false, message: "Please input your API Key!" }],
            initialValue: userData.apiKey
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Secret Key">
          {getFieldDecorator("secretKey", {
            rules: [
              { required: false, message: "Please input your Secret Key!" }
            ],
            initialValue: userData.secretKey
          })(<Input />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update Settings
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedSettingsForm = Form.create()(SettingsForm);

export default WrappedSettingsForm;
