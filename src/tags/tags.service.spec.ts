import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

describe('TagsService', () => {
  let service: TagsService;
  let repository: Repository<Tag>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
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

    service = module.get<TagsService>(TagsService);
    repository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create new tag', async () => {
      const createTagDto: CreateTagDto = {
        name: 'tag',
      };

      const tag: Tag = {
        id: 1,
        ...createTagDto,
      } as Tag;

      jest.spyOn(repository, 'save').mockResolvedValue(tag);

      const result = await service.create(createTagDto);
      expect(repository.save).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalledWith(createTagDto);
      expect(result).toEqual(tag);
    });
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const tag = {
        id: 1,
        name: 'tag',
      };
      const tags = [tag] as Tag[];
      jest.spyOn(repository, 'find').mockResolvedValue(tags);

      const result = await service.findAll();
      expect(result).toEqual(tags);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return tag found by id', async () => {
      const id = 1;
      const tag = {
        id: 1,
        name: 'tag',
      } as Tag;
      jest.spyOn(repository, 'findOne').mockResolvedValue(tag);

      const result = await service.findOne(id);
      expect(result).toEqual(tag);
      expect(repository.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update tag found by id and return new data', async () => {
      const updateTagDto: UpdateTagDto = {
        name: 'tag 1',
      };

      const tag: Tag = {
        name: 'tag',
      } as Tag;

      const updated = {
        ...tag,
        ...updateTagDto,
      } as Tag;
      const id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(updated);

      const result = await service.update(id, updateTagDto);
      expect(result).toEqual(updated);
      expect(repository.update).toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalledWith(id, updateTagDto);
    });
  });

  describe('remove', () => {
    it('should remove tag found by id', async () => {
      const id = 1;

      await service.remove(id);
      expect(repository.delete).toHaveBeenCalled();
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
