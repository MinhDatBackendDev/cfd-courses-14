import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./constants/path";
import PrivateRoute from "@components/PrivateRoute";
import { Suspense, lazy } from "react";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const CourseOrderPage = lazy(() => import("./pages/CourseOrderPage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PaymentMethodPage = lazy(() => import("./pages/PaymentMethodPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const StudentProfilePage = lazy(() => import("./pages/StudentProfilePage"));
const Page404 = lazy(() => import("./pages/Page404"));
const MyInfo = lazy(() => import("./pages/StudentProfilePage/MyInfo"));
const MyCourse = lazy(() => import("./pages/StudentProfilePage/MyCourse"));
const MyPayment = lazy(() => import("./pages/StudentProfilePage/MyPayment"));

function App() {
  $(document).ready(function () {
    $(window).on("load", () => {
      $(".loading").addClass("--hide");
    });
  });

  const a = 5;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<MainLayout />}>
            <Route index element={<HomePage />} />

            <Route path={PATHS.COURSE.INDEX} element={<CoursesPage />}></Route>
            <Route path={PATHS.COURSE.DETAIL} element={<CourseDetailPage />} />

            <Route path={PATHS.BLOG.INDEX} element={<BlogPage />} />
            <Route path={PATHS.BLOG.DETAIL} element={<BlogDetailPage />} />

            <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
              <Route path={PATHS.COURSE.ORDER} element={<CourseOrderPage />} />
              <Route
                path={PATHS.PROFILE.INDEX}
                element={<StudentProfilePage />}
              >
                <Route index element={<MyInfo />} />
                <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
                <Route
                  path={PATHS.PROFILE.MY_PAYMENT}
                  element={<MyPayment />}
                />
              </Route>
            </Route>

            <Route path={PATHS.PAYMENT} element={<PaymentMethodPage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />

            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
