// Type definitions for clamp-js-main 0.11
// Project: https://github.com/jmenglis/clamp-js-main#readme
// Definitions by: Sinziana Nicolae <https://github.com/sinziananicolae>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace clamp {
    interface ClampOptions {
        clamp?: number | string | undefined;
        useNativeClamp?: boolean | undefined;
        splitOnChars?: string[] | undefined;
        animate?: boolean | undefined;
        truncationChar?: string | undefined;
        truncationHTML?: string | null | undefined;
    }

    interface ClampResponse {
        original: string;
        clamped: string;
    }
}

export = clamp;
declare function clamp(element: HTMLElement, options?: clamp.ClampOptions): clamp.ClampResponse;
