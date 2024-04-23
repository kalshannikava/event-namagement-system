import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

describe('TagsController', () => {
  let controller: TagsController;
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        {
          provide: TagsService,
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

    controller = module.get<TagsController>(TagsController);
    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const tag = {
        id: 1,
        name: 'tag',
      };
      const tags = [tag] as Tag[];
      const mock = { result: tags, total: 1 };
      jest.spyOn(service, 'findAll').mockResolvedValue(mock);

      const result = await controller.findAll({});
      expect(result).toEqual(mock);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return tag found by id', async () => {
      const tag = {
        id: 1,
        name: 'tag',
      } as Tag;
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue(tag);

      const result = await controller.findOne(id);
      expect(result).toEqual(tag);
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('create', () => {
    it('should create a new tag', async () => {
      const createTagDto: CreateTagDto = {
        name: 'tag',
      };

      const tag: Tag = {
        id: 1,
        name: 'tag',
      } as Tag;

      jest.spyOn(service, 'create').mockResolvedValue(tag);

      const result = await controller.create(createTagDto);
      expect(result).toEqual(tag);
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(createTagDto);
    });
  });

  describe('update', () => {
    it('should update tag found by id and return new data', async () => {
      const updateTagDto: UpdateTagDto = {
        name: 'tag 1',
      };

      const tag: Tag = {
        id: 1,
        name: 'tag',
      } as Tag;

      const updated = {
        ...tag,
        ...updateTagDto,
      } as Tag;
      const id = '1';

      jest.spyOn(service, 'update').mockResolvedValue(updated);

      const result = await controller.update(id, updateTagDto);
      expect(result).toEqual(updated);
      expect(service.update).toHaveBeenCalled();
      expect(service.update).toHaveBeenCalledWith(+id, updateTagDto);
    });
  });

  describe('remove', () => {
    it('should remove tag found by id', async () => {
      const id = '1';

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalled();
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
