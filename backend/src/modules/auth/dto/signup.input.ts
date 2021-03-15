import { LoginInput } from './login.input';
import { PartialType } from '@nestjs/mapped-types';

export class SignUpInput extends PartialType(LoginInput) {
  name: string;
}
