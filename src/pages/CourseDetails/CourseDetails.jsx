import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../HOCs/Layout";
import Introdution from "./components/Introdution/Introdution";
import { actionFetchThongTinKhoaHoc } from "./courseDetailsReducer";
import DetailSideBar from "./components/DetailSideBar/DetailSideBar";
import { BsCheck, BsFillPlayCircleFill, BsClockFill } from "react-icons/bs";
import { Collapse } from "antd";
import Header from "../../components/Header/Header";
import { requestDangKyKhoaHoc, requestHuyGhiDanh } from "./services";
const { Panel } = Collapse;
const CourseDetails = () => {
  const params = useParams();
  const thongTinKhoaHoc = useSelector(
    (store) => store.detailReducer.thongTinKhoaHoc
  );
  const thongTinNguoiDung = useSelector(
    (store) => store.authReducer.userInfo.userBasicInfo
  );
  const getDataSuccess = useSelector(
    (state) => state.detailReducer.getDataSuccess
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(actionFetchThongTinKhoaHoc(params.maKhoaHoc));
  }, [params.maKhoaHoc, dispatch]);
  useEffect(() => {
    if (getDataSuccess === "FAIL") {
      navigate("/");
    }
  }, [getDataSuccess, navigate]);
  const CollapseHeader = (name) => (
    <p className="font-bold text-base pl-2">{name}</p>
  );
  const handleRegister = () => {
    const data = {
      taiKhoan: thongTinNguoiDung.taiKhoan,
      maKhoaHoc: thongTinKhoaHoc.maKhoaHoc,
    };
    const token = localStorage.getItem("elearningToken");
    console.log(data);
    console.log(token);
    requestDangKyKhoaHoc(data, token)
      .then((res) => {
        alert("Đăng ký khóa học thành công.");
        console.log(res.data);
      })
      .catch((err) => {
        alert("Đéo được rồi bạn ơi.");
        console.log(err);
      });
  };
  const handleCancelRegistration = () => {
    const data = {
      taiKhoan: thongTinNguoiDung.taiKhoan,
      maKhoaHoc: params.maKhoaHoc,
    };
    const token = localStorage.getItem("elearningToken");
    requestHuyGhiDanh(data, token)
    .then( (res) => {
      alert("Hủy ghi danh thành công");
      console.log(res);
    })
    .catch( (err) => {
      alert("Hủy ghi danh thất bại");
      console.log(err);
    })
  }
  return (
    <Layout>
      <Header />
      <DetailSideBar handleRegister={handleRegister} handleCancelRegistration={handleCancelRegistration}/>
      <Introdution data={thongTinKhoaHoc} />
      <section className="course-result container mx-auto">
        <div className="course-result__content lg:w-3/5 mt-8 mb-8 p-6 border-solid border border-stone-200">
          <h3 className="font-semibold text-stone-800 text-2xl">
            Kết quả đạt được sau khóa học
          </h3>
          <div className="content__list pt-4">
            <ul className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm text-stone-600">
              <li className="flex items-center justify-start">
                <span>
                  <BsCheck className="text-purple-800" />
                </span>
                <span className="pl-2">
                  Xây dựng 4 dự án website cho riêng bạn, sẵn sàng apply vào vị
                  trí fresher ngay.
                </span>
              </li>
              <li className="flex items-center justify-start">
                <span>
                  <BsCheck className="text-purple-800" />
                </span>
                <span className="pl-2">
                  Có thể tự tay xây dựng bất kỳ một website nào mà bạn muốn.
                </span>
              </li>
              <li className="flex items-center justify-start">
                <span>
                  <BsCheck className="text-purple-800" />
                </span>
                <span className="pl-2">
                  Có thể làm việc như một "freelancer" chính hiệu.
                </span>
              </li>
              <li className="flex items-center justify-start">
                <span>
                  <BsCheck className="text-purple-800" />
                </span>
                <span className="pl-2">Làm chủ backend với nodeJS.</span>
              </li>
              <li className="flex items-center justify-start">
                <span>
                  <BsCheck className="text-purple-800" />
                </span>
                <span className="pl-2">
                  Cập nhật những công nghệ mới nhất của javascript, React,
                  NodeJS và thậm chí là môi trường W3.
                </span>
              </li>
              <li className="flex items-center justify-start">
                <span>
                  <BsCheck className="text-purple-800" />
                </span>
                <span className="pl-2">
                  Tự tay xây dựng website chính thức và webapp cho doanh nghiệp
                  startup của bạn.
                </span>
              </li>
              <li className="flex items-center justify-start">
                <span>
                  <BsCheck className="text-purple-800" />
                </span>
                <span className="pl-2">Làm chủ frontend với ReactJS</span>
              </li>
              <li className="flex items-center justify-start">
                <span>
                  <BsCheck className="text-purple-800" />
                </span>
                <span className="pl-2">
                  Tìm hiểu những best practices của lập trình viên chuyên
                  nghiệp.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="course-lessons container mx-auto ">
        <div className="lg:w-3/5">
          <div className="lessons__total-view pb-4">
            <p className="text-base italic text-stone-800">
              3 chương học - 15 bài học - Tổng thời lượng bài giảng: 65 giờ
            </p>
          </div>
          <Collapse
            defaultActiveKey={[1, 2, 3, 4, 5]}
            style={{
              borderRadius: 0,
            }}
          >
            <Panel header={CollapseHeader("Kiến thức căn bản")} key="1">
              <ul className="text-stone-600">
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Giới thiệu khóa học.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Kiến thức HTML, HTML5 và CSS.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Các loại CSS và cách sử dụng.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Cấu trúc HTML sao cho phù hợp.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Bootstrap và cách sử dụng.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
              </ul>
            </Panel>
            <Panel header={CollapseHeader("300 bài code thiếu nhi")} key="2">
              <ul className="text-stone-600">
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Giới thiệu Javascript.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Biến trong javascript.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Hàm trong javascript.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Cấu trúc câu lệnh điều kiện.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Vòng lặp trong javascript.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
              </ul>
            </Panel>
            <Panel header={CollapseHeader("5 Điều Bác Hồ Dạy")} key="3">
              <ul className="text-stone-600">
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Yêu tổ quốc yêu đồng bào.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Học tập tốt, lao động tốt.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Đoàn kết tốt, kỷ luật tốt.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Giữ gìn vệ sinh thật tốt.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 my-2 tracking-wide">
                  <span className="flex items-center">
                    <BsFillPlayCircleFill className="inline-block mr-5 text-purple-700 text-lg" />
                    Khiêm tốn, thật thà, dũng cảm.
                  </span>
                  <span className="flex items-center font-bold">
                    <BsClockFill className="mr-2 text-purple-600" />
                    10:50
                  </span>
                </li>
              </ul>
            </Panel>
          </Collapse>
        </div>
      </section>
      <section className="more-course"></section>
    </Layout>
  );
};
export default CourseDetails;
