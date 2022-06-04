<h3>Clean Architecture React Native</h3>
<p>
  O projeto consiste em consumir a API Rest (https://jsonplaceholder.typicode.com/) e persistir em um banco de dados local.
  <br />
  Para ter um bom exemplo de Clean Architecture implementei os repositórios com <b>Sqlite</b>, <b>RealmDb</b> e um <b>Fake</b>.
  <br />
  Criei uma fábrica de repositórios <b>RepositoryFactory</b> Utilizei os Hooks do React para consumir.
  <br />
  Desta forma para trocar o banco de dados é só instanciar a fábrica no arquivo <b>src/hooks/useFactory</b>
</p>