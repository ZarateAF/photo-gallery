const { connect } = require("mongoose");
const { MONGODB_URI } = require("./config");

(async () => {
  try {
    const db = await connect(MONGODB_URI, { useNewUrlParser: true });
    console.log("DB connected to ", db.connection.name);
  } catch (e) {
    console.log("Error conection", e);
  }
})();
