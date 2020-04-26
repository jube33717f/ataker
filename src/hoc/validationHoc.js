import React, { Component } from "react";
import { validators } from "./validator";
import { withRouter } from "react-router-dom"
// TODO @SONIA

export default (WrappedComponent, requiredFields) => {

  class ValidationHoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errors: {},
        values: {},
        errMsg: '',
      };
    }

    setHocData = (data) => {
      this.setState({
        values: {
          ...this.state.values,
          ...data
        }
      });
    }

    onChange = async (event) => {
      event.persist();
      let { name, value } = event.target;
      await this.setState({
        values: {
          ...this.state.values,
          [name]: value
        }
      });
      if (Object.keys(this.state.errors).length > 0) {
        this.checkValidationErrors(event);
      }
    };

    // check validators of all elements in this.state.values and set errors[field]
    checkValidationErrors = (event) => {

      let validationErrors = {};
      if (event) {
        let { name, value } = event.target;
        const validator = validators[name];

        if (validator && typeof validator.func === "function") {
          if (!validator.func(this.state.values[name])) {
            validationErrors[name] = validator.msg;
          } else {
            validationErrors[name] = ""; //修复违背validator逻辑的用户输入
          }
        }
        else {
          //如果只在if (!validator.func(this.state.values[event.target.name])) 的后面加上这个else，不能让第一次出现requiredfields的错误在用户第二次输入时修复
          validationErrors[name] = "";
          if (requiredFields && requiredFields.includes(name) && !this.state.values[name]) {
            validationErrors[name] = "Please complete this required field";
          }
        }
      }
      else {
        Object.keys(this.state.values).forEach(
          field => {
            const validator = validators[field];
            if (validator && typeof validator.func === "function") {
              if (!validator.func(this.state.values[field])) {
                validationErrors[field] = validator.msg;
              } else {
                validationErrors[field] = "";
              }
            }
          }
        );
      }

      let requiredFieldErrors = {};
      if (Array.isArray(requiredFields)) {
        requiredFields.forEach((field) => {
          if (!(this.state.values[field])) {
            requiredFieldErrors[field] = 'Please complete this required field'
          }
        })
      }

      this.setState({
        errors: {
          ...this.state.errors,
          ...validationErrors,
          ...requiredFieldErrors
        }
      });
    }

    /// 被包裹的组件在submit表单的时候调用，确保所有条目没有任何错误
    // fieldsToCheck是提交分页表单的每一页时传递的数组，包含了当前页面的fields
    okToSubmit = async () => {
      await this.checkValidationErrors();
      let inputValid = true;
      if (Object.keys(this.state.errors)) {
        inputValid = Object.keys(this.state.errors).every((field, index) => {
          return this.state.errors[field] === "";
        });
      }
      return inputValid;
    };


    render() {
      const hocProps = {
        onChange: this.onChange,
        okToSubmit: this.okToSubmit,
        checkValidationErrors: this.checkValidationErrors,
        setHocData: this.setHocData,
        values: this.state.values,
        errors: this.state.errors
      };
      return <WrappedComponent {...hocProps} {...this.props} />;
    }
  }

  return withRouter(ValidationHoc);
};
