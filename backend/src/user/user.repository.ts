import { RegisterUserDTO } from 'src/auth/dto/register-user.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async registerUser(registerUserDto: RegisterUserDTO) {
    const { first_name, last_name, email, password } = registerUserDto;

    const user = new User();
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = password;

    await user.save();
    return user;
  }

  public async editUser(
    registerUserDto: RegisterUserDTO,
    editedUser: User,
  ): Promise<User> {
    const { first_name, last_name, email } = registerUserDto;

    editedUser.first_name = first_name;
    editedUser.last_name = last_name;
    editedUser.email = email;

    await editedUser.save();
    return editedUser;
  }

  public async verifyEmail(user: User) {
    user.email_verified_at = new Date();

    await user.save();
    return user;
  }
}
