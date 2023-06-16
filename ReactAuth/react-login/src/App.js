import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'C:/Users/Computergy World/Desktop/ReactAuth/react-login/src/App.css';
import AuthService from './AuthServices/auth.service';
import Login from './basicComponents/login';
import Register from './basicComponents/register';
import Home from './basicComponents/home';
import Profile from './basicComponents/profile';
import BoardUser from './basicComponents/board-user';
import BoardAdmin from './basicComponents/board-admin';
import BoardModerator from './basicComponents/board-moderator';
import EventBus from "./common/EventBus";
import NotFound from './backendComponents.js/notFound';
import Customer from './backendComponents.js/TimeTracking/Customer/Customer';
import CustomerList from './backendComponents.js/TimeTracking/Customer/customerList';
import CustomerPerson from './backendComponents.js/TimeTracking/Customer/CustomerPerson';
import UpdateCustomer from './backendComponents.js/TimeTracking/Customer/UpdateCustomer';
import Data from './backendComponents.js/ConfigData/configData'
import DataConfig from './backendComponents.js/ConfigData/AddDataConfig';
import UpdateData from './backendComponents.js/ConfigData/updateData';
import AddFacilitator from './backendComponents.js/Facilitator/addFacilitator';
import Facilitatorlist from './backendComponents.js/Facilitator/facilitatorList';
import UpdateFacilitator from './backendComponents.js/Facilitator/updateFacilitator';
import GroupList from './backendComponents.js/base/Group/GroupList';
import UpdateGroup from './backendComponents.js/base/Group/UpdateGroup';
import Group from './backendComponents.js/base/Group/Group';
import AddPerson from './backendComponents.js/base/Person/AddPerson';
import PersonPhoto from './backendComponents.js/base/Person/PersonPhoto';
import PersonList from './backendComponents.js/base/Person/PersonList';
import UpdatePerson from './backendComponents.js/base/Person/updatePerson';
import UserRock from './backendComponents.js/Role/UserRock';
import UserList from './backendComponents.js/Role/userRockList';
import UpdateUser from './backendComponents.js/Role/UpdateUser';
import UserEmployeeList from './backendComponents.js/Role/userRockEmployee';
import Project from './backendComponents.js/TimeTracking/Project/project';
import ProjectList from './backendComponents.js/TimeTracking/Project/projectList';
import UpdateProject from './backendComponents.js/TimeTracking/Project/UpdateProject';
import BookingEntry from './backendComponents.js/TimeTracking/BookingEntry/bookingEntry';
import BookingEntrylist from './backendComponents.js/TimeTracking/BookingEntry/bookingEntryList';
import UpdatebookingEntry from './backendComponents.js/TimeTracking/BookingEntry/updateBookingEntry';
import AddRate from './backendComponents.js/ComTracking/rate';
import RateList from './backendComponents.js/ComTracking/rateList';
import UpdateRate from './backendComponents.js/ComTracking/updateRate';
import PersonAddress from './backendComponents.js/base/Address/PersonAddress';
import PersonAddressList from './backendComponents.js/base/Address/PersonAddressList';
import UpdateAddress from './backendComponents.js/base/Address/UpdateAddress';
import FacilitatorAddressList from './backendComponents.js/base/Address/FacilitatorAddressList';
import FacilitatorAddress from './backendComponents.js/base/Address/FacilitatorAddress';
import CustomerAddress from './backendComponents.js/base/Address/CustomerAddress';
import CustomerAddressList from './backendComponents.js/base/Address/CustomerAddressList';
import CustomerEmployee from './backendComponents.js/base/Employee/CustomerEmployee';
import CustomerEmployeeList from './backendComponents.js/base/Employee/CustomerEmployeeList';
import RateEmployee from './backendComponents.js/base/Employee/RateEmployee';
import RateEmployeeList from './backendComponents.js/base/Employee/RateEmployeeList';
import UpdateEmployee from './backendComponents.js/base/Employee/UpdateEmployee';
import BookingEntryEmployee from './backendComponents.js/base/Employee/BookingEntryEmployee';
import BookingEntryEmployeeList from './backendComponents.js/base/Employee/BookingEntryEmployeeList';
import BookingEntryRate from './backendComponents.js/ComTracking/BookingEntryRate';
import BookingEntryProject from './backendComponents.js/TimeTracking/Project/BookingEntryProject';
import ProjectRoleList from './backendComponents.js/TimeTracking/ProjectRole/projectRoleList';
import UpdateProjectRole from './backendComponents.js/TimeTracking/ProjectRole/UpdateProjectRole';
const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>

      <nav className="navbar navbar-expand  navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Rockware
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />

          <Route path={"/customerList"} element={<CustomerList />} />
          <Route path={"/customer/person/get/:id"} element={<CustomerPerson />} />
          <Route path="/customer/update/:id" element={<UpdateCustomer />} />
          <Route path="/add" element={<Customer />} />


          <Route path="/customer/:id/addresses" element={<CustomerAddressList />} />
          <Route path="/customer/:id/address" element={<CustomerAddress />} />
          <Route path="/customer/:id/employee" element={<CustomerEmployee />} />
          <Route path="/customer/:id/employees" element={<CustomerEmployeeList />} />

          <Route path={"/facilitatorList"} element={<Facilitatorlist />} />
          <Route path="/facilitator/update/:id" element={<UpdateFacilitator />} />
          <Route path="/addFacilitator" element={<AddFacilitator />} />
          <Route path="/facilitator/:id/addresses" element={<FacilitatorAddressList />} />
          <Route path="/facilitator/:id/address" element={<FacilitatorAddress />} />


          <Route path="/userRockList" element={<UserList />} />
          <Route path={"/userRock/employees/get/:id"} element={<UserEmployeeList />} />
          <Route path="/addUserRock" element={<UserRock />} />
          <Route path="/user/update/:id" element={<UpdateUser />} />


          <Route path="/groupList" element={<GroupList />} />
          <Route path="/update-group/:id" element={<UpdateGroup />} />
          <Route path="/group" element={<Group />} />

          <Route path="/project/:id/rate" element={<AddRate />} />
          <Route path="/rate/:id" element={<UpdateRate />} />
          <Route path="/project/:id/rates" element={<RateList />} />
          <Route path="/rate/:id/employee" element={<RateEmployee />} />
          <Route path="/rate/:id/employees" element={<RateEmployeeList />} />

          <Route path="/customer/:id/projects" element={<ProjectList />} />
          <Route path="/project/update/:id" element={<UpdateProject />} />
          <Route path="/customer/:id/project" element={<Project />} />

          <Route path="/update-Data/:id" element={<UpdateData />} />
          <Route path={"/Data"} element={<Data />} />
          <Route path="/addData" element={<DataConfig />} />

          <Route path={"/BookingEntry"} element={<BookingEntry />} />
          <Route path={"/bookingEntryList"} element={<BookingEntrylist />} />
          <Route path="/bookingEntry/update/:id" element={<UpdatebookingEntry />} />
          <Route path="/bookingEntry/:id/employees" element={<BookingEntryEmployeeList />} />
          <Route path="/bookingEntry/:id/employee" element={<BookingEntryEmployee />} />
          <Route path="/rate/get/:id" element={<BookingEntryRate />} />
          <Route path="/projectRole/get/:id" element={<ProjectRoleList />} />
          <Route path="/project/get/:id" element={<BookingEntryProject />} />
          <Route path="/projectRole/update/:id" element={<UpdateProjectRole />} />


          <Route path="/addPerson" element={<AddPerson />} />
          <Route path="/personList" element={<PersonList />} />
          <Route path="/person/update/:id" element={<UpdatePerson />} />
          <Route path="/person/:id/photo" element={<PersonPhoto />} />

          <Route path="/person/:id/address" element={<PersonAddress />} />
          <Route path="/person/:id/addresses" element={<PersonAddressList />} />

          <Route path="/address/:id" element={<UpdateAddress />} />
          <Route path="/employee/:id" element={<UpdateEmployee />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>



    </div>
  );
};

export default App;