// import React from "react";
// import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout,LayoutIndex,LayoutSignPage } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddQuestions from "./views/AddQuestions";
import Errors from "./views/Errors";
import Topics from "./views/topics";
import Vocabulary from "./views/vocabulary"
import Index from "./views/Index"
import Home from "./views/Home";
import AddVideo from "./views/AddVideo";
import TeacherDashBoard from './views/TeacherDashBoard';
import MediaList from './views/mediaList';
import Test from './views/Test';
import Send from './views/sendTest';
import TestFilter from './views/testFilter';
import AddVocabulary from "./views/addVocabulary";
import Books from "./views/Books";
import AddBook from "./views/addBook";
export default [
  {
    path: "/login",
    layout: LayoutIndex,
    component: Index
  },
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: Home,
    private:true,
    claim:"student"
  },
  {
    path: "/add-video",
    layout: DefaultLayout,
    component: AddVideo,
    private:true,
    claim:"teacher"
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview,
    private:true,
    claim:"student"
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite,
    private:true,
    claim:"student"
  },
  {
    path: "/add-test",
    layout: DefaultLayout,
    component: AddQuestions,
    private:true,
    claim:"teacher"
  },
  {
    path: "/test",
    layout: LayoutSignPage,
    component: Test,
    private:true,
    claim:"student"
  },
  {
    path: "/test-filer",
    layout: DefaultLayout,
    component: TestFilter,
    private: true,
    claim: "student"
  },
  {
    path: "/topics",
    layout: DefaultLayout,
    component: Topics,
    private: true,
    claim: "student"
  },
  {
    path: "/vocabularies",
    layout: DefaultLayout,
    component: Vocabulary,
    private: true,
    claim: "student"
  },
  {
    path: "/books",
    layout: DefaultLayout,
    component: Books,
    private: true,
    claim: "student"
  },
  {
    path: "/teacher-dashboard",
    layout: DefaultLayout,
    component: TeacherDashBoard,
    private:true,
    claim:"teacher"
  },
  {
    path: "/media",
    layout: DefaultLayout,
    component: MediaList,
    private:true,
    claim:"teacher"
  },
  {
    path: "/send",
    layout: DefaultLayout,
    component: Send,
    private:true,
    claim:"teacher"
  },
  {
    path: "/add-vocabulary",
    layout: DefaultLayout,
    component: AddVocabulary,
    private: true,
    claim: "teacher"
  },
  {
    path: "/add-book",
    layout: DefaultLayout,
    component: AddBook,
    private: true,
    claim: "teacher"
  },
  {
    path: "/error",
    layout: DefaultLayout,
    component: Errors
  },
];
