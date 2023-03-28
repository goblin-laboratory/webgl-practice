// 定义一个枚举类型
export enum PositionType {
  aisle = 'aisle', // 过道
  shelf = 'shelf', // 货架
  wall = 'wall', // 墙体
}

interface PositionNodeCfg {
  type: PositionType;
  x: number;
  y: number;
  z: number;
  length: number;
  width: number;
  heiht: number;
}

export default class PositionNode {
  private type: PositionType = PositionType.aisle;

  private x = 0;

  private y = 0;

  private z = 0;

  private length = 1;

  private width = 1;

  private heiht = 1;

  private info: any | null = null;

  constructor(cfg: {
    type: PositionType;
    x: number;
    y: number;
    z: number;
    length?: number;
    width?: number;
    heiht?: number;
  }) {
    this.type = cfg.type ?? this.type;
    this.x = cfg.x ?? this.x;
    this.y = cfg.y ?? this.y;
    this.z = cfg.z ?? this.z;
    this.length = cfg.length ?? this.length;
    this.width = cfg.width ?? this.width;
    this.heiht = cfg.heiht ?? this.heiht;
  }

  updateNodeInfo(info: any) {
    this.info = { ...this.info, ...info };
  }

  isShelf() {
    return this.type === PositionType.shelf;
  }
}
