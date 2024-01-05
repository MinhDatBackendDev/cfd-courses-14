import Accordion from "@components/Accordion";
import React from "react";

const FaqSection = ({ questions = [], loading = false }) => {
  const modifiedQuestions =
    questions?.map((item) => {
      const { id, question, answer } = item || {};
      return {
        id,
        title: question,
        content: answer,
      };
    }) || [];
  const commonQuestions = modifiedQuestions.slice(0, 6);
  const otherQuestions = modifiedQuestions.slice(6);

  return (
    <section className="faq --scpadding">
      <div className="container">
        <div className="faq__inner">
          <div className="heading --noline --center">
            <h2 className="heading__title title --t2">
              Câu hỏi <span className="color--primary">thường gặp</span>
            </h2>
          </div>
          <div className="faq__list">
            {!loading && (
              <Accordion label="Thông tin chung" data={commonQuestions} />
            )}
            {!loading && (
              <Accordion label="Đăng ký, thanh toán" data={otherQuestions} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
