import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class StockService {
  todayStock() {
    return RequestHandler.today(API_URLS.stock.all);
  }
  searchStock(data) {
    return RequestHandler.post(API_URLS.stock.searchStock, data);
  }
  inventory() {
    return RequestHandler.get(API_URLS.stock.all);
  }
  stockForDispatch() {
    return RequestHandler.get(API_URLS.stock.stockForDispatch);
  }
  createDispatch(data) {
    return RequestHandler.post(API_URLS.stock.createDispatch, data);
  }
}

export const StockServices = new StockService();
