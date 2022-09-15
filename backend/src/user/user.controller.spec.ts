import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../user/user.service';
import { User } from './user.entity';
import { userMock } from './mock/user.mock';
import { userResMock } from './mock/userRes.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userMock),
            findOne: jest.fn((query) =>
              userMock.find((user) => {
                return user.userId == query.where.userId;
              }),
            ),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return array of all users', async () => {
    const users = await userController.getAllUsers();

    expect(users).toEqual(userResMock);
  });

  it('should return a user with the given id', async () => {
    const userId = 757922;
    const user = await userController.findOneUserById(userId);

    expect(user).toEqual({
      login: 'yns88',
      avatar_url: 'https://avatars.githubusercontent.com/u/757922?v=4',
      type: 'User',
    });
  });
});
