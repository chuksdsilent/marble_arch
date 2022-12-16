import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class StoreKeeperService {
  create(data) {
    return RequestHandler.post(API_URLS.stock.create, data);
  }
  rooms() {
    return RequestHandler.get(API_URLS.booking.rooms);
  }
}

export const StoreKeeperServices = new StoreKeeperService();
