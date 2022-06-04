import Email from '@/domain/valueObjects/Email';
import UserDomainException from '@/domain/exeptions/UserDomainException';

test('deve instanciar o e-mail', () => {
  const email = new Email('henrique@test.com');
  expect(email.value).toBeTruthy();
});

test('deve lançar uma exeption para e-mail invalido', () => {
  const call = () => new Email('john@test');
  expect(call).toThrow(new UserDomainException('E-mail inválido'));
});

test('deve lançar uma exeption para e-mail null', () => {
  const call = () => new Email('');
  expect(call).toThrow(new UserDomainException('E-mail inválido'));
});
