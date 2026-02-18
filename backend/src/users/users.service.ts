@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.repo.create({
      ...data,
      password: hashedPassword,
      role: 'CLIENT'
    });
  }

  findByEmail(email: string) {
    return this.repo.findByEmail(email);
  }
}