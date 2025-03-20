declare class SpeechToTextService {
    private instance;
    private isBrowserRecognitionSupported;
    isListening: boolean;
    onEnd: () => void;
    onResult: (text: string) => void;
    onError: (error: string) => void;
    constructor();
    private initialize;
    setLanguage: (lang: SpeechRecognition["lang"]) => void;
    start: () => void;
    stop: () => void;
    private handleResult;
    private handleRecognitionEnd;
    private handleRecognitionError;
}
declare const STTService: SpeechToTextService;
export default STTService;
