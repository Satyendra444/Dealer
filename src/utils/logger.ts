/**
 * Logger utility for Redis cache invalidation tests.
 * Provides structured, timestamped log output with step labels.
 */

type LogLevel = 'STEP' | 'PASS' | 'FAIL' | 'INFO' | 'WARN' | 'CACHE' | 'API' | 'TIME';

const COLORS: Record<LogLevel, string> = {
    STEP: '\x1b[36m',   // cyan
    PASS: '\x1b[32m',   // green
    FAIL: '\x1b[31m',   // red
    INFO: '\x1b[34m',   // blue
    WARN: '\x1b[33m',   // yellow
    CACHE: '\x1b[35m',  // magenta
    API: '\x1b[34m',    // blue
    TIME: '\x1b[33m',   // yellow
};
const RESET = '\x1b[0m';

function timestamp(): string {
    return new Date().toISOString().replace('T', ' ').replace('Z', '');
}

function log(level: LogLevel, message: string, data?: unknown): void {
    const prefix = `${COLORS[level]}[${level}]${RESET}`;
    const ts = `\x1b[90m${timestamp()}${RESET}`;
    console.log(`${ts} ${prefix} ${message}`);
    if (data !== undefined) {
        console.log(`       └─ ${typeof data === 'string' ? data : JSON.stringify(data, null, 2)}`);
    }
}

export const logger = {
    step: (msg: string, data?: unknown) => log('STEP', msg, data),
    pass: (msg: string, data?: unknown) => log('PASS', msg, data),
    fail: (msg: string, data?: unknown) => log('FAIL', msg, data),
    info: (msg: string, data?: unknown) => log('INFO', msg, data),
    warn: (msg: string, data?: unknown) => log('WARN', msg, data),
    cache: (msg: string, data?: unknown) => log('CACHE', msg, data),
    api: (msg: string, data?: unknown) => log('API', msg, data),
    time: (msg: string, data?: unknown) => log('TIME', msg, data),

    separator: (label?: string) => {
        const line = '─'.repeat(60);
        if (label) {
            console.log(`\n${'─'.repeat(10)} ${label} ${'─'.repeat(Math.max(0, 48 - label.length))}`);
        } else {
            console.log(`\n${line}`);
        }
    },

    banner: (text: string) => {
        const border = '═'.repeat(text.length + 4);
        console.log(`\n╔${border}╗`);
        console.log(`║  ${text}  ║`);
        console.log(`╚${border}╝\n`);
    },
};
