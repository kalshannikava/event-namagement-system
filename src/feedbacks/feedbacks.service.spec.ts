import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbacksService } from './feedbacks.service';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

describe('FeedbacksService', () => {
  let service: FeedbacksService;
  let repository: Repository<Feedback>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbacksService,
        {
          provide: getRepositoryToken(Feedback),
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

    service = module.get<FeedbacksService>(FeedbacksService);
    repository = module.get<Repository<Feedback>>(getRepositoryToken(Feedback));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create new feedback', async () => {
      const createFeedbackDto: CreateFeedbackDto = {
        userId: 1,
        eventId: 1,
        content: 'content',
      };

      const feedback: Feedback = {
        id: 1,
        ...createFeedbackDto,
      } as Feedback;

      jest.spyOn(repository, 'save').mockResolvedValue(feedback);

      const result = await service.create(createFeedbackDto);
      expect(repository.save).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalledWith(createFeedbackDto);
      expect(result).toEqual(feedback);
    });
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
      jest.spyOn(repository, 'find').mockResolvedValue(feedbacks);

      const result = await service.findAll();
      expect(result).toEqual(feedbacks);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return feedback found by id', async () => {
      const id = 1;
      const feedback = {
        id: 1,
        userId: 1,
        eventId: 1,
        content: 'content',
      } as Feedback;
      jest.spyOn(repository, 'findOne').mockResolvedValue(feedback);

      const result = await service.findOne(id);
      expect(result).toEqual(feedback);
      expect(repository.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update feedback found by id and return new data', async () => {
      const updateFeedbackDto: UpdateFeedbackDto = {
        userId: 2,
      };

      const feedback: Feedback = {
        userId: 1,
        eventId: 1,
        content: 'content',
      } as Feedback;

      const updated = {
        ...feedback,
        ...updateFeedbackDto,
      } as Feedback;
      const id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(updated);

      const result = await service.update(id, updateFeedbackDto);
      expect(result).toEqual(updated);
      expect(repository.update).toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalledWith(id, updateFeedbackDto);
    });
  });

  describe('remove', () => {
    it('should remove feedback found by id', async () => {
      const id = 1;

      await service.remove(id);
      expect(repository.delete).toHaveBeenCalled();
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
