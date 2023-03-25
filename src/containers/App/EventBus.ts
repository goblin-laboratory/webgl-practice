/** 单例模式的 EventBus */
export default class EventBus {
  private static instance: EventBus;
  private eventListeners: {[event: string]: Function[]} = {};

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public addEventListener(event: string, listener: Function): void {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(listener);
  }

  public removeEventListener(event: string, listener: Function): void {
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


