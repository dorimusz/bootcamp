import { Repository as RepositoryEntity } from 'src/repository/repository.entity';
export interface RepositoryWithContributionCount extends RepositoryEntity {
  contributionSum: number;
}

/*
Az interface -k, azok ilyen OOP (objektum oriented programming) dolog, az a szerepuk, hogy OOP-ben (ami igazabol csak egy ilyen paradigma amit lehet kovetni fejlesztes kozben es jonnek vele bizonyos mintak, nev szerint az hogy minde egy osztaly, pl. ilyen nyelv a JAVA, nagyon sok video van youtube on, erdemes megnezni 1-2-t arrol, hogy mi is az az OOP)
tehat az a szerepe, hogy van egy class, pl. a legunalmasabb peldaval elve class Dog es van egy masik class Cat. A `dog` nak mondjuk van egy olyan metodusa, hogy `bark` a `cat`nek meg hogy `meow`. Viszont mind a ketto tud enni, szval mind a kettonek kene egy eat metodus. Itt johet kepbe egy interface. Az interface gyakorlatilag leirja, hogy az az osztaly amelyik implementalja ezt (`class Dog implements IEat`, az interfacek neve konvencio szerint TypeScriptben I vel kezdodik) annak kotelezo definialnia azokat a metodiusokat, adattagokat amiket az interface megkovetel.

interface IEat { eat: (food: Food) => void; }
Ez azt jelenti, hogy ha a Dog osztaly implements IEat, akkor kell egy olyan eat metodust definialnod az osztalyban, aminek nincsen visszateresi erteke (tehat void`) es egy `Food tipusu, parametert var, food neven. Ha ezt elmulasztod, akkor a kod nem fog lefordulni es hibat ir ki neked, hogy elfelejtetted definialni ezt a metodust.

A DTO (Data Transfer Object) az pedig tipikusan csak egy osztaly, es arra szoktak hasznalni hogy az API milyen valaszokat tud adni egy-egy keresre. Tehat minden keresnek egy DTO a valasza, es vannak kulonbozo DTO-k. Pl ha van egy endpointod, hogy GET /dogs/:dogId, akkor o a hatterben szepen lekeri az adatbazisbol a dogId hoz tartozo kutyat. Ennek az adatbazis keresnek a valasza egy class DogEntity lesz, ami lehet, hogy implementalja az IEat interfacet, de ezt igy nem igazan adhatod vissza API valaszkent, mert fuggvenyt visszaadni semmi ertelme, illetve egy csomo folosleges informacio lehet benne a DogEntityben, ezert szoktak olyat csinalni, hogy a DogEntity osztalynak csinalnak egy toDogDTO() metodust, ami fogja az osztaly adattagjait es csinal belole egy uj osztalyt, egy `DogDTO`-t, amiben pl csak a kutya neve van benne, de nincsen ott az ID, vagy nincsenek ott a metodusok se.eee

szval polo a CreateRepositoryDto az egy osztaly, aminek van egy id egy owner stb adattagja, ezek letezo ertekek, tudod azt csinalni, hogy
const dto = new CreateRepositoryDto();
console.log(dto.id);

Tehat ezeket tudod hasznalni, van ertekuk. A te esetedben nincsen viszont, mert nincsen se alapertelmezett ertekuk, illetve nincsen az osztalynak constructor a, amivel ezeket beallitana, illetve nincsenek metodusok se, amik ezeket beallitanak, pl. setId(id: numer) { this.id = id; }
az interface-el viszont ilyet nem tudnal csinalni
ott nem ondhatsz olyat hogy  const interface = new GithubRepositoryInterface()
mert az nem egy osztaly
ot egy osztalynak implementalnia kell

Interface eseteben:
class Dog implements GithubRepositoryInterface
//owner: UserEntity; // eyt igy kell vagy sima string?
Ez egy olyan dolog amit valoszinuleg az ORM csinal meg neked. (tipikusan TypeORMem szokott lenni)
Ez annyit jelent csak, hogy az adatbasizban, van egy tabla, hogy Repositiroes, es abba vannak ezek szepen benne, es ott van egy olyan mezo, hogy OwnerId, ami egy ForeignKey es a Users tablara mutat, a Users tablaban vannak a userek, es minden usernek van egy id ja. Tehat a repository.ownerId => users.id ra mutat.
Es amikor ezt az ORM meglatja, es te lekersz egy repositoryt, akkor mondhatod neki, hogy figyi ezeket a foregn kulcsokat old mar fel, es egybol add vissza nekem a hozzajuk tartozo entityt.
Es ilyenkor az tortenik, hogy lekeri a user tablabol az adatokat, az id alapjan tudja, hogy mi kell, es akkor rateszi a repostiry entity re azt hogy Owner aminek a tipuse User lesz
*/
