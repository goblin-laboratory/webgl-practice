import Shelf from './Shelf';
import WarehouseNode from './WarehouseNode';
import ShelfLayout from './ShelfLayout';
import EventBus from './EventBus';

interface WarehouseNodeLayoutConfig {
  type: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface WarehouseLayoutConfig {
  width: number;
  height: number;
  zLevelHeight: number;
  zLevelNumber: number;
  nodes: WarehouseNodeLayoutConfig[];
}

export default class WarehouseLayout {
  private cfg: WarehouseLayoutConfig | null = null;

  // 仓库长、宽，x 和 y 方向的大小
  private width = 0;

  private heiht = 0;

  // 货架布局信息，z 方向上的层数和每层高度
  private shelfLayout = new ShelfLayout();

  // 节点列表
  private nodes: WarehouseNode[] = [];

  private shelfNodes: WarehouseNode[] = [];

  private shelfNodeMap: Map<string, WarehouseNode> = new Map();

  // constructor() {}

  set config(cfg: WarehouseLayoutConfig) {
    this.cfg = cfg;
    this.width = cfg.width;
    this.heiht = cfg.height;
    this.shelfLayout.setLayout({ height: cfg.zLevelHeight, number: cfg.zLevelNumber });

    this.shelfNodes = [];
    this.nodes = (cfg.nodes || []).map((it: any) => {
      const node = new WarehouseNode(it);
      if (node.isShelf()) {
        this.shelfNodes.push(node);
      }
      return node;
    });
    EventBus.getInstance().dispatchEvent('Warehouse.render.init', this);
  }
}
