// components/Accordion/index.jsx
import { Empty } from "antd";
import { useState } from "react";

const Accordion = ({ label = "", data = [], defaultActiveIndex = -1 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  //   useEffect(() => {
  //     function accordion() {
  //       $(document).on(
  //         "click",
  //         ".accordion .accordion__content-title",
  //         function () {
  //           $(this).next().stop().slideToggle(200);
  //           $(this).closest(".accordion__content").toggleClass("active");
  //           $(this)
  //             .closest(".accordion__content")
  //             .siblings(".active")
  //             .removeClass("active")
  //             .find(".accordion__content-text")
  //             .stop()
  //             .slideUp(200);
  //         }
  //       );
  //     }
  //     accordion();
  //   }, []);

  return (
    <div className="accordion">
      {label && <h3 className="accordion__title label">{label}</h3>}
      {data?.length > 0 ? (
        data.map((item, index) => {
          const { id, title, content } = item || {};
          return (
            <div
              key={id || index}
              className={`accordion__content ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div
                className="accordion__content-title"
                onClick={() =>
                  setActiveIndex(index === activeIndex ? -1 : index)
                }
              >
                <h4>
                  <strong>{title || ""}</strong>
                </h4>
              </div>
              <div className="accordion__content-text">{content || ""}</div>
            </div>
          );
        })
      ) : (
        <Empty
          description="Không tìm thấy dữ liệu nào"
          style={{ margin: "0 auto" }}
        />
      )}
    </div>
  );
};

export default Accordion;
