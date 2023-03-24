import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ItemWide from "../../components/CourseItemWide/ItemWide";
import { actionFetchKhoaHocTheoDanhMuc } from "./courseGroupReducer";
import FilterBar from "../../components/FilterBar/FilterBar";
import Layout from "../../HOCs/Layout";
import "animate.css";
import Pagination from "../../components/Pagination/Pagination";
import _ from "lodash";
import { BsFilter } from "react-icons/bs";
import Header from "../../components/Header/Header";
const CourseGroup = () => {
  const courseList = useSelector(
    (state) => state.courseGroupReducer.danhSachKhoaHoc
  );
  const loadingStatus = useSelector(
    (store) => store.courseGroupReducer.loadStatus
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [spiltedData, setSplitedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  // Đổi tên tiêu đề
  useEffect(() => {
    document.title = "Danh mục khóa học - Edemy";
  }, []);
  // Fetch khóa học
  useEffect(() => {
    const action = actionFetchKhoaHocTheoDanhMuc(params.tenDanhMuc);
    dispatch(action);
  }, [dispatch, params.tenDanhMuc]);
  // Tách trang khóa học
  useEffect(() => {
    const newData = _.chunk(courseList, pageSize);
    if (newData.length) {
      setSplitedData(newData);
    }
  }, [courseList]);
  // Hiện số trang
  useEffect(() => {
    const page = +searchParams.get("page");
    if (page) {
      console.log("số trang ",page);
      setCurrentPage(page * 1);
    } else {
      setCurrentPage(1)
    }
  }, [searchParams]);
  const handleSubscribe = () => {
    console.log("Đây là trang danh mục khóa học");
  }
  const ControlDisplay = useCallback(() => {
    if (loadingStatus === "PENDING") {
      return (
        <div className="pt-12 text-center text-xl italic">
          <p className="animate__animated animate__bounce animate__infinite">
            Đang tải dữ liệu, vui lòng chờ trong giây lát...
          </p>
        </div>
      );
    } else if (spiltedData.length) {
      if(!spiltedData[currentPage-1]) {
        return navigate("/")
      }
      return spiltedData[currentPage - 1].map((item, index) => (
        <ItemWide data={item} key={index} handleSubscribe={handleSubscribe}/>
      ));
    }
  }, [loadingStatus, spiltedData, currentPage, navigate]);
  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
    setSearchParams({ page: page });
  };

  return (
    <Layout>
    <Header/>
      <section className="search-info container mx-auto py-8">
        <h3 className="text-stone-800 text-2xl font-bold pb-4">
          Danh sách các khóa học{" "}
          {courseList[0] && courseList[0].danhMucKhoaHoc.tenDanhMucKhoaHoc}
        </h3>
        <div className="search-info__action flex items-end justify-between">
          <div className="search-info-action__actions">
            <button className="flex items-center justify-center text-2xl border-2 border-solid border-stone-900 h-14 w-32 hover:bg-stone-200 duration-200">
              <BsFilter />{" "}
              <span className="pl-3 text-base font-bold">Bộ lọc (2)</span>
            </button>
          </div>
          <h3 className="search-info-action__result text-xl text-stone-600 font-bold">
            {courseList.length} kết quả
          </h3>
        </div>
      </section>
      <FilterBar className="" />
      <section className="container mx-auto">
        <div className="ml-auto lg:w-4/5 pl-3">
          <ControlDisplay />
          <Pagination
            className="py-6"
            current={currentPage}
            total={courseList.length}
            pageSize={pageSize}
            onChange={handleChangePage}
          />
        </div>
      </section>
    </Layout>
  );
};
export default CourseGroup;
