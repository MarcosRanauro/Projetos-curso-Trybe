import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { ILogin, IUser } from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';
import { ServiceResponse, ServiceResponseMsg } from '../Interfaces/ServiceResponse';
import JWToken from '../utils/JWToken';
import { IToken } from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private createToken = JWToken,
  ) {}

  public async login(login: ILogin): Promise<ServiceResponse<ServiceResponseMsg | IToken>> {
    const user = await this.userModel.findByEmail(login.email);
    if (!user || !bcrypt.compareSync(login.password, user.password)) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' },
      };
    }
    const { id, username, role } = user as IUser;
    const token = this.createToken.sign({ id, username, role });
    return { status: 'SUCCESS', data: { token } };
  }
}
