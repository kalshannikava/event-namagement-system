import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

describe('FeedbacksController', () => {
  let controller: FeedbacksController;
  let service: FeedbacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbacksController],
      providers: [
        {
          provide: FeedbacksService,
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

    controller = module.get<FeedbacksController>(FeedbacksController);
    service = module.get<FeedbacksService>(FeedbacksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of feedbacks', async () => {
      const feedback = {
        id: 1,
        userId: 1,
        eventId: 1,
        content: 'content',
      };
      const feedbacks = [feedback] as Feedback[];
      const mock = { result: feedbacks, total: 1 };
      jest.spyOn(service, 'findAll').mockResolvedValue(mock);

      const result = await controller.findAll({});
      expect(result).toEqual(mock);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return feedback found by id', async () => {
      const feedback = {
        id: 1,
        userId: 1,
        eventId: 1,
        content: 'content',
      } as Feedback;
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue(feedback);

      const result = await controller.findOne(id);
      expect(result).toEqual(feedback);
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('create', () => {
    it('should create a new feedback', async () => {
      const createFeedbackDto: CreateFeedbackDto = {
        userId: 1,
        eventId: 1,
        content: 'content',
      };

      const feedback: Feedback = {
        id: 1,
        userId: 1,
        eventId: 1,
        content: 'content',
      } as Feedback;

      jest.spyOn(service, 'create').mockResolvedValue(feedback);

      const result = await controller.create(createFeedbackDto);
      expect(result).toEqual(feedback);
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(createFeedbackDto);
    });
  });

  describe('update', () => {
    it('should update feedback found by id and return new data', async () => {
      const updateFeedbackDto: UpdateFeedbackDto = {
        userId: 2,
      };

      const feedback: Feedback = {
        id: 1,
        userId: 1,
        eventId: 1,
        content: 'content',
      } as Feedback;

      const updated = {
        ...feedback,
        ...updateFeedbackDto,
      } as Feedback;
      const id = '1';

      jest.spyOn(service, 'update').mockResolvedValue(updated);

      const result = await controller.update(id, updateFeedbackDto);
      expect(result).toEqual(updated);
      expect(service.update).toHaveBeenCalled();
      expect(service.update).toHaveBeenCalledWith(+id, updateFeedbackDto);
    });
  });

  describe('remove', () => {
    it('should remove feedback found by id', async () => {
      const id = '1';

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalled();
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
