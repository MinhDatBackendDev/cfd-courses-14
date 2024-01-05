import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { useAuthContext } from "@/context/AuthContext";
import useForm from "@/hooks/useForm";
import { regexRule, requireRule } from "@/utils/validate";
import React, { useEffect } from "react";

const rules = {
  firstName: [requireRule("Vui lòng nhập tên")],
  email: [
    requireRule("Vui lòng nhập email"),
    regexRule("email", "Vui lòng nhập đúng định dạng email"),
  ],
  phone: [
    requireRule("Vui lòng nhập phone"),
    regexRule(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Vui lòng nhập đúng định dạng phone"
    ),
  ],
  password: [requireRule("Vui lòng nhập mật khẩu")],
};

const MyInfo = () => {
  const { profile, handleUpdateProfile } = useAuthContext();
  const { form, setForm, register, validate } = useForm(
    {
      firstName: "",
      email: "",
      phone: "",
      password: "********",
      facebookURL: "",
      website: "",
      introduce: "",
    },
    rules
  );

  const _onSubmit = (e) => {
    e.preventDefault();
    const errorObject = validate();
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit error: ", errorObject);
    } else {
      handleUpdateProfile?.(form);
    }
  };

  useEffect(() => {
    if (profile) {
      setForm({ ...form, ...profile });
    }
  }, [profile]);

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form action="#" className="form">
        <div className="form-container">
          <Input
            label="Họ và tên"
            required
            placeholder="Họ và tên"
            {...register("firstName")}
          />
          <Input
            label="Số điện thoại "
            required
            placeholder="Số điện thoại"
            {...register("phone")}
          />
        </div>
        <div className="form-container">
          <Input
            label="Email"
            required
            placeholder="Email"
            {...register("email")}
            disabled
          />
          <Input
            label="Mật khẩu"
            required
            placeholder="Mật khẩu"
            {...register("password")}
            disabled
          />
        </div>
        <Input
          label="Facebook URL"
          required
          placeholder="Facebook URL"
          {...register("facebookURL")}
        />
        <Input
          label="Website"
          required
          placeholder="Website"
          {...register("website")}
        />
        <Input
          label="Giới thiệu bản thân"
          required
          renderInput={(inputProps) => {
            return <TextArea {...inputProps} />;
          }}
          {...register("introduce")}
        />
        <Button style={{ width: "100%" }} variant="primary" onClick={_onSubmit}>
          Gửi
        </Button>
      </form>
    </div>
  );
};

export default MyInfo;
