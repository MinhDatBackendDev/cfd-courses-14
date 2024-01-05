import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import useForm from "@/hooks/useForm";
import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { regexRule, requireRule } from "@/utils/validate";
import { message } from "antd";
import ComponentLoading from "../ComponentLoading";

const LoginForm = () => {
  const { handleShowModal, handleCloseModal, handleLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { form, register, validate } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: [
        requireRule("Vui lòng nhập email"),
        regexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      password: [requireRule("Vui lòng nhập password")],
    }
  );
  const _onSubmit = async (e) => {
    e.preventDefault();
    const errObj = validate();
    if (Object.keys(errObj)?.length > 0) {
      console.log("Submit error", errObj);
    } else {
      console.log("Submit success", form);
      setLoading(true);
      handleLogin?.({ ...form }, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  };
  return (
    <div
      className="modal__wrapper-content mdlogin active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdregister"
          onClick={() => handleShowModal(MODAL_TYPES.Register)}
        >
          <strong>Đăng ký</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form">
        <Input
          label="Email"
          placeholder="Email"
          required
          {...register("email")}
        />
        <Input
          label="Password"
          placeholder="Password"
          required
          type="password"
          {...register("password")}
        />
        <Button className="form__btn-register" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
