import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { SourceTextModule } from 'vm';


interface MyRequestBody {
  content?: object;
  thread?: object;
}

interface MyRequestHeaders {
  "OpenAI-Session"?: object;
}

const listadeejemplo = {
  "Lista de precios 1": "[1400, 1500, 1700]",
  "Precio individual 1": "[500]",
  "Resultado esperado 1": "true",
  "Lista de precios 2": "[500, 700, 900]",
  "Precio individual 2": "[300]",
  "Resultado esperado 2": "true",
};

let messages = [
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "Quiero comparar la media de una lista de precios con un precio individual. Si el precio individual es menor que la media de la lista, quiero que devuelvas 'true'" },
  { "role": "user", "content": `${listadeejemplo}` },
  { "role": "user", "content": "solo devuelve el resultado el resto del texto no lo necesito" }
];


async function routes(server: FastifyInstance, options: any) {
  server.post<{ Body: MyRequestBody; Headers: MyRequestHeaders }>('/modelo/v1', async (req, res) => {
    const listaprecios = await cogertexto();
    let listapreciosString = '';
    for (const precio of listaprecios) {
      listapreciosString += precio + ', ';
    }
    const content = req.body.content || null;
    const contentString = String(content);
    const ContentJSON = JSON.stringify(content);


    messages.push(
      {
      "role": "user",
      "content": "Lista con muchos precios " + listapreciosString + `, lista con un solo valor ${ContentJSON} +`
    }

    
  );



    const urlDelChat1 = "https://api.openai.com/v1/chat/completions";
    const response = await axios.post(
      urlDelChat1,
      {
        "model": "gpt-4o",
        "messages": messages
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: req.headers.authorization,
          "OpenAi-Beta": "assistants=v2"
        }
      }
    );

    messages.push({
      "role": "assistant",
      "content": response.data.choices[0].message.content
    });

    for (const message of messages) {
      console.log(message.content);
    }

    return response.data;
  });

  server.post<{ Body: MyRequestBody; Headers: MyRequestHeaders }>('/modelo/v2', async (req, res) => {
    try {
      res.send("hola");
    } catch (excepcion) {
      console.log(excepcion);
      res.status(500).send({ error: 'Error al procesar la solicitud' });
    }
  });

  server.post<{ Body: MyRequestBody; Headers: MyRequestHeaders }>('/modelo/v3', async (req, res) => {
    try {
      res.send(req.body);
    } catch (excepcion) {
      console.log(excepcion);
      res.status(500).send({ error: 'Error al procesar la solicitud' });
    }
  });



 server.get('/scrape', async (RES, REQ) => {
        try {
          const url = 'https://www.mediamarkt.es/es/brand/apple/iphone/iphone-15-pro-max';
          const { data } = await axios.get(url);
          const $ = cheerio.load(data);
          const prices: string[] = [];
      
          $('span').each((_, element) => {
            const text = $(element).text().trim();
            if (text.match(/^\d+([.,]\d{1,2})?[€–]$/)) {
              prices.push(text);
            }
          });
      
          REQ.send({ prices });
        } catch (error) {
          REQ.status(500).send({ error: 'Error scraping the website' });
        }
      }); 




}

async function cogertexto() {
  const url = 'https://www.mediamarkt.es/es/brand/apple/iphone/iphone-15-pro-max';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const prices: string[] = [];

  $('span').each((_, element) => {
    const text = $(element).text().trim();
    if (text.match(/^\d+([.,]\d{1,2})?[€–]$/)) {
      prices.push(text);
    }
  });
  return prices;
}

    
      
// ESM
export default routes;