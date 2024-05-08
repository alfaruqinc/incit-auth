import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_PROVIDER, DrizzlePostgres } from 'src/db/drizzle.provider';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponse, users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async createUser(body: CreateUserDto): Promise<CreateUserResponse> {
    const [user] = await this.db.insert(users).values(body).returning({
      id: users.id,
      email: users.email,
      name: users.name,
      createdAt: users.createdAt,
    });

    return user;
  }
}
