import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z} from 'zod'


const NWS_API_BASE = 'https://api.weather.gov';
const USER_AGENT = 'weather-app/1.0';


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
        inputSchema: {                              // ✅ los params van dentro de inputSchema
            city: z.string().describe('city name'),
        },
    },
    async ({ city }) => {
        return {
            content: [{
                type: 'text',
                text: `El clima de ${city} es soleado`,
            }],
        };
    }
);

// 3. escuchar las conexiones del cliente
const transport = new StdioServerTransport();
await server.connect(transport);