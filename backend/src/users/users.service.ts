import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzlePostgres } from 'src/db/drizzle.provider';
import { CreateUserDto } from './dto/create-user.dto';
import {
  CreateUserResponse,
  User,
  UserWithPassword,
  users,
} from './users.schema';

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

  async getUserById(id: string): Promise<User> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));

    return user;
  }

  async getUserByEmailWithPassword(email: string): Promise<UserWithPassword> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user;
  }

  async incrementLoginCountByOne(email: string): Promise<void> {
    await this.db
      .update(users)
      .set({ loginCount: sql`${users.loginCount} + 1` })
      .where(eq(users.email, email));
  }
}
