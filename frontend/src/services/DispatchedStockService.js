import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class DispatchedStocksService {
  dispatchedStocks(query) {
    return RequestHandler.getWithQuery(API_URLS.dispatchedStocks.all, query);
  }
  managerDispatchedStocks(query) {
    return RequestHandler.get(API_URLS.dispatchedStocks.managerAll);
  }
  searchDispatchedStocks(data) {
    return RequestHandler.post(
      API_URLS.dispatchedStocks.searchDispatchedStocks,
      data
    );
  }
  all() {
    return RequestHandler.get(API_URLS.dispatchedStocks.all);
  }
  todayStockDispatched() {
    return RequestHandler.today(API_URLS.dispatchedStocks.managerAll);
  }
  getStock(id) {
    return RequestHandler.single(API_URLS.dispatchedStocks.all, id);
  }
}

export const DispatchedStocksServices = new DispatchedStocksService();
