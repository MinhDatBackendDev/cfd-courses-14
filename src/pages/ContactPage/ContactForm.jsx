import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import { regexRule, requireRule } from "../../utils/validate";
import useForm from "../../hooks/useForm";

const rules = {
  name: [requireRule("Vui lòng nhập tên")],
  email: [
    requireRule("Vui lòng nhập email"),
    regexRule("email", "Vui lòng nhập đúng định dạng email"),
  ],
  phone: [
    requireRule("Vui lòng nhập số điện thoại"),
    regexRule("phone", "Vui lòng nhập đúng định dạng số điện thoại"),
  ],
  topic: [requireRule("Vui lòng nhập topic")],
  content: [requireRule("Vui lòng nhập nội dung")],
};

const ContactForm = ({ handleFormSubmit }) => {
  // error for what???
  const { form, error, register, validate } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      topic: "",
      content: "",
    },
    rules
  );

  const _onSubmit = (event) => {
    event.preventDefault();

    // start validate
    const errorObject = validate();
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit error: ", errorObject);
    } else {
      console.log("Submit success: ", form);
      handleFormSubmit?.(form);
    }
  };

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      <Input
        label={"Họ và tên"}
        required
        placeholder={"Họ và tên"}
        {...register("name")}
      />
      <Input
        label={"Email"}
        required
        placeholder={"Email"}
        {...register("email")}
      />
      <Input
        label={"Số điện thoại"}
        required
        placeholder={"Số điện thoại"}
        {...register("phone")}
      />
      <Input
        label={"Chủ đề cần hỗ trợ"}
        required
        renderInput={(inputProps) => {
          return (
            <Select
              options={[
                { value: "", label: "--" },
                { value: "react", label: "ReactJs" },
                { value: "responsive", label: "Web Responsive" },
              ]}
              {...inputProps}
            />
          );
        }}
        {...register("topic")}
      />
      <Input
        label={"Nội dung"}
        placeholder={"Nội dung"}
        required
        renderInput={(inputProps) => {
          return <TextArea {...inputProps} />;
        }}
        {...register("content")}
      />
      <div className="btncontrol">
        <Button onClick={_onSubmit}>Gửi</Button>
      </div>
    </div>
  );
};

export default ContactForm;
