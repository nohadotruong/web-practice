import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { UserRepository } from "../repositories/UserRepository";
import { RoleRepository } from "../repositories/RoleRepository";
import { FacultyRepository } from "../repositories/FacultyRepository";
import { AdClassRepository } from "../repositories/AdClassRepository";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [adclass, setAdClass] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const u = await UserRepository.getUserById(userId);
      const r = await RoleRepository.getRole(u.vaitro);
      const f = await FacultyRepository.getFaculty(u.khoa);
      const adc = await AdClassRepository.getAdClass(u.lop);

      setUser(u);
      setRole(r.vaitro);
      setFaculty(f.ten);
      setAdClass(adc.ten);
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, role, faculty, adclass }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
