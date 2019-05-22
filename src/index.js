import path from "path";
export function beforeBuild({ options }) {
  if (!options.properties) {
    return new MessageError(
      'option "properties" must be defined. Example: {"properties": ["myPackageKey1","myPackageKey2"]} Or leave blank: {}'
    );
  }
}

export function manifest(newManifest, { options, cwd }) {
  const pkg = require(path.join(cwd, "package.json"));
  const { properties } = options;

  for (const key in properties) {
    // merge values
    if (
      Array.isArray(newManifest[key]) ||
      typeof newManifest[key] === "object"
    ) {
      newManifest[key] = { ...newManifest[key], ...pkg[key] };
    }
    // overwrite values
    else {
      newManifest[key] = pkg[key];
    }
  }

  return newManifest;
}
