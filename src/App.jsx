import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseOrderPage from "./pages/CourseOrderPage";
import CoursesPage from "./pages/CoursesPage";
import HomePage from "./pages/HomePage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PrivacyPage from "./pages/PrivacyPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import Page404 from "./pages/Page404";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyInfo from "./pages/StudentProfilePage/MyInfo";
import MyCourse from "./pages/StudentProfilePage/MyCourse";
import MyPayment from "./pages/StudentProfilePage/MyPayment";
import { PATHS } from "./constants/path";
import PrivateRoute from "@components/PrivateRoute";

function App() {
  $(document).ready(function () {
    $(window).on("load", () => {
      $(".loading").addClass("--hide");
    });
  });

  const a = 5;
  return (
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
            <Route path={PATHS.PROFILE.INDEX} element={<StudentProfilePage />}>
              <Route index element={<MyInfo />} />
              <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
              <Route path={PATHS.PROFILE.MY_PAYMENT} element={<MyPayment />} />
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
  );
}

export default App;
