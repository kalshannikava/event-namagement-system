import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

describe('EventsService', () => {
  let service: EventsService;
  let repository: Repository<Event>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
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

    service = module.get<EventsService>(EventsService);
    repository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create new event', async () => {
      const createEventDto: CreateEventDto = {
        name: 'name',
        description: 'description',
        ownerId: 1,
      };

      const event: Event = {
        id: 1,
        ...createEventDto,
      } as Event;

      jest.spyOn(repository, 'save').mockResolvedValue(event);

      const result = await service.create(createEventDto);
      expect(repository.save).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalledWith(createEventDto);
      expect(result).toEqual(event);
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const event = {
        id: 1,
        name: 'name',
        description: 'description',
        ownerId: 1,
      };
      const events = [event] as Event[];
      const mock = [events, 1] as [Event[], number];
      jest.spyOn(repository, 'findAndCount').mockResolvedValue(mock);

      const result = await service.findAll({});
      expect(result).toEqual({ result: events, total: 1 });
      expect(repository.findAndCount).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return event found by id', async () => {
      const id = 1;
      const event = {
        id: 1,
        name: 'name',
        description: 'description',
        ownerId: 1,
      } as Event;
      jest.spyOn(repository, 'findOne').mockResolvedValue(event);

      const result = await service.findOne(id);
      expect(result).toEqual(event);
      expect(repository.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update event found by id and return new data', async () => {
      const updateEventDto: UpdateEventDto = {
        name: 'new name',
      };

      const event: Event = {
        name: 'name',
        description: 'description',
        ownerId: 1,
      } as Event;

      const updated = {
        ...event,
        ...updateEventDto,
      } as Event;
      const id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(updated);

      const result = await service.update(id, updateEventDto);
      expect(result).toEqual(updated);
      expect(repository.update).toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalledWith(id, updateEventDto);
    });
  });

  describe('remove', () => {
    it('should remove event found by id', async () => {
      const id = 1;

      await service.remove(id);
      expect(repository.delete).toHaveBeenCalled();
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
