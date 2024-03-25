import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseController } from '../base/base.controller';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController extends BaseController<User> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return super.create(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return super.update(id, updateUserDto);
  }
}
