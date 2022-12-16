import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class DashboardService {
    all() {
        return RequestHandler.get(API_URLS.dashboard.all);
    }
}

export const DashboardServices = new DashboardService();
