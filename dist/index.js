"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpeechToTextService {
    constructor() {
        this.instance = null;
        this.isListening = false;
        this.onEnd = () => { };
        this.onResult = () => { };
        this.onError = () => { };
        this.setLanguage = (lang) => {
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
        this.start = () => {
            if (this.instance) {
                this.instance.start();
                this.isListening = true;
            }
        };
        this.stop = () => {
            if (this.instance) {
                this.instance.stop();
                this.isListening = false;
            }
        };
        this.handleResult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");
            this.onResult(transcript);
        };
        this.handleRecognitionEnd = () => {
            this.isListening = false;
            this.onEnd();
        };
        this.handleRecognitionError = (event) => {
            this.onError(`Speech recognition error: ${event.error}`);
            this.stop();
        };
        this.isBrowserRecognitionSupported =
            typeof window !== "undefined" &&
                ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
        if (this.isBrowserRecognitionSupported) {
            this.initialize();
        }
    }
    initialize() {
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.instance = new Recognition();
        this.instance.continuous = true;
        this.instance.interimResults = true;
        this.instance.lang = "ru-RU";
        this.instance.onresult = this.handleResult;
        this.instance.onend = this.handleRecognitionEnd;
        this.instance.onerror = this.handleRecognitionError;
    }
}
const STTService = new SpeechToTextService();
exports.default = STTService;
