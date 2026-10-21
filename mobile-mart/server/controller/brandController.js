const BrandRepository = require("../repositories/brandRepository");

const BrandController = {
  async addBrand({ name }) {
    const errors = {};

    if (!name) errors.name = "Brand name is required!";

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const res = await BrandRepository.addBrand(name);

    if (res.error) {
      if (res.error.includes("Brand"))
        return { error: { name: res.error } };

      return { error: { backend: res.error } };
    }

    return res;
  },

  async getAllBrands() {
    try {
      const res = await BrandRepository.getAllCategories();
      return res;
    } catch (error) {
      return error;
    }
  },
};

module.exports = BrandController;
