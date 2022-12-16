import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class MenuService {
  allMenu() {
    return RequestHandler.get(API_URLS.menu.all);
  }

}

export const MenuServices = new MenuService();
