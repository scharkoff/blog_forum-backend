module.exports = {
  "presets": [
    [
      '@babel/preset-env',
      {
        "targets": {
          "esmodules": true,
          "node": true
        }
      }
    ]
  ],

  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@middlewares": "./middlewares"
      }
    }]
  ]
};