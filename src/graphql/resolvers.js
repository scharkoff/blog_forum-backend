import createFilterOptions from 'domain/post/handlers/filter.handler';
import createSortOptions from 'domain/post/handlers/sorttype.handler';
import User from 'domain/user/entity/User';
import Post from 'domain/post/entity/Post';

const resolvers = {
    Query: {
        getUser: async (_, { id }) => await User.findById(id),
        getUsers: async () => await User.find({}),
        async getPosts(_, { page, pageSize, sortType, tag, searchText }) {
            try {
                const skip = (page - 1) * pageSize;
                const limit = parseInt(pageSize);

                const tagValue = tag === 'null' ? null : tag;
                const searchValue = searchText === 'null' ? null : searchText;

                const sortOptions = createSortOptions(sortType);
                const filterOptions = createFilterOptions(
                    searchValue,
                    tagValue,
                );

                const postsCount = await Post.countDocuments(
                    filterOptions,
                ).exec();

                const posts = await Post.find(filterOptions)
                    .sort(sortOptions)
                    .populate('user')
                    .skip(skip)
                    .limit(limit)
                    .exec();

                return { posts, postsCount };
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        createUser: async (_, { fullName, email, rank, avatarUrl }) => {
            const newUser = new User({ fullName, email, rank, avatarUrl });
            return await newUser.save();
        },
        updateUser: async (_, { id, ...rest }) => {
            return await User.findByIdAndUpdate(id, rest, { new: true });
        },
        deleteUser: async (_, { id }) => {
            return await User.findByIdAndRemove(id);
        },
    },
};

export default resolvers;
