const fs = require("fs/promises");
const path = require("path");
const moment = require("moment");

const logError = async (controller, message, res) => {
  try {
    const timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
    const date_ = moment().format("DD-MM-YYYY");

    const logDir = path.join(__dirname, "../../logs");
    const filePath = path.join(logDir, `${controller}${date_}.txt`);
    const logMessage = `[${timestamp}] ${message}\n`;

    await fs.mkdir(logDir, { recursive: true });

    await fs.appendFile(filePath, logMessage);
  } catch (error) {
    console.error("Error Writing to log file:", error);
  }

  if(res){
    res.status(500).json({
    result: false,
    message: "Internal Server Error!",
  });
  }
  
};

module.exports = {logError};
