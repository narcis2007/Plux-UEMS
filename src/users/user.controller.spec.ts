import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { User } from './user.entity';
import { createMock } from '@golevelup/nestjs-testing';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: createMock<UserService>(),
        },
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should login a user', async () => {
    const user: User = { username: 'test', password: 'test', _id: '1', uid: '1', events: ['1'] };
    jest.spyOn(authService, 'login').mockResolvedValueOnce({ access_token: 'test' });
    expect(await userController.login(user)).toEqual({ access_token: 'test' });
  });

  it('should register a user', async () => {
    const user: User = { username: 'test', password: 'test', _id: '1', uid: '1', events: ['1'] };
    jest.spyOn(userService, 'create').mockResolvedValueOnce(user);
    expect(await userController.register(user)).toEqual({ uid: user.uid, username: user.username });
  });

  it('should get profile of a user', async () => {
    const user: User = { username: 'test', password: 'test', _id: '1', uid: '1', events: ['1'] };
    jest.spyOn(userService, 'findOne').mockResolvedValueOnce(user);
    expect(await userController.getProfile({ user })).toEqual({ uid: user.uid, username: user.username });
  });

  it('should find one user', async () => {
    const user: User = { username: 'test', password: 'test', _id: '1', uid: '1', events: ['1'] };
    jest.spyOn(userService, 'findOneByUsername').mockResolvedValueOnce(user);
    expect(await userController.findOne({ user })).toEqual({ uid: user.uid, username: user.username });
  });

  it('should update a user', async () => {
    const user: User = { username: 'test', password: 'test', _id: '1', uid: '1', events: ['1'] };
    jest.spyOn(userService, 'update').mockResolvedValueOnce();
    expect(await userController.update({ user }, user)).toBeUndefined();
  });

  it('should delete a user', async () => {
    const user: User = { username: 'test', password: 'test', _id: '1', uid: '1', events: ['1'] };
    jest.spyOn(userService, 'delete').mockResolvedValueOnce();
    expect(await userController.delete({ user })).toBeUndefined();
  });

  // Add more tests for register, getProfile, findOne, update, and delete methods
});
