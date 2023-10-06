import User from '../database/models/UserModel';
import { IUser } from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private model = User;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return { id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role };
  }

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, username, email, password, role }) => (
      { id, username, email, password, role }
    ));
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.model.findByPk(id);
    if (!user) return null;
    return { id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role };
  }
}
