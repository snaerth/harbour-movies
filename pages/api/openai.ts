import { Configuration, OpenAIApi } from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type RequestData = {
  message: string;
};

export const runtime = 'edge';

export default async function handler(request: Request) {
  const { message } = (await request.json()) as RequestData;

  if (!message) {
    return new Response('No message in the request', { status: 400 });
  }

  // const response = await openai.createCompletion({
  //   model: 'text-davinci-003',
  //   prompt: message,
  //   temperature: 0.7,
  //   max_tokens: 256,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  // });

  const requestData = {
    prompt: message,
    max_tokens: 50,
    temperature: 0.5,
    n: 1,
    stop: '\n',
  };
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(requestData),
  });
  console.log(response);
  return new Response(response.body);
}
