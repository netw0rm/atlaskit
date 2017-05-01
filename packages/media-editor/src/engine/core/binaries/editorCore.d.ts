declare namespace EditorCore {
  namespace Core {
    /*
    * Types exposed by the native part.
    * See src/bindings.cpp for details
    */

    type VeColor = {
      red: number,
      green: number,
      blue: number
    };

    type VePoint = {
      x: number,
      y: number
    };

    type VeSize = {
      width: number,
      height: number
    };

    type VeWindowSize = {
      width: number,
      height: number,
      screenScaleFactor: number
    };

    type VeTool = {
      value: number
    };

    type VeTextDirection = {
      value: number
    };

    type VeTextInputCommand = {
      value: number
    };

    type VeInitialParameters = {
      shapeColor: VeColor,
      lineWidth: number,
      addShadow: boolean,
      tool: VeTool,
      windowSize: VeWindowSize,
      backgroundColor: VeColor,
      backBitmapUuid: string,
      backBitmapSize: VeSize,
      baseTextDirection: VeTextDirection
    };

    // VeEngine exposed by the native part
    interface VeEngine {
      create(parameters: VeInitialParameters): boolean;
      render(): boolean;
      setTool(tool: VeTool): boolean;
      setLineWidth(lineWidth: number): boolean;
      setColor(color: VeColor): boolean;
      resize(size: VeWindowSize): boolean;
      rescale(position: VePoint, relativeScale: number): boolean;
      setHorizontalPosition(value: number): boolean;
      setVerticalPosition(value: number): boolean;
      clickOnce(position: VePoint): boolean;
      dragStart(position: VePoint): boolean;
      dragMove(position: VePoint): boolean;
      dragEnd(position: VePoint): boolean;
      dragLost(): boolean;
      addCharacter(character: number): boolean;
      textCommand(command: VeTextInputCommand): boolean;
      exportImage(): boolean;
      contextLost(): boolean;
      contextRestored(newSize: VeWindowSize): boolean;
      timerTick(id: number): boolean;
      failureReason: string;
      delete(): void;  // generated by Emscripten, don't forget to call it
    }

    // Interface described in src/bitmap_provider.h
    interface BitmapProviderInterop {
      // Gets the index of the bitmap specified by its UUID. Later a bitmap will be referenced with its index.
      // Once an index assigned to the bitmap, it cannot change during the lifetime of the bitmap provider.
      // In case of failure returns -1, 0 is a valid value.
      getBitmapIndex(uuid: string): number;

      // Gets the bitmap dimensions
      getBitmapWidth(bitmapIndex: number): number;   // gets the bitmap width
      getBitmapHeight(bitmapIndex: number): number;  // gets the bitmap height

      // Gets the number of bitmap fragments (each fragment is a texture). 0 indicates failure
      getNumberOfFragments(bitmapIndex: number): number;

      // Queries the fragment coordinates
      // If succeeds, returns true and the following 8 methods starting with "get" return
      // coordinates for the fragment.
      queryFragmentCoordinates(bitmapIndex: number, fragmentIndex: number): boolean;
      getX(): number;
      getY(): number;
      getWidth(): number;
      getHeight(): number;
      getUTopLeft(): number;
      getVTopLeft(): number;
      getUBottomRight(): number;
      getVBottomRight(): number;

      // Binds the fragment. 0 indicates failure
      bind(bitmapIndex: number, fragmentIndex: number): boolean;

      // Called when the context is lost/restored
      handleContextLost(): void;
      handleContextRestored(): void;
    }

    // Interface described in src/bitmap_exporter.h
    interface BitmapExporterInterop {
      // Receives the dimensions of the final image
      // Returns false if fails to prepare for image receiving, true otherwise.
      prepare(imageWidth: number, imageHeight: number): boolean;

      // Puts the image onto the canvas
      putImagePart(left: number, top: number, width: number, height: number, buffer: number, bufferLength: number): void;
    }

    // Interface described in src/typeset.h
    interface TypesetInterop {
      // Updates the typeset with the new text. Passes the following arguments:
      //  text - the text to typeset
      //  textLength - the length of the text line (in UTF-32 code units), this value is provided for convenience
      //  direction - text direction: 'ltr' or 'rtl'
      //  fontSize - font size in pixels
      //  cursorArray - array to be filled in with cursor data, the memory is pre-allocated for (textLength + 1) * 2
      //                32-bit integers (x and y coordinates for cursor positions)
      //
      // Returns true if the update was successful
      update(text: string, textLength: number, direction: string, fontSize: number, cursorArray: number): boolean;

      // After update is completed successfully, the following functions are available:

      // Returns the number of text fragments (textures)
      getFragmentCount(): number;

      // Binds the texture with the normal text. The texture is specified by its index: from 0 to (fragmentCount - 1)
      bindNormal(fragmentIndex: number): boolean;

      // Bind the texture with the stroke. The texture is specified by its index: from 0 to (fragmentCount - 1)
      bindStroke(fragmentIndex: number): boolean;

      // Gets the coordinates of the fragment
      // The fragment is specified by its index: from 0 to (fragmentCount - 1)
      getXBase(fragmentIndex: number): number;
      getYBase(fragmentIndex: number): number;
      getXOpposite(fragmentIndex: number): number;
      getYOpposite(fragmentIndex: number): number;

      // Gets the data related to the cursor
      getLineHeight(): number;
      getDescent(): number;
    }

    // Interface described in src/browser_typesetter.h
    interface BrowserTypesetterInterop {
      // Creates a new typeset, returns its index.
      // The typeset must exist regardless context loss until it is explicitly deleted with deleteTypeset()
      // or the whole typesetter is deleted.
      createTypeset(): number;

      // Deletes the typeset
      deleteTypeset(index: number): void;

      // Gets the typeset object referenced by the index
      // Returns:
      //   - null, if the typeset with the requested index doesn't exist
      //   - object implementing TypesetInterop (this interface is described in typeset.h)
      getTypeset(index: number): TypesetInterop;

      // Called when the OpenGL context is lost
      handleContextLost(): void;

      // Called when the OpenGL context is restored
      handleContextRestored(): void;
    }

    // Interface described in src/timer_factory.h
    interface TimerFactoryInterop {
      // Creates a new timer. Returns a timer id which is used to reference a timer
      createTimer(): number;

      // Starts the timer
      startTimer(id: number, msecInterval: number): void;

      // Stops the timer
      stopTimer(id: number): void;
    }

    // Module generated by Emscripten
    type NativeModule = {
      VeEngine: {new(): VeEngine},
      VeTool: {
        Line: {value: number},
        Blur: {value: number},
        Arrow: {value: number},
        Brush: {value: number},
        Oval: {value: number},
        Rectangle: {value: number},
        Text: {value: number}
      },
      VeTextDirection: {
        LeftToRight: {value: number},
        RightToLeft: {value: number}
      },
      VeTextInputCommand: {
        CompleteInput: {value: number},
        NewLine: {value: number},
        Backspace: {value: number},
        Delete: {value: number},
        MoveCursorLeft: {value: number},
        MoveCursorRight: {value: number},
        MoveCursorUp: {value: number},
        MoveCursorDown: {value: number}
      }
      HEAPU8: {
        buffer: ArrayBuffer
      },
      HEAP32: {
        buffer: ArrayBuffer
      },
      setContext(context: WebGLRenderingContext): void,
      handleScrollChanged: (isHorizontalVisible: boolean, horizontalPosition: number, horizontalThumb: number,
                            isVerticalVisible: boolean, verticalPosition: number, verticalThumb: number) => void,
      handleShapeParametersChanged: (red: number, green: number, blue: number,
                                    lineWidth: number, addShadow: boolean) => void,
      bitmapProvider: BitmapProviderInterop,
      bitmapExporter: BitmapExporterInterop,
      browserTypesetter: BrowserTypesetterInterop,
      timerFactory: TimerFactoryInterop,
      handleTextInputStarted: () => void,
      handleTextInputEnded: () => void
    };

    function createModule(): NativeModule;
  }
}

export = EditorCore;
