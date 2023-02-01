import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class RestaurantService {
  allMenu() {
    return RequestHandler.get(API_URLS.menu.all);
  }
  allRestaurant() {
    return RequestHandler.get(API_URLS.restaurant.all);
  }
  todayRestaurant() {
    return RequestHandler.today(API_URLS.restaurant.all);
  }
  searchRestaurant(data) {
    return RequestHandler.post(API_URLS.restaurant.searchRestaurant, data);
  }
  getRestaurantOrder(id) {
    return RequestHandler.single(API_URLS.restaurant.getRestaurantOrder, id);
  }
  updateRestaurantOrder(id, data) {
    return RequestHandler.put(
      API_URLS.restaurant.getRestaurantRequestOrder,
      id,
      data
    );
  }
  orderDelivered(orderId) {
    return RequestHandler.put(
      API_URLS.restaurant.orderDelivered,
      orderId,
      "Nothing to pass"
    );
  }
}

export const RestaurantServices = new RestaurantService();
