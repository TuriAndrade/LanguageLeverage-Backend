import buildCreateEditor from "./editor";
import isValidUser from "../../utils/isValidUser";

const createEditor = buildCreateEditor({ isValidUser });

export default createEditor;
