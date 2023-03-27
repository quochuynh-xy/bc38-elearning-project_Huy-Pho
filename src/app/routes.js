// Import tất cả các trang đã làm vào đây để quản lý
import Home from "../pages/Home/Home";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import SearchingCourses from "../pages/SearchingCourses/SearchingCourses";
import CourseGroup from "../pages/CourseGroup/CourseGroup";
import AllCourses from "../pages/AllCourses/AllCourses";
import Authentication from "../pages/Authentication/Authentication";
import UserProfile from "../pages/UserProfile/UserProfile";
export const routes = [
  {
    path: "/",
    Component: Home,
    isPublic: true,
    isAuth: false,
  },
  {
    path: "/chiTiet/:maKhoaHoc",
    Component: CourseDetails,
    isPublic: false,
    isAuth: false,
  },
  {
    path: "/timKiem/:tuKhoa",
    Component: SearchingCourses,
    isPublic: false,
    isAuth: false,
  },
  {
    path: "/danhMuc/:tenDanhMuc",
    Component: CourseGroup,
    isPublic: false,
    isAuth: false,
  },
  {
    path: "/tatCaKhoaHoc/",
    Component: AllCourses,
    isPublic: false,
    isAuth: false,
  },
  {
    path: "/thamGia",
    Component: Authentication,
    isPublic: false,
    isAuth: false,
  },
  {
    path: "/caNhan",
    Component: UserProfile,
    isPublic: false,
    isAuth: false,
  },
//   {
//     path: "*",
//     Component: PageNotFound,
//     isPublic: false,
//     isAuth: false,
//   },
];
