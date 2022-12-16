import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class BarService {
    create(data) {
        return RequestHandler.post(API_URLS.bar.create, data);
    }
    items(query) {
        return RequestHandler.getWithQuery(API_URLS.stock.stockDispatchedForDepartment, query);
    }
    newStockRequest(data) {
        return RequestHandler.post(API_URLS.stock.newRequest, data);
    }
    todayBar(data) {
        return RequestHandler.today(API_URLS.bar.all);
    }
}

export const BarServices = new BarService();
