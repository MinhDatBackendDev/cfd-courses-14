import FaqSection from "@pages/HomePage/FaqSection";
import HeaderTop from "./HeaderTop";
import HeroSection from "./HeroSection";
import ContentDetailSection from "./ContentDetailSection";
import FeaturedSection from "./FeaturedSection";
import CoursesSection from "./CoursesSection";
import { useParams } from "react-router-dom";
import useQuery from "@hooks/useQuery";
import { questionService } from "@services/questionService";
import { courseService } from "@services/courseService";
import useMutation from "@hooks/useMutation";
import { useEffect } from "react";
import { formatCurrency, formatDate } from "@utils/format";
import useDebounce from "@hooks/useDebounce";
import PageLoading from "@components/PageLoading";
import { ROLES } from "@constants/roles";

const CourseDetailPage = () => {
  const params = useParams();
  const { courseSlug } = params;
  const { data: questionsData, loading: questionLoading } = useQuery(
    questionService.getQuestions
  );
  const { data: courseData, loading: courseLoading } = useQuery(
    courseService.getCourses
  );
  const {
    data: courseDetailData,
    loading: courseDetailLoading,
    execute,
  } = useMutation(courseService.getCourseBySlug);

  useEffect(() => {
    if (courseSlug) execute(courseSlug || "", {});
  }, [courseSlug]);

  // Modify data
  const questions = questionsData?.questions || [];
  const courses = courseData?.courses || [];
  const orderLink = `/course-order/` + courseSlug;

  const { teams, startDate, price } = courseDetailData || {};
  const modifiedProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.Teacher)),
    startDate: formatDate(startDate || ""),
    price: formatCurrency(price),
    orderLink,
  };

  const apiLoading = courseDetailLoading || questionLoading || courseLoading;

  const pageLoading = useDebounce(apiLoading, 500);

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <HeaderTop {...modifiedProps} />
      <main className="mainwrapper coursedetailpage">
        <HeroSection {...modifiedProps} />
        <ContentDetailSection {...modifiedProps} />
        <FeaturedSection {...modifiedProps} />
        <FaqSection questions={questions} loading={questionLoading} />
        <CoursesSection courses={courses} loading={courseLoading} />
      </main>
    </>
  );
};

export default CourseDetailPage;
