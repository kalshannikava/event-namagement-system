import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationsService } from './registrations.service';
import { Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

describe('RegistrationsService', () => {
  let service: RegistrationsService;
  let repository: Repository<Registration>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationsService,
        {
          provide: getRepositoryToken(Registration),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RegistrationsService>(RegistrationsService);
    repository = module.get<Repository<Registration>>(
      getRepositoryToken(Registration),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create new registration', async () => {
      const createRegistrationDto: CreateRegistrationDto = {
        userId: 1,
        eventId: 1,
      };

      const registration: Registration = {
        id: 1,
        ...createRegistrationDto,
      } as Registration;

      jest.spyOn(repository, 'save').mockResolvedValue(registration);

      const result = await service.create(createRegistrationDto);
      expect(repository.save).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalledWith(createRegistrationDto);
      expect(result).toEqual(registration);
    });
  });

  describe('findAll', () => {
    it('should return an array of registrations', async () => {
      const registration = {
        id: 1,
        userId: 1,
        eventId: 1,
      };
      const registrations = [registration] as Registration[];
      jest.spyOn(repository, 'find').mockResolvedValue(registrations);

      const result = await service.findAll();
      expect(result).toEqual(registrations);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return registration found by id', async () => {
      const id = 1;
      const registration = {
        id: 1,
        userId: 1,
        eventId: 1,
      } as Registration;
      jest.spyOn(repository, 'findOne').mockResolvedValue(registration);

      const result = await service.findOne(id);
      expect(result).toEqual(registration);
      expect(repository.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update registration found by id and return new data', async () => {
      const updateRegistrationDto: UpdateRegistrationDto = {
        userId: 2,
      };

      const registration: Registration = {
        userId: 1,
        eventId: 1,
      } as Registration;

      const updated = {
        ...registration,
        ...updateRegistrationDto,
      } as Registration;
      const id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(updated);

      const result = await service.update(id, updateRegistrationDto);
      expect(result).toEqual(updated);
      expect(repository.update).toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalledWith(id, updateRegistrationDto);
    });
  });

  describe('remove', () => {
    it('should remove registration found by id', async () => {
      const id = 1;

      await service.remove(id);
      expect(repository.delete).toHaveBeenCalled();
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
