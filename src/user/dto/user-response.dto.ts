import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  readonly firstname: string;

  @Expose()
  readonly lastname: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly phone: string;

  @Expose()
  readonly role: string;

  @Expose()
  readonly isActive: boolean;
}
