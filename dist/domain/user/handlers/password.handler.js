"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=handlePasswordUpdate;var _bcrypt=_interopRequireDefault(require("bcrypt")),_User=_interopRequireDefault(require("../entity/User.js"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}async function handlePasswordUpdate(a){const b=a.password,c=await _bcrypt.default.genSalt(10),d=await _bcrypt.default.hash(b,c),e=await _User.default.findByIdAndUpdate(a.userId,{passwordHash:d}).exec();if(!e)return a.res.status(404).json({message:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"});const{passwordHash:f,...g}=e._doc;return a.res.status(200).json({userData:g,message:"\u041F\u0430\u0440\u043E\u043B\u044C \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D"})}