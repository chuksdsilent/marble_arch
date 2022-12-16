import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class RestaurantService {
  create(data) {
    return RequestHandler.post(API_URLS.restaurant.create, data);
  }
  items() {
    return RequestHandler.get(API_URLS.stock.stockDispatchedForDepartment);
  }
  newStockRequest(data) {
    return RequestHandler.post(API_URLS.stock.newRequest, data);
  }
}

export const RestaurantServices = new RestaurantService();
