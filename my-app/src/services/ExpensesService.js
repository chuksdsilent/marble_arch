import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class ExpensesService {
  create(data) {
    return RequestHandler.post(API_URLS.expenses.create, data);
  }
  authenticate(data) {
    return RequestHandler.post(API_URLS.expenses.login, data);
  }
  all() {
    return RequestHandler.get(API_URLS.expenses.all);
  }
}

export const ExpensesServices = new ExpensesService();
