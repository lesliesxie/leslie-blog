interface MessageOptions {
  type?: "success" | "warning" | "danger";
  message: string;
  duration?: number;
}

class MessageComponent {
  private container: HTMLDivElement;
  private message: HTMLDivElement;
  private closeButton: HTMLButtonElement;

  constructor() {
    this.container = document.createElement("div");
    this.container.className = "message-container";

    this.message = document.createElement("div");
    this.message.className = "message";

    this.closeButton = document.createElement("button");
    this.closeButton.className = "close-button";
    this.closeButton.innerText = "×";

    this.container.appendChild(this.message);
    this.container.appendChild(this.closeButton);

    this.closeButton.addEventListener("click", () => {
      this.hideMessage();
    });
  }

  private showMessage(options: MessageOptions) {
    this.message.innerText = options.message;
    this.message.className = `message message-${options.type}`;

    document.body.appendChild(this.container);

    if (options.duration !== undefined) {
      setTimeout(() => {
        this.hideMessage();
      }, options.duration);
    }
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
      messageOptions = options;
    }

    this.showMessage(messageOptions);
  }
}

const message = new MessageComponent();

export function showMessage(options: MessageOptions | string) {
  message.show(options);
}
