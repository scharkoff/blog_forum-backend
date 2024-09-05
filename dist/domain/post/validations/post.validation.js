"use strict";var _expressValidator=require("express-validator");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const postCreateValidation=[(0,_expressValidator.body)("title","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0441\u0442\u0430\u0442\u044C\u0438! \u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432: 3").isLength({min:3}).isString(),(0,_expressValidator.body)("text","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0441\u0442\u0430\u0442\u044C\u0438! \u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B-\u0432\u043E \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432: 20").isLength({min:20}).isString(),(0,_expressValidator.body)("tags","\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0442\u0435\u0433\u043E\u0432!").optional().isArray(),(0,_expressValidator.body)("imageUrl","\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435!").optional().isString()];var _default=exports.default=postCreateValidation;