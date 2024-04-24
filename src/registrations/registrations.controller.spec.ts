import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { Registration } from './entities/registration.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

describe('RegistrationsController', () => {
  let controller: RegistrationsController;
  let service: RegistrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationsController],
      providers: [
        {
          provide: RegistrationsService,
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

    controller = module.get<RegistrationsController>(RegistrationsController);
    service = module.get<RegistrationsService>(RegistrationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of registrations', async () => {
      const registration = {
        id: 1,
        userId: 1,
        eventId: 1,
      };
      const registrations = [registration] as Registration[];
      const mock = { result: registrations, total: 1 };
      jest.spyOn(service, 'findAll').mockResolvedValue(mock);

      const result = await controller.findAll({});
      expect(result).toEqual(mock);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return registration found by id', async () => {
      const registration = {
        id: 1,
        userId: 1,
        eventId: 1,
      } as Registration;
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue(registration);

      const result = await controller.findOne(id);
      expect(result).toEqual(registration);
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('create', () => {
    it('should create a new registration', async () => {
      const createRegistrationDto: CreateRegistrationDto = {
        userId: 1,
        eventId: 1,
      };

      const registration: Registration = {
        id: 1,
        userId: 1,
        eventId: 1,
      } as Registration;

      jest.spyOn(service, 'create').mockResolvedValue(registration);

      const result = await controller.create(createRegistrationDto);
      expect(result).toEqual(registration);
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(createRegistrationDto);
    });
  });

  describe('update', () => {
    it('should update registration found by id and return new data', async () => {
      const updateRegistrationDto: UpdateRegistrationDto = {
        userId: 2,
      };

      const registration: Registration = {
        id: 1,
        userId: 1,
        eventId: 1,
      } as Registration;

      const updated = {
        ...registration,
        ...updateRegistrationDto,
      } as Registration;
      const id = '1';

      jest.spyOn(service, 'update').mockResolvedValue(updated);

      const result = await controller.update(id, updateRegistrationDto);
      expect(result).toEqual(updated);
      expect(service.update).toHaveBeenCalled();
      expect(service.update).toHaveBeenCalledWith(+id, updateRegistrationDto);
    });
  });

  describe('remove', () => {
    it('should remove registration found by id', async () => {
      const id = '1';

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalled();
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
