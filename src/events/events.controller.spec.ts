import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
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

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
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
      const mock = { result: events, total: 1 };
      jest.spyOn(service, 'findAll').mockResolvedValue(mock);

      const result = await controller.findAll({});
      expect(result).toEqual(mock);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return event found by id', async () => {
      const event = {
        id: 1,
        name: 'name',
        description: 'description',
        ownerId: 1,
      } as Event;
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue(event);

      const result = await controller.findOne(id);
      expect(result).toEqual(event);
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('create', () => {
    it('should create a new event', async () => {
      const createEventDto: CreateEventDto = {
        name: 'name',
        description: 'description',
        ownerId: 1,
      };

      const event: Event = {
        id: 1,
        name: 'name',
        description: 'description',
        ownerId: 1,
      } as Event;

      jest.spyOn(service, 'create').mockResolvedValue(event);

      const result = await controller.create(createEventDto);
      expect(result).toEqual(event);
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(createEventDto);
    });
  });

  describe('update', () => {
    it('should update event found by id and return new data', async () => {
      const updateEventDto: UpdateEventDto = {
        name: 'new name',
      };

      const event: Event = {
        id: 1,
        name: 'name',
        description: 'description',
        ownerId: 1,
      } as Event;

      const updated = {
        ...event,
        ...updateEventDto,
      } as Event;
      const id = '1';

      jest.spyOn(service, 'update').mockResolvedValue(updated);

      const result = await controller.update(id, updateEventDto);
      expect(result).toEqual(updated);
      expect(service.update).toHaveBeenCalled();
      expect(service.update).toHaveBeenCalledWith(+id, updateEventDto);
    });
  });

  describe('remove', () => {
    it('should remove event found by id', async () => {
      const id = '1';

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalled();
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
