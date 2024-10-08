export const API_URLS = {
  user: {
    create: "/manager/auth/signup",
    login: "/auth/login",
    all: "/manager/staffs",
    getGuests: "/manager/guests",
    logout: "/auth/logout",
    changePassword: "/auth/change-password",
  },
  dashboard: {
    all: "/manager/dashboard",
  },
  booking: {
    create: "/receptionist/booking/check-in",
    rooms: "/receptionist/booking/free-rooms",
    all: "/manager/bookings",
    searchBooking: "/manager/search-bookings",
    freeRooms: "/receptionist/booking/free-rooms",
    checkOutGuest: "/receptionist/booking/check-out-guest",
    oldGuest: "/receptionist/booking/old-guest",
  },
  menu: {
    all: "/menu",
    searchLaundry: "/manager/search-laundry",
  },
  laundry: {
    all: "/manager/laundry",
    searchLaundry: "/manager/search-laundry",
  },
  maintenance: {
    all: "/manager/maintenance",
    newUsedStock: "/maintenance/create",
    searchMaintenance: "/manager/search-maintenance",
  },
  restaurant: {
    all: "/manager/restaurant",
    searchRestaurant: "/manager/search-restaurant",
    create: "/restaurant/create",
    orderDelivered: "/restaurant/order",
  },
  bar: {
    create: "/bar/create",
    all: "/manager/bar",
    searchBar: "/manager/search-bar",
  },
  kitchen: {
    newRequest: "/kitchen/new-stock-request",
  },
  stock: {
    all: "/manager/stocks",
    searchStock: "/manager/search-stocks",
    newRequest: "/kitchen/new-stock-request",
    allStockRequest: "/stock-dispatched",
    stockRequest: "/stock-request",
    create: "/store-keeper/stocks/create",
    stockForDispatch: "/manager/stocks-for-dispatch",
    createDispatch: "/store-keeper/stock-dispatched/create",
    stockDispatchedForDepartment:
      "/store-keeper/stock-dispatched/stock-for-departments",
  },

  dispatchedStocks: {
    all: "/manager/stock-dispatched",
    department: "/maintenance",
    searchDispatchedStocks: "/manager/search-dispatched-stocks",
  },
  expenses: {
    all: "/manager/expenses",
  },
};
