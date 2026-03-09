import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z} from 'zod'


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
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)
        const data = await response.json()
        if (data.length === 0 ){
            return {
                content: [{
                    type: 'text',
                    text: `El clima de ${city} No se ha encontrado`,
                }],
            };
        }
        
        const { latitude, longitude} = data.results[0]
        console.log(latitude);
        console.log(longitude);

        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,is_day,precipitation,rain,pressure_msl`)
        const weatherData = await weatherResponse.json();
        console.log(weatherData);



        return {
            content: [{
                type: 'text',
                text: JSON.stringify(weatherData, null, 2)
            }],
        };
    }
);

// 3. escuchar las conexiones del cliente
const transport = new StdioServerTransport();
await server.connect(transport);