import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class MaintenanceService {
  todayMaintenance() {
    return RequestHandler.today(API_URLS.maintenance.all);
  }
  allMaintenance() {
    return RequestHandler.get(API_URLS.maintenance.all);
  }
  searchMaintenance(data) {
    return RequestHandler.post(API_URLS.maintenance.searchMaintenance, data);
  }
  create(data) {
    return RequestHandler.post(API_URLS.maintenance.newUsedStock, data);
  }
  items(query) {
    return RequestHandler.getWithQuery(
      API_URLS.stock.stockDispatchedForDepartment,
      query
    );
  }
}

export const MaintenanceServices = new MaintenanceService();
