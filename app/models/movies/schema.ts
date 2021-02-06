import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const collectionName = "movielist_2020020520ap";
const schema = new Schema({
  name: String,
  year: String,
  type: String,
  image: String,
});

export default mongoose.model("Movies", schema, collectionName);
