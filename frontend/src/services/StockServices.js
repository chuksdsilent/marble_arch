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
  getStock(id) {
    return RequestHandler.single(API_URLS.stock.getStock, id);
  }
  updateStock(id, data) {
    return RequestHandler.put(API_URLS.stock.updateStock, id, data);
  }
  getStockDispatched(id) {
    return RequestHandler.single(API_URLS.stock.getStockDispatched, id);
  }
  updateStockDispatched(id, data) {
    return RequestHandler.put(API_URLS.stock.updateStockDispatched, id, data);
  }
}

export const StockServices = new StockService();
