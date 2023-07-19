"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UserService=void 0;var _mongoose=_interopRequireDefault(require("mongoose")),_User=_interopRequireDefault(require("./entity/User.js")),_Post=_interopRequireDefault(require("../post/entity/Post.js")),_Comment=_interopRequireDefault(require("../comment/entity/Comment.js")),_fullNameHandler=_interopRequireDefault(require("./handlers/fullName.handler.js")),_passwordHandler=_interopRequireDefault(require("./handlers/password.handler.js")),_emailHandler=_interopRequireDefault(require("./handlers/email.handler.js")),_avatarHandler=_interopRequireDefault(require("./handlers/avatar.handler.js")),_rankHandler=_interopRequireDefault(require("./handlers/rank.handler.js"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}class UserService{constructor(){}async findAll(a,b){try{const a=await _User.default.find().exec();return b.status(200).json({users:a})}catch(a){return b.status(500).json({message:"\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A"})}}async findOneById(a,b){try{const c=a.params.id,d=await _User.default.findById({_id:_mongoose.default.Types.ObjectId(c)}).exec();return d?b.status(200).json({user:d}):b.status(404).json({message:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"})}catch(a){return b.status(500).json({message:"\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A"})}}async delete(a,b){try{const c=a.params.id;_User.default.findOneAndDelete({_id:_mongoose.default.Types.ObjectId(c)},async(a,d)=>a?b.status(500).json({message:"\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A"}):d?(await _Comment.default.find({user:_mongoose.default.Types.ObjectId(c)}).deleteMany(),await _Post.default.find({user:_mongoose.default.Types.ObjectId(c)}).deleteMany(),b.status(200).json({message:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D"})):b.status(404).json({message:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"}))}catch(a){return b.status(500).json({message:"\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A"})}}async updateByCondition(a,b){try{const c=_mongoose.default.Types.ObjectId(a.body.id);return a.body.fullName?(0,_fullNameHandler.default)({userId:c,fullName:a.body.fullName,res:b}):a.body.password?(0,_passwordHandler.default)({userId:c,password:a.body.password,res:b}):a.body.email?(0,_emailHandler.default)({userId:c,email:a.body.email,res:b}):a.body.avatarUrl?(0,_avatarHandler.default)({userId:c,avatarUrl:a.body.avatarUrl,res:b}):a.body.rank?(0,_rankHandler.default)({userId:c,rank:a.body.rank,res:b}):b.status(400).json({message:"\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u0430"})}catch(a){return b.status(500).json({message:"\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A"})}}}exports.UserService=UserService;