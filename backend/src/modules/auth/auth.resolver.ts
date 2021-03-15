import { UnauthorizedException } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { SignUpInput } from './dto/signup.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('signUp')
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.create(signUpInput);
  }

  @Mutation('login')
  async login(@Args('loginInput') { email, password }: LoginInput) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    return this.authService.login(user);
  }
}
