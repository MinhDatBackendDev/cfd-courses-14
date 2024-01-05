import React, { useEffect, useState } from "react";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import { ROLES } from "@constants/roles";
import { useNavigate, useParams } from "react-router-dom";
import useMutation from "@hooks/useMutation";
import { courseService } from "@services/courseService";
import { formatCurrency } from "@utils/format";
import useForm from "@hooks/useForm";
import { useAuthContext } from "@context/AuthContext";
import { regexRule, requireRule } from "@utils/validate";
import Button from "@components/Button";
import { orderService } from "@services/orderService";
import { message } from "antd";
import { PATHS } from "@constants/path";

const CourseOrderPage = () => {
  // Handle getCourseBySlug when courseSlug param change
  const { courseSlug } = useParams();
  const { data: courseDetailData, execute: executeCourseDetail } = useMutation(
    courseService.getCourseBySlug
  );

  useEffect(() => {
    if (courseSlug) executeCourseDetail(courseSlug, {});
  }, [courseSlug]);

  // Modify render data
  const { teams, price, tags } = courseDetailData || {};

  // Child props
  const InfoOrderProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.Teacher)) || {},
    price: formatCurrency(price),
  };

  const {
    profile,
    courseInfo,
    handleGetProfileCourse,
    handleGetProfilePayment,
  } = useAuthContext();

  console.log(courseInfo);

  const {
    firstName: profileName,
    email: profileEmail,
    phone: profilePhone,
  } = profile || {};

  // Handle profile form
  const { form, register, validate, setForm } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      type: "",
    },
    {
      name: [requireRule("Vui lòng nhập tên")],
      email: [
        requireRule("Vui lòng nhập email"),
        regexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      phone: [
        requireRule("Vui lòng nhập phone"),
        regexRule("phone", "Vui lòng nhập đúng định dạng phone"),
      ],
      type: [requireRule("Vui lòng chọn hình thức học")],
    }
  );

  const isAlreadyOrder = courseInfo?.some(
    (item) => item?.course?.slug === courseSlug
  );

  useEffect(() => {
    if (isAlreadyOrder) {
      const orderCourseInfo = courseInfo?.find(
        (item) => item?.course?.slug === courseSlug
      );
      setForm({
        name: orderCourseInfo?.name,
        phone: orderCourseInfo?.phone,
        type: orderCourseInfo?.type,
        paymentMethod: orderCourseInfo?.paymentMethod,
      });
      setPaymentMethod(orderCourseInfo?.paymentMethod);
    } else {
      setForm({
        name: profileName,
        email: profileEmail,
        phone: profilePhone,
        type: "",
      });
    }
  }, [courseInfo, isAlreadyOrder, profileName, profileEmail, profilePhone]);

  // Handle paymentMethod change
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };

  const navigate = useNavigate();

  // Handle when user click order this course
  const { loading: orderLoading, execute: orderCourse } = useMutation(
    orderService.orderCourse
  );

  const _onOrder = () => {
    const profileError = validate();

    if (Object.keys(profileError).length > 0) {
      console.log("Profile form validate failed", profileError);
    } else {
      if (paymentMethod) {
        // setup payload
        const payload = {
          name: form?.name,
          phone: form?.phone,
          course: courseDetailData?.id,
          type: form.type,
          paymentMethod,
        };
        // call api order
        orderCourse(payload, {
          onSuccess: async () => {
            message.success("Đăng ký thành công!");
            await handleGetProfileCourse();
            await handleGetProfilePayment();
            navigate(PATHS.PROFILE.MY_COURSE);
          },
          onFail: () => {
            message.error("Đăng ký thất bại!");
          },
        });
      } else {
        message.error("Vui lòng chọn hình thức thanh toán");
      }
    }
  };

  console.log("courseInfo", courseInfo);

  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder {...InfoOrderProps} />
          <FormOrder
            register={register}
            types={tags}
            disabled={isAlreadyOrder}
          />
          <PaymentOrder
            handleChange={handlePaymentMethodChange}
            selectedPayment={paymentMethod}
            disabled={isAlreadyOrder}
          />
          <Button
            style={{ width: "100%" }}
            onClick={_onOrder}
            disabled={isAlreadyOrder}
            loading={orderLoading}
          >
            <span>{isAlreadyOrder ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
