// Require the necessary discord.js classes
const {
  Client,
  Events,
  GatewayIntentBits,
  Intents,
  MessageEmbed,
  EmbedBuilder,
} = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { token } = require("./config.json");
// const allIntents = new Intents(7796);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const openai = async () => {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  return openai;
};

client.on("ready", () => {
  console.log(client.user.tag);
});

const messages = [
  {
    role: "system",
    content:
      "You are Amica " +
      "you were " +
      "created by mbuke " +
      "prince as an assistant to this team " +
      "mbuke prince has " +
      "three friends " +
      "edson chryso and Ivad ",
  },
  {
    role: "user",
    content: "who are you?",
  },
];

client.on("messageCreate", async (message: any) => {
  console.log(message);
  if (message.content.includes("@1076652714353766450")) {
    const amica = await openai();
    messages.push({
      role: "user",
      content: message.content.replace("@1076652714353766450", "amica"),
    });
    const completion = await amica.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.2,
      max_tokens: 300,
    });
    let embed = new EmbedBuilder().setDescription(
      completion.data.choices[0].message.content
    );

    message.channel.send({ embeds: [embed] });
  }
});

client.login(token);
