import sequelize from "./config/db.js";

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Kết nối DB thành công!");
  } catch (error) {
    console.error("❌ Không kết nối được DB:", error);
  } finally {
    await sequelize.close();
  }
};

testConnection();
