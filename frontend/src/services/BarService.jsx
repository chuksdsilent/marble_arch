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
    getBar(data) {
        return RequestHandler.get(API_URLS.bar.all);
    }
    getBarOrder(id) {
        return RequestHandler.single(API_URLS.bar.all, id);
    }
    updateBarOrder(id, data) {
        return RequestHandler.put(API_URLS.bar.all, id, data);
    }
}

export const BarServices = new BarService();
