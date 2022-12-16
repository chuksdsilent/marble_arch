import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class UserService {
  todayUsers() {
    return RequestHandler.today(API_URLS.user.getGuests);
  }
  create(data) {
    return RequestHandler.post(API_URLS.user.create, data);
  }
  authenticate(data) {
    return RequestHandler.post(API_URLS.user.login, data);
  }
  logout() {
    return RequestHandler.get(API_URLS.user.logout);
  }
  changePassword(data) {
    return RequestHandler.post(API_URLS.user.changePassword, data);
  }
  getStaff() {
    return RequestHandler.get(API_URLS.user.all);
  }
  getGuests() {
    return RequestHandler.get(API_URLS.user.getGuests);
  }
  getGuest(id) {
    return RequestHandler.single(API_URLS.user.getGuests, id);
  }
}

export const UserServices = new UserService();
