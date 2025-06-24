export interface CompareSymbolI {
    symbol: string;
    position: 'SameScale' | 'NewPane' | 'NewPriceScale';
}

export interface ChartOptionsI {
    symbol: string;
    allow_symbol_change: boolean;
    interval:
    | '1m'
    | '3m'
    | '5m'
    | '15m'
    | '30m'
    | '1h'
    | '2h'
    | '4h'
    | '1d'
    | '1w';
    style: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
    theme: 'light' | 'dark';
    backgroundColor: string;
    gridColor: string;
    withdateranges: boolean;
    hide_side_toolbar: boolean;
    range: '1D' | '5D' | '1M' | '3M' | '6M' | 'YTD' | '1Y' | '5Y' | 'ALL';
    studies: string[];
    details: boolean;
    hide_volume: boolean;
    hotlist: boolean;
    compareSymbols: CompareSymbolI[];
    show_popup_button: boolean;
    popup_width: number;
    popup_height: number;
}


export default {
    name: 'TradingViewChart',
    description: "Tradingviews Chart Widget, a quick and easy way to follow the markets.",
    icon: 'mdi-chart-line',
    screenshot: "/images/widgets/TradingView/Chart.png",
    settings: {
        symbol: {
            type: 'select',
            label: 'Symbol',
            description: 'The symbol to display on the chart.',
            options: [
                { value: 'AAPL', label: 'Apple Inc.' },
                { value: 'GOOGL', label: 'Alphabet Inc.' },
                { value: 'AMZN', label: 'Amazon.com Inc.' },
                { value: 'MSFT', label: 'Microsoft Corporation' },
                { value: 'TSLA', label: 'Tesla Inc.' },
            ],
            default: 'AAPL',
        },
        allowSymbolChange: {
            type: 'boolean',
            label: 'Allow Symbol Change',
            description: 'Allow the symbol to be changed later.',
            default: true,
        },
        interval: {
            type: 'select',
            label: 'Interval',
            description: 'The interval for the chart.',
            options: [
                { value: '1m', label: '1 Minute' },
                { value: '5m', label: '5 Minutes' },
                { value: '15m', label: '15 Minutes' },
                { value: '30m', label: '30 Minutes' },
                { value: '1h', label: '1 Hour' },
                { value: '4h', label: '4 Hours' },
                { value: '1d', label: '1 Day' },
            ],
            default: '1d',
        },
        style: {
            type: 'select',
            label: 'Style',
            description: 'The style of the chart.',
            options: [
                { value: '1', label: 'Line' },
                { value: '2', label: 'Candlestick' },
                { value: '3', label: 'Bar' },
                { value: '4', label: 'Area' },
                { value: '5', label: 'Heikin Ashi' },
                { value: '6', label: 'Renko' },
                { value: '7', label: 'Kagi' },
                { value: '8', label: 'Point & Figure' },
                { value: '9', label: 'Line Break' },
                { value: '10', label: 'Range' },
                { value: '11', label: 'Renko (ATR)' },
            ],
            default: '1',
        },
        theme: {
            type: 'select',
            label: 'Theme',
            description: 'Chart theme (light or dark).',
            options: [
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
            ],
            default: 'light',
        },
        backgroundColor: {
            type: 'color',
            label: 'Background Color',
            description: 'The background color of the chart.',
            default: '#ffffff',
        },
        gridColor: {
            type: 'color',
            label: 'Grid Color',
            description: 'The color of the grid lines.',
            default: '#e3e3e3',
        },
        withdateranges: {
            type: 'boolean',
            label: 'Show Date Ranges',
            description: 'Show date range selector.',
            default: true,
        },
        hide_side_toolbar: {
            type: 'boolean',
            label: 'Hide Side Toolbar',
            description: 'Hide the side toolbar on the chart.',
            default: false,
        },
        range: {
            type: 'select',
            label: 'Default Range',
            description: 'The default visible range of the chart.',
            options: [
                { value: '1D', label: '1 Day' },
                { value: '5D', label: '5 Days' },
                { value: '1M', label: '1 Month' },
                { value: '3M', label: '3 Months' },
                { value: '6M', label: '6 Months' },
                { value: 'YTD', label: 'Year to Date' },
                { value: '1Y', label: '1 Year' },
                { value: '5Y', label: '5 Years' },
                { value: 'ALL', label: 'All' },
            ],
            default: 'YTD',
        },
        studies: {
            type: 'array',
            label: 'Studies',
            description: 'Technical studies to display on the chart.',
            default: [],
        },
        details: {
            type: 'boolean',
            label: 'Show Details',
            description: 'Show chart details.',
            default: false,
        },
        hide_volume: {
            type: 'boolean',
            label: 'Hide Volume',
            description: 'Hide the volume indicator.',
            default: false,
        },
        hotlist: {
            type: 'boolean',
            label: 'Show Hotlist',
            description: 'Show the hotlist panel.',
            default: false,
        },
        compareSymbols: {
            type: 'array',
            label: 'Compare Symbols',
            description: 'Symbols to compare on the chart.',
            default: [],
        },
        show_popup_button: {
            type: 'boolean',
            label: 'Show Popup Button',
            description: 'Show the popup button for the chart.',
            default: true,
        },
        popup_width: {
            type: 'number',
            label: 'Popup Width',
            description: 'Width of the popup chart (px).',
            default: 800,
        },
        popup_height: {
            type: 'number',
            label: 'Popup Height',
            description: 'Height of the popup chart (px).',
            default: 600,
        },
    }
}