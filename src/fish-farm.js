// import { Ox } from './ox';
import { Farm } from "./farm";
import { Fish } from "./fish";
import { colors } from "./colors";

export const fishFarms = [];

export class FishFarm extends Farm {
  constructor(properties) {
    super({
      ...properties,
      fenceColor: "#eee",
      width: 2,
      height: 2,
    });

    this.needyness = 1300;
    this.type = colors.fish;

    fishFarms.push(this);

    setTimeout(() => this.addAnimal({}), 2000 + (properties.delay ?? 0));
    setTimeout(() => this.addAnimal({}), 2500 + (properties.delay ?? 0));
    setTimeout(() => this.addAnimal({}), 3000 + (properties.delay ?? 0));
    setTimeout(() => this.addAnimal({}), 3500 + (properties.delay ?? 0));
    setTimeout(() => this.addAnimal({}), 4000 + (properties.delay ?? 0));
    this.numAnimals = 5;
    this.appearing = true;
    setTimeout(() => (this.appearing = false), 3000);
  }

  upgrade() {
    // Cannot upgrade if there are 9 or more fish already
    if (this.numAnimals >= 9) {
      return false;
    }

    this.numAnimals += 4;

    // 2 parents
    for (let i = 0; i < 2; i++) {
      setTimeout(() => this.children[i].showLove(), i * 1000);
      setTimeout(() => this.children[i].hideLove(), 7000);
    }

    //  new fish each upgrade
    for (let i = 0; i < 4; i++) {
      setTimeout(() => this.addAnimal({}), i * 1000 + 7000);
    }

    return true;
  }

  addAnimal({ isBaby = false }) {
    super.addAnimal(
      new Fish({
        parent: this,
        isBaby,
      }),
    );
  }

  update(gameStarted, updateCount) {
    super.update(gameStarted, updateCount);
    // So 3 ox = 2 demand per update, 5 ox = 2 demand per update,
    // so upgrading doubles the demand(?)
  }
}
