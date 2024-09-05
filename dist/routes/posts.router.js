"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _checkAuth=_interopRequireDefault(require("../middlewares/checkAuth.js")),_handleValidationErrors=_interopRequireDefault(require("../middlewares/handleValidationErrors.js")),_postValidation=_interopRequireDefault(require("../domain/post/validations/post.validation.js")),_postController=_interopRequireDefault(require("../controllers/post.controller.js")),_express=require("express");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}const postsRouter=(0,_express.Router)(),postController=new _postController.default;postsRouter.post("/posts",_checkAuth.default,_postValidation.default,_handleValidationErrors.default,postController.create.bind(postController)),postsRouter.get("/tags/lasts",postController.getLastTags.bind(postController)),postsRouter.get("/posts/all",postController.findAll.bind(postController)),postsRouter.get("/posts",postController.findByPage.bind(postController)),postsRouter.get("/posts/:id",postController.findOneById.bind(postController)),postsRouter.delete("/posts/:id",_checkAuth.default,postController.remove.bind(postController)),postsRouter.patch("/posts/:id",_checkAuth.default,_postValidation.default,_handleValidationErrors.default,postController.update.bind(postController));var _default=exports.default=postsRouter;