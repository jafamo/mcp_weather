import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod'

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

function errorResponse(message: string) {
    return {
        content: [{ type: 'text' as const, text: message }],
        isError: true,
    };
}

// 1. crear el servidor
const server = new McpServer({
    name: 'Demo',
    version: '1.0.0',
    description: 'MCP demo '
})

// 2. Crear las herramientas

server.registerTool(
    'fetch-weather',
    {
        title: 'Tool to fetch the weather of a city',
        description: 'Get weather from city',
        inputSchema: {
            city: z.string().describe('city name'),
        },
    },
    async ({ city }) => {
        // Geocoding
        let geoData: any;
        try {
            const response = await fetch(`${GEOCODING_API}?name=${encodeURIComponent(city)}&count=10&language=en&format=json`);
            if (!response.ok) {
                return errorResponse(`Geocoding API error: ${response.status} ${response.statusText}`);
            }
            geoData = await response.json();
        } catch (err) {
            return errorResponse(`Failed to reach geocoding API: ${err instanceof Error ? err.message : String(err)}`);
        }

        if (!geoData.results || geoData.results.length === 0) {
            return errorResponse(`City "${city}" not found.`);
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Weather
        let weatherData: any;
        try {
            const response = await fetch(
                `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,is_day,precipitation,rain,pressure_msl`
            );
            if (!response.ok) {
                return errorResponse(`Weather API error: ${response.status} ${response.statusText}`);
            }
            weatherData = await response.json();
        } catch (err) {
            return errorResponse(`Failed to reach weather API: ${err instanceof Error ? err.message : String(err)}`);
        }

        return {
            content: [{
                type: 'text',
                text: `Weather for ${name}, ${country}:\n${JSON.stringify(weatherData, null, 2)}`
            }],
        };
    }
);

// 3. escuchar las conexiones del cliente
const transport = new StdioServerTransport();
await server.connect(transport);
