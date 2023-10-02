import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindOneUserParams } from './dtos/find-one-user.dto';
import { UpdateUserDto, UpdateUserParams } from './dtos/update-user.dto';
import { DeleteUserParams } from './dtos/delete-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Return all users' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Return user by ID' })
  @Get(':id')
  findOne(@Param() params: FindOneUserParams) {
    return this.usersService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Create user' })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Update user' })
  @Put(':id')
  updateUser(
    @Param() params: UpdateUserParams,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(params.id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  delete(@Param() params: DeleteUserParams) {
    return this.usersService.deleteUser(params.id);
  }
}
