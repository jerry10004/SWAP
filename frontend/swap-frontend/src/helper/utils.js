/**
 * Functions in utils
 */

/**
 * Add commas to a number
 * v1.0.0
 */
export const numberWithCommas = (x, decimal = 0) => {
  return x.toLocaleString("en-US", { minimumFractionDigits: decimal });
};

/**
 * Get the file extension from given file name
 * v1.2.0
 */
export const getFileExtension = (filename) => {
  const extension = filename.split(".").pop();
  return extension;
};

/**
 * Get the random number between min and max value
 * v1.2.0
 */
export const getRandomNo = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Get the color name/value based on given status
 * v1.2.0
 */
export const getStatusColor = (itemstatus) => {
  let color = "";
  switch (itemstatus) {
    case "In Progress":
      color = "info";
      break;
    case "Pending":
      color = "warning";
      break;
    case "Finished":
      color = "success";
      break;
    case "Cancel":
      color = "danger";
      break;
    default:
      color = "primary";
  }
  return color;
};

/**
 * Get the color name/value based on given status
 * v1.2.0
 */
export const getCategoryColor = (category) => {
  let color = "";
  switch (category) {
    case "Saas Services":
    case "Entertainment":
    case "Extra":
      color = "info";
      break;
    case "Design":
      color = "warning";
      break;
    case "Marketing":
      color = "success";
      break;
    case "Development":
      color = "danger";
      break;
    case "SEO":
      color = "primary";
      break;
    default:
      color = "primary";
  }
  return color;
};

const utils = [numberWithCommas, getFileExtension, getRandomNo, getStatusColor];

export default utils;
