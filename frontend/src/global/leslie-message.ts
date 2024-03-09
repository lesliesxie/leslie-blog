type MessageType = "success" | "info" | "warning" | "error";
interface MessageOptions {
  type?: MessageType;
  message: string;
  duration?: number;
}

let timeoutId: ReturnType<typeof setTimeout>;

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
      clearTimeout(timeoutId);
    });

    this.container.addEventListener("mouseleave", () => {
      this.startTime();
    });
  }

  private showMessage(options: MessageOptions) {
    this.message.innerText = options.message;
    this.message.className = `leslie-message leslie-message--${options.type}`;

    document.body.appendChild(this.container);

    this.duration = options.duration || 3000;
    this.startTime();
  }

  private startTime() {
    timeoutId = setTimeout(() => {
      this.hideMessage();
    }, this.duration);
  }

  private hideMessage() {
    document.body.removeChild(this.container);
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

    this.showMessage(messageOptions);
  }
}

const message = new MessageComponent();

function showMessage(options: MessageOptions | string) {
  message.show(options);
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
