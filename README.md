# Speech to Text Service

A lightweight TypeScript wrapper for the Web Speech API that provides speech recognition functionality.

## Features

- Browser speech recognition support detection
- Continuous speech recognition
- Language switching support (English/Russian)
- TypeScript support
- Event-based architecture

## Installation

```bash
npm install s2t-ts
```

## Usage

```typescript
import STTService from "s2t-ts";

// Set up event handlers
STTService.onResult = (text) => {
  console.log("Recognized text:", text);
};

STTService.onError = (error) => {
  console.error("Error:", error);
};

STTService.onEnd = () => {
  console.log("Recognition ended");
};

// Switch language (optional)
STTService.setLanguage("en"); // 'en' for English, 'ru' for Russian

// Start recognition
STTService.start();

// Stop recognition
STTService.stop();
```

## API

### Methods

- `start()`: Starts speech recognition
- `stop()`: Stops speech recognition
- `setLanguage(lang)`: Sets recognition language ('en' or 'ru')

### Properties

- `isListening`: Boolean indicating if recognition is active
- `onResult(text: string)`: Callback for recognition results
- `onError(error: string)`: Callback for error handling
- `onEnd()`: Callback for recognition end event

## Browser Support

This service requires a browser that supports the Web Speech API. Currently supported in:

- Chrome
- Edge
- Safari
- Firefox

## License

MIT
