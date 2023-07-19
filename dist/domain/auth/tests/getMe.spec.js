"use strict";var _User=_interopRequireDefault(require("../../user/entity/User.js")),_authService=_interopRequireDefault(require("../auth.service.js"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}const authService=new _authService.default;jest.mock("bcrypt"),jest.mock("jsonwebtoken"),describe("Get me module",()=>{let a,b,c,d;beforeEach(()=>{a={body:{userId:"mockUserId"}},b={status:jest.fn().mockReturnThis(),json:jest.fn()},d={_id:"mockUserId",rank:"user",email:a.body.email,fullName:a.body.fullName,passwordHash:"mockPasswordHash"},c={...d,_doc:d}}),afterEach(()=>{jest.clearAllMocks()}),it("Should return user data",async()=>{jest.spyOn(_User.default,"findOne").mockResolvedValue(c),await authService.getMe(a,b),expect(b.status).toHaveBeenCalledWith(200);const{passwordHash:d,...e}=c._doc;expect(b.json).toHaveBeenCalledWith({userData:e})}),it("Should return 404 user not found",async()=>{jest.spyOn(_User.default,"findOne").mockResolvedValue(null),await authService.getMe(a,b),expect(b.status).toHaveBeenCalledWith(404),expect(b.json).toHaveBeenCalledWith({message:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D!"})})});