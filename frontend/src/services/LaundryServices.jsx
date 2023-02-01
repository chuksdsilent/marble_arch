import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class LaundryService {
    todayLaundry() {
        return RequestHandler.today(API_URLS.laundry.all);
    }
    allLaundry() {
        return RequestHandler.get(API_URLS.laundry.all);
    }
    searchLaundry(data) {
        return RequestHandler.post(API_URLS.laundry.searchLaundry, data);
    }
}

export const LaundryServices = new LaundryService();
