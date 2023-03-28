export default class ShelfLayout {
  // 仓库货架的层数
  private number = 1;

  // 每一层货位的高度
  private height = 1;

  constructor(layout: any = {}) {
    this.setLayout(layout);
  }

  setLayout(layout: { height?: number; number?: number } = {}) {
    this.height = layout?.height ?? this.height;
    this.number = layout?.number ?? this.number;
  }

  get layout() {
    return { height: this.height, number: this.number };
  }

  getZAxisValue(zIndex: number) {
    return this.height * (zIndex + 0.5);
  }

  forEach(fn: any) {
    for (let i = 0; i < this.number; i += 1) {
      fn(i);
    }
  }
}
