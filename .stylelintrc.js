module.exports={
  extends:["stylelint-config-standard", "stylelint-config-rational-order", "stylelint-config-recommended-vue"],
  overrides:[{ files:["**/*.scss"], customSyntax:"postcss-scss"}]
}