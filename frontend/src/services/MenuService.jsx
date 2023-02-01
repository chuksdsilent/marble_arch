import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class MenuService {
  allMenu() {
    return RequestHandler.get(API_URLS.menu.all);
  }
  getMenu(id) {
    return RequestHandler.single(API_URLS.menu.single, id);
  }
  updateMenu(data, id) {
    return RequestHandler.put(API_URLS.menu.single, id);
  }

}

export const MenuServices = new MenuService();
