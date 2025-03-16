class SpeechToTextService {
  private instance: SpeechRecognition | null = null;
  private isBrowserRecognitionSupported: boolean;

  public isListening = false;

  public onEnd: () => void = () => {};
  public onResult: (text: string) => void = () => {};
  public onError: (error: string) => void = () => {};

  constructor() {
    this.isBrowserRecognitionSupported =
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

    if (this.isBrowserRecognitionSupported) {
      this.initialize();
    }
  }

  private initialize() {
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    this.instance = new Recognition();

    this.instance.continuous = true;
    this.instance.interimResults = true;
    this.instance.lang = "ru-RU";

    this.instance.onresult = this.handleResult;
    this.instance.onend = this.handleRecognitionEnd;
    this.instance.onerror = this.handleRecognitionError;
  }

  public setLanguage = (lang: "ru" | "en") => {
    if (!this.instance || !lang) {
      return;
    }

    switch (lang) {
      case "ru":
        this.instance.lang = "ru-RU";
        break;
      case "en":
        this.instance.lang = "en-US";
        break;
    }
  };

  public start = () => {
    if (this.instance) {
      this.instance.start();
      this.isListening = true;
    }
  };

  public stop = () => {
    if (this.instance) {
      this.instance.stop();
      this.isListening = false;
    }
  };

  private handleResult = (event: SpeechRecognitionEvent) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    this.onResult(transcript);
  };

  private handleRecognitionEnd = () => {
    this.isListening = false;
    this.onEnd();
  };

  private handleRecognitionError = (event: SpeechRecognitionErrorEvent) => {
    this.onError(`Speech recognition error: ${event.error}`);
    this.stop();
  };
}

const STTService = new SpeechToTextService();

export default STTService;
