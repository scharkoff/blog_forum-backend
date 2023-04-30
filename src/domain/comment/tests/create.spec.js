import CommentService from '../comment.service.js';
import CommentModel from '../entity/Comment.js';
import PostModel from '../../post/entity/Post.js';

const commentService = new CommentService();

describe('Comment module', () => {
    let req, res, mockComment, mockCommentWithPopulate;

    beforeEach(() => {
        req = {
            body: {
                text: 'Some text',
                user: 'mockUserId',
                avatarUrl: 'mockUserAvatarUrl',
                fullName: 'mockUserFullname',
                post: 'mockPostId',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockComment = {
            _id: 'mockCommentId',
            text: req.body.text,
            user: req.userId,
            avatarUrl: req.body.avatarUrl,
            fullName: req.body.fullName,
            post: req.body.post,
            createdAt: '2023-01-13T09:13:22.355Z',
            updatedAt: '2023-03-16T10:17:10.968Z',
        };

        mockCommentWithPopulate = {
            _id: 'mockCommentId',
            text: req.body.text,
            user: {
                _id: 'mockUserId',
                rank: 'mockRank',
                email: 'mockUserEmail',
                fullName: 'mockUserFullname',
                avatarUrl: 'mockUserAvatarUrl',
                passwordHash: 'mockPasswordHash',
            },
            avatarUrl: req.body.avatarUrl,
            fullName: req.body.fullName,
            post: req.body.post,
            createdAt: '2023-01-13T09:13:22.355Z',
            updatedAt: '2023-03-16T10:17:10.968Z',
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should create and return new comment', async () => {
        PostModel.findByIdAndUpdate = jest
            .fn()
            .mockImplementation((postId, update, callback) => {
                const err = null;
                const doc = mockComment;

                expect(postId).toEqual(req.body.post);
                expect(update).toEqual({ $inc: { commentsCount: 1 } });

                if (err) {
                    callback(err, null);
                } else if (!doc) {
                    callback(null, null);
                } else {
                    callback(null, doc);
                }
            });
        CommentModel.prototype.save = jest.fn().mockResolvedValue(mockComment);
        jest.spyOn(CommentModel, 'populate').mockReturnValue(
            mockCommentWithPopulate,
        );

        await commentService.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            comment: mockCommentWithPopulate,
        });
    });

    it('Should return 404 error post not found', async () => {
        PostModel.findByIdAndUpdate = jest
            .fn()
            .mockImplementation((postId, update, callback) => {
                const err = null;
                const doc = null;

                expect(postId).toEqual(req.body.post);
                expect(update).toEqual({ $inc: { commentsCount: 1 } });

                if (err) {
                    callback(err, null);
                } else if (!doc) {
                    callback(null, null);
                } else {
                    callback(null, doc);
                }
            });

        await commentService.create(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Запись не найдена' });
    });

    it('Should return 500 error PostModel.findByIdAndUpdate', async () => {
        PostModel.findByIdAndUpdate = jest
            .fn()
            .mockImplementation((postId, update, callback) => {
                const err = true;
                const doc = null;

                expect(postId).toEqual(req.body.post);
                expect(update).toEqual({ $inc: { commentsCount: 1 } });

                if (err) {
                    callback(err, null);
                } else if (!doc) {
                    callback(null, null);
                } else {
                    callback(null, doc);
                }
            });

        await commentService.create(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Что-то пошло не так',
        });
    });
});
