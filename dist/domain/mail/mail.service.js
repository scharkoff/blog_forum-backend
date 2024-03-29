"use strict";var _nodemailer=_interopRequireDefault(require("nodemailer"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}class MailService{constructor(){this.transporter=_nodemailer.default.createTransport({host:process.env.SMTP_HOST,port:process.env.SMTP_PORT,secure:!0,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASSWORD}})}async sendActivationEmail(a,b){this.transporter.sendMail({from:process.env.SMTP_USER,to:a,subject:"\u0410\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u044F \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 "+process.env.ORIGIN,text:"",html:`
                <div>
                    <h1>Для активации аккаунта перейдите по ссылке</h1>
                    <a href="${b}">${b}</a>
                </div>
            `})}}exports.default=MailService;