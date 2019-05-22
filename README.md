# pika-plugin-merge-properties ![npm](https://img.shields.io/npm/v/pika-plugin-merge-properties.svg)

This plugin merges selected package.json properties into built package.json of @pika/pkg builds.

To get started use your favourite node package manager (e.g. npm or yarn) and type
> npm install pika-plugin-merge-properties

or 

> yarn add plugin-merge-properties

After installing this plugin add it to the pipeline.

It is recommended to put it as first step but you have to add it before compilation pipeline steps.


## example configuration

```
{
  "name": "my-pika-app",
  "version": "1.0.0",
  "scripts": {
    "build": "pika-pack build",
    "publish": "pika-pack publish"
  },
  "@pika/pack": {
    "pipeline": [
      [
        "@pika/plugin-standard-pkg"
      ],
      [
        "pika-plugin-merge-properties",
        {
          "properties": [
            "mergeMe", "mergeMeToo"
          ]
        }
      ],
      [
        "@pika/plugin-build-node",
        {}
      ]
    ]
  },
  "mergeMe": {
    "foo":"bar"
  },
  "mergeMeToo": {
    "foo":"bar"
  },
  "devDependencies": {
    "@pika/pack": "^0.3.7",
    "@pika/plugin-build-node": "^0.3.16",
    "@pika/plugin-standard-pkg": "^0.3.16",
    "pika-plugin-merge-properties": "^1.0.1"
  }
}
```
