"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const typeDefs=`#graphql
    type User {
        id: ID!
        fullName: String!
        email: String!
        rank: String!
        created: String!
        avatarUrl: String
    }

    type Post {
        id: ID!
        title: String!
        text: String
        tags: [String]
        viewsCount: Int!
        commentsCount: Int!
        user: [User]
        imageUrl: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        getUser(id: ID!): User
        getUsers: [User]
        getPosts(tag: String, page: Int, pageSize: Int, sortType: String, searchText: String): [Post]
    }

    type Mutation {
        createUser(
            fullName: String!
            email: String!
            rank: String!
            avatarUrl: String
        ): User
        updateUser(
            id: ID!
            fullName: String
            email: String
            rank: String
            avatarUrl: String
        ): User
        deleteUser(id: ID!): User
    }
`;var _default=exports.default="#graphql\n    type User {\n        id: ID!\n        fullName: String!\n        email: String!\n        rank: String!\n        created: String!\n        avatarUrl: String\n    }\n\n    type Post {\n        id: ID!\n        title: String!\n        text: String\n        tags: [String]\n        viewsCount: Int!\n        commentsCount: Int!\n        user: [User]\n        imageUrl: String\n        createdAt: String\n        updatedAt: String\n    }\n\n    type Query {\n        getUser(id: ID!): User\n        getUsers: [User]\n        getPosts(tag: String, page: Int, pageSize: Int, sortType: String, searchText: String): [Post]\n    }\n\n    type Mutation {\n        createUser(\n            fullName: String!\n            email: String!\n            rank: String!\n            avatarUrl: String\n        ): User\n        updateUser(\n            id: ID!\n            fullName: String\n            email: String\n            rank: String\n            avatarUrl: String\n        ): User\n        deleteUser(id: ID!): User\n    }\n";