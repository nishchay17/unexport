const fs = require("fs");
const parser = require("@babel/parser");

function getAST(filePath: string) {
  const code = fs.readFileSync(filePath, "utf-8");
  return parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });
}

module.exports = getAST;
