import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class KitchenService {
  newStockRequest(data) {
    return RequestHandler.post(API_URLS.kitchen.newRequest, data);
  }
  allStockRequest(query) {
    return RequestHandler.getWithQuery(API_URLS.stock.stockRequest, query);
  }
  allStockDispatched() {
    return RequestHandler.get(API_URLS.stock.allStockRequest);
  }
}

export const KitchenServices = new KitchenService();
