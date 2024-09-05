"use strict";var _mongoose=_interopRequireDefault(require("mongoose"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}const UserSchema=new _mongoose.default.Schema({rank:{type:String,required:!0},fullName:{type:String,required:!0},email:{type:String,required:!0,unique:!0},passwordHash:{type:String,required:!0},avatarUrl:String,isActivated:{type:Boolean,default:!1},activationLink:String},{timestamps:!0},{writeConcern:{j:!0,wtimeout:1e3}});var _default=exports.default=_mongoose.default.model("User",UserSchema);