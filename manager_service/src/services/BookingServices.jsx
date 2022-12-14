import RequestHandler from "./RequestHandler";
import { API_URLS } from "../utils/api-url";

class BookingService {
    create(data) {
        return RequestHandler.post(API_URLS.booking.create, data);
    }
    bookingWithOldGuest(data) {
        return RequestHandler.post(API_URLS.booking.oldGuest, data);
    }
    rooms() {
        return RequestHandler.get(API_URLS.booking.rooms);
    }
    todayBooking() {
        return RequestHandler.today(API_URLS.booking.all);
    }
    allBooking() {
        return RequestHandler.get(API_URLS.booking.all);
    }
    searchBooking(data) {
        return RequestHandler.post(API_URLS.booking.searchBooking, data);
    }
    freeRooms() {
        return RequestHandler.get(API_URLS.booking.freeRooms);
    }
    checkoutGuest(id) {
        return RequestHandler.put(API_URLS.booking.checkOutGuest, id);
    }
}

export const BookingServices = new BookingService();
