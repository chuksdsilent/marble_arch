import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class BarService {
  todayBar() {
    return RequestHandler.today(API_URLS.bar.all);
  }
  items(query) {
    return RequestHandler.getWithQuery(
      API_URLS.stock.stockDispatchedForDepartment,
      query
    );
  }
  searchBar(data) {
    return RequestHandler.post(API_URLS.bar.searchBar, data);
  }
  create(data) {
    return RequestHandler.post(API_URLS.bar.create, data);
  }
}

export const BarServices = new BarService();
