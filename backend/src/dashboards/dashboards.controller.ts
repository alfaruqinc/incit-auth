import { Controller, Get } from '@nestjs/common';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';

@Controller('dashboards')
export class DashboardsController {
  constructor(private readonly userService: UsersService) {}

  @Get('users')
  async getDashboardUserList(): Promise<User[]> {
    const userList = await this.userService.getUsersDashboard();

    return userList;
  }
}
