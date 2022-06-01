import yaml from "js-yaml";

const parse = (content, type) => {
  if (type === "json") {
    return JSON.parse(content);
  } else if (type === "yaml" || type === "yml") {
    return yaml.load(content);
  } else {
    throw new Error(`Type is not supported`);
  }
};

export default parse;
