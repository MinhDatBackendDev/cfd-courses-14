import CourseItem from "@components/CourseItem/CourseItem";
import useDebounce from "@hooks/useDebounce";
import useQuery from "@hooks/useQuery";
import { courseService } from "@services/courseService";
import { Empty, Skeleton } from "antd";
import React from "react";

const CoursesPage = () => {
  const { data, loading: apiLoading } = useQuery(courseService.getCourses);
  const courses = data?.courses || [];

  const loading = useDebounce(apiLoading, 300);

  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        <div className="courses__list">
          {!loading && courses?.length === 0 && (
            <Empty
              description="Không tìm thấy dữ liệu nào"
              style={{ margin: "0 auto" }}
            />
          )}
          {loading &&
            Array(4)
              .fill("")
              .map((_, index) => (
                <div
                  key={index}
                  className="courses__list-item"
                  style={{
                    height: "50vh",
                  }}
                >
                  <Skeleton active />
                  <br />
                  <Skeleton active />
                </div>
              ))}
          {courses?.length > 0 &&
            !loading &&
            courses.map((course, index) => {
              return <CourseItem key={course?.id || index} {...course} />;
            })}
        </div>
      </div>
    </main>
  );
};

export default CoursesPage;
