"use strict";var _User=_interopRequireDefault(require("../entity/User.js"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=handleFullNameUpdate;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}async function handleFullNameUpdate(a){const b=await _User.default.findByIdAndUpdate(a.userId,{fullName:a.fullName}).exec();if(!b)return a.res.status(404).json({message:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"});const{passwordHash:c,...d}=b._doc;return a.res.status(200).json({data:d,message:"\u041B\u043E\u0433\u0438\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D"})}