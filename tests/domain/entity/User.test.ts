import User from '@/domain/entities/User';
import UserDomainException from '@/domain/exeptions/UserDomainException';

test('verifica se a instancia do usuário está ok', () => {
  const user = new User({
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
  });
  expect(user.id).toBe(1);
  expect(user.name).toBe('Leanne Graham');
  expect(user.email).toBe('Sincere@april.biz');
});

test('deve lançar uma exeption para e-mail invalido', () => {
  const call = () => new User({id: 1, name: 'John Doe', email: 'john@test'});
  expect(call).toThrow(new UserDomainException('E-mail inválido'));
});

test('verifica se os dados são atualizados', () => {
  const user = new User({
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
  });
  user.id = 2;
  user.name = 'John Doe';
  user.email = 'johnohn@test.com';
  expect(user.id).toBe(2);
  expect(user.name).toBe('John Doe');
  expect(user.email).toBe('johnohn@test.com');
});
