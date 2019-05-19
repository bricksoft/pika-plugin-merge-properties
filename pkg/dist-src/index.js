import path from "path";
export function beforeBuild({
  options
}) {
  if (!options.properties) {
    return new MessageError('option "properties" must be defined. Example: {"properties": ["myPackageKey1","myPackageKey2"]} Or leave blank: {}');
  }
}
export function manifest(newManifest, {
  options,
  cwd
}) {
  const pkg = require(path.join(cwd, "package.json"));

  const {
    properties
  } = options;

  for (const key in newManifest) {
    const t = typeof newManifest[key];

    if (!newManifest.hasOwnProperty(key) || t === "object") {
      if (t === "object") {
        newManifest[key] = { ...newManifest[key],
          ...properties[key]
        };
        break;
      }

      newManifest[key] = properties[key];
    } else {
      if (Array.isArray(newManifest[key])) {
        newManifest[key] = [...newManifest[key], ...properties[key]];
      }

      newManifest[key] = properties[key];
    }
  }

  return newManifest;
}