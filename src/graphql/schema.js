const typeDefs = `#graphql
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
        user: User
        imageUrl: String
        createdAt: String
        updatedAt: String
    }

    type PostPagination {
        posts: [Post!]!
        postsCount: Int!
    }

    type Query {
        getUser(id: ID!): User
        getUsers: [User]
        getPosts(tag: String, page: Int, pageSize: Int, sortType: String, searchText: String): PostPagination
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
`;

export default typeDefs;
