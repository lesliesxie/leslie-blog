type MessageType = "success" | "info" | "warning" | "error";
interface MessageOptions {
  type?: MessageType;
  message: string;
  duration?: number;
}

let timeoutIds: Map<any, any> = new Map();
let messageQueues: Map<any, any> = new Map();

let nextMessageTop = 30;

class MessageComponent {
  private container: HTMLDivElement;
  private message: HTMLDivElement;
  private closeButton: HTMLButtonElement;

  private duration: number = 3000;

  constructor() {
    this.container = document.createElement("div");
    this.container.className = "leslie-message-container";

    this.message = document.createElement("div");
    this.message.className = "leslie-message";

    this.closeButton = document.createElement("button");
    this.closeButton.className = "leslie-close-button";
    this.closeButton.innerText = "×";

    this.container.appendChild(this.message);
    this.container.appendChild(this.closeButton);

    this.closeButton.addEventListener("click", () => {
      this.hideMessage();
    });

    this.container.addEventListener("mouseenter", () => {
      this.clearTimeout();
    });

    this.container.addEventListener("mouseleave", () => {
      this.startTime();
    });
  }

  private showMessage(options: MessageOptions) {
    this.message.className = `leslie-message leslie-message--${options.type}`;
    const icon = document.createElement("img");
    icon.className = `leslie-message-icon leslie-message-icon--${options.type}`;
    icon.src = `./src/assets/icons/${options.type}.svg`;
    this.message.innerText = options.message;
    this.message.appendChild(icon);
    this.container.style.top = `${nextMessageTop}px`;

    nextMessageTop += this.container.offsetHeight + 50;
    document.body.appendChild(this.container);

    this.duration = options.duration || 3000;
    this.startTime();
  }

  private showNextMessage() {
    const messageQueue = messageQueues.get(this);
    if (messageQueue && messageQueue.length > 0) {
      const nextMessage = messageQueue.shift();
      if (nextMessage) {
        this.showMessage(nextMessage);
      }
    }
  }

  private startTime() {
    const timeoutId = setTimeout(() => {
      this.hideMessage();
    }, this.duration);
    timeoutIds.set(this, timeoutId);
  }

  private clearTimeout() {
    const timeoutId = timeoutIds.get(this);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  private hideMessage() {
    document.body.removeChild(this.container);
    messageQueues.delete(this);

    this.clearTimeout();
    this.showNextMessage();
  }

  public show(options: MessageOptions | string) {
    let messageOptions: MessageOptions;

    if (typeof options === "string") {
      messageOptions = {
        type: "success",
        message: options,
      };
    } else {
      messageOptions = {
        type: "success",
        ...options,
      };
    }

    let messageQueue = messageQueues.get(this);
    if (!messageQueue) {
      messageQueue = [];
      messageQueues.set(this, messageQueue);
    }

    messageQueue.push(messageOptions);

    if (messageQueue.length === 1) {
      this.showNextMessage();
    }
  }
}

const messageComponents: MessageComponent[] = [];

function showMessage(options: MessageOptions | string) {
  const messageComponent = new MessageComponent();
  messageComponents.push(messageComponent);
  messageComponent.show(options);
}

type ShowMessageProxy = typeof showMessage & {
  [K in MessageType]: (message: string) => void;
};

const showMessageProxy: ShowMessageProxy = Object.assign(showMessage, {
  success: createMessageType("success"),
  info: createMessageType("info"),
  warning: createMessageType("warning"),
  error: createMessageType("error"),
});

function createMessageType(type: MessageType) {
  return (message: string) => {
    showMessage({
      type,
      message,
    });
  };
}

export default showMessageProxy;
