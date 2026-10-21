const express = require("express");
const router = express.Router();

// Import Repository xử lý logic DB cho bookings
const BookingRepository = require("../repositories/BookingRepository");

// Middleware xác thực người dùng trước khi cho phép truy cập các route
const authMiddleware = require("../middlewares/authMiddleware");

// ✅ Tạo mới booking (đặt lịch học)
router.post("/", authMiddleware, async (req, res) => {
  try {
    // Gọi đến hàm createBooking với dữ liệu từ req.body
    const newBooking =
      await BookingRepository.createBooking(req.body);
    // Trả về booking mới tạo và status 201 (Created)
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error creating booking:", err);
    // Trả lỗi nếu có vấn đề trong quá trình tạo booking
    res
      .status(500)
      .json({ error: "Failed to create booking" });
  }
});

// ✅ Lấy thông tin một booking theo ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await BookingRepository.getBookingById(
      req.params.id
    );
    if (!booking) {
      // Nếu không tìm thấy booking → trả về lỗi 404
      return res
        .status(404)
        .json({ error: "Booking not found" });
    }
    // Trả về thông tin booking
    res.json(booking);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch booking" });
  }
});

// ✅ Lấy tất cả booking trong hệ thống
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings =
      await BookingRepository.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch bookings" });
  }
});

// ✅ Lấy tất cả booking của một gia sư (theo id gia sư)
router.get(
  "/tutor/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const bookings =
        await BookingRepository.getBookingsByTutorId(
          req.params.id
        );
      res.json(bookings);
    } catch (err) {
      res
        .status(500)
        .json({
          error: "Failed to fetch tutor's bookings",
        });
    }
  }
);

// ✅ Lấy tất cả booking của một học sinh (theo id học sinh)
router.get(
  "/student/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const bookings =
        await BookingRepository.getBookingsByStudentId(
          req.params.id
        );
      res.json(bookings);
    } catch (err) {
      res
        .status(500)
        .json({
          error: "Failed to fetch student's bookings",
        });
    }
  }
);

// ✅ Cập nhật thông tin một booking theo ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedBooking =
      await BookingRepository.updateBookingById(
        req.params.id,
        req.body
      );
    if (!updatedBooking) {
      // Nếu không tìm thấy booking để cập nhật → lỗi 404
      return res
        .status(404)
        .json({ error: "Booking not found" });
    }
    // Trả về thông tin booking sau khi cập nhật
    res.json(updatedBooking);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update booking" });
  }
});

// ✅ Xoá một booking theo ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await BookingRepository.deleteBookingById(
      req.params.id
    );
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete booking" });
  }
});

// Export router để sử dụng trong app chính
module.exports = router;
