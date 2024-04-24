import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const user = {
        id: 1,
        login: 'test',
      };
      const users = [user] as User[];
      const mock = { result: users, total: 1 };
      jest.spyOn(service, 'findAll').mockResolvedValue(mock);

      const result = await controller.findAll({});
      expect(result).toEqual(mock);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return user found by id', async () => {
      const user = {
        id: 1,
        login: 'test',
      } as User;
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(id);
      expect(result).toEqual(user);
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        login: 'test',
        password: 'test',
      };

      const user: User = {
        id: 1,
        login: 'test',
      } as User;

      jest.spyOn(service, 'create').mockResolvedValue(user);

      const result = await controller.create(createUserDto);
      expect(result).toEqual(user);
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update', () => {
    it('should update user found by id and return new data', async () => {
      const updateUserDto: UpdateUserDto = {
        login: 'test1',
      };

      const user: User = {
        id: 1,
        login: 'test',
      } as User;

      const updated = {
        ...user,
        ...updateUserDto,
      } as User;
      const id = '1';

      jest.spyOn(service, 'update').mockResolvedValue(updated);

      const result = await controller.update(id, updateUserDto);
      expect(result).toEqual(updated);
      expect(service.update).toHaveBeenCalled();
      expect(service.update).toHaveBeenCalledWith(+id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove user found by id', async () => {
      const id = '1';

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalled();
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
