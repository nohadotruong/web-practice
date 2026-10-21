export const cloudinaryConfig = {
  cloudName: "da19rusyp",
  uploadPreset: "mobile-mart",
  apiBaseUrl: "https://api.cloudinary.com/v1_1",

  get uploadUrl() {
    return `${this.apiBaseUrl}/${this.cloudName}/image/upload`;
  },
};
