import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

describe('ValidationPipe', () => {
  let target: ValidationPipe;
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: CreateUserDto,
    data: '',
  };

  describe('transform', () => {
    describe('when validation pass', () => {
      it('should return a CreateUserDto instance', async () => {
        target = new ValidationPipe({ transform: true });
        const testObj = { id: 'wanted', password: '0123456789' };
        expect(await target.transform(testObj, metadata)).toBeInstanceOf(
          CreateUserDto,
        );
      });
    });

    describe('when validation fails', () => {
      beforeEach(() => {
        target = new ValidationPipe();
      });
      it('should throw an error if id is not define', async () => {
        const testObj = { password: '0123456789' };
        await expect(target.transform(testObj, metadata)).rejects.toThrow(
          BadRequestException,
        );
      });

      it('should throw an error if password is not define', async () => {
        const testObj = { id: 'wanted' };
        await expect(target.transform(testObj, metadata)).rejects.toThrow(
          BadRequestException,
        );
      });

    });
  });
});
