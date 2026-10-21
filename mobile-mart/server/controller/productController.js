const productRepository = require("../repositories/productRepository");

const productController = {
  async addProduct({
    name,
    brand_id,
    series,
    screen_size,
    storage,
    ram,
    os,
    charging_port,
    release_date,
    price,
    quantity,
    status,
    thumbnail,
    image1,
    image2,
    image3,
  }) {
    const errors = {};

    if (!name) errors.name = "Product name is required!";
    if (!brand_id) errors.brand_id = "Brand is required!";
    if (!series) errors.series = "Series is required!";
    if (!screen_size)
      errors.screen_size = "Screen size is required!";
    if (!storage) errors.storage = "Storage is required!";
    if (!ram) errors.ram = "RAM is required!";
    if (!os) errors.os = "Operating system is required!";
    if (!charging_port)
      errors.charging_port = "Charging port is required!";
    if (!release_date)
      errors.release_date = "Release date is required!";
    if (!price) errors.price = "Price is required!";
    if (!quantity)
      errors.quantity = "Quantity is required!";
    if (!status) errors.status = "Status is required!";
    if (!thumbnail)
      errors.thumbnail = "Thumbnail is required!";
    if (!image1) errors.image1 = "Image 1 is required!";
    if (!image2) errors.image2 = "Image 2 is required!";
    if (!image3) errors.image3 = "Image 3 is required!";

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const res = await productRepository.addProduct({
      name,
      brand_id,
      series,
      screen_size,
      storage,
      ram,
      os,
      charging_port,
      release_date,
      price,
      quantity,
      status,
      thumbnail,
      image1,
      image2,
      image3,
    });

    if (res.error) {
      if (res.error.includes("Product")) {
        return { error: { name: res.error } };
      }

      return { error: { backend: res.error } };
    }

    return res;
  },

  async getAllProduct() {
    const products =
      await productRepository.getAllProduct();
    return products;
  },
};

module.exports = productController;
