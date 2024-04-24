import { Test, TestingModule } from '@nestjs/testing';
import { EventOptionsController } from './event-options.controller';
import { EventOptionsService } from './event-options.service';
import { CreateEventOptionDto } from './dto/create-event-option.dto';
import { UpdateEventOptionDto } from './dto/update-event-option.dto';
import { EventOptions } from './entities/event-option.entity';

describe('EventOptionsController', () => {
  let controller: EventOptionsController;
  let service: EventOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventOptionsController],
      providers: [
        {
          provide: EventOptionsService,
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

    controller = module.get<EventOptionsController>(EventOptionsController);
    service = module.get<EventOptionsService>(EventOptionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const eventOptions = {
        id: 1,
        tagId: 1,
        eventId: 1,
      };
      const events = [eventOptions] as EventOptions[];
      const mock = { result: events, total: 1 };
      jest.spyOn(service, 'findAll').mockResolvedValue(mock);

      const result = await controller.findAll({});
      expect(result).toEqual(mock);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return eventOptions found by id', async () => {
      const eventOptions = {
        id: 1,
        tagId: 1,
        eventId: 1,
      } as EventOptions;
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue(eventOptions);

      const result = await controller.findOne(id);
      expect(result).toEqual(eventOptions);
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('create', () => {
    it('should create a new eventOptions', async () => {
      const createEventDto: CreateEventOptionDto = {
        tagId: 1,
        eventId: 1,
      };

      const eventOptions: EventOptions = {
        id: 1,
        tagId: 1,
        eventId: 1,
      } as EventOptions;

      jest.spyOn(service, 'create').mockResolvedValue(eventOptions);

      const result = await controller.create(createEventDto);
      expect(result).toEqual(eventOptions);
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(createEventDto);
    });
  });

  describe('update', () => {
    it('should update eventOptions found by id and return new data', async () => {
      const updateEventDto: UpdateEventOptionDto = {
        tagId: 2,
      };

      const eventOptions: EventOptions = {
        id: 1,
        tagId: 1,
        eventId: 1,
      } as EventOptions;

      const updated = {
        ...eventOptions,
        ...updateEventDto,
      } as EventOptions;
      const id = '1';

      jest.spyOn(service, 'update').mockResolvedValue(updated);

      const result = await controller.update(id, updateEventDto);
      expect(result).toEqual(updated);
      expect(service.update).toHaveBeenCalled();
      expect(service.update).toHaveBeenCalledWith(+id, updateEventDto);
    });
  });

  describe('remove', () => {
    it('should remove eventOptions found by id', async () => {
      const id = '1';

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalled();
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
