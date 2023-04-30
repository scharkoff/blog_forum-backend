import CommentService from '../comment.service.js';
import CommentModel from '../entity/Comment.js';

const commentService = new CommentService();

describe('Comment module', () => {
    let req, res, mockComments;

    beforeEach(() => {
        req = {
            body: {},
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockComments = [
            {
                _id: 'mockId',
                fullName: 'Test',
                text: 'Some message...',
                user: 'mockUserData',
                post: 'mockPostData',
                avatarUrl:
                    '/uploads/MV5BNDY0NjMxNDQ2Ml5BMl5BanBnXkFtZTgwNDIyNTI1NDM@._V1_SX300_CR0.jpg',
                createdAt: '2023-01-13T09:13:22.355Z',
                updatedAt: '2023-03-16T10:17:10.968Z',
            },
        ];
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should return all comments', async () => {
        const mockPopulate = jest.fn().mockReturnThis();
        const mockExec = jest.fn().mockResolvedValue(mockComments);

        jest.spyOn(CommentModel, 'find').mockReturnValue({
            populate: mockPopulate,
            exec: mockExec,
        });

        await commentService.findAll(req, res);

        expect(mockPopulate).toHaveBeenCalledWith('user');
        expect(mockPopulate).toHaveBeenCalledWith('post');
        expect(mockExec).toHaveBeenCalledWith();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            comments: mockComments,
        });
    });

    it('Should return 500 server error', async () => {
        jest.spyOn(CommentModel, 'find').mockReturnValue(
            new Error('Mock error'),
        );

        await commentService.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Что-то пошло не так',
        });
    });
});
