"use strict";var _expressValidator=require("express-validator");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const loginValidation=[(0,_expressValidator.body)("email","\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u043F\u043E\u0447\u0442\u044B!").isEmail(),(0,_expressValidator.body)("password","\u0414\u043B\u0438\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u0430 \u0438\u043C\u0435\u0442\u044C \u043C\u0438\u043D\u0438\u043C\u0443\u043C 5 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432!").isLength({min:5})];var _default=loginValidation;exports.default=_default;