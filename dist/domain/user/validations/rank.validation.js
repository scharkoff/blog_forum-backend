"use strict";var _expressValidator=require("express-validator");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const validateRank=a=>"user"===a||"admin"===a,rankValidation=[(0,_expressValidator.body)("rank").custom(validateRank).withMessage("\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD \uFFFD\uFFFD\uFFFD\uFFFD \uFFFD\uFFFD \uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD \uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD: \"user\", \"admin\"")];var _default=rankValidation;exports.default=_default;