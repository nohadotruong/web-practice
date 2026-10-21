import React, { useEffect, useState } from "react";

import UserRepository from "../../repositories/UserRepository";

import { FacultyRepository } from "../../repositories/FacultyRepository";
import { AdClassRepository } from "../../repositories/AdClassRepository";

import "./UserManager.css";

export default function UserManager() {
  const [user, setUser] = useState(null);
  // const user = UserRepository.getUserInfoFromLocal();
  const [userList, setUserList] = useState([]);
  const [facultyMap, setFacultyMap] = useState({});
  const [adClassMap, setAdClassMap] = useState({});

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const u = UserRepository.getUserInfoFromLocal();
    setUser(u);
  }, []);

  useEffect(() => {
    if (
      user &&
      user?.vaitro !== undefined &&
      activeTab === ""
    ) {
      document.title = user?.role + " | Thông tin cá nhân";
      setActiveTab(user?.vaitro);
    }
  }, [user]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (activeTab !== "") {
        const users =
          await UserRepository.getAllUsersByRole(activeTab);
        setUserList(users);
      }
    };
    fetchUsers();
  }, [activeTab]);

  useEffect(() => {
    console.log(userList);
  }, [userList]);

  useEffect(() => {
    const fetchMappings = async () => {
      const faculties =
        await FacultyRepository.getAllFaculties();
      const adclasses =
        await AdClassRepository.getAllAdClasses();

      const facMap = {};
      faculties.forEach((f) => {
        facMap[f.id] = f.ten;
      });
      setFacultyMap(facMap);

      const clsMap = {};
      adclasses.forEach((c) => {
        clsMap[c.id] = c.ten;
      });
      setAdClassMap(clsMap);
    };

    fetchMappings();
  }, []);

  return (
    <div className="um-wrapper m-3 p-2">
      <div className="add-bar mb-2">
        <button className="add-btn w-100 p-1">
          Thêm người dùng
        </button>
        <div className="add-form mt-2 p-2 d-none">
          <form>
            <div className="mb-3 row">
              <div className="row d-flex                    justify-content-center align-items-center info-content m-0">
                <div className="col-12 col-lg-4 mb-2">
                  <label className="mb-1 ms-1">Họ</label>
                  <br />
                  <input
                    className="w-100 p-1 ps-2"
                    type="text"
                  />
                </div>
                <div className="col-12 col-lg-4 mb-2">
                  <label className="mb-1 ms-1">Tên</label>
                  <br />
                  <input
                    className="w-100 p-1 ps-2"
                    type="text"
                  />
                </div>
                <div className="col-12 col-lg-4 mb-2">
                  <label className="mb-1 ms-1">
                    Họ và tên
                  </label>
                  <br />
                  <input
                    className="w-100 p-1 ps-2"
                    type="text"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row w-100 d-flex align-items-center justify-content-center m-0">
              <button
                className="save-btn col-lg-5 col-md-12 m-1"
                type="submit"
              >
                Lưu
              </button>
              <button className="reset-btn col-lg-5 col-md-12 m-1">
                Xóa
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="tab-bar">
        {user?.vaitro == 0 ? (
          <div
            className={`tab-btn ${
              activeTab == 0 ? "active" : ""
            }`}
            onClick={() => setActiveTab(0)}
          >
            Admin
          </div>
        ) : (
          ""
        )}

        <div
          className={`tab-btn ${
            activeTab == 1 ? "active" : ""
          }`}
          onClick={() => setActiveTab(1)}
        >
          Giảng viên
        </div>
        <div
          className={`tab-btn ${
            activeTab == 2 ? "active" : ""
          }`}
          onClick={() => setActiveTab(2)}
        >
          Sinh viên
        </div>
      </div>

      <div className="um-content w-100">
        {activeTab == 0 && (
          <table className="table table-striped table-hover text-center w-100">
            <thead>
              <tr>
                <th scope="col">Mã NV</th>
                <th scope="col">Họ và tên</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">Nơi sinh</th>
                <th scope="col">Giới tính</th>
                <th scope="col">Năm công tác</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 ? (
                userList.map((u, index) => (
                  <tr key={u.id || index}>
                    <td>{u.maso}</td>
                    <td>{u.hoten}</td>
                    <td>{u.ngaysinh}</td>
                    <td>{u.noisinh}</td>
                    <td>{u.gioitinh}</td>
                    <td>{u.nambatdau}</td>
                    <td>
                      <i className="bi bi-pencil-square text-warning"></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab == 1 && (
          <table className="table table-striped table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Mã GV</th>
                <th scope="col">Họ và tên</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">Nơi sinh</th>
                <th scope="col">Giới tính</th>
                <th scope="col">Khoa</th>
                <th scope="col">Lớp quản lý</th>
                <th scope="col">Năm công tác</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 ? (
                userList.map((u, index) => (
                  <tr key={u.id || index}>
                    <td>{u.maso}</td>
                    <td>{u.hoten}</td>
                    <td>{u.ngaysinh}</td>
                    <td>{u.noisinh}</td>
                    <td>{u.gioitinh}</td>
                    <td>{facultyMap[u.khoa]}</td>
                    <td>{adClassMap[u.lop]}</td>
                    <td>{u.nambatdau}</td>
                    <td>
                      <i className="bi bi-pencil-square text-warning"></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab == 2 && (
          <table className="table table-striped table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Mã SV</th>
                <th scope="col">Họ và tên</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">Nơi sinh</th>
                <th scope="col">Giới tính</th>
                <th scope="col">Lớp</th>
                <th scope="col">Khóa</th>
                <th scope="col">Khóa</th>
                <th scope="col">Năm nhập học</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 ? (
                userList.map((u, index) => (
                  <tr key={u.id || index}>
                    <td>{u.maso}</td>
                    <td>{u.hoten}</td>
                    <td>{u.ngaysinh}</td>
                    <td>{u.noisinh}</td>
                    <td>{u.gioitinh}</td>
                    <td>{adClassMap[u.lop]}</td>
                    <td>{u.nienkhoa}</td>
                    <td>{facultyMap[u.khoa]}</td>
                    <td>{u.nambatdau}</td>
                    <td>
                      <i className="bi bi-pencil-square text-warning"></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
