import buildHandleFile from "./handle-file";
import buildHandleFileMiddleware from "./handle-file-middleware";
import sharp from "sharp";
import aws from "aws-sdk";
import { promisify } from "util";
import crypto from "crypto";

const handleFile = buildHandleFile({ sharp, aws, promisify, crypto });

const handleFileMiddleware = buildHandleFileMiddleware({ handleFile });

module.exports = {
  handleFile,
  handleFileMiddleware,
};
