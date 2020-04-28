import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '@team-management-api/core/entities/user.entity';
import { UsersService } from '@team-management-api/core/services/users.service';
import { AuthService } from './auth.service';

const mockUsersService = {
  findByEmail: jest.fn()
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: UsersService, useValue: mockUsersService }]
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fail when the e-mail is not found', async () => {
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(undefined);
    expect(await service.signIn({ email: 'none', password: 'none' })).toEqual({
      successful: false,
      errorMsg: 'E-mail is not correct.'
    });
  });

  it('should fail when the password is not correct', async () => {
    const mockUser = {
      validatePassword: async (password: string) => Promise.resolve(false)
    };
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser as UserEntity);
    expect(await service.signIn({ email: 'test@gym.fit', password: 'none' })).toEqual({
      successful: false,
      errorMsg: 'Password is not correct.'
    });
  });

  it('should succeed and return the user', async () => {
    const mockUser = {
      id: 'some-id',
      validatePassword: async (password: string) => Promise.resolve(true)
    };
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser as UserEntity);
    expect(await service.signIn({ email: 'test@gym.fit', password: 'test' })).toEqual({
      successful: true,
      user: mockUser
    });
  });
});
