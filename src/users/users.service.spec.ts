import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            findAndCount: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create new user', async () => {
      const createUserDto: CreateUserDto = {
        login: 'test',
        password: 'test',
      };

      const user: User = {
        id: 1,
        login: 'test',
      } as User;

      jest.spyOn(repository, 'save').mockResolvedValue(user);

      const result = await service.create(createUserDto);
      expect(repository.save).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const user = {
        id: 1,
        login: 'test',
      };
      const users = [user] as User[];
      const mock = [users, 1] as [User[], number];
      jest.spyOn(repository, 'findAndCount').mockResolvedValue(mock);

      const result = await service.findAll({});
      expect(result).toEqual({ result: users, total: 1 });
      expect(repository.findAndCount).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return user found by id', async () => {
      const id = 1;
      const user = {
        id: 1,
        login: 'test',
      } as User;
      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(id);
      expect(result).toEqual(user);
      expect(repository.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update user found by id and return new data', async () => {
      const updateUserDto: UpdateUserDto = {
        login: 'test1',
      };

      const user: User = {
        login: 'test',
      } as User;

      const updated = {
        ...user,
        ...updateUserDto,
      } as User;
      const id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(updated);

      const result = await service.update(id, updateUserDto);
      expect(result).toEqual(updated);
      expect(repository.update).toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove user found by id', async () => {
      const id = 1;

      await service.remove(id);
      expect(repository.delete).toHaveBeenCalled();
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
