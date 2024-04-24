import { Test, TestingModule } from '@nestjs/testing';
import { EventOptionsService } from './event-options.service';
import { EventOptions } from './entities/event-option.entity';
import { Repository } from 'typeorm';
import { CreateEventOptionDto } from './dto/create-event-option.dto';
import { UpdateEventOptionDto } from './dto/update-event-option.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EventOptionsService', () => {
  let service: EventOptionsService;
  let repository: Repository<EventOptions>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventOptionsService,
        {
          provide: getRepositoryToken(EventOptions),
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

    service = module.get<EventOptionsService>(EventOptionsService);
    repository = module.get<Repository<EventOptions>>(
      getRepositoryToken(EventOptions),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create new eventOptions', async () => {
      const createEventOptionsDto: CreateEventOptionDto = {
        tagId: 1,
        eventId: 1,
      };

      const eventOptions: EventOptions = {
        id: 1,
        ...createEventOptionsDto,
      } as EventOptions;

      jest.spyOn(repository, 'save').mockResolvedValue(eventOptions);

      const result = await service.create(createEventOptionsDto);
      expect(repository.save).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalledWith(createEventOptionsDto);
      expect(result).toEqual(eventOptions);
    });
  });

  describe('findAll', () => {
    it('should return an array of eventOptionss', async () => {
      const eventOption = {
        tagId: 1,
        eventId: 1,
      };
      const eventOptions = [eventOption] as EventOptions[];
      const mock = [eventOptions, 1] as [EventOptions[], number];
      jest.spyOn(repository, 'findAndCount').mockResolvedValue(mock);

      const result = await service.findAll({});
      expect(result).toEqual({ result: eventOptions, total: 1 });
      expect(repository.findAndCount).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return eventOptions found by id', async () => {
      const id = 1;
      const eventOptions = {
        id: 1,
        tagId: 1,
        eventId: 1,
      } as EventOptions;
      jest.spyOn(repository, 'findOne').mockResolvedValue(eventOptions);

      const result = await service.findOne(id);
      expect(result).toEqual(eventOptions);
      expect(repository.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update eventOptions found by id and return new data', async () => {
      const updateEventOptionsDto: UpdateEventOptionDto = {
        tagId: 2,
      };

      const eventOptions: EventOptions = {
        tagId: 1,
        eventId: 1,
      } as EventOptions;

      const updated = {
        ...eventOptions,
        ...updateEventOptionsDto,
      } as EventOptions;
      const id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(updated);

      const result = await service.update(id, updateEventOptionsDto);
      expect(result).toEqual(updated);
      expect(repository.update).toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalledWith(id, updateEventOptionsDto);
    });
  });

  describe('remove', () => {
    it('should remove eventOptions found by id', async () => {
      const id = 1;

      await service.remove(id);
      expect(repository.delete).toHaveBeenCalled();
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
