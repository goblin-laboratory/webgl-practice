/** 单例模式的 EventBus */
export default class EventBus {
  // eslint-disable-next-line no-use-before-define
  private static instance: EventBus;

  private eventListeners: {[event: string]: any[]} = {};

  // eslint-disable-next-line no-useless-constructor
  private constructor() {
    // debugger;
  }

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public addEventListener(event: string, listener: any): void {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(listener);
  }

  public removeEventListener(event: string, listener: any): void {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter((l) => l !== listener);
    }
  }

  public dispatchEvent(event: string, data?: any): void {
    const listeners = this.eventListeners[event];
    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }
}
