"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=createFilterOptions;function createFilterOptions(a,b){let c={};return a&&b?c={title:new RegExp(a,"i"),tags:b}:(a&&(c={title:new RegExp(a,"i")}),b&&(c={tags:b})),c}