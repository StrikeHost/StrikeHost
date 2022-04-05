import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository;

  const mockUserRepository = () => ({
    registerUser: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    editUser: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();
    userService = await module.get<UserService>(UserService);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('register user', () => {
    it('should register a user', async () => {
      userRepository.registerUser.mockResolvedValue('someValue');
      expect(userRepository.registerUser).not.toHaveBeenCalled();
      const registerUserDto = {
        email: 'test@test.test',
        password: 'test',
        first_name: 'test',
        last_name: 'test',
      };
      const result = await userService.registerUser(registerUserDto);
      expect(userRepository.registerUser).toHaveBeenCalledWith(registerUserDto);
      expect(result).toEqual('someValue');
    });
  });

  describe('get users', () => {
    it('should get all users', async () => {
      userRepository.find.mockResolvedValue('someValue');
      expect(userRepository.find).not.toHaveBeenCalled();
      const result = await userService.getUsers();
      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });

    it('should get a user by id', async () => {
      userRepository.findOne.mockResolvedValue('someValue');
      expect(userRepository.findOne).not.toHaveBeenCalled();
      const result = await userService.getUser('1');
      expect(userRepository.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual('someValue');
    });

    it('should get a user by email', async () => {
      userRepository.findOne.mockResolvedValue('someValue');
      expect(userRepository.findOne).not.toHaveBeenCalled();
      const result = await userService.getUserByEmail('test@test.test');
      expect(userRepository.findOne).toHaveBeenCalledWith('test@test.test');
      expect(result).toEqual('someValue');
    });
  });
});
