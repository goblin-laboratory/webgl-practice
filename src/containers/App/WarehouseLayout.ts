import Shelf from './Shelf';
import PositionNode from './PositionNode';
import EventBus from './EventBus';

export default class Warehouse {
  // 仓库 长、宽、高，对应空间的 x、y、z 轴
  private length: number = 0;
  private width: number = 0;
  private heiht: number = 0;
  // 节点列表
  private nodes: PositionNode[] = [];
  private shelfNodes: PositionNode[] = [];
  private shelfNodeMap: Map<string, PositionNode> = new Map();

  constructor() {
    EventBus.getInstance().addEventListener('Warehouse.data.update', (nodes: any[]) => {
      const shelfNodes: any[] = [];
      nodes.forEach((node: any, idx: number) => {
        const shelfNode = this.shelfNodeMap.get(node.id);
        if (!shelfNode) {
          return;
        }
        shelfNodes.push(shelfNode);
        shelfNode.updateNodeInfo(node);
      });
      EventBus.getInstance().dispatchEvent('Warehouse.render.update', shelfNodes);
    });
  }

  set config(cfg: any) {
    this.length = cfg.length;
    this.width = cfg.width;
    this.heiht = cfg.heiht;
    this.shelfNodes = [];
    this.nodes = (cfg.nodes || []).map((it: any) => {
      const node = new PositionNode(it);
      if (node.isShelf()) {
        this.shelfNodes.push(node);
      }
      return node;
    });
    EventBus.getInstance().dispatchEvent('Warehouse.render.init', this);
  }

  initShelfNodes(nodes: any[]) {
    this.initNodeMap();
    if (nodes.length > this.shelfNodes.length) {
      EventBus.getInstance().dispatchEvent('Warehouse.error', { message: '库位配置问题' });
      nodes.length = this.shelfNodes.length;
    } else {
      this.shelfNodes.length = nodes.length;
    }
    nodes.forEach((node: any, idx: number) => {
      const shelfNode = this.shelfNodes[idx];
      shelfNode?.updateNodeInfo(node);
      this.shelfNodeMap.set(node.id, shelfNode);
    });
    EventBus.getInstance().dispatchEvent('Warehouse.render.update', this.shelfNodes);
  }

  initNodeMap() {
    if (!this.shelfNodeMap) {
      this.shelfNodeMap = new Map();
    } else {
      this.shelfNodeMap.clear();
    }
  }
}
