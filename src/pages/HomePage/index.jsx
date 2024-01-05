import React from "react";
import useQuery from "../../hooks/useQuery";
import HeroSection from "./HeroSection";
import CourseComingSection from "./CourseComingSection";
import CoursesSection from "./CoursesSection";
import TeacherSection from "./TeacherSection";
import FeaturedSection from "./FeaturedSection";
import TestimonialSection from "./TestimonialSection";
import FaqSection from "./FaqSection";
import GallerySection from "./GallerySection";
import CallRegisterSection from "./CallRegisterSection";
import { CourseTypes } from "@constants/general";
import { courseService } from "../../services/courseService";
import { teamService } from "@services/teamService";
import { questionService } from "@services/questionService";
import { galleryService } from "@services/galleryService";

const HomePage = () => {
  // Courses and Coming courses Section
  const { data: coursesData, loading: coursesLoading } = useQuery(
    courseService.getCourses
  );

  const courses = coursesData?.courses;

  const comingCourses =
    courses?.filter((course) => {
      return course?.startDate && new Date(course.startDate) > new Date();
    }) || []; //Cho < hơn để có data test

  // Teachers Section
  const { data: teamsData, loading: teamsLoading } = useQuery(
    teamService.getTeams
  );
  const teams = teamsData?.teams || [];

  // Testimomial Section

  // Faq Section
  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionService.getQuestions
  );
  const questions = questionsData?.questions || [];

  // Gallery Section
  const { data: galleriesData, loading: galleriesLoading } = useQuery(
    galleryService.getGalleries
  );
  const galleries = galleriesData?.galleries?.[0]?.images || [];

  return (
    <main className="mainwrapper">
      <HeroSection />
      <CourseComingSection
        courses={comingCourses}
        loading={coursesLoading}
        type={CourseTypes.Coming}
      />
      <CoursesSection
        courses={courses}
        loading={coursesLoading}
        type={CourseTypes.Normal}
      />
      <TeacherSection teachers={teams} loading={teamsLoading} />
      <FeaturedSection />
      <TestimonialSection />
      <FaqSection questions={questions} loading={questionsLoading} />
      <GallerySection galleries={galleries} loading={galleriesLoading} />
      <CallRegisterSection />
    </main>
  );
};

export default HomePage;
