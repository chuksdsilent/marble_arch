import React, { useEffect } from "react";
import "./assets/styles/General.css";
import { Routes, Route } from "react-router-dom";
import ManagerDashboard from "./autharea/pages/manager/ManagerDashboard";
import Manager from "./noautharea/pages/login/Manager";
import Layout from "./autharea/Layout";
import NewStaff from "./autharea/pages/manager/NewStaff";
import Staff from "./autharea/pages/manager/Staff";
import "react-toastify/dist/ReactToastify.css";
import Bookings from "./autharea/pages/manager/Bookings";
import FreeRooms from "./autharea/pages/manager/FreeRooms";
import StockInventory from "./autharea/pages/manager/StockInventory";
import DispatchedStocks from "./autharea/pages/manager/DispatchedStocks";
import Expenses from "./autharea/pages/manager/Expenses";
import ViewStockDispatched from "./autharea/pages/manager/ViewStockDispatched";
import Guests from "./autharea/pages/manager/Guests";
import ViewGuestTransaction from "./autharea/pages/manager/ViewGuestTransaction";
import Bar from "./autharea/pages/manager/Bar";
import Restaurant from "./autharea/pages/manager/Restaurant";
import Maintenance from "./autharea/pages/manager/Maintenance";
import Laundry from "./autharea/pages/manager/Laundry";
import Receptionist from "./noautharea/pages/login/Receptionist";
import Dashboard from "./autharea/pages/receiptionist/Dashboard";
import NewBooking from "./autharea/pages/receiptionist/NewBooking";
import BookingWithOldGuest from "./autharea/pages/receiptionist/BookingWithOldGuest";
import RestaurantLogin from "./noautharea/pages/login/RestaurantLogin";
import NewOrder from "./autharea/pages/restaurant/NewOrder";
import Menu from "./autharea/pages/manager/Menu";
import Kitchen from "./noautharea/pages/login/Kitchen";
import RequestForStock from "./autharea/pages/kitchen/RequestForStock";
import AllStockRequest from "./autharea/pages/kitchen/AllStockRequest";
import StockDispatches from "./autharea/pages/kitchen/StockDispatches";
import NewStock from "./autharea/pages/storeKeeper/NewStock";
import StoreKeeper from "./noautharea/pages/login/StoreKeeper";
import NewStockDispatch from "./autharea/pages/storeKeeper/NewStockDispatch";
import BarLogin from "./noautharea/pages/login/BarLogin";
import NewBarOrder from "./autharea/pages/bar/NewBarOrder";
import AllOrders from "./autharea/pages/bar/AllOrders";
import MaintenanceLogin from "./noautharea/pages/login/MaintenanceLogin";
import CreateUsedStocks from "./autharea/pages/maintenance/CreateUsedStocks";
import LaundryLogin from "./noautharea/pages/login/LaundryLogin";
import ManagerProtectedRoutes from "./utils/protectedRoutes/ManagerProtectedRoutes";
import ReceptionistProtectedRoutes from "./utils/protectedRoutes/ReceptionistProtectedRoutes";
import RestaurantProtectedRoutes from "./utils/protectedRoutes/RestaurantProtectedRoutes";
import KitchenProtectedRoutes from "./utils/protectedRoutes/KitchenProtectedRoutes";
import StoreKeeperProtectedRoutes from "./utils/protectedRoutes/StoreKeeperProtectedRoutes";
import BarProtectedRoutes from "./utils/protectedRoutes/BarProtectedRoutes";
import MaintenanceProtectedRoutes from "./utils/protectedRoutes/MaintenanceProtectedRoutes";
import LaundryProtectedRoutes from "./utils/protectedRoutes/LaundryProtectedRoutes";
import ChangePassword from "./autharea/pages/ChangePassword";
import ProtectedRoutes from "./utils/protectedRoutes/ManagerProtectedRoutes";
// axios.defaults.baseURL = "http://localhost:8000/api/";
function App() {
  const receptionist = "receptionist";
  return (
    <div className="App">
      <Routes>
        <Route path="/manager/login" element={<Manager />} />
        <Route path="/receptionist/login" element={<Receptionist />} />
      </Routes>
      <Routes>
        /*******************************Manager************************ */
        <Route element={<ManagerProtectedRoutes />}>
          <Route
            path="/manager/change-password"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path="/manager/dashboard"
            element={
              <Layout>
                <ManagerDashboard />
              </Layout>
            }
          />
          <Route
            path="/manager/staff/create"
            element={
              <Layout>
                {" "}
                <NewStaff />
              </Layout>
            }
          />
          <Route
            path="/manager/staff"
            element={
              <Layout>
                <Staff />
              </Layout>
            }
          />
          <Route
            path="/manager/bookings"
            element={
              <Layout>
                <Bookings />
              </Layout>
            }
          />
          <Route
            path="/manager/booked-rooms"
            element={
              <Layout>
                <FreeRooms />
              </Layout>
            }
          />
          <Route
            path="/manager/stock-inventory"
            element={
              <Layout>
                <StockInventory />
              </Layout>
            }
          />
          <Route
            path="/manager/expenses"
            element={
              <Layout>
                <Expenses />
              </Layout>
            }
          />
          <Route
            path="/manager/guests"
            element={
              <Layout>
                <Guests />
              </Layout>
            }
          />
          <Route
            path="/manager/bar"
            element={
              <Layout>
                <Bar />
              </Layout>
            }
          />
          <Route
            path="/manager/Restaurant"
            element={
              <Layout>
                <Restaurant />
              </Layout>
            }
          />
          <Route
            path="/manager/maintenance"
            element={
              <Layout>
                <Maintenance />
              </Layout>
            }
          />
          <Route
            path="/manager/laundry"
            element={
              <Layout>
                <Laundry />
              </Layout>
            }
          />
          <Route
            path="/manager/guest/:_id"
            element={
              <Layout>
                <ViewGuestTransaction />
              </Layout>
            }
          />
          <Route
            path="/manager/dispatched-stocks"
            element={
              <Layout>
                <DispatchedStocks />
              </Layout>
            }
          />
          <Route
            path="/manager/dispatched-stocks"
            element={
              <Layout>
                <DispatchedStocks />
              </Layout>
            }
          />
          <Route
            name="ideas"
            path="manager/stock-dispatched/:_id"
            element={
              <Layout>
                <ViewStockDispatched />
              </Layout>
            }
          />
        </Route>
        /*******************************Receptionist*************************/
        <Route element={<ReceptionistProtectedRoutes />}>
          <Route
            path="/receptionist/change-password"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path={`/${receptionist}/dashboard`}
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path={`/${receptionist}/reservation/new`}
            element={
              <Layout>
                <NewBooking />
              </Layout>
            }
          />
          <Route
            path={`/${receptionist}/reservation-with-old-guest`}
            element={
              <Layout>
                <BookingWithOldGuest />
              </Layout>
            }
          />
          <Route
            path="/receptionist/reservations"
            element={
              <Layout>
                <Bookings />
              </Layout>
            }
          />
          <Route
            path="/receptionist/free-rooms"
            element={
              <Layout>
                <FreeRooms />
              </Layout>
            }
          />
        </Route>
        /*******************************Restaurant*************************/
        <Route path="/restaurant/login" element={<RestaurantLogin />} />
        <Route element={<RestaurantProtectedRoutes />}>
          <Route
            path="/restaurant/change-password"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path="/restaurant/order/new"
            element={
              <Layout>
                <NewOrder />
              </Layout>
            }
          />
          <Route
            path="/restaurant/orders"
            element={
              <Layout>
                <Restaurant />
              </Layout>
            }
          />
          <Route
            path="/restaurant/menu"
            element={
              <Layout>
                <Menu />
              </Layout>
            }
          />
        </Route>
        /*******************************Kitchen*************************/
        <Route path="/kitchen/login" element={<Kitchen />} />
        <Route element={<KitchenProtectedRoutes />}>
          <Route
            path="/kitchen/change-password"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path="/kitchen/orders"
            element={
              <Layout>
                <Restaurant />
              </Layout>
            }
          />
          <Route
            path="/kitchen/request-for-stock"
            element={
              <Layout>
                <RequestForStock />
              </Layout>
            }
          />
          <Route
            path="/kitchen/all-stocks"
            element={
              <Layout>
                <AllStockRequest />
              </Layout>
            }
          />
          <Route
            path="/kitchen/stock-dispatches"
            element={
              <Layout>
                <StockDispatches />
              </Layout>
            }
          />
        </Route>
        /*******************************Store Keeper*************************/
        <Route path="/store-keeper/login" element={<StoreKeeper />} />
        <Route element={<StoreKeeperProtectedRoutes />}>
          <Route
            path="/store-keeper/change-password"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path="/store-keeper/stock-dispatches"
            element={
              <Layout>
                <StockDispatches />
              </Layout>
            }
          />
          <Route
            path="/store-keeper/all-stock"
            element={
              <Layout>
                <AllStockRequest />
              </Layout>
            }
          />
          <Route
            path="/store-keeper/dispatch/new"
            element={
              <Layout>
                <NewStockDispatch />
              </Layout>
            }
          />
          <Route
            path="/store-keeper/stock"
            element={
              <Layout>
                <StockInventory />
              </Layout>
            }
          />
          <Route
            path="/store-keeper/stock/new"
            element={
              <Layout>
                <NewStock />
              </Layout>
            }
          />
        </Route>
        /*******************************Bar*************************/
        <Route path="/bar/login" element={<BarLogin />} />
        <Route element={<BarProtectedRoutes />}>
          <Route
            path="/bar/change-password"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path="/bar/new-order"
            element={
              <Layout>
                <NewOrder />
              </Layout>
            }
          />
          <Route
            path="/bar/request-for-stock"
            element={
              <Layout>
                <RequestForStock />
              </Layout>
            }
          />
          <Route
            path="/bar/orders"
            element={
              <Layout>
                <AllOrders />
              </Layout>
            }
          />
          <Route
            path="/bar/all-stock-request"
            element={
              <Layout>
                <AllStockRequest />
              </Layout>
            }
          />
        </Route>
        /*******************************Maintenance*************************/
        <Route path="/maintenance/login" element={<MaintenanceLogin />} />
        <Route element={<MaintenanceProtectedRoutes />} />
        <Route
          path="/maintenance/change-password"
          element={
            <Layout>
              <ChangePassword />
            </Layout>
          }
        />
        <Route
          path="/maintenance/create-used-stock"
          element={
            <Layout>
              <CreateUsedStocks />
            </Layout>
          }
        />
        <Route
          path="/maintenance/all-uploaded-stocks"
          element={
            <Layout>
              <Maintenance />
            </Layout>
          }
        />
        <Route
          path="/maintenance/request-for-stock"
          element={
            <Layout>
              <RequestForStock />
            </Layout>
          }
        />
        <Route
          path="/maintenance/all-stock-request"
          element={
            <Layout>
              <AllStockRequest />
            </Layout>
          }
        />
        <Route
          path="/maintenance/dispatched-stocks"
          element={
            <Layout>
              <StockDispatches />
            </Layout>
          }
        />
        /*******************************Laundry*************************/
        <Route path="/laundry/login" element={<LaundryLogin />} />
        <Route element={<LaundryProtectedRoutes />}>
          <Route
            path="/laundry/change-password"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path="/laundry/create-used-stock"
            element={
              <Layout>
                <CreateUsedStocks />
              </Layout>
            }
          />
          <Route
            path="/laundry/all-uploaded-stocks"
            element={
              <Layout>
                <Maintenance />
              </Layout>
            }
          />
          <Route
            path="/laundry/request-for-stock"
            element={
              <Layout>
                <RequestForStock />
              </Layout>
            }
          />
          <Route
            path="/laundry/all-stock-request"
            element={
              <Layout>
                <AllStockRequest />
              </Layout>
            }
          />
          <Route
            path="/laundry/dispatched-stocks"
            element={
              <Layout>
                <StockDispatches />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
